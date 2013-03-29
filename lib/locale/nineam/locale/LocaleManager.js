Ext.define('nineam.locale.LocaleManager', {
    singleton: true,

    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: [
        'nineam.locale.event.LocaleEvent',
        'nineam.locale.delegate.LocaleDelegate',
//        "Ext.util.Cookies" // // TODO: no cookies in Touch so maybe local storage?
    ],

    initialized: false,

    _locales: null,

    _locale: null,

    _properties: null,

    _clients: [],

    /**
     * Constructs a new LocaleManager instance
     */
    constructor: function(config) {
        this.initConfig(config);

        this.mixins.observable.constructor.call(this, config);
    },

    /**
     * Load properties file for localizing components
     */
    loadPropertiesFile: function() {
        var d = Ext.create("nineam.locale.delegate.LocaleDelegate", this.loadPropertiesFileResultHandler, this.loadPropertiesFileFaultHandler, this);
        var rec = this._locales.findRecord('id', this._locale);
        d.loadPropertiesFile(rec.get('url'));
    },

    /**
     * Load localization properties file result handler
     *
     * @param result:Object
     */
    loadPropertiesFileResultHandler: function(result) {
        this._properties = result;

        this.updateClients();

        // TODO: no cookies in Touch so maybe local storage?
//        Ext.util.Cookies.set('locale', this._locale, new Date(new Date().getTime()+(1000*60*60*24*365)));

        this.fireEvent(nineam.locale.event.LocaleEvent.LOCALE_CHANGED, {});

        if(!this.initialized)
        {
            this.initialized = true;
            this.fireEvent(nineam.locale.event.LocaleEvent.INITIALIZED, {});
        }
    },

    /**
     * Load localization properties file fault handler
     *
     * TODO
     */
    loadPropertiesFileFaultHandler: function() {
        //dispatch fault event
    },

    /**
     * Go over and update all localized components in the application
     */
    updateClients: function() {
        var client;
        var len = this._clients.length;
        console.log("LocaleManager.updateClients: " + len);
        for(var i=0; i<len; i++) {
            client = this._clients[i];
            this.setClient(client);
        }
    },

    /**
     * Call specify method on client object and pass value from _properties based on key
     *
     * @param {Object} clientModel
     */
    setClient: function(clientModel) {
        try {
            console.log("LocaleManager.setClient: " + clientModel.key);
            if(typeof clientModel.client[clientModel.method] == "function") {
                clientModel.client[clientModel.method].call(clientModel.client, this.getProperty(clientModel.key));
            }
            else if(typeof clientModel.client[clientModel.method] != null) {
                clientModel.client[clientModel.method] = this.getProperty(clientModel.key);
            } else {
                console.warn("LocaleManager.setClient: " + clientModel.method + " is not a method or property on the client object.");
            }
        } catch(e) {
            console.error(e);
        }
    },

    /**
     * Get store of available locales
     *
     * @return {nineam.locale.store.LocalesStore}
     */
    getLocales: function() {
        return this._locales;
    },

    /**
     * Set store of available locales
     *
     * @param value:nineam.locale.store.LocalesStore
     */
    setLocales: function(value) {
        this._locales = value;

        this.fireEvent(nineam.locale.event.LocaleEvent.LOCALES_CHANGED, {});
    },

    /**
     * Get the currently selected locale
     *
     * @return {string}
     */
    getLocale: function() {
        return this._locale;
    },

    /**
     * Set the current locale
     *
     * @param value:String
     */
    setLocale: function(value) {
        this._locale = value;

//        loadPropertiesFile.call(this);
        this.loadPropertiesFile();
    },

    /**
     * Get loaded locales object
     *
     * @return {{}}
     */
    getProperties: function() {
        return this._properties;
    },

    /**
     * Get loaded locales object
     *
     * @return {{}}
     */
    getProperty: function(key) {
        var value = eval('this._properties.' + key);
        console.log("getProperty: " + key + " = " + value);
        return value;
    },

    /**
     * Get id of last loaded locale
     * @return {string}
     */
    getPersistedLocale: function() {
        // TODO: no cookies in Touch so maybe local storage?
//        return Ext.util.Cookies.get('locale');
        return null;
    },

    /**
     * Register a client component for localization
     *
     * @param {Object} clientModel
     */
    //TODO: Create nineam.model.ClientModel
    registerClient: function(clientModel) {
        console.log("LocaleManager.registerClient");
        this._clients.push(clientModel);

        if(this._properties)
            this.setClient(clientModel);
    }
});