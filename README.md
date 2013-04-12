# CafeTownsend

### Sencha ExtJS, Touch, DeftJS, & WASI FlowMVC

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

## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Lazy loading of views on demand
*  Better DeftJS support so all dependencies are lazy loaded as opposed to at startup
*  Unit Tests with Jasmine - (In Progress)
*  Functional Tests with Siesta
*  Build Support
*  Inject logger and use something other than console.log() which bombs in browsers like IE6
