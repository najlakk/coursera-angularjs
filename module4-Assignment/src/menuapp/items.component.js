(function() {
    'use strict';

    angular.module('data')
        .component('items', {
            templateUrl: 'src/menuapp/templates/item.template.html',
            bindings: {
                item: '<'
            }
        });

})();