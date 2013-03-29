//Ext.define('nineam.locale.store.LocalesStore', function() {
//    return {
//        extend: 'Ext.data.Store',
//
//        requires: [
//            'nineam.locale.model.LocaleModel'
//        ],
//
//        model: 'nineam.locale.model.LocaleModel',
//
//        proxy: {
//            type: 'memory',
//            reader: {
//                type: 'json',
//                root: ''
//            }
//        }
//    }
//});

Ext.define('nineam.locale.store.LocalesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'nineam.locale.model.LocaleModel'
    ],

    model: 'nineam.locale.model.LocaleModel',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: ''
        }
    }
});