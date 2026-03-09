Product Manager Hub 🚀
Bem-vindo ao Product Manager Hub, um ecossistema de gestão de vendas e estoque desenvolvido com o SAP Cloud Application Programming Model (CAP). Este projeto simula um cenário real de ERP, focando em integridade de dados, automação de processos e experiência do usuário (UX) via Fiori Elements.

📋 Sobre o Projeto
O sistema foi desenhado para resolver problemas críticos de sincronização entre vendas e estoque. Diferente de sistemas simples, aqui a baixa de estoque não ocorre no salvamento do rascunho, mas sim através de uma Action vinculada (Bound Action) que valida a disponibilidade real antes de efetivar a transação.

Principais Funcionalidades:
Gestão de Pedidos: Criação de pedidos com numeração automática e cálculo de totais em tempo real.

Fluxo de Status: Pedidos nascem como Aberto e só podem ser editados enquanto não finalizados.

Baixa de Estoque Inteligente: Implementação de uma Action personalizada (finalizeOrder) que subtrai itens do estoque e bloqueia o pedido para edições futuras.

Interface Fiori Elements: Uso extensivo de anotações CDS para criar uma experiência de usuário rica, com Value Helps (Lupas), Side Effects e Criticality (Cores dinâmicas).

Segurança de Dados: Bloqueio de alterações manuais em campos sensíveis (como Status) via API externa, garantindo que as regras de negócio sejam respeitadas.

🛠️ Tecnologias Utilizadas
Runtime: Node.js

Framework: SAP CAP (Cloud Application Programming Model)

Banco de Dados: SQLite (Desenvolvimento) / Preparado para SAP HANA

Frontend: SAP Fiori Elements

Linguagem: CDS (Core Data Services) e JavaScript

🏗️ Estrutura do Projeto
O projeto segue a estrutura padrão do SAP CAP:

db/: Definições de schema, entidades (Products, Orders, Customers) e lógica de persistência.

srv/: Implementação dos serviços, logicamente separados e protegidos por permissões.

app/: Aplicativos Fiori voltados para o usuário final.

🚀 Como Executar Localmente
Clone o repositório:

Bash
git clone https://github.com/seu-usuario/product-manager-hub.git
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
cds watch
Acesse as aplicações:
O servidor iniciará em http://localhost:4004. Lá você encontrará os links para os apps de Pedidos, Produtos e Clientes.

💡 Destaques Técnicos
Lógica de Criticality (Cores)
Implementamos uma lógica de cores baseada em campos calculados diretamente no banco de dados (via CDS), garantindo performance e facilidade visual:

Estoque: Verde (>20), Amarelo (>5) e Vermelho (Crítico).

Status: Diferenciação visual entre pedidos Abertos e Finalizados.

Proteção de Integridade
O sistema conta com um interceptor (this.before) que impede que o status do pedido seja alterado via ferramentas externas (como Insomnia), forçando o uso do fluxo de negócio correto.

Desenvolvido por Iago – Desenvolvedor SAP CAP
Sinta-se à vontade para entrar em contato via LinkedIn!