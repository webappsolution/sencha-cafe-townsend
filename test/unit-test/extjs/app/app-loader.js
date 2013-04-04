/**
 * Set up the loader paths to the libraries.
 */
Ext.Loader.setPath({
    "CafeTownsend":     "../../../app",
    "FlowMVC": "../../../lib/flow-mvc-0.1.0/FlowMVC",
    "Deft":             "../../../lib/deft-0.8.8/Deft",

    enabled:            true,
    disableCaching:     true
});

/**
 * DeftJS relies on several core Sencha classes to function. For some strange reason, these core classes are
 * not part of the ext.js file, so you'll need to ensure that these classes are loaded and available before the
 * DeftJS library is loaded.
 */
Ext.syncRequire([
    "Ext.Component",
    "Ext.ComponentManager",
    "Ext.ComponentQuery"
]);

/**
 * DeftJS core classes. These might only need to be required for dev.
 */
Ext.syncRequire([
    "Deft.core.Class",
    "Deft.event.LiveEventBus", // may not be needed
    "Deft.mixin.Controllable",
    "Deft.mixin.Injectable",
    "Deft.mvc.ComponentSelectorListener", // may not be needed
    "Deft.util.Function", // may not be needed
    "Deft.promise.Deferred"

]);

/**
 * DeftJS core classes. These might only need to be required for dev.
 */
Ext.syncRequire([
    "FlowMVC.logger.Logger"
]);

/*
This is from the DefTJS build.xml file so we know the load order of dependencies.
 <file name="Deft/core/Class.js" />
 <file name="Deft/log/Logger.js" />
 <file name="Deft/util/Function.js" />
 <file name="Deft/event/LiveEventListener.js" />
 <file name="Deft/event/LiveEventBus.js" />
 <file name="Deft/ioc/DependencyProvider.js" />
 <file name="Deft/ioc/Injector.js" />
 <file name="Deft/mixin/Injectable.js" />
 <file name="Deft/mvc/Observer.js" />
 <file name="Deft/mvc/ComponentSelectorListener.js" />
 <file name="Deft/mvc/ComponentSelector.js" />
 <file name="Deft/mvc/ViewController.js" />
 <file name="Deft/mvc/Application.js" />
 <file name="Deft/mixin/Controllable.js" />
 <file name="Deft/promise/Promise.js" />
 <file name="Deft/promise/Deferred.js" />
 <file name="Deft/promise/Chain.js" />
    */