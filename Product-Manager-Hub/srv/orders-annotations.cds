using ProductService as service from './product-service';

annotate service.OrderItems @Common.SideEffects #ItemChanged : {
    SourceProperties : [ product_ID, quantity],
    TargetProperties : [ 'itemPrice', 'parent/totalAmount']
};

annotate service.OrderItems with {
    product @(
        Common.ValueListWithFixedValues: false,
        Common.ValueList: {
            CollectionPath: 'Products',
            Parameters: [
                { $Type: 'Common.ValueListParameterInOut', LocalDataProperty: product_ID, ValueListProperty: 'ID' },
                { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'name' },
                { $Type: 'Common.ValueListParameterDisplayOnly', ValueListProperty: 'price' }
            ]
        }
    )
};