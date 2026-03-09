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
        Description    : { $Type : 'UI.DataField', Value : customerName.name }
    },

    UI.LineItem : [
        { Value : orderNo },
        { Value : customerName_ID },
        { Value : totalAmount },
        { 
            Value : status,
            Label: 'Status',
            Criticality : statusCriticality,
            CriticalityRepresentation : #WithIcon
         }, 
        { Value : currency_code, Label: 'Moeda' }
    ],

    UI.Identification : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'ProductService.finalizeOrder',
            Label  : 'Finalizar Pedido',
            Determining : true,
            Criticality : #Positive
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'ProductService.cancelFinalization',
            Label  : 'Cancelar Finalização',
            Determining : true,
            Criticality : #Negative
        }
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
            { Value : customerName_ID },
            { Value : totalAmount },
            { Value : status },
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
        { 
            Value : product.stock, @Common.FieldControl : #ReadOnly, 
            Criticality : product.stockCriticality, 
            Label : 'Estoque Disponível'
        },
        { Value : quantity },
        { Value : itemPrice }
    ]
);

annotate service.OrderItems with {
    product @(
        Common.Text : product.name,
        Common.TextArrangement : #TextOnly,
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



annotate service.Orders with {
    customerName  @(
        Common.ValueListWithFixedValues : false,
        Common.Text : customerName.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Customers',
            Parameters : [
                { $Type : 'Common.ValueListParameterInOut', LocalDataProperty : customerName_ID, ValueListProperty : 'ID' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'name' },
                { $Type : 'Common.ValueListParameterDisplayOnly', ValueListProperty : 'cpf' }
            ]
        }
    );
};

annotate service.Orders with @(
    Capabilities.UpdateRestrictions : {
        Updatable : {$edmJson: {$Ne: [{$Path: 'status'}, 'Finalizado']}}
    }
);

annotate service.Orders with actions {
    finalizeOrder @(
        Common.SideEffects : {
            TargetProperties : ['status'],
            TargetEntities   : ['items', 'items/product']
        }
    );
};

annotate service.Orders actions {
    finalizeOrder @Core.OperationAvailable : {$edmJson: {$Ne: [{$Path: 'status'}, 'Finalizado']}}
};

annotate service.Orders with actions {
    cancelFinalization @(
        Common.SideEffects : {
            TargetProperties : ['status'],
            TargetEntities   : ['items', 'items/product']
        }
    );
};

annotate service.Orders actions {
    cancelFinalization @Core.OperationAvailable : {$edmJson: {$Eq: [{$Path: 'status'}, 'Finalizado']}}
};