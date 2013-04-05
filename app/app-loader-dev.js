/**
 * Set up the loader paths to the libraries.
 */
Ext.Loader.setPath({
    "CafeTownsend":     "app",
    "FlowMVC":          "lib/flow-mvc-0.1.0/FlowMVC",
    "Deft":             "lib/deft-0.8.8/Deft",
    "nineam":           "lib/locale/nineam",

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
 * FlowMVC core classes. These might only need to be required for dev.
 */
Ext.syncRequire([
    "FlowMVC.logger.Logger"
]);