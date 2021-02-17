(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var items = [];
  var item = [];

  service.getAllCategories = function() {
    var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json"),
    });
    return promise.then(function(response) {
            console.log(response.data);

            items = response.data;
            return items;
        })
        .catch(function(error) {
            console.log(error);
        })
  };

  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });
    
    return response.then(function(response) {
        console.log(response.data);
        item = response.data;
        return item;
    })
    .catch(function(error) {
        console.log(error);
    })

  };

}

})();
