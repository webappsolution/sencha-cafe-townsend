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
 * The mock authentication service object.
 */
Ext.define("CafeTownsend.service.mock.AuthenticationServiceMock", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock login service call.
     *
     * @param {String} username The username being authenticated.
     * @param {String} password The password being authenticated.
     */
    authenticate: function(username, password) {
        this.logger.debug("authenticate: username = " + username + ", password = " + password);

        if(
	        (password == "password") ||
		    (password == "flowmvc") ||
            (password == "deftjs") ||
		    (password == "a") ||
            (password == "qwerty")
            ) {

            var response = {
                success: true,
                sessionToken: "qwerty1234567890",
                user: {
                    firstName:"John",
                    lastName:"Doe"
                }
            };

            return this.delayedSuccess(response);
        }
        else {

            var response = {
                success: false
            };

            return this.delayedFailure(response);
        }
    },

    /**
     * The mock logout service call.
     */
    logout: function() {
        this.logger.debug("logout");

        var response = {
            success: true
        };

        return this.delayedSuccess(response, 0);
    }
});

