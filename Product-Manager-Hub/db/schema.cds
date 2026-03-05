namespace app.products;

using {
    managed,
    Currency,
    sap.common.CodeList
} from '@sap/cds/common';

entity Products : managed {
    key ID      : UUID;
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
}

entity Orders : managed {
    key ID          : UUID;
    orderNo         : String(10); 
    customerName    : String(100);
    totalAmount     : Decimal(15, 2) default 0;
    currency        : Currency;
    items           : Composition of many OrderItems on items.parent = $self;
}

entity OrderItems : managed {
    key ID      : UUID;
    parent      : Association to Orders;
    product     : Association to Products;
    quantity    : Integer;
    @Core.Computed 
    itemPrice   : Decimal(15, 2);
}