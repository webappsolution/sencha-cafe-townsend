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
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("CafeTownsend.mediator.extjs.EmployeeListMediator", {
    extend: "CafeTownsend.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.EmployeeEvent"
    ],

    inject: [
        "employeeStore",
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
        logoutButton: {
            click: "onLogoutButtonClick"
        },
        newEmployeeButton: {
            click: "onNewEmployeeButtonClick"
        },
        list: {
            itemclick: "onListSelect"
        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);

        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_SUCCESS, this.onGetEmployeeListSuccess, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST_FAILURE, this.onGetEmployeeListFailure, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.UPDATE_EMPLOYEE_SUCCESS, this.onGetEmployeeListSuccess, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.DELETE_EMPLOYEE_SUCCESS, this.onDeleteEmployeeSuccess, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.EmployeeEvent.CREATE_EMPLOYEE_SUCCESS, this.onCreateEmployeeSuccess, this);
    },

    /**
     * Dispatches the application event to get the list of employees.
     */
    getEmployeeListData: function() {
        this.logger.debug("getEmployeeListData");

        this.getView().setLoading(nineam.locale.LocaleManager.getProperty("employeeList.loading"));

        var evt = Ext.create("CafeTownsend.event.EmployeeEvent", CafeTownsend.event.EmployeeEvent.GET_EMPLOYEE_LIST);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the show employee detail event from the employee list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the list currently selected.
     */
    showEmployeeDetail: function(record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", employee = " + record.get("firstName")
            : "";
        this.logger.debug("showEmployeeDetail = ", logMsg);

        this.employeeStore.setSelectedRecord(record);
        this.navigate(CafeTownsend.event.NavigationEvent.ACTION_SHOW_EMPLOYEE_DETAIL);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success application-level event. Slide the employee list view
     * onto stage.
     */
    onLoginSuccess: function() {
        this.logger.debug("onLoginSuccess");

        this.navigate(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS);
        this.getEmployeeListData();
    },

    /**
     * Handles the get employees application-level event.
     */
    onGetEmployeeListSuccess: function() {
        this.logger.debug("onGetEmployeeListSuccess");

        this.getView().setLoading(false);
        this.getList().getStore().loadRecords(this.employeeStore.getRange());
    },

    /**
     * Handles the get employees failure event from the login controller.
     */
    onGetEmployeeListFailure: function() {
        this.logger.debug("onGetEmployeeListFailure");

        this.getView().setLoading(false);
    },

    /**
     * Handles the delete of an employee by refreshing the grid
     * Touch takes care of this for you, not so ext
     */
    onDeleteEmployeeSuccess: function() {
        this.logger.debug("onDeleteEmployeeSuccess");
        this.getList().getStore().loadRecords(this.employeeStore.getRange());
    },

    /**
     * Handles teh add of an employee by refreshing the grid
     * Touch takes care of this for you, not so ext
     */
    onCreateEmployeeSuccess: function() {
        this.logger.debug("onCreateEmployeeSuccess");
        this.getList().getStore().loadRecords(this.employeeStore.getRange());
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the tap of the logout button. Dispatches the logout application-level event.
     */
    onLogoutButtonClick: function() {
        this.logger.debug("onLogoutButtonClick");

        var evt = Ext.create("CafeTownsend.event.AuthenticationEvent", CafeTownsend.event.AuthenticationEvent.LOGOUT);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the tap of the new employee button. Shows the employee detail view.
     */
    onNewEmployeeButtonClick: function() {
        this.logger.debug("onNewEmployeeButtonClick");

        this.showEmployeeDetail(null);
    },

    /**
     * Handles the list disclose of an employee list item. Shows the employee detail view passing in a reference to
     * the selected item in the list.
     *
     * @param {Ext.dataview.List} list  Reference to the visual list component.
     * @param {Object/Ext.data.Model} record Reference to the selected item in the list.
     * @param {Number} index The index of the selected item.
     * @param {Object} options ???
     */
    onListSelect: function(list, record, index, options) {
        this.logger.debug("onListSelect");

        this.showEmployeeDetail(record);
    }

    /**
     * Handles the clear icon tap event on the search field. Clears all filter on the list's store.
     */
//    onSearchClearIconTap: function() {
//        this.logger.debug("onSearchClearIconTap");
//
//        var store = this.getView().getStore();
//        store.clearFilter();
//    },

    /**
     * Handles the key up event on the search field. Filters the list component's store by the value in the
     * search field and determining if it matches the first or last name elements of each record in the list.
     *
     * @param {Ext.field.Search} field Reference to the search field.
     *
     * TODO: BMR: 02/28/13: clean this up. pulled directly from another example with minor changes: http://www.phs4j.com/2012/05/add-a-searchfield-to-a-sencha-touch-2-list-mvc/
     */
//    onSearchKeyUp: function(field) {
//        this.logger.debug("onSearchKeyUp");
//
//        //get the store and the value of the field
//        var value = field.getValue();
//        var store = this.getView().getStore();
//
//        //first clear any current filters on the store
//        store.clearFilter();
//
//        //check if a value is set first, as if it isn't we don't have to do anything
//        if (value) {
//            //the user could have entered spaces, so we must split them so we can loop through them all
//            var searches = value.split(' '),
//                regexps = [],
//                i;
//
//
//            //loop them all
//            for (i = 0; i < searches.length; i++) {
//                //if it is nothing, continue
//                if (!searches[i]) continue;
//
//
//                //if found, create a new regular expression which is case insenstive
//                regexps.push(new RegExp(searches[i], "i"));
//            }
//
//
//            //now filter the store by passing a method
//            //the passed method will be called for each record in the store
//            store.filter(function(record) {
//                var matched = [];
//
//
//                //loop through each of the regular expressions
//                for (i = 0; i < regexps.length; i++) {
//                    var search = regexps[i],
//                        didMatch = record.get("firstName").match(search) ||
//                            record.get("lastName").match(search);
//
//
//                    //if it matched the first or last name, push it into the matches array
//                    matched.push(didMatch);
//                }
//
//
//                //if nothing was found, return false (dont so in the store)
//                if (regexps.length > 1 && matched.indexOf(false) != -1) {
//                    return false;
//                } else {
//                    //else true true (show in the store)
//                    return matched[0];
//                }
//            });
//        }
//    },

});

