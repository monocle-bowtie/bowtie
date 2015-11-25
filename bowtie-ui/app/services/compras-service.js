define(['app'], function (app) {
	app.factory('ComprasService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getProveedores = getProveedores;
			service.saveCompra = saveCompra;
			service.getProductos = getProductos;
			service.getMedioPago = getMedioPago;

        	return service;

	        function saveCompra(compra) {
	        	return $http.post("http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/Compra/post",
			        compra)
			        .then(function (response) {
			            return response;
			        });
	        }

	        function getProveedores() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/proveedor/get'
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
		}
	]);

});