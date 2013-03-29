/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The authentication service object. Contains concrete Ajax calls.
 */
Ext.define("CafeTownsend.service.AuthenticationService", {
    extend: "SenchaExtensions.mvc.service.AbstractService",

    inject: [
        "logger"
    ],

    /**
     * The login ajax service call. Hits a json service and handles the success and fault accordingly.
     *
     * @param {String} username The username being authenticated.
     * @param {String} password The password being authenticated.
     */
    authenticate: function(username, password) {
        this.logger.debug("authenticate: username = " + username + ", password = " + password);

        var deferred = Ext.create("Deft.promise.Deferred");
        var me = this;

        Ext.Ajax.request({
            url: "data/login-success.json",
//            url: "http://localhost:8080/SenchaDemo",
            method: "post",
            params: {
                j_username: username,
                j_password: password
            },

            success: function(response) {
                this.logger.debug("authenticate.success");
                me.success(response, deferred);
            },

            failure: function(response) {
                this.logger.debug("authenticate.failure");
                me.failure(response, deferred);
            }
        });

        return deferred.promise;
    },

    /**
     * The logout ajax service call. Hits a json service and handles the success and fault accordingly.
     */
    logout: function() {
        this.logger.debug("logout");

        var me = this;

        Ext.Ajax.request({
            url: "data/logout-success.json",
            method: "post",

            success: function(response) {
                this.logger.debug("logout.success");

                var response = Ext.JSON.decode(response.responseText);
                me.success(response);
            },

            failure: function(response) {
                this.logger.debug("logout.failure");
                me.failure(response);
            }
        });
    }

});

