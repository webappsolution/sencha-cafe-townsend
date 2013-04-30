/**
 * Set up the loader paths to the libraries.
 */
Ext.Loader.setPath({
    "CafeTownsend":     "app",
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

