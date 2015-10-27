"use strict";
/* Main file to load the prison library.
 *
 * author   : Johann-Mattis List
 * email    : mattis.list@lingulist.de
 * created  : 2014-09-04 16:50
 * modified : 2014-09-04 16:50
 *
 */
requirejs(
  ['require', 'lib/highlight', 'lib/edit', 'lib/sampa', 'lib/utils', 'lib/pinyin', 'lib/multiple', 'lib/features'],
  function(require){
  /* prison variable is our main beast to store things */
  var PRISON = {
    'modules': {
      'highlight': require('lib/highlight'),
      'edit':      require('lib/edit'),
      'sampa':     require('lib/sampa'),
      'utils':     require('lib/utils'),
      'pinyin':    require('lib/pinyin'),
      'multiple':  require('lib/multiple'),
      'features':  require('lib/features')
    },
    '_loadModule': function(module){
      if(module in PRISON.modules){
        return PRISON.modules[module];
      }
      return null;
    },
    '_loadStyle': function(style){
      var script = document.createElement('link');
      script.rel = 'stylesheet';
      script.async = false;
      script.href = style+'.css';
      script.type = "text/css";
      document.body.appendChild(script);
    },
    /* this function can be used for internal loading of a longer list of
     * modules. It checks for dependencies and resorts them accordingly */
    'import': function(){
      /* http://stackoverflow.com/questions/6396046/unlimited-arguments-in-a-javascript-function */
      var args = Array.prototype.slice.call(arguments, 0);
      var loaded = [];

      /* check function prohibits multiple loading of modules */
      function check_loaded(module){
        if(loaded.indexOf(module) == -1){
          loaded.push(module);
          if(module in PRISON.modules){
            PRISON._loadModule('prison/lib/'+module);
          }else{
            PRISON._loadModule(module);
          }
        }
      }

      args.forEach(function(module){
        if(module in PRISON.modules){
          var dependencies = PRISON.modules[module];
          if(dependencies.length === 0){
            check_loaded(module);
          }else{
            dependencies.forEach(function(dependency){
              check_loaded(dependency);
            });
            check_loaded(module);
          }
        }else{
          check_loaded(module);
        }
      });
    },
    'style': function(){
      /* http://stackoverflow.com/questions/6396046/unlimited-arguments-in-a-javascript-function */
      var args = Array.prototype.slice.call(arguments, 0);
      var loaded = [];

      /* check function prohibits multiple loading of modules */
      function check_loaded(style){
        if(loaded.indexOf(style) == -1){
          loaded.push(style);
          PRISON._loadStyle(style);
        }
      }

      args.forEach(function(style){
        check_loaded(style);
      });
    }
  };
  //Make PRISON global if window exists:
  if(typeof(window) !== 'undefined'){
    window.PRISON = PRISON;
  }
  //Export PRISON:
  return PRISON;
});
