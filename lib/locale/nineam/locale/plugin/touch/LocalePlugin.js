Ext.define("nineam.locale.plugin.touch.LocalePlugin", {
    extend: 'Ext.Component',
    alias: 'plugin.localization',

    required: [
        'nineam.locale.LocaleManager',
        'nineam.locale.model.ClientModel'
    ],

    config: {
        /**
         * @cfg {String} method
         * The method to call on the client component when setting labels after a locale change.
         * This will usually by set automatically when configuring the list with this plugin.
         * @accessor
         */
        method: "",

        /**
         * @cfg {String} key The key in the locale properties file that maps to the label value.
         * This will usually by set automatically when configuring the list with this plugin.
         * @accessor
         */
        key: ""
    },

    /**
     * @override
     */
    init: function(client) {
        console.log("LocalePlugin.init: key = " + this.getKey());
        //TODO: Create client model object for client registration
        //var m = new nineam.locale.model.ClientModel({client: client, method: this.method, key: this.key});
        nineam.locale.LocaleManager.registerClient({client: client, method: this.getMethod(), key: this.getKey()});
    }
});