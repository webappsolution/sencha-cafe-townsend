# CafeTownsend

### Sencha Touch, DeftJS, & WASI FlowMVC

This project is an HTML5/Javascript implementation of the infamous CafeTownsend application.
CafeTownsend is a well known application created to demonstrate various MVC frameworks using Flex or ActionScript.
There are known ports using Cairngorm, Mate, PureMVC, Spring ActionScript, RobotLegs and Swiz.
This implementation uses Sencha Touch, Sencha ExtJS, DeftJS, FlowMVC, and some others:

*  [Sencha ExtJS](http://www.sencha.com/products/extjs) - Robust HTML5/JavaScript Framework for Desktop Applications
*  [Sencha Touch](http://www.sencha.com/products/touch) - Robust HTML5/JavaScript Framework for Mobile Applications
*  [DeftJS](https://github.com/deftjs/) - DeftJS enhances Sencha's ExtJS and Sencha Touch APIs with additional
building blocks that enable large development teams to rapidly create enterprise-scale applications, leveraging best
practices and proven patterns discovered by top RIA developers at some of the best consulting firms in the industry.
*  [FlowMVC Extensions](http://TODO) - Additional foundational building blocks, infrastructure, and boilerplate
code for building Sencha MVC applications.
*  [LocaleManager](https://github.com/psmithiv/nineam-localization-plugin) - Runtime-enabled localization
*  [Jasmine](http://pivotal.github.com/jasmine/) - Jasmine is a behavior-driven development framework for testing
JavaScript code
*  [Log4JavaScript](http://log4javascript.org/) - Jlog4javascript is a JavaScript logging framework based on the Java
logging framework [log4j](http://logging.apache.org/log4j/).
*  [JSDuck Documentation](https://github.com/senchalabs/jsduck) - API documentation generator for Sencha JavaScript
frameworks 

# Background 

This application's basic concepts, UI, and use cases were pulled from a combination of
[CafeTownsend AngularJS port by Thomas Burleson](https://github.com/ThomasBurleson/angularJS-CafeTownsend) 
and the [Sencha Touch Note editor by Jorge Ramon](http://miamicoder.com/2012/how-to-create-a-sencha-touch-2-app-part-5/), 
but modified in architecture and design to closely align with a typical Flex-based MVC application using Swiz or Parsley. 

The impetus for this was simple...

First, with enterprises hesitant to move forward with new Flex applications, 
how do you take your existing Flex & ActionScript expertise and apply them to the HTML5/JavaScript RIA? 
How do development managers get their team of Flex developers up and running quickly in this space? Simple, 
show them a framework and architecture that looks almost identical to what they already know, but in a JavaScript 
implementation.

Second, with a strong desire to create applications for both the desktop and mobile platforms, how can we structure
an application with as much reusability and portability in mind as possible; how do we decrease the amount of unique code
we need to write for both form factors and simply reuse the application and business logic?

This example application reuses application and business objects (Events, Controllers, Services, Models, and Stores) in
both the ExtJS and Touch versions leaving only the unique coding of the Views and Mediators (which should be form factor
specific in UX and componentry).

# Goals 

This port demonstrates the following:

*  Separation-of-concerns for Model-View-Controller-Service
*  Dependency injection of services and stores using DeftJS
*  Application-Level event bus communication
*  Services as mocks and real HTTP data services
*  Rigorous elimination of logic from View code using Mediators
*  Localization of all copy via a Runtime-enabled LocaleManager
*  Unit Tests using Jasmine for both functional and asynchronous code blocks [In Progress]
*  Ability to use services with Asynchronous Tokens or DeftJS Promises
*  Extensive reuse and portability of application and business objects by the ExtJS and Touch versions; only views and
mediators differ
*  Lazy loading of data services (*with auto-jsonify of external JSON data*)
*  Code versions handwritten in Javascript with extensive class and method level comments with JSDuck Documentation

# MVCS Architecture

Since Sencha ExtJS and Sencha Touch are based on the same core libraries, the MVC architecture was designed with
reusability and portability in mind for applications that need to co-exist on the desktop and mobile platforms without 
writing 100% unique code bases for each. For the most part, views and their mediators need to be specific to their 
platform, whereas the application and business logic should be reusable by all.

![Screenshot](ref/images/sencha-mvcs-architecture.png)

### Views
Views are used exclusively for UI layout using Sencha components. There's no logic, event handling, or data marshaling
of any kind in the views -- they are "dumb" and simply display whatever they're given or instructed to do from their
accompanying mediator. It is expected that views will need to be partly or entirely created from scratch for each
platform.

### Mediators
Mediators fulfil the passive view pattern and are entirely responsible for a single view and it's sub-components;
it is within a mediator that we handle view logic, events and user interactions, and data marshaling. It is expected 
that mediators will need to be partly or entirely created from scratch for each platform. It may also be possible
to create base mediators for some desktop and mobile views for additional reusability, leaving the specifics
to the concrete, platform implementations.

Mediators are also aware of the application-level event bus and can thus partake in dispatching and listening 
to it's events. In order to facilitate a separation of concerns between an object that manages a view (mediators) 
and an object that's responsible for executing services and working with model data (controllers), the mediators 
simply broadcast events that controllers handle in order to execute services.

The following example illustrates a mediator dispatching an application-level login event:

```js
var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN, username, password);
this.dispatchGlobalEvent(evt);
```

Simply put, while application aware, mediators numero uno role is to manage it's specific view buddy.

### Controllers
Controllers act as the front door to services; they handle application-level events and execute the appropriate 
service. When a service succeeds or fails, it is the controller's responsibility to update model and store data
(application state) and dispatch events alerting the rest of the application to the state of a service call.

The following example illustrates a controller listening to and handling an application-level login event:

```js
/**
 * Sets up global event bus handlers.
 */
setupGlobalEventListeners: function() {
    this.callParent();
    console.log("AuthenticationController.setupGlobalEventListeners");

    this.addGlobalEventListener(CafeTownsend.event.AuthenticationEvent.LOGIN, this.onLogin, this);
},

/**
 * Handles the login event on the application-level event bus. Grabs the username and password
 * and calls a functional method that's more testable than this event handler.
 *
 * @param {CafeTownsend.event.AuthenticationEvent} event Reference to the login event. Contains the username and password.
 */
onLogin: function(event) {
    var username = event.username;
    var password = event.password;
    console.log("AuthenticationController.onLogin: username = %s, password = %s", username, password);

    this.login(username, password);
},

/**
 * Handles the successful login service call and takes the response data packet as a parameter.
 * Fires off the corresponding success event on the application-level event bus.
 *
 * @param {Object} response  The response data packet from the successful service call.
 */
loginSuccess: function(response) {
    console.info("AuthenticationController.loginSuccess");

    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
    this.setSessionToken(response.sessionToken);

    var evt = new CafeTownsend.event.AuthenticationEvent(CafeTownsend.event.AuthenticationEvent.LOGIN_SUCCESS);
    this.dispatchGlobalEvent(evt);
},
```

In addition, controllers are used to execute services. The pattern to execute service call was borrowed
from the [Swiz ServiceHelper.executeServiceCall() implementation](http://swizframework.jira.com/wiki/display/SWIZ/Service+Layer) as it cleanly calls the service and adds custom success and failure handlers in one
line:

```js
// get a reference to the injected service
var service = this.getAuthenticationService();
this.executeServiceCall(service, service.authenticate, [username, password], this.loginSuccess, this.loginFailure, this);
```

It's currently defined in the base controller, but could easily be refactored into an injectable ServiceHelper bean
like Swiz.

Finally, controllers can be used to handle application-level processes and logic as they are in fact application
aware and often "control" the flow and orchestration of the application.

### Events
Events are self-contained vessels for transporting data and expressing message actions on the application-level
event bus. The event type is a string constant withing the event class implementation and indicates the mapping
or event type to handle when subscribing or listening to application-level events.

### Services
Services are used to communicate with external APIs or data sources outside the application; these can be, but are
not limited to, Ajax, REST, or LocalStorage data services. services are typically DeftJS managed beans and are injected into
controllers. For development purposes, they often have mock and real, concrete implementations.

### Models & Stores
The models and stores are the client-side domain models and collections of domain models. They are often created, updated,
and destroyed by controllers and used by mediators to marshall data for their respective views.



## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Lazy loading of views on demand - CafeTownsend
*  Better DeftJS support so all dependencies are lazy loaded as opposed to at startup - CafeTownsend
*  Unit Tests with Jasmine - FlowMVC & CafeTownsend (In Progress)
*  Functional Tests with Siesta - FlowMVC & CafeTownsend
*  Build Support - CafeTownsend
*  Generate documentation with JSDuck
*  Inject logger and use something other than console.log() which bombs in browsers like IE6
