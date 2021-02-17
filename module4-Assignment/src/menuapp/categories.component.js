(function () {
'use strict';

angular.module('data') 
.component('categories', {
  templateUrl: 'src/menuapp/templates/menuapp.template.html',
  bindings: {
    items: '<'
  }
});

})();
