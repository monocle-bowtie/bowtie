define(['app', 'PromocionesService'], function (app, PromocionesService) {
    app.controller('PromocionesCtrl', function ($scope, $http, $rootScope, $filter, $timeout, PromocionesService) {

    	$scope.promocionesList = [];
        $scope.promoDetalleList = [];

    	var getPromociones = PromocionesService.getCaja();
        var getPromoDetalle = PromocionesService.getPromoDetalle();
    	
    	$scope.init = function() {
            $timeout(getPromociones.then(function(promocionesList) {
                $scope.promocionesList = promocionesList;
            }), 1000);

            $timeout(getPromoDetalle.then(function(promoDetalleList) {
                $scope.promoDetalleList = promoDetalleList;
            }), 1000);
        }

        $scope.addPromo = function(p) {
            var promocion = {};
            promocion.idPromocion = 0;
            promocion.descripcion = p.descripcion;
            promocion.precio = p.precio;

            $scope.promocionesList.push(promocion);
            PromocionesService.savePromo(promocion);
        }
        

    });
});