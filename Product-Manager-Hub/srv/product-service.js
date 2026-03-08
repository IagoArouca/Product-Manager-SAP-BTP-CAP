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


        this.before(['UPDATE', 'PATCH'], Orders, req => {
            if ('status' in req.data) {
                LOG.warn(`Tentativa de alteração manual de status negada para o pedido.`)
                req.reject(403, 'O campo status é gerenciado pelo sistema e não pode ser alterado manualmente.')
            }
        })



        this.on('finalizeOrder', async req => {

    const LOG = cds.log('orders')
    const { Orders, Products, OrderItems } = this.entities
    const orderID = req.params[0].ID

    console.log("🔥 ACTION FOI CHAMADA PARA:", orderID)

    const tx = cds.tx(req)

    // Busca o pedido
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
        req.data.orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
        req.data.totalAmount = 0
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