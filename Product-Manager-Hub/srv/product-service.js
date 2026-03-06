const cds = require('@sap/cds')

module.exports = class ProductService extends cds.ApplicationService {
    async init() {

        console.log("🚀 [SISTEMA]: BACKEND CARREGADO!");

        const { Products, Orders, OrderItems } = this.entities;

        this.before(['NEW', 'CREATE'], 'Orders', (req) => {

            req.data.orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

            req.data.totalAmount = 0;

        });



        this.before(['CREATE','UPDATE'], OrderItems.drafts, async (req) => {

            if (!req.data.product_ID) return;

            const product = await SELECT.one
                .from(Products)
                .where({ ID: req.data.product_ID })
                .columns('price');

            if (product) {

                req.data.itemPrice = product.price;

            }

        });


        this.after(['CREATE','UPDATE','DELETE'], OrderItems.drafts, async (data, req) => {

            const orderID = data?.parent_ID || req.data?.parent_ID;

            if (!orderID) return;

            const items = await SELECT.from(OrderItems.drafts)
                .where({ parent_ID: orderID });

            let totalPedido = 0;

            for (const item of items) {

                const quantity = Number(item.quantity || 0);
                const price = Number(item.itemPrice || 0);

                totalPedido += quantity * price;

            }

            await UPDATE(Orders.drafts)
                .set({ totalAmount: totalPedido })
                .where({ ID: orderID });

            console.log("📊 [TOTAL RECALCULADO]: R$", totalPedido);

        });



        this.after('READ', Orders, async (orders, req) => {

            const list = Array.isArray(orders) ? orders : [orders];

            for (const order of list) {

                const items = await SELECT.from(OrderItems)
                    .where({ parent_ID: order.ID });

                let total = 0;

                for (const item of items) {

                    const quantity = Number(item.quantity || 0);
                    const price = Number(item.itemPrice || 0);

                    total += quantity * price;

                }

                order.totalAmount = total;

            }

        });


        this.before('SAVE', 'Orders', async (req) => {

            const items = await SELECT.from(OrderItems.drafts)
                .where({ parent_ID: req.data.ID });

            for (const item of items) {

                 if (!item.product_ID) {
                    req.error("Existe um item sem produto selecionado.");
                }

                if (item.product_ID) {

                     const product = await SELECT.one
                        .from(Products)
                        .where({ ID: item.product_ID })
                        .columns('stock','name');

                    if (!product) {
                        req.error(`Produto não encontrado.`);
                    }

                    if (product.stock < item.quantity) {
                        req.error(`Estoque insuficiente para o produto ${product.name}. Estoque atual: ${product.stock}`);
                    }


                    await UPDATE(Products)
                        .where({ ID: item.product_ID })
                        .with({ stock: { '-=': item.quantity } });

                }

            }

            console.log("✅ [ESTOQUE]: Atualizado com sucesso.");

        });

        await super.init();
    }
}