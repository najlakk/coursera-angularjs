(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
      .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
      var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
              items: '<',
              onRemove: '&'
          },

          controller: NarrowItDownController,
          controllerAs: 'menu',
          bindToController: true
      };

      return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];

  function NarrowItDownController(MenuSearchService) {
      var menu = this;

      menu.getMatchedMenuItems = function(searchTerm) {
          MenuSearchService.getMatchedMenuItems(searchTerm).then(function(response) {
                  menu.foundItems = response;
              })
              .catch(function(error) {
                  console.log("error in getMatchedMenuItems");
              });

      };

      menu.removeItem = function(itemIndex) {
          console.log('inside remove ' + itemIndex);
          console.log("'this' is: ", this);
          MenuSearchService.removeItem(itemIndex);

      };
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];

  function MenuSearchService($http, ApiBasePath) {
      var service = this;
      var foundItems = [];

      service.getMatchedMenuItems = function(searchTerm) {
          var promise = $http({
                  method: "GET",
                  url: (ApiBasePath),
              });
           return promise.then(function(response) {
                  foundItems = [];
                  var j = -1;
                  console.log(response.data);

                  console.log(response.data.menu_items);
                  console.log(response.data.menu_items.length);
                  console.log(response.data.menu_items[0]);
                  console.log(response.data.menu_items[0].description);

                  for (var i = 0; i < response.data.menu_items.length; i++) {
                      if (response.data.menu_items[i].description.includes(searchTerm)) {
                          //console.log(response.data.menu_items[i].description);
                          j = j + 1;
                          foundItems[j] = response.data.menu_items[i];
                      }
                  }
                  console.log('foundItems length ' + foundItems.length);
                  return foundItems;
              })
              .catch(function(error) {
                  console.log(error);
              })
      };

      service.removeItem = function(itemIndex) {
          foundItems.splice(itemIndex, 1);
      };
  }

})();