define(['app', 'PromocionesService'], function (app, PromocionesService) {
    app.controller('PromocionesCtrl', function ($scope, $http, $rootScope, $filter, $timeout, PromocionesService) {

    	$scope.promocionesList = [];

    	var getPromociones = PromocionesService.getCaja();
    	
    	$scope.init = function() {
            $timeout(getPromociones.then(function(promocionesList) {
                $scope.promocionesList = promocionesList;
            }), 1000);
        }
        

    });
});