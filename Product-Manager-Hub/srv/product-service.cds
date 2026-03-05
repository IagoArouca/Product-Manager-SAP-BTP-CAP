using { app.products as my } from '../db/schema';

service ProductService {
    @odata.draft.enabled
    entity Orders as projection on my.Orders;
    
    @readonly
    entity Products as projection on my.Products;
}