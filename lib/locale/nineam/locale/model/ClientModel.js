//Ext.define('nineam.locale.model.ClientModel', function() {
//   return {
//       extend: 'Ext.data.Model',
//
//       fields: [
//           {name: 'client', type: 'object'},
//           {name: 'method', type: 'string'},
//           {name: 'key', type: 'string'}
//       ]
//   }
//});

Ext.define('nineam.locale.model.ClientModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'client', type: 'object'},
        {name: 'method', type: 'string'},
        {name: 'key', type: 'string'}
    ]
});