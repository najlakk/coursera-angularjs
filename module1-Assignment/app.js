(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.list = "";

  $scope.lunchCheck = function () {
    console.log('In function lunchCheck');
    console.log($scope.list);

    var dish = ($scope.list).split(',');
    console.log('Length: ' + dish.length);
    console.log('Length of first item: ' + dish[0].length);

    if ($scope.list != "" && dish.length <= 3){
      $scope.sayMessage = "Enjoy!";
    }
    else if (dish.length > 3){
      $scope.sayMessage = "Too much!";
    }
    else{
      $scope.sayMessage = "Please enter data first";
    }

  };
 
}

})();

  
