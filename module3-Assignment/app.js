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
              menu: '<myList',
              onRemove: '&'
          },

          controller: NarrowItDownDirectiveController,
          controllerAs: 'menu',
          bindToController: true,
          link: NarrowItDownDirectiveLink
      };

      return ddo;
  }

  function NarrowItDownDirectiveLink(scope, element, attrs, controller) {
      console.log("Link scope is: ", scope);
      console.log("Controller instance is: ", controller);
      console.log("Element is: ", element);

      scope.$watch('menu.checkMenuLength()', function(newValue, oldValue) {
          console.log("Old value: ", oldValue);
          console.log("New value: ", newValue);

          if (newValue === true) {
              displayWarning();
          } else {
              removeWarning();
          }

      });

      function displayWarning() {
          var warningElem = element.find("div.error");
          warningElem.slideDown(900);
      }


      function removeWarning() {
          var warningElem = element.find("div.error");
          warningElem.slideUp(900);
      }
  }

  function NarrowItDownDirectiveController() {
      var menu = this;

      console.log('inside NarrowItDownDirectiveController');
      menu.checkMenuLength = function() {

          console.log('menu.menu.foundItems.length ' + menu.menu.foundItems.length);
          if ( menu.menu.foundItems.length == 0) {
              console.log('array length is zero');
              return true;
          } else {
              console.log('array length is > 0');
              return false;
          }
      };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
      var menu = this;
      menu.foundItems = [];

      menu.getMatchedMenuItems = function() {
          
          menu.foundItems = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
          //menu.flag = 1;
      }

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
          foundItems = [];
          var j = -1;

          console.log('searchTerm is ' + searchTerm);
          if (searchTerm == null || searchTerm == undefined || searchTerm == "") {
              console.log('searchTerm is null');
              return foundItems;
          }

          var response = $http({
              method: "GET",
              url: (ApiBasePath),
          });

          console.log('inside service' + response);
          console.log(response.data);

          var promise = response;
          promise.then(function(response) {
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

              })
              .catch(function(error) {
                  console.log(error);
              })

          return foundItems;
      };

      service.removeItem = function(itemIndex) {
          foundItems.splice(itemIndex, 1);
      };
  }

})();