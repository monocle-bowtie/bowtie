define(['app'], function (app) {
	app.factory('ClientesService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getClientes = getClientes;
			service.saveCliente = saveCliente;

        	return service;

	        function getClientes() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/cliente/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	         function saveCliente(cliente) {
	        	return $http.post("http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/cliente/post",
			        cliente)
			        .then(function (response) {
			            return response;
			        });
	        }
		}
	]);

});