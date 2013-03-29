#This file contains CoffeScript that takes care of the ExtJS and Touch config object differences
#in the class frameworks for each. Pulled from: http://tunein.yap.tv/javascript/2012/08/06/sencha-events/

window.Sencha = (->
  isTouch = !!Ext.getVersion("touch")?.version?.match(/2\./)
  {
  isTouch: isTouch
  isExtJS: !isTouch
  })()

Sencha.modelCompatibility =
  if Sencha.isTouch then (x) -> x else
    (classConfig) ->
      if cfg = classConfig.config
        if fs = cfg.fields
          classConfig.fields = fs
          delete cfg['fields']
      classConfig

Sencha.storeCompatibility =
  if Sencha.isTouch then (x) -> x else
    (classConfig) ->
      if classConfig.config
        for lifted in ['model','proxy']
          if val = classConfig.config[lifted]
            classConfig[lifted] = val
            delete classConfig.config[lifted]
      classConfig

Sencha.controllerCompatibility =
  (classConfig) ->
    compatibleRefs = (classConfig) ->
      if touchRefs = classConfig.config?.refs
        classConfig.refs =
          for ref, selector of touchRefs
            {ref:ref, selector:selector}
        delete classConfig.config['refs']

    classConfig = makeEventHistory(classConfig)
    if !Sencha.isTouch
      compatibleRefs(classConfig)
      classConfig.getApplication = -> @application

      if classConfig.config?.control
        oldInit = classConfig.init
        classConfig.init = ->
          if @config.control
            control = {}
            for selector, eventDispatch of @config.control
              dispatch = {}
              for event, fn of eventDispatch
                dispatch[event] = this[fn]
                undefined
              control[selector] = dispatch
              undefined
            console.log(control)
            @application.control(control,undefined,this)
            delete @config['control']

          if oldInit
            oldInit.apply(this, arguments)
          else
            @callParent(arguments)

    classConfig

#
#(function() {
#
#            window.Sencha = (function() {
#                                        var isTouch, _ref, _ref1;
#isTouch = !!((_ref = Ext.getVersion("touch")) != null ? (_ref1 = _ref.version) != null ? _ref1.match(/2\./) : void 0 : void 0);
#return {
#isTouch: isTouch,
#isExtJS: !isTouch
#};
#})();
#
#Sencha.modelCompatibility = Sencha.isTouch ? function(x) {
#return x;
#} : function(classConfig) {
#                          var cfg, fs;
#if (cfg = classConfig.config) {
#                                if (fs = cfg.fields) {
#                                                     classConfig.fields = fs;
#                                  delete cfg['fields'];
#  }
#}
#return classConfig;
#};
#
#Sencha.storeCompatibility = Sencha.isTouch ? function(x) {
#return x;
#} : function(classConfig) {
#                          var lifted, val, _i, _len, _ref;
#if (classConfig.config) {
#                        _ref = ['model', 'proxy'];
#  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
#  lifted = _ref[_i];
#  if (val = classConfig.config[lifted]) {
#                                        classConfig[lifted] = val;
#    delete classConfig.config[lifted];
#  }
#  }
#}
#return classConfig;
#};
#
#}).call(this);
