(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
      console.log('inside ToBuyController');
      var itemBuy = this;
      itemBuy.tobuy = ShoppingListCheckOffService.getItems();
      itemBuy.buyItem = function(itemIndex) {
          //itemBuy.tobuy = ShoppingListCheckOffService.getItems();
          ShoppingListCheckOffService.buyItem(itemIndex);
      }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
      console.log('inside AlreadyBoughtController');
      var itemBought = this;    
      itemBought.bought = ShoppingListCheckOffService.boughtItems();  
  }

  function ShoppingListCheckOffService() {
      var service = this;
      var tobuy = [

          {
              name: "Cookies",
              quantity: 10
          },
          {
              name: "Apple",
              quantity: 5
          },
          {
              name: "Mango",
              quantity: 10
          },
          {
              name: "Coke",
              quantity: 1
          },
          {
              name: "Milk Packet",
              quantity: 2
          }
      ];

      var bought = [];

      service.buyItem = function(itemIndex) {
          console.log('inside buyItem: ' + itemIndex);
          bought.push(tobuy[itemIndex]);
          tobuy.splice(itemIndex, 1);      
      };

      service.getItems = function() {
          return tobuy;
      };
      service.boughtItems = function() {
          return bought;
      };

  }

})();