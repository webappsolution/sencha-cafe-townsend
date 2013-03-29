Ext.define('nineam.locale.delegate.LocaleDelegate', {

    requires: [
        'Ext.Ajax'
    ],

    _success: null,
    _failure: null,
    _scope: null,

    constructor: function(success, failure, scope) {
        console.log("constructor");
        this._success = success;
        this._failure = failure;
        this._scope = scope;
    },

    loadPropertiesFile: function(url) {
        if(!this._success || !this._scope)
            return;

        console.log("loadPropertiesFile: url = " + url);

        var me = this;
        Ext.Ajax.request({
            url: url,
            method: "get",

            success: function(response) {
                me.ajaxSuccess(response);
            },

            failure: function(response) {
                me.ajaxFailure(response);
            }
        });
    },

    ajaxSuccess: function(response) {

        response = Ext.JSON.decode(response.responseText);
        var callbackFunction = this._scope[this._success];
        this._success.call(this._scope, response);
    },

    ajaxFailure: function(fault) {
        console.error("ajaxFailure: http status = " + fault.status + ", error msg = " + fault.statusText);
    }
});