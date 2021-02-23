(function () {
    "use strict";
    
    angular.module('public')
    .controller('InfoController', InfoController);
    
    InfoController.$inject = ['MenuService','ApiPath'];
    function InfoController(MenuService, ApiPath) {
      console.log('inside InfoController');
      var $ctrl = this;
      
      var userDetails = MenuService.getUserFavorites();
      console.log(userDetails);
      
      if (userDetails == undefined){
         $ctrl.present = false;
      }
      else{
        $ctrl.present = true;
        $ctrl.menuItem = userDetails.userfav;
        $ctrl.basePath = ApiPath;

        $ctrl.username = userDetails.username;
        $ctrl.lastname = userDetails.lastname;
        $ctrl.email = userDetails.email;
        $ctrl.phone = userDetails.phone;
        // $ctrl.itemname = userDetails.userfav.name;
      }

      
    }
    
    })();
    