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
 * The viewport mediator essentially fulfills the passive view pattern for the application's's Viewport.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 *
 * TODO: BMR: 02/22/13: Don't add all the views to the stage at once. Do it on demand.
 */
Ext.define("CafeTownsend.mediator.touch.ViewportMediator", {
    extend: "CafeTownsend.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.AuthenticationEvent",
        "CafeTownsend.event.NavigationEvent"
    ],

    inject: [
        "logger"
    ],

    config: {
        // create references to this mediator's views so we can listen to events and grab data from them
        loginView:              "loginView",
        employeeListView:       "employeeListView",
        employeeDetailView:     "employeeDetailView"
    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Initializes the view mediator and sets up global event bus handlers.
     */
    init: function() {
        this.logger.debug("init");
        return this.callParent();
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(CafeTownsend.event.NavigationEvent.NAVIGATE, this.onNavigate, this);
    },

    /**
     * Maps the current application action like login, logout, show a view, etc and navigates to a
     * corresponding view.
     *
     * @param action    The current application-level action.
     */
    navigate: function(action) {
        this.logger.debug("navigate: action = ", action);

        var view;
        var direction;

        switch(action) {
            case CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS:
                view = this.getEmployeeListView();
                direction = this.getSlideLeftTransition();
                break;

            case CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS:
                view = this.getLoginView();
                direction = this.getSlideRightTransition();
                break;

            case CafeTownsend.event.NavigationEvent.ACTION_SHOW_EMPLOYEE_DETAIL:
                view = this.getEmployeeDetailView();
                direction = this.getSlideLeftTransition();
                break;

            case CafeTownsend.event.NavigationEvent.ACTION_BACK_SHOW_EMPLOYEE_LIST:
                view = this.getEmployeeListView();
                direction = this.getSlideRightTransition();
                break;
        }

        // only navigate to the screen if the view exist
        if(view != null) {
            Ext.Viewport.animateActiveItem(view, direction);
        } else {
            this.logger.warn("ViewportMediator.navigate: couldn't map navigation to action = ", action);
        }

    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the navigation applicaiton event and passes on the action to a functional, testable method.
     */
    onNavigate: function(event) {
        this.logger.debug("onNavigate");

        this.navigate(event.action)
    }

});

