using ProductService as service from './product-service';

annotate service.Orders with @(

    UI.SelectionFields : [
        orderNo,
        customerName
    ],

    UI.HeaderInfo : {
        TypeName       : '{i18n>Order}',
        TypeNamePlural : '{i18n>Orders}',
        Title          : { $Type : 'UI.DataField', Value : orderNo },
        Description    : { $Type : 'UI.DataField', Value : customerName }
    },

    UI.LineItem : [
        { Value : orderNo },
        { Value : customerName },
        { Value : totalAmount },
        { Value : currency_code, Label: 'Moeda' }
    ],

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>GeneralInfo}',
            Target : '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>OrderItems}',
            Target : 'items/@UI.LineItem'
        }
    ],

    UI.FieldGroup #GeneralInfo : {
        Data : [
            { Value : orderNo },
            { Value : customerName },
            { Value : totalAmount },
            { Value : currency_code }
        ]
    }
);

annotate service.OrderItems @Common.SideEffects : {
    SourceProperties : [ product_ID, quantity ],
    TargetProperties : [ itemPrice, 'parent/totalAmount' ],
    TargetEntities   : [ 'parent' ]
};

annotate service.OrderItems with @(
    UI.LineItem : [
        { Value : product_ID },
        { Value : quantity },
        { Value : itemPrice }
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