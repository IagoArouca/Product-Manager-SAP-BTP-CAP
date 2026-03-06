using { app.products as my } from '../db/schema';

service ProductService {
    
    @odata.draft.enabled
    entity Orders as projection on my.Orders;


    entity OrderItems as projection on my.OrderItems;

    @readonly
    entity Products as projection on my.Products;
    
    @readonly
    entity Categories as projection on my.Categories;
}