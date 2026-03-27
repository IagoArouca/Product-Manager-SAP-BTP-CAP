// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../_')
// service
const ProductService = { name: 'ProductService' }
module.exports = ProductService
module.exports.ProductService = ProductService
// Orders
module.exports.Order = createEntityProxy(['ProductService', 'Orders'], { target: { is_singular: true } })
module.exports.Orders = createEntityProxy(['ProductService', 'Orders'], { target: { is_singular: false }})
// OrderItems
module.exports.OrderItem = createEntityProxy(['ProductService', 'OrderItems'], { target: { is_singular: true } })
module.exports.OrderItems = createEntityProxy(['ProductService', 'OrderItems'], { target: { is_singular: false }})
// Products
module.exports.Product = createEntityProxy(['ProductService', 'Products'], { target: { is_singular: true } })
module.exports.Products = createEntityProxy(['ProductService', 'Products'], { target: { is_singular: false }})
// Categories
module.exports.Category = createEntityProxy(['ProductService', 'Categories'], { target: { is_singular: true } })
module.exports.Categories = createEntityProxy(['ProductService', 'Categories'], { target: { is_singular: false }})
// Customers
module.exports.Customer = createEntityProxy(['ProductService', 'Customers'], { target: { is_singular: true } })
module.exports.Customers = createEntityProxy(['ProductService', 'Customers'], { target: { is_singular: false }})
// Currencies
module.exports.Currency = createEntityProxy(['ProductService', 'Currencies'], { target: { is_singular: true } })
module.exports.Currencies = createEntityProxy(['ProductService', 'Currencies'], { target: { is_singular: false }})
// Categories.texts
module.exports.Categories.text = createEntityProxy(['ProductService', 'Categories.texts'], { target: { is_singular: true } })
module.exports.Categories.texts = createEntityProxy(['ProductService', 'Categories.texts'], { target: { is_singular: false }})
// Currencies.texts
module.exports.Currencies.text = createEntityProxy(['ProductService', 'Currencies.texts'], { target: { is_singular: true } })
module.exports.Currencies.texts = createEntityProxy(['ProductService', 'Currencies.texts'], { target: { is_singular: false }})
// events
// actions
// enums
