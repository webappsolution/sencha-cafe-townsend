//Ext.define('nineam.locale.model.LocaleModel', function() {
//    return {
//        extend: 'Ext.data.Model',
//
//        fields: [
//            {name: 'id', type: 'string'},
//            {name: 'label', type: 'string'},
//            {name: 'url', type: 'string'}
//        ]
//    }
//});

Ext.define('nineam.locale.model.LocaleModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'url', type: 'string'}
    ]
});