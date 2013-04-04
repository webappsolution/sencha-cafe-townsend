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
Ext.define("CafeTownsend.service.mock.EmployeeServiceMock", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock service call.
     */
    getEmployeeList: function() {
        this.logger.debug("getEmployeeList");

        var response = {
            success: true,
            employeeList: [
                { id: 0,    firstName: "Tommy",   lastName: "Maintz",   phoneNumber: "508-566-6666" },
                { id: 1,    firstName: "Rob",     lastName: "Dougan",   phoneNumber: "508-566-6666" },
                { id: 2,    firstName: "Ed",      lastName: "Spencer",  phoneNumber: "508-566-6666" },
                { id: 3,    firstName: "Jamie",   lastName: "Avins",    phoneNumber: "508-566-6666" },
                { id: 4,    firstName: "Aaron",   lastName: "Conran",   phoneNumber: "508-566-6666" },
                { id: 5,    firstName: "Dave",    lastName: "Kaneda",   phoneNumber: "508-566-6666" },
                { id: 6,    firstName: "Jacky",   lastName: "Nguyen",   phoneNumber: "508-566-6666" },
                { id: 7,    firstName: "Abraham", lastName: "Elias",    phoneNumber: "508-566-6666" },
                { id: 8,    firstName: "Jay",     lastName: "Robinson", phoneNumber: "508-566-6666" },
                { id: 9,    firstName: "Nigel",   lastName: "White",    phoneNumber: "508-566-6666" },
                { id: 10,   firstName: "Don",     lastName: "Griffin",  phoneNumber: "508-566-6666" },
                { id: 11,   firstName: "Nico",    lastName: "Ferrero",  phoneNumber: "508-566-6666" },
                { id: 12,   firstName: "Jason",   lastName: "Johnston", phoneNumber: "508-566-6666" }
            ]
        };

        return this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    createEmployee: function(employee) {
        this.logger.debug("createEmployee");

        var response = {
            success: true,
            employee: {
                id: this.getRandomInt(1000, 99999),
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        response = Ext.create("CafeTownsend.model.EmployeeModel", response.employee);
        return this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    updateEmployee: function(employee) {
        this.logger.debug("updateEmployee: id = ", employee.id);

        var response = {
            success: true,
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        response = Ext.create("CafeTownsend.model.EmployeeModel", response.employee);
        return this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    deleteEmployee: function(employee) {
        this.logger.debug("deleteEmployee: id = ", employee.id);

        var response = {
            success: true,
            employee: {
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                startDate: employee.startDate
            }
        };

        response = Ext.create("CafeTownsend.model.EmployeeModel", response.employee);
        return this.delayedSuccess(response);
    }
});

