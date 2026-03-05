const cds = require('@sap/cds')

module.exports = class ProductService extends cds.ApplicationService {
    async init() {

        console.log("🚀 [SISTEMA]: BACKEND CARREGADO!");

        const { Products, Orders, OrderItems } = this.entities;

        // =====================================================
        // 1️⃣ GERAR NÚMERO DO PEDIDO
        // =====================================================
        this.before(['NEW', 'CREATE'], 'Orders', (req) => {

            req.data.orderNo = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

            // inicializa total
            req.data.totalAmount = 0;

        });

        // =====================================================
        // 2️⃣ PREÇO AUTOMÁTICO DO ITEM
        // =====================================================
        // 🔧 CORREÇÃO:
        // O preço deve ser definido quando o item é criado ou alterado
        // e NÃO no draftPrepare

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

        // =====================================================
        // 3️⃣ RECALCULAR TOTAL DO PEDIDO
        // =====================================================
        // 🔧 CORREÇÃO PRINCIPAL:
        // Em vez de usar draftPrepare, escutamos mudanças nos itens

        this.after(['CREATE','UPDATE','DELETE'], OrderItems.drafts, async (data, req) => {

            const orderID = data.parent_ID;

            if (!orderID) return;

            // busca itens do rascunho
            const items = await SELECT.from(OrderItems.drafts)
                .where({ parent_ID: orderID });

            let totalPedido = 0;

            for (const item of items) {

                const quantity = Number(item.quantity || 0);
                const price = Number(item.itemPrice || 0);

                totalPedido += quantity * price;

            }

            // atualiza total do pedido
            await UPDATE(Orders.drafts)
                .set({ totalAmount: totalPedido })
                .where({ ID: orderID });

            console.log("📊 [TOTAL RECALCULADO]: R$", totalPedido);

        });

        // =====================================================
        // 4️⃣ BAIXA DE ESTOQUE AO SALVAR
        // =====================================================

        this.before('SAVE', 'Orders', async (req) => {

            const items = await SELECT.from(OrderItems.drafts)
                .where({ parent_ID: req.data.ID });

            for (const item of items) {

                if (item.product_ID) {

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