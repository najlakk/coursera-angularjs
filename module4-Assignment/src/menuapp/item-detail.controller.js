(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['item']; 
function ItemDetailController(item) {
  var itemDetail = this;
  itemDetail.item = item.menu_items;
  itemDetail.shortname = item.category.short_name;

  console.log('end of ItemDetailController');
}

})();
