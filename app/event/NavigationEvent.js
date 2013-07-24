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
 * The authentication event contains data and event types to login/out the user.
 */
Ext.define("CafeTownsend.event.NavigationEvent", {
    extend: "FlowMVC.mvc.event.AbstractEvent",

    statics: {
        NAVIGATE:                           "navigate",

        RIGHT:                              "navigateRight",
        LEFT:                               "navigateLeft",

        ACTION_BACK_SHOW_EMPLOYEE_LIST:     "actionBackShowEmployeeList",
        ACTION_SHOW_EMPLOYEE_DETAIL:        "actionShowEmployeeDetail"
    },

    action: "",
    direction: "",

    /**
     * Constructor. Provides details on how the applicaiton should navigate and to what screen.
     *
     * @param {String} type The event type.
     * @param {String} action The string action that maps to the navigation.
     * @param {String} direction An optional direction property for navigation.
     */
    constructor: function(type, action, direction) {
        this.callParent(arguments);

        this.action = action;
        this.direction = direction;
    }
})