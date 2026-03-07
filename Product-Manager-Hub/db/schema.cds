namespace app.products;

using {
    cuid,
    managed,
    Currency,
    sap.common.CodeList
} from '@sap/cds/common';

entity Products : cuid, managed {
    @Core.Computed
    identifier  : String(20);
    name        : String(100);
    description : String(1000);
    imageURL    : String;
    price       : Decimal(15, 2);
    currency    : Currency;
    stock       : Integer;
    category    : Association to Categories;
}

entity Categories : CodeList {
    key ID : Integer;
    @Common.Text: name  
    @Common.TextArrangement: #TextOnly
    name : String(100);
}

entity Orders : cuid, managed {
    @Core.Computed
    orderNo         : String(10); 
    customerName    : String(100);
    @Core.Computed
    totalAmount     : Decimal(15, 2) default 0;
    currency        : Currency;
    items           : Composition of many OrderItems on items.parent = $self;
}

entity OrderItems : cuid, managed {
    parent      : Association to Orders;
    product     : Association to Products;
    quantity    : Integer;
    @Core.Computed 
    itemPrice   : Decimal(15, 2);
}