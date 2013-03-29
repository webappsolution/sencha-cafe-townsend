//alert("app-loader");

//(function() {
//
//    window.Sencha = (function() {
//        var isTouch, _ref, _ref1;
//        isTouch = !!((_ref = Ext.getVersion("touch")) != null ? (_ref1 = _ref.version) != null ? _ref1.match(/2\./) : void 0 : void 0);
//        return {
//            isTouch: isTouch,
//            isExtJS: !isTouch
//        };
//    })();
//
//    Sencha.modelCompatibility = Sencha.isTouch ? function(x) {
//        return x;
//    } : function(classConfig) {
//        var cfg, fs;
//        if (cfg = classConfig.config) {
//            if (fs = cfg.fields) {
//                classConfig.fields = fs;
//                delete cfg['fields'];
//            }
//        }
//        return classConfig;
//    };
//
//    Sencha.storeCompatibility = Sencha.isTouch ? function(x) {
//        return x;
//    } : function(classConfig) {
//        var lifted, val, _i, _len, _ref;
//        if (classConfig.config) {
//            _ref = ['model', 'proxy'];
//            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//                lifted = _ref[_i];
//                if (val = classConfig.config[lifted]) {
//                    classConfig[lifted] = val;
//                    delete classConfig.config[lifted];
//                }
//            }
//        }
//        return classConfig;
//    };
//
//    Sencha.controllerCompatibility = function(classConfig) {
//        var compatibleRefs, oldInit, _ref;
//        compatibleRefs = function(classConfig) {
//            var ref, selector, touchRefs, _ref;
//            if (touchRefs = (_ref = classConfig.config) != null ? _ref.refs : void 0) {
//                classConfig.refs = (function() {
//                    var _results;
//                    _results = [];
//                    for (ref in touchRefs) {
//                        selector = touchRefs[ref];
//                        _results.push({
//                            ref: ref,
//                            selector: selector
//                        });
//                    }
//                    return _results;
//                })();
//                return delete classConfig.config['refs'];
//            }
//        };
//        classConfig = makeEventHistory(classConfig);
//        if (!Sencha.isTouch) {
//            compatibleRefs(classConfig);
//            classConfig.getApplication = function() {
//                return this.application;
//            };
//            if ((_ref = classConfig.config) != null ? _ref.control : void 0) {
//                oldInit = classConfig.init;
//                classConfig.init = function() {
//                    var control, dispatch, event, eventDispatch, fn, selector, _ref1;
//                    if (this.config.control) {
//                        control = {};
//                        _ref1 = this.config.control;
//                        for (selector in _ref1) {
//                            eventDispatch = _ref1[selector];
//                            dispatch = {};
//                            for (event in eventDispatch) {
//                                fn = eventDispatch[event];
//                                dispatch[event] = this[fn];
//                                void 0;
//                            }
//                            control[selector] = dispatch;
//                            void 0;
//                        }
//                        console.log(control);
//                        this.application.control(control, void 0, this);
//                        delete this.config['control'];
//                    }
//                    if (oldInit) {
//                        return oldInit.apply(this, arguments);
//                    } else {
//                        return this.callParent(arguments);
//                    }
//                };
//            }
//        }
//        return classConfig;
//    };
//
//}).call(this);

/**
 * Set up the loader paths to the libraries.
 */
Ext.Loader.setPath({
    "CafeTownsend":     "app",
    "SenchaExtensions": "lib/wasi-sencha-ext/SenchaExtensions",
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
 * Sencha Extensions core classes. These might only need to be required for dev.
 */
Ext.syncRequire([
    "SenchaExtensions.logger.Logger"
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