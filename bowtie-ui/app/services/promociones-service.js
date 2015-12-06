define(['app'], function (app) {
	app.factory('PromocionesService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};
			
			service.getListadoPromociones = getListadoPromociones;
			service.savePromo = savePromo;
			service.getProductos = getProductos;

        	return service;

        	function getProductos() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/productos/get'
					}).then(function successCallback(response) {
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function getListadoPromociones() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/promocion/getpromodetalle'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function savePromo(promocion) {
	        	return $http.post("http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/promocion/post",
			        promocion)
			        .then(function (response) {
			            return response;
			        });
	        }
        	
		}
	]);

});