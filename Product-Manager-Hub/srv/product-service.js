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

        this.before('SAVE', Orders, req => this.validateAndDecreaseStock(req))

        this.before(['NEW', 'CREATE'], Products, req => this.generateProductIdentifier(req))
        

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

        const product = await SELECT.one
            .from(Products)
            .where({ ID: req.data.product_ID })
            .columns('price','name')

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

        const items = await SELECT.from(OrderItems.drafts)
            .where({ parent_ID: orderID })

        let totalPedido = 0

        for(const item of items){

            const quantity = Number(item.quantity || 0)
            const price = Number(item.itemPrice || 0)

            totalPedido += quantity * price

        }

        await UPDATE(Orders.drafts)
            .set({ totalAmount: totalPedido })
            .where({ ID: orderID })

        LOG.info(`Total recalculado para pedido ${orderID}: ${totalPedido}`)

    }


        async calculateTotalOnRead(orders){

        const { OrderItems } = this.entities

        const list = Array.isArray(orders) ? orders : [orders]

        for(const order of list){

            const result = await SELECT.one`
                sum(quantity * itemPrice) as total
            `.from(OrderItems)
            .where({ parent_ID: order.ID })

            order.totalAmount = result.total || 0
        }
    }


    async validateAndDecreaseStock(req){

        const LOG = cds.log('orders')

        const { Products, OrderItems } = this.entities

        const items = await SELECT.from(OrderItems.drafts)
            .where({ parent_ID: req.data.ID })

        for(const item of items){

            if(!item.product_ID){

                LOG.warn("Item sem produto detectado")

                req.error("Existe um item sem produto selecionado.")

                continue
            }

            const product = await SELECT.one
                .from(Products)
                .where({ ID: item.product_ID })
                .columns('stock','name')

            if(!product){

                LOG.error(`Produto não encontrado ID ${item.product_ID}`)

                req.error(`Produto não encontrado.`)

                continue
            }

            if(product.stock < item.quantity){

                LOG.warn(`Estoque insuficiente para ${product.name}`)

                req.error(`Estoque insuficiente para o produto ${product.name}. Estoque atual: ${product.stock}`)

                continue
            }

            await UPDATE(Products)
                .where({ ID: item.product_ID })
                .with({ stock: { '-=': item.quantity } })

            LOG.info(`Estoque atualizado para produto ${product.name}`)

        }

    }

    generateProductIdentifier(req) {
        const LOG = cds.log('products')

        req.data.identifier = `PRD-${Math.floor(1000 + Math.random() * 9000)}`

        LOG.info(`Código de produto gerado: ${req.data.identifier}`)
    }

}