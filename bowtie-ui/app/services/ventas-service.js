define(['app'], function (app) {
	app.factory('VentasService',  ['$resource', '$q', '$http', '$rootScope',
		function( $resource, $q, $http, $rootScope) {
			var service = {};

        	service.getProductos = getProductos;
        	service.getMedioPago = getMedioPago;
        	service.getStock = getStock

        	service.guardarMovimientosCaja = guardarMovimientosCaja;
        	service.guardarVenta = guardarVenta;

        	return service;

	        function getProductos() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/productos/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function getMedioPago() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/MedioPago/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function getStock() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/stock/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function guardarVenta(obj) {

				
	        }
	        
	        function guardarMovimientosCaja(movimiento, callbackOk, callbackFail) {
            	return $resource('http://localhost:8080/api/movimiento.json', {}, {
	            	saveMovimiento: {
		                    method: 'POST'
		                }
		            }
		        ).saveMovimiento({}, angular.toJson(movimiento))
				.$promise.then(callbackOk, callbackFail);
			}
		}
	]);

});