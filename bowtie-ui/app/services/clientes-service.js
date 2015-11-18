define(['app'], function (app) {
	app.factory('ClientesService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getClientes = getClientes;

        	return service;

	        function getClientes() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://localhost:8080/api/clientes.json'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }
		}
	]);

});