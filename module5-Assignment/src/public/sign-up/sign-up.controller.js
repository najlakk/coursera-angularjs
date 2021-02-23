(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
      var $ctrl = this;
      
      $ctrl.submit = function (shortName) {
        console.log('inside submit function with short Name ' + shortName);
        $ctrl.completed = false;
        $ctrl.shortName = shortName;
        $ctrl.itemname = "";
        $ctrl.found = true;

        MenuService.getFavorites(shortName).then(function(response) {
            console.log(response.data);
          $ctrl.itemname = response.data.name;
          $ctrl.user.userfav = response.data;
          $ctrl.found = true;
          $ctrl.completed = true;

          MenuService.saveUserFavorites($ctrl.user);
            
        })
        .catch(function(error) {
            console.log("error in getFavorites");
            console.log('error:' + error);
           $ctrl.found = false;
           $ctrl.completed = false;
        });


      };

    }
    
})();

        
    