const cds = require('@sap/cds')

module.exports = class ProductService extends cds.ApplicationService {

    async init() {
        const LOG = cds.log('orders')
        LOG.info("🚀 Backend iniciado")

        const { Products, Orders, OrderItems } = this.entities

        this.before(['NEW','CREATE'], Orders, req => this.generateOrderNumber(req))
        this.before(['CREATE','UPDATE'], OrderItems.drafts, req => this.setItemPrice(req))
        this.after(['CREATE','UPDATE','DELETE'], OrderItems.drafts, (data,req) => this.recalculateOrderTotal(data,req))
        this.after('READ', Orders, orders => this.calculateTotalOnRead(orders))
        this.before(['NEW', 'CREATE'], Products, req => this.generateProductIdentifier(req))


        // Proteção do campo status (remove qualquer alteração manual)
        this.before(['UPDATE', 'PATCH'], Orders, req => {
            if ('status' in req.data) {
                delete req.data.status
            }
        })



        this.on('finalizeOrder', async req => {

            const LOG = cds.log('orders')
            const { Orders, Products, OrderItems } = this.entities
            const orderID = req.params[0].ID

            console.log("🔥 ACTION FOI CHAMADA PARA:", orderID)

            const tx = cds.tx(req)

            const draft = await SELECT.one
            .from(Orders.drafts)
            .where({ ID: orderID })

            if (draft) {
                 return req.error(
                    400,
                    'Não é possível finalizar um pedido enquanto ele está em edição.'
                )
            }

            const order = await tx.read(Orders).where({ ID: orderID })

            if (!order) {
                LOG.error(`Pedido não encontrado ${orderID}`)
                return req.error(404, 'Pedido não encontrado.')
            }

            if (order.status === 'Finalizado') {
                LOG.warn(`Pedido já finalizado ${orderID}`)
                return req.error(400, 'Este pedido já está finalizado.')
            }

            const items = await tx.read(OrderItems).where({ parent_ID: orderID })

            if (!items || items.length === 0) {
                LOG.warn(`Pedido sem itens ${orderID}`)
                return req.error(400, 'Não é possível finalizar um pedido sem itens.')
            }

            for (const item of items) {

                const product = await tx.read(Products)
                    .where({ ID: item.product_ID })
                    .columns('stock','name')

                if (!product) {
                    return req.error(404, 'Produto não encontrado.')
                }

                if (product.stock < item.quantity) {
                    LOG.warn(`Estoque insuficiente para ${product.name}`)
                    return req.error(
                        400,
                        `Estoque insuficiente para ${product.name}. Estoque atual: ${product.stock}`
                    )
                }
            }

            for (const item of items) {
                await tx.update(Products)
                    .where({ ID: item.product_ID })
                    .with({
                        stock: { '-=': item.quantity }
                    })
            }

            await tx.update(Orders)
                .where({ ID: orderID })
                .set({
                    status: 'Finalizado'
                })

            LOG.info(`✅ Pedido ${orderID} finalizado com sucesso`)

            return {
                message: 'Pedido finalizado com sucesso'
            }

        })

        this.on('cancelFinalization', async req => {

    const LOG = cds.log('orders')
    const { Orders, Products, OrderItems } = this.entities
    const orderID = req.params[0].ID

    const tx = cds.tx(req)

    // Verifica se o pedido está em draft (edição)
    const draft = await SELECT.one
        .from(Orders.drafts)
        .where({ ID: orderID })

    if (draft) {
        return req.error(
            400,
            'Não é possível cancelar a finalização enquanto o pedido está em edição.'
        )
    }

    // Busca o pedido ativo
    const order = await SELECT.one
        .from(Orders)
        .where({ ID: orderID })

    if (!order) {
        LOG.error(`Pedido não encontrado ${orderID}`)
        return req.error(404, 'Pedido não encontrado.')
    }

    // Verifica status
    if (order.status !== 'Finalizado') {
        return req.error(
            400,
            'Somente pedidos finalizados podem ter a finalização cancelada'
        )
    }

    // Busca itens do pedido
    const items = await tx.read(OrderItems)
        .where({ parent_ID: orderID })

    if (!items || items.length === 0) {
        return req.error(
            400,
            'Pedido não possui itens para restaurar estoque.'
        )
    }

    // Devolve estoque
    for (const item of items) {

        await tx.update(Products)
            .where({ ID: item.product_ID })
            .with({
                stock: { '+=': item.quantity }
            })

    }

    // Atualiza status
    await tx.update(Orders)
        .where({ ID: orderID })
        .set({
            status: 'Aberto'
        })

    LOG.info(`↩ Pedido ${orderID} teve a finalização cancelada`)

    return {
        message: 'Finalização do pedido cancelada com sucesso.'
    }

})

        this.before('EDIT', 'Orders', async req => {

            const order = await SELECT.one.from(this.entities.Orders)
                .where({ ID: req.params[0].ID })

            if (order.status === 'Finalizado') {
                req.reject(400, 'Pedidos finalizados não podem ser editados')
            }

        })

        await super.init()
    }

    generateOrderNumber(req){
        const LOG = cds.log('orders')

        // Remove qualquer status vindo da API
        delete req.data.status

        req.data.orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
        req.data.totalAmount = 0
        req.data.status = 'Aberto'

        LOG.info(`Pedido criado: ${req.data.orderNo}`)
    }

    async setItemPrice(req){
        const LOG = cds.log('orders')
        const { Products } = this.entities
        if(!req.data.product_ID) return
        const product = await SELECT.one.from(Products).where({ ID: req.data.product_ID }).columns('price','name')
        if(product){
            req.data.itemPrice = product.price
            LOG.info(`Preço definido automaticamente para produto ${product.name}: ${product.price}`)
        }
    }

    async recalculateOrderTotal(data, req){
        const LOG = cds.log('orders')
        const { Orders, OrderItems } = this.entities
        const orderID = data?.parent_ID || req.data?.parent_ID
        if(!orderID) return
        const items = await SELECT.from(OrderItems.drafts).where({ parent_ID: orderID })
        let totalPedido = 0
        for(const item of items){
            totalPedido += Number(item.quantity || 0) * Number(item.itemPrice || 0)
        }
        await UPDATE(Orders.drafts).set({ totalAmount: totalPedido }).where({ ID: orderID })
        LOG.info(`Total recalculado para pedido ${orderID}: ${totalPedido}`)
    }

    async calculateTotalOnRead(orders){
        const { OrderItems } = this.entities
        const list = Array.isArray(orders) ? orders : [orders]
        for(const order of list){
            const result = await SELECT.one`sum(quantity * itemPrice) as total`.from(OrderItems).where({ parent_ID: order.ID })
            order.totalAmount = result.total || 0
        }
    }

    generateProductIdentifier(req) {
        const LOG = cds.log('products')
        req.data.identifier = `PRD-${Math.floor(1000 + Math.random() * 9000)}`
        LOG.info(`Código de produto gerado: ${req.data.identifier}`)
    }
}