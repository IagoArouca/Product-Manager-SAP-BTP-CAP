const cds = require('@sap/cds')

module.exports = class ProductService extends cds.ApplicationService {
    async init() {
        const { Products, Orders, OrderItems } = this.entities;

        // 1. Número do Pedido Automático
        this.before('NEW', 'Orders', (req) => {
            req.data.orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        });

        // 2. Preço Automático ao selecionar produto ou mudar quantidade
        this.before('PATCH', 'OrderItems', async (req) => {
            const { product_ID } = req.data;
            if (!product_ID) return;

            const product = await SELECT.one.from(Products, product_ID).columns('price');
            if (product) req.data.itemPrice = product.price;
        });


        // 3. Recálculo do Total Sincronizado
        this.after('PATCH', 'OrderItems', async (data, req) => {
            const orderID = data.parent_ID || req.data.parent_ID;
            if (!orderID) return;

            const items = await SELECT.from(OrderItems).where({ parent_ID: orderID });
            const total = items.reduce((sum, i) => sum + (Number(i.quantity || 0) * Number(i.itemPrice || 0)), 0);

            await UPDATE(Orders, orderID).with({ totalAmount: total });
        });

        // 4. Baixa de Estoque Atômica (Somente na Ativação do Draft)
        this.before('draftActivate', 'Orders', async (req) => {
            const items = await SELECT.from(OrderItems).where({ parent_ID: req.data.ID });
            for (const item of items) {
                const product = await SELECT.one.from(Products, item.product_ID);
                if (product.stock < item.quantity) throw req.error(400, `Estoque insuficiente para ${product.name}`);
                
                await UPDATE(Products, item.product_ID).with({ stock: { '-=': item.quantity } });
            }
        });

        await super.init();
    }
}