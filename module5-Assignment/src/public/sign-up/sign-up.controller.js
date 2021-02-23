(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    //.service('MenuService', MenuService);


    SignUpController.$inject = ['$http','ApiPath'];
    function SignUpController($http, ApiPath) {
      var $ctrl = this;
      //$ctrl.info = info;
      //$ctrl.signUp = signUp;
      //$ctrl.basePath = ApiPath;
      //$ctrl.menuItems = menuItems; 

      $ctrl.submit = function (shortName) {
        console.log('inside submit function with short Name ' + shortName);
        $ctrl.completed = false;
        $ctrl.shortName = shortName;
        $ctrl.itemname = "";
        $ctrl.found = true;
        //$ctrl.itemname = MenuService.getFavorites(shortName);

        var promise = $http({
            method: "GET",
            url: (ApiPath + '/menu_items/' + shortName + '.json'),
        });

        promise.then(function(response){
          console.log(response.data);
          $ctrl.itemname = response.data.name;
          $ctrl.found = true;
          $ctrl.completed = true;

        })
        .catch(function(error) {
           console.log('error:' + error);
           $ctrl.found = false;
           $ctrl.completed = false;
        })

      };

    }

    //SignUpController.$inject = ['menuItems'];
    // SignUpController.$inject = ['MenuService'];
    // function SignUpController(MenuService) {
    //   var $ctrl = this;
    //   //$ctrl.basePath = ApiPath;
    //   //$ctrl.menuItems = menuItems;
      
    //   $ctrl.submit = function (shortName) {
    //     console.log('inside submit function with short Name ' + shortName);
    //     $ctrl.completed = true;
    //     $ctrl.shortName = shortName;
    //     //$ctrl.itemname = MenuService.getFavorites(shortName);


    //     MenuService.getFavorites(shortName).then(function(response) {
    //         $ctrl.itemname = response;
    //         console.log("itemname " + $ctrl.itemname);
    //         if($ctrl.itemname == null || $ctrl.itemname == undefined || $ctrl.itemname == ""){
    //             $ctrl.found = false;
    //         }else{
    //             $ctrl.found = true;
    //         }
            
    //     })
    //     .catch(function(error) {
    //         console.log("error in getFavorites");
    //     });

    //   };

    // }

//     MenuService.$inject = ['$http', 'ApiPath'];
//     function MenuService($http, ApiPath) {
//     var service = this;
//     var itemname = "";

//     service.getFavorites = function (shortName) {
//       console.log('inside getFavorites' + ApiPath + '/menu_items/' + shortName + '.json' );

//       var promise = $http({
//                   method: "GET",
//                   url: (ApiPath + '/menu_items/' + shortName + '.json'),
//               });

//       return promise.then(function(response){
//         console.log(response.data);
//         itemname = response.data.name;
//         return itemname;
//       })
//       .catch(function(error) {
//                       console.log(error);
//                   })
//     //   return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
//     //     return response.data;
//     //   });
//     };
// }
    
})();

        
    