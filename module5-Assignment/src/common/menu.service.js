(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavorites = function (shortName) {
    console.log('inside getFavorites');
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json');
  };

  service.saveUserFavorites = function (userDetails) {
    console.log('inside saveUserFavorites');
    console.log(userDetails.userfav);
    console.log(userDetails.userfav.id);
    service.userDetails = userDetails;
  };

  service.getUserFavorites = function () {
    console.log('inside getFavorites');
    return service.userDetails;
  };
  

}



})();
