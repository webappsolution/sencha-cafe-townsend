Ext.define('"nineam.locale.plugin.extjs.LocalePlugin"', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.localization',

    required: [
        'nineam.locale.LocaleManager',
        'nineam.locale.model.ClientModel'
    ],

    // these get overridden each time the plugins client is configured
    method: '',
    key: '',

    /**
     * @override
     */
    init: function(client) {
        //TODO: Create client model object for client registration
        //var m = new nineam.locale.model.ClientModel({client: client, method: this.method, key: this.key});
        nineam.locale.LocaleManager.registerClient({client: client, method: this.method, key: this.key});
    }
});