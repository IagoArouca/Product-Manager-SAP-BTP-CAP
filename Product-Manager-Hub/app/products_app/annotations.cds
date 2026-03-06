using ProductService as service from '../../srv/product-service';

annotate service.Products with @(

    UI.HeaderInfo : {
        TypeName       : 'Produto',
        TypeNamePlural : 'Produtos',
        Title          : { Value : name },
        Description    : { Value : identifier }
    },

    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data  : [

            {
                $Type : 'UI.DataField',
                Label : 'Identificador',
                Value : identifier
            },

            {
                $Type : 'UI.DataField',
                Label : 'Nome do Produto',
                Value : name
            },

            {
                $Type : 'UI.DataField',
                Label : 'Descrição',
                Value : description
            },

            {
                $Type : 'UI.DataField',
                Label : 'Preço',
                Value : price
            },

            {
                $Type : 'UI.DataField',
                Label : 'Moeda',
                Value : currency_code
            },

            {
                $Type : 'UI.DataField',
                Label : 'Estoque',
                Value : stock
            },

            {
                $Type : 'UI.DataField',
                Label : 'Categoria',
                Value : category_ID
            }

        ]
    },

    UI.FieldGroup #ProductImage : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Label : 'Imagem do Produto',
                Value : imageURL
            }
        ]
    },

    UI.Facets : [

        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'GeneralInfoFacet',
            Label  : 'Informações Gerais',
            Target : '@UI.FieldGroup#GeneralInformation'
        },

        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'ImageFacet',
            Label  : 'Imagem do Produto',
            Target : '@UI.FieldGroup#ProductImage'
        }

    ],

    UI.LineItem : [

        {
            $Type : 'UI.DataField',
            Label : 'Produto',
            Value : name
        },

        {
            $Type : 'UI.DataField',
            Label : 'Descrição',
            Value : description
        },

        {
            $Type : 'UI.DataField',
            Label : 'Preço',
            Value : price
        },

        {
            $Type : 'UI.DataField',
            Label : 'Moeda',
            Value : currency_code
        },

        {
            $Type : 'UI.DataField',
            Label : 'Estoque',
            Value : stock
        }

    ]
);