using ProductService as service from '../srv/product-service';

annotate service.Customers with @(

    UI.SelectionFields : [
        name,
        cpf,
        email
    ],

    UI.HeaderInfo : {
        TypeName       : '{i18n>Customer}',
        TypeNamePlural : '{i18n>Customers}',
        Title          : { Value : name },
        Description    : { Value : cpf }
    },

    UI.LineItem : [
        { Value : name },
        { Value : cpf },
        { Value : email }
    ],

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>GeneralInfo}',
            Target : '@UI.FieldGroup#CustomerDetails'
        }
    ],

    UI.FieldGroup #CustomerDetails : {
        Data : [
            { Value : name },
            { Value : cpf },
            { Value : email }
        ]
    }
);

