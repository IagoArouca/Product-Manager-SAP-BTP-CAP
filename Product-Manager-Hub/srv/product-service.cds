using { app.products as my } from '../db/schema';

@path: '/odata/v4/ProductService'
service ProductService @(requires: 'authenticated-user') {
    
    @odata.draft.enabled
    entity Orders as projection on my.Orders
      actions {
            action finalizeOrder();
            action cancelFinalization();
        };


    entity OrderItems as projection on my.OrderItems;
   

    @odata.draft.enabled
    entity Products as projection on my.Products;
    annotate Products with @(restrict: [
        { grant: ['READ'], to: 'authenticated-user' }, 
        { grant: ['*'],    to: 'admin' }               
    ]);
    
    @readonly
    entity Categories as projection on my.Categories;

    @odata.draft.enabled
    entity Customers as projection on my.Customers;
}