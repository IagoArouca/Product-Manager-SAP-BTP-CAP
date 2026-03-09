using ProductService as service from '../../srv/product-service';

annotate service.Products with @(

    UI.SelectionFields : [
        name,
        category_ID
    ],

    UI.HeaderInfo : {
        TypeName       : '{i18n>Product}',
        TypeNamePlural : '{i18n>Products}',
        Title          : { Value : name },
        Description    : { Value : identifier }
    },

    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'ProductImageHeader',
            Target: '@UI.FieldGroup#ProductImage'
        }
    ],

    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : identifier,
                @odata.fieldcontrol : #ReadOnly
            },
            { $Type : 'UI.DataField', Value : name },
            { $Type : 'UI.DataField', Value : description },
            { $Type : 'UI.DataField', Value : price },
            { $Type : 'UI.DataField', Value : currency_code, Label: 'Moeda' },
            { $Type : 'UI.DataField', Value : stock },
            { $Type : 'UI.DataField', Value : category_ID },
            { $Type : 'UI.DataField', Value : imageURL, Label: 'Imagem do Produto' }
        ]
    },

    UI.FieldGroup #ProductImage : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : imageURL,
                Label : ''
            }
        ]
    },

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'GeneralInfoFacet',
            Label  : '{i18n>GeneralInfo}',
            Target : '@UI.FieldGroup#GeneralInformation'
        }

    ],

    UI.LineItem : [
        { $Type : 'UI.DataField', Value : name },
        { $Type : 'UI.DataField', Value : description },
        { $Type : 'UI.DataField', Value : price },
        { $Type : 'UI.DataField', Value : currency_code, Label: 'Moeda' },
        { $Type : 'UI.DataField', Value : stock, Criticality : stockCriticality }
    ]
);

annotate service.Products with {
    imageURL @UI.IsImageURL: true;

    category @(
        Common.Text : category.name, 
        Common.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Categories',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : category_ID,
                    ValueListProperty : 'ID'
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name'
                }
            ]
        }
    );
};