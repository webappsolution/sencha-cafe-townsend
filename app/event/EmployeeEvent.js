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
 * The employee event contains data and event types to perform CRUD operations on employees.
 */
Ext.define("CafeTownsend.event.EmployeeEvent", {
    extend: "SenchaExtensions.mvc.event.AbstractEvent",
    
    statics: {

        /**
         * The get employee list event type.
         */
        GET_EMPLOYEE_LIST:          "getEmployeeList",

        /**
         * The get employee list success event type.
         */
        GET_EMPLOYEE_LIST_SUCCESS:  "getEmployeeListSuccess",

        /**
         * The get employee list failure event type.
         */
        GET_EMPLOYEE_LIST_FAILURE:  "getEmployeeListFailure",

        /**
         * The get employee event type.
         */
        GET_EMPLOYEE:               "getEmployee",

        /**
         * The get employee success event type.
         */
        GET_EMPLOYEE_SUCCESS:       "getEmployeeSuccess",

        /**
         * The get employee failure event type.
         */
        GET_EMPLOYEE_FAILURE:       "getEmployeeFailure",

        /**
         * The create employee event type.
         */
        CREATE_EMPLOYEE:            "createEmployee",

        /**
         * The create employee success event type.
         */
        CREATE_EMPLOYEE_SUCCESS:    "createEmployeeSuccess",

        /**
         * The create employee failure event type.
         */
        CREATE_EMPLOYEE_FAILURE:    "createEmployeeFailure",

        /**
         * The update employee event type.
         */
        UPDATE_EMPLOYEE:            "updateEmployee",

        /**
         * The update employee success event type.
         */
        UPDATE_EMPLOYEE_SUCCESS:    "updateEmployeeSuccess",

        /**
         * The update employee failure event type.
         */
        UPDATE_EMPLOYEE_FAILURE:    "updateEmployeeFailure",

        /**
         * The delete employee event type.
         */
        DELETE_EMPLOYEE:            "deleteEmployee",

        /**
         * The delete employee success event type.
         */
        DELETE_EMPLOYEE_SUCCESS:    "deleteEmployeeSuccess",

        /**
         * The delete employee failure event type.
         */
        DELETE_EMPLOYEE_FAILURE:    "deleteEmployeeFailure"
    },

    /**
     * @property {Number} id [readOnly=false]
     * The id of an employee.
     */
    id: null,

    /**
     * @property {CafeTownsend.model.EmployeeModel} employee [readOnly=false]
     * An employee to perform CRUD actions on.
     */
    employee: null,

    /**
     * Constructor. Allows the username and password for authentication to be set on the event.
     *
     * @param {String} type The event type.
     * @param {Number} id The id of the employee the CRUD operation is acting on.
     * @param {CafeTownsend.model.EmployeeModel} employee The employee the CRUD operation is acting on.
     */
    constructor: function(type, id, employee) {
        this.callParent(arguments);

        this.id = id;
        this.employee = employee;
    }
})