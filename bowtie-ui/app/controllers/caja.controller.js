define(['app', 'CajaService'], function (app, CajaService) {
    app.controller('CajaCtrl', function ($scope, $http, $rootScope, $filter, $timeout, CajaService) {

    	$scope.cajaList = [];

    	var getCaja = CajaService.getCaja();
    	
    	$scope.init = function() {

            $timeout(getCaja.then(function(cajaList) {
                $scope.cajaList = cajaList;
            }), 1000);
        }

        console.log(angular.toJson($scope.cajaList));

    });
});