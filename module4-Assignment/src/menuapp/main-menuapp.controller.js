(function () {
'use strict';

angular.module('data')
.controller('MainMenuAppController', MainMenuAppController);

MainMenuAppController.$inject = ['items'];
function MainMenuAppController(items) {
  console.log('inside MainMenuAppController');
  var categories = this;
  categories.items = items;

}

})();
