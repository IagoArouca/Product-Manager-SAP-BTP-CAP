using ProductService as service from '../../srv/product-service';
annotate service.Products with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Identificador',
                Value : identifier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Nome do Produto',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Descrição',
                Value : description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Imagem',
                Value : imageURL,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Preço',
                Value : price,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Moeda',
                Value : currency_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Estoque',
                Value : stock,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Categoria',
                Value : category_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Identificador',
            Value : identifier,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Produto',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Descrição',
            Value : description,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Imagem',
            Value : imageURL,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Preço',
            Value : price,
        },
    ],
);

