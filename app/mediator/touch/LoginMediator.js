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
 * The login mediator essentially fulfills the passive view pattern for the login view.
 *
 * It is expected that different form factors may require a new mediator implementation as the events could be
 * different; eg, a login button on a desktop app could be click whereas mobile could be tap.
 */
Ext.define("CafeTownsend.mediator.touch.LoginMediator", {
    extend: "CafeTownsend.mediator.AbstractMediator",

    requires: [
        "CafeTownsend.event.AuthenticationEvent",
        "nineam.locale.LocaleManager"
    ],

    inject: [
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
        logInButton: {
            tap: "onLoginButtonTap"
        },
        usernameTextField:      true,
        passwordTextField:      true,
        signInFailedLabel:      true
    },

    ////////////////////////////////////////////////
    // FUNCTIONAL METHODS
    ////////////////////////////////////////////////

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN_FAILURE, this.onLoginFailure, this);
        this.eventBus.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS, this.onLogoutSuccess, this);
    },

    /**
     * The functional, testable login method. Show a loading mask and dispatch the application-level login event.
     *
     * @param {String} username The username being passed to authenticate the user.
     * @param {String} password The password being passed to authenticate the user.
     */
    login: function(username, password) {
        this.logger.debug("login: username = " + username + ", password = " + password);

        var view = this.getView();

        this.reset();

        view.setMasked({
            xtype: "loadmask",
            message: nineam.locale.LocaleManager.getProperty("login.signingIn")
        });

        var evt = Ext.create("CafeTownsend.event.AuthenticationEvent", CafeTownsend.event.AuthenticationEvent.LOGIN, username, password);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Shows the login failed label.
     *
     * @param message   The message string displayed for a failed login.
     */
    showSignInFailedMessage: function(message) {
        this.logger.debug("showSignInFailedMessage: " + message);

        var label = this.getSignInFailedLabel();
        label.setHtml(message);
        label.show();
    },

    /**
     * Determines if the credentials are valid for login.
     *
     * @param username      The username being passed to authenticate the user.
     * @param password      The password being passed to authenticate the user.
     * @return {Boolean}    Flag indicating if the supplied username and password are valid.
     */
    areLoginCredentialsValid: function(username, password) {
        return (username.length !== 0 && password.length !== 0);
    },

    /**
     * Resets the view's login fields.
     */
    reset: function() {
        this.getUsernameTextField().setValue("");
        this.getPasswordTextField().setValue("");
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the login success event from the login controller. Removes the loading mask from the view.
     */
    onLoginSuccess: function() {
        this.logger.debug("onLoginSuccess");

        var view = this.getView();
        view.setMasked(false);
    },

    /**
     * Handles the logout success event from the logout controller. Slide the login view
     * onto stage.
     */
    onLogoutSuccess: function() {
        this.logger.debug("onLoginSuccess");

        var view = this.getView();
        view.setMasked(false);

        this.navigate(CafeTownsend.event.AuthenticationEvent.LOGOUT_SUCCESS);
    },

    /**
     * Handles the login failure event from the login controller. Removes the loading mask from the view.
     * Shows the faied login message.
     */
    onLoginFailure: function() {
        this.logger.debug("onLoginFailure");

        var view = this.getView();
        view.setMasked(false);

        this.showSignInFailedMessage(nineam.locale.LocaleManager.getProperty("login.loginFailed"));
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the simple tap event from the login view's submit button. Grabs the username and password
     * and passes them to the testable login method if the login credentials are valid.
     *
     * @param event The tap event from the login button on the login view.
     */
    onLoginButtonTap: function(event) {
        this.logger.debug("onLoginButtonTap");

        var username = this.getUsernameTextField().getValue();
        var password = this.getPasswordTextField().getValue();

        // NOTE: if you don't reference a component multiple times you don't need to create a ref to it can simply
        // gain access to it with the method: getComponentById()
        var label = this.getComponentById("signInFailedLabel", this.getView());
        var me = this;

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create("Ext.util.DelayedTask", function() {

            label.setHtml("");

            if(me.areLoginCredentialsValid(username, password)) {
                me.login(username, password);
            } else {
                me.showSignInFailedMessage(nineam.locale.LocaleManager.getProperty("login.credentialsRequired"));
            }
        });

        task.delay(250);
    }

});

