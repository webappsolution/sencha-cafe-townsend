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
 * The EmployeeController acts as the command with asynchronous callback methods for successful
 * and failed employee service calls.eError: "undefined" is not a function(evaluating "controller.getStores()")
 */
Ext.define("CafeTownsend.controller.EmployeeController", {
    extend: "SenchaExtensions.mvc.controller.AbstractController",

    requires: [
        "CafeTownsend.event.EmployeeEvent",
        "SenchaExtensions.mvc.service.rpc.Responder"
    ],

    inject: [
        "employeeService",
        "employeeStore",
        "logger"
    ],

//    config: {
//
//        /**
//         * @cfg {Object} employeeService The injected employee service from DeftJS.
//         * @accessor
//         */
//        employeeService: null,
//
//        /**
//         * @cfg {Object} employeeStore The injected employee store from DeftJS.
//         * @accessor
//         */
//        employeeStore: null
//    },

    /**
     * @event CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS
     * Fired when the get employee service is successful.
     */

    /**
     * @event CafeTownsend.event.AuthenticationEvent.GET_EMPLOYEE_LIST_FAILURE
     * Fired when the get employee service fails.
     */

    /**
     * Sets up global event bus handlers.
     * @protected
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST, this.onGetEmployeeList, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE, this.onCreateEmployee, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE, this.onUpdateEmployee, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE, this.onDeleteEmployee, this);
    },

    /**
     * Performs get employees by using the referenced service and sets up the service success and failure
     * callback handlers.
     */
    getEmployeeList: function() {
        this.logger.debug("getEmployeeList");

        this.executeServiceCall(this.employeeService, this.employeeService.getEmployeeList, null, this.getEmployeeListSuccess, this.getEmployeeListFailure, this);
    },

    /**
     * Performs create employee by using the referenced service and sets up the service success and failure
     * callback handlers.
     *
     * @param {CafeTownsend.model.EmployeeModel} employee The employee to create.
     */
    createEmployee: function(employee) {
        this.logger.debug("createEmployee");

        this.executeServiceCall(this.employeeService, this.employeeService.createEmployee, [employee], this.createEmployeeSuccess, this.createEmployeeFailure, this);
    },

    /**
     * Performs update employee by using the referenced service and sets up the service success and failure
     * callback handlers.
     *
     * @param {CafeTownsend.model.EmployeeModel} employee The employee to update.
     */
    updateEmployee: function(employee) {
        this.logger.debug("updateEmployee");

        this.executeServiceCall(this.employeeService, this.employeeService.updateEmployee, [employee], this.updateEmployeeSuccess, this.updateEmployeeFailure, this);
    },

    /**
     * Performs delete employee by using the referenced service and sets up the service success and failure
     * callback handlers.
     *
     * @param {CafeTownsend.model.EmployeeModel} employee The employee to delete.
     */
    deleteEmployee: function(employee) {
        this.logger.debug("deleteEmployee");

        this.executeServiceCall(this.employeeService, this.employeeService.deleteEmployee, [employee], this.deleteEmployeeSuccess, this.deleteEmployeeFailure, this);
    },

    ////////////////////////////////////////////////
    // SERVICE SUCCESS/FAULT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the successful get employees service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the successful service call.
     */
    getEmployeeListSuccess: function(response) {
        this.logger.info("getEmployeeListSuccess");

        this.employeeStore.setData(response.employeeList);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed get employees service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the failed service call.
     */
    getEmployeeListFailure: function(response) {
        this.logger.warn("getEmployeeListFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful create employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the successful service call.
     */
    createEmployeeSuccess: function(response) {
        this.logger.info("createEmployeeSuccess");

        this.employeeStore.add(response);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed create employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the failed service call.
     */
    createEmployeeFailure: function(response) {
        this.logger.warn("createEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_FAILURE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful update employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the successful service call.
     */
    updateEmployeeSuccess: function(response) {
        this.logger.info("updateEmployeeSuccess");

        this.employeeStore.update(response);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed update employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the failed service call.
     */
    updateEmployeeFailure: function(response) {
        this.logger.warn("updateEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_FAILURE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the successful delete employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding success event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the successful service call.
     */
    deleteEmployeeSuccess: function(response) {
        this.logger.info("deleteEmployeeSuccess");

        var employee = this.employeeStore.findRecord("id", response.data.id);
        this.employeeStore.remove(employee);

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the failed delete employee service call and takes the response data packet as a parameter.
     * Fires off the corresponding failure event on the application-level event bus.
     *
     * @param {Object} response The response data packet from the failed service call.
     */
    deleteEmployeeFailure: function(response) {
        this.logger.warn("deleteEmployeeFailure");

        var evt = new CafeTownsend.event.EmployeeEvent(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_FAILURE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the get employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param {CafeTownsend.event.EmployeeEvent} event Reference to the employee event.
     */
    onGetEmployeeList: function(event) {
        this.logger.debug("onGetEmployeeList");

        this.getEmployeeList();
    },

    /**
     * Handles the create employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param {CafeTownsend.event.EmployeeEvent} event Reference to the employee event. Contains a reference to the
     * employee.
     */
    onCreateEmployee: function(event) {
        this.logger.debug("onCreateEmployee");

        this.createEmployee(event.employee);
    },

    /**
     * Handles the update employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param {CafeTownsend.event.EmployeeEvent} event Reference to the employee event. Contains a reference to the
     * employee.
     */
    onUpdateEmployee: function(event) {
        this.logger.debug("onUpdateEmployee");

        this.updateEmployee(event.employee);
    },

    /**
     * Handles the delete employee event on the application-level event bus. Calls a functional method that's more
     * testable than this event handler.
     *
     * @param {CafeTownsend.event.EmployeeEvent} event Reference to the employee event. Contains a reference to the
     * employee.
     */
    onDeleteEmployee: function(event) {
        this.logger.debug("onDeleteEmployee");

        this.deleteEmployee(event.employee);
    }

});

