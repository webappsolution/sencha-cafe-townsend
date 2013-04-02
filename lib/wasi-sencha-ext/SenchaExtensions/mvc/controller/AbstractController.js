/*
 Copyright (c) 2013 [Sencha Extensions Contributors](mailto:admin@webappsolution.com)

 WASI Sencha Extensions is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WASI Sencha Extensions is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WASI Sencha Extensions.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The abstract controller class provides base functionality for all application controllers. The main purpose
 * of this class is to simplify inter-controller communication by wrapping the application-level event
 * bus using simple, helper methods for adding, removing, and dispatching events:
 *
 * setupGlobalEventListeners()
 * addGlobalEventListener(type, handler, scope)
 * dispatchGlobalEvent(event, args)
 * removeGlobalEventListener()
 *
 * NOTE: removeGlobalEventListener() isn't currently implemented.
 *
 * In addition, the abstract controller provides some convenience methods that simplify service calls that use custom
 * success and failure handlers:
 *
 * executeServiceCall(service, method, args, success, failure, scope)
 *
 * The abstract controller is also the base class for all view mediators; we're really relying on Sencha
 * MVC design where a controller knows how to interact with a given view, so the base, abstract mediator extends
 * this abstract controller.
 */
Ext.define("SenchaExtensions.mvc.controller.AbstractController", {
    extend: "Ext.app.Controller",

    statics: {

        /**
         * TODO
         */
        ROOT_APPLICATION: null,

        /**
         * The logger for the object.
         */
        logger: SenchaExtensions.logger.Logger.getLogger("SenchaExtensions.mvc.controller.AbstractController")
    },

    inject: [
        "eventBus"
    ],

    config: {

        /**
         * @cfg {SenchaExtensions.mvc.event.EventDispatcher} eventBus The application-level event bus. This is
         * injected
         * @accessor
         */
//        eventBus: null,

        /**
         * @cfg {String} sessionToken The session token for the Application. This should be a single string without
         * spaces or periods because it is used as the Application's global namespace.
         * @accessor
         */
        sessionToken: null
    },

    /**
     * Sets up simple accessor method shortcuts for the global event bus.
     */
    init: function() {
        SenchaExtensions.mvc.controller.AbstractController.logger.debug("init");

        // TODO: BMR: 01/15/13: this has bombed because this.getApplication() can == null. haven't seen since initial development
        try {
            this.setupGlobalEventListeners();
        } catch(err) {
            SenchaExtensions.mvc.controller.AbstractController.logger.debug("[ERROR] AbstractController.init: " +
                "\n\t " +
                "Can't get access to the application property in the Controller because its undefined. " +
                "\n\t " +
                "If a concrete controller class extends this, why is this.getApplication() undefined in " +
                "AbstractController.init() ???");
        }
    },

    /**
     * Marker method. Concrete subclasses can implement to setup listeners to the global event bus with
     * confidence that it exists. This is called during the initialization phase of the controller to ensure
     * the reference to the application exists when adding event listeners to it.
     */
    setupGlobalEventListeners: function() {
        SenchaExtensions.mvc.controller.AbstractController.logger.debug("setupGlobalEventListeners");
    },

    /**
     * Simplifies the process of executing a service call that requires custom asynchronous success and failure
     * handlers; create a responder object and add it to the service before making the actual service call.
     *
     * Note that the service call isn't passed in as a function that actually executes the service; it's passed
     * in via a reference to the service object, the actual service method, and the service method's parameters.
     * This is done to prevent the service call from being executed before the responder is being set on it.
     *
     * ## Example
     *
     * var service = this.getAuthenticationService();
     * this.executeServiceCall(service, service.authenticate, [username, password], this.loginSuccess, this.loginFailure, this);
     *
     * @param {Object} service Reference to the actual service.
     * @param {Function} method Reference to the method on the service object that makes the call.
     * @param {Array} args Array of parameters used in the service calls method.
     * @param success
     * @param failure
     * @param scope
     *
     * TODO: BMR: 02/26/13: Currently each service can only have 1 responder at a time since the injected service is a singleton within each controller...need to fix this.
     */
    executeServiceCall: function(service, method, args, success, failure, scope) {
        SenchaExtensions.mvc.controller.AbstractController.logger.group("SenchaExtensions.mvc.controller.AbstractController.executeServiceCall");

        var token;

        if(service.getUsePromise()) {
            SenchaExtensions.mvc.controller.AbstractController.logger.info("executeServiceCall: Using Promises");
            token = method.apply(service, args).then({
                success: success,
                failure: failure,
                scope: scope
            }).always(function() {
                // Do something whether call succeeded or failed
                SenchaExtensions.mvc.controller.AbstractController.logger.debug("executeServiceCall: always do after promise");
            });
        } else {
            SenchaExtensions.mvc.controller.AbstractController.logger.info("executeServiceCall: Using AsyncToken");
            var responder = Ext.create("SenchaExtensions.mvc.service.rpc.Responder", success, failure, scope);
            token = method.apply(service, args);
            token.addResponder(responder);
        }

        return token;
    },

    /**
     *
     * @param service
     * @param method
     * @param args
     * @param success
     * @param failure
     * @param scope
     */
    executeServiceCallWithPromises: function(service, method, args, success, failure, scope) {
        SenchaExtensions.mvc.controller.AbstractController.logger.debug("executeServiceCallWithPromises");

        method.apply(service, args).then({
            success: success,
            failure: failure,
            scope: scope
        }).always(function() {
            // Do something whether call succeeded or failed
            SenchaExtensions.mvc.controller.AbstractController.logger.debug("executeServiceCall: always do after promise");
        });
    },

    /**
     * TODO
     */
    getService: function(className) {
        if(className) {
            className = (className.value != null) ? className.value : className;
        }
        SenchaExtensions.mvc.controller.AbstractController.logger.debug("getService: using: ", className);
        var clazz = Ext.ClassManager.get(className);
        return new clazz();
    },

    /**
     * DEPRECATED
     *
     * Sencha ExtJS and Touch access the reference to the application in the controller differently; in ExtJS, it's
     * this.application because it's not setup in the config object where getters/setters are automatically generated
     * whereas in Touch, it's this.getApplication(). This method aims to abstract that difference.
     *
     * @return Ext.app.Application} The Application instance this Controller is attached to. This is
     * automatically provided when using the MVC architecture so should rarely need to be set directly.
     */
    getMVCApplication: function() {
//        SenchaExtensions.mvc.controller.AbstractController.logger.debug("getMVCApplication: ROOT_APPLICATION = " + SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION);
        if(SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION == null) {
            // this is if you're using ExtJS
//        if (Ext.getVersion("extjs") && Ext.getVersion("core").isLessThan("4.2.0")) {
            if (Ext.getVersion("extjs")) {
                SenchaExtensions.mvc.controller.AbstractController.logger.warn("AbstractController.getMVCApplication: using 'this.application' because ExtJS 4.1 and below doesn't use a getter for the root application.");
                SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION = this.application;
                // this is if you're using Touch
                // TODO: BMR: 02/26/13: Might need to check for touch vr 2.0+
//        } else if(Ext.getVersion('touch')) {
            } else {
                SenchaExtensions.mvc.controller.AbstractController.logger.info("AbstractController.getMVCApplication: using 'this.getApplication() because we're in Touch 2.x+'");
                SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION = this.getApplication();
            }
        }

        return SenchaExtensions.mvc.controller.AbstractController.ROOT_APPLICATION;
    }

});

