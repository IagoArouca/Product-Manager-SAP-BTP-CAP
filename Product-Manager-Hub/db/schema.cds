namespace app.products;

using {
    cuid,
    managed,
    Currency,
    sap.common.CodeList
} from '@sap/cds/common';

entity Products : cuid, managed {
    @Core.Computed
    @title: '{i18n>Identifier}'
    identifier  : String(20);

    @title: '{i18n>Name}'
    name        : String(100);

    @title: '{i18n>Description}'
    description : String(1000);

    @title: '{i18n>ProductImage}'
    imageURL    : String;

    @title: '{i18n>Price}'
    price       : Decimal(15, 2);

    @title: '{i18n>Currency}'
    currency    : Currency;

    @title: '{i18n>Stock}'
    stock       : Integer;

    @title: '{i18n>Category}'
    category    : Association to Categories;
}

entity Categories : CodeList {
    key ID : Integer;
    @Common.Text: name  
    @Common.TextArrangement: #TextOnly
    @title: '{i18n>Name}'
    name : String(100);
}

entity Orders : cuid, managed {
    @Core.Computed
    @title: '{i18n>OrderNumber}'
    orderNo         : String(10); 

    @title: '{i18n>Customer}'
    customerName    : Association to Customers;

    @Core.Computed
    @title: '{i18n>TotalAmount}'
    totalAmount     : Decimal(15, 2) default 0;

    @title: '{i18n>Currency}'
    currency        : Currency;

    @title: '{i18n>Status}'
    @readonly
    status          : String(20) default 'Aberto'; 

    @title: '{i18n>OrderItems}'
    items           : Composition of many OrderItems on items.parent = $self;
    
}

extend entity Orders with actions {
    action finalizeOrder();
};

entity OrderItems : cuid, managed {
    parent      : Association to Orders;

    @title: '{i18n>Product}'
    product     : Association to Products;

    @title: '{i18n>Quantity}'
    quantity    : Integer;

    @Core.Computed 
    @title: '{i18n>UnitPrice}'
    itemPrice   : Decimal(15, 2);
}

entity Customers : cuid, managed {
    @title: '{i18n>Name}'
    @Common.FieldControl: #Mandatory
    name  : String(100);

    @title: '{i18n>CPF}'
    @Common.FieldControl: #Mandatory
    @assert.format: '^\d{3}\.\d{3}\.\d{3}-\d{2}$'
    cpf   : String(14); 

    @title: '{i18n>Email}'
    @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email : String(100);
}