using {CapFeTsSampleService} from '../../srv/cap-fe-ts-sample-service.cds';

annotate CapFeTsSampleService.Samples with @(
    Common.Label: '{i18n>samples}',
    Capabilities : {
        FilterRestrictions : {
            FilterExpressionRestrictions : [{
                Property           : createdAt,
                AllowedExpressions : 'SingleRange'
            },{
                Property           : modifiedAt,
                AllowedExpressions : 'SingleRange'
            }]
        }
    },
    UI.SelectionFields : [
        name
    ],
    UI.LineItem : {
        $value : [
            {
                $Type  : 'UI.DataField',
                Value : name,
                ![@UI.Importance] : #High
            },{
                $Type  : 'UI.DataField',
                Value : createdBy
            },{
                $Type  : 'UI.DataField',
                Value : createdAt
            },{
                $Type  : 'UI.DataField',
                Value : modifiedBy
            },{
                $Type  : 'UI.DataField',
                Value : modifiedAt
            }
        ]
    },
    UI.HeaderInfo : {
        $Type          : 'UI.HeaderInfoType',
        TypeName       : '{i18n>sample}',
        TypeNamePlural : '{i18n>samples}',
        Title          : {Value : name}
    },
) {
    ID              @UI.Hidden : true;
    createdAt       @UI.HiddenFilter : false;
    createdBy       @UI.HiddenFilter : false;
    modifiedBy      @UI.HiddenFilter : false;
    modifiedAt      @UI.HiddenFilter : false;
}