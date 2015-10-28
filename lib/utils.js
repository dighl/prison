"use strict";
define([], function(){
  function sum(list){
    function add(prev, foll){return prev + foll;}
    return list.reduce(add);
  }

  function max(list){
    function compare(prev,foll){
      if(prev == foll){return prev;}
      else if(prev > foll){return prev;}
      else{return foll;}
    }
    return list.reduce(compare);
  }

  function range(start,stop,step){
    if(typeof step == 'undefined'){step=1;}
    if(typeof stop == 'undefined'){stop=start;start=0;}
    
    if(stop > start && step < 0){return undefined;}
    if(step === 0){return undefined;}
    
    
    var list = [], i;
    if(start < stop){
      for(i=start; i<stop; i+=step){
        list.push(i);
      }
    }else if(stop < start){
      for(i=start; i>stop; i+=step){
        list.push(i);
      }
    }else{return undefined;}
    return list;
  }

  function loadFile(url,async){
    if(typeof async == 'undefined'){
      async = false;
    }else{
      async = true;
    }

    var store = document.getElementById('store');
    if(store === null){
      store = document.createElement('div');
      store.style.display = "none";
      document.body.appendChild(store);
    }

    $.ajax({
      async: async,
      type: "GET",
      url: url,
      dataType: "text",
      success: function(data){ store.innerText = data; }
    });
  }

  // Exports:
  return {
    'sum': sum,
    'max': max,
    'range': range,
    'loadFile': loadFile
  };
});
