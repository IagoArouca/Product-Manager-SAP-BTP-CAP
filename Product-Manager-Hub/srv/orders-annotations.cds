using ProductService as service from './product-service';

annotate service.Orders with @(
    UI.HeaderInfo : {
        TypeName       : 'Pedido',
        TypeNamePlural : 'Pedidos',
        Title          : { $Type : 'UI.DataField', Value : orderNo },
        Description    : { $Type : 'UI.DataField', Value : customerName }
    },
    UI.LineItem : [
        { Value : orderNo, Label : 'Número do Pedido' },
        { Value : customerName, Label : 'Cliente' },
        { Value : totalAmount, Label : 'Valor Total' },
        { Value : currency_code, Label : 'Moeda' }
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Informações Gerais',
            Target : '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Itens do Pedido',
            Target : 'items/@UI.LineItem'
        }
    ],
    UI.FieldGroup #GeneralInfo : {
        Data : [
            { Value : orderNo, Label : 'Número do Pedido' },
            { Value : customerName, Label : 'Cliente' },
            { Value : totalAmount, Label : 'Valor Total' },
            { Value : currency_code, Label : 'Moeda' }
        ]
    }
);


annotate service.Orders with {
    orderNo     @Core.Computed;
    totalAmount @Core.Computed;
};

annotate service.OrderItems with {
    itemPrice   @Core.Computed;
};


annotate service.OrderItems @Common.SideEffects : {
    SourceProperties : [ product_ID, quantity ],
    TargetProperties : [ itemPrice, 'parent/totalAmount' ],
    TargetEntities   : [ 'parent' ]
};

annotate service.OrderItems with @(
    UI.LineItem : [
        { Value : product_ID, Label : 'Produto' },
        { Value : quantity, Label : 'Quantidade' },
        { Value : itemPrice, Label : 'Preço Unitário' }
    ]
);


annotate service.OrderItems with {
    product @(
        Common.Text : product.name,
        Common.ValueList : {
            CollectionPath : 'Products',
            Parameters : [
                { $Type : 'Common.ValueListParameterInOut', LocalDataProperty : product_ID, ValueListProperty : 'ID' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'name' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'price' }
            ]
        }
    )
};