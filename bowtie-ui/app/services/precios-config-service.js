define(['app'], function (app) {
	app.factory('PreciosConfigService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getCategorias = getCategorias;
			service.saveGrupo = saveGrupo;

        	return service;

        	function getCategorias() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/grupo/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function saveGrupo(grupo) {
	        	return $http.post("http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/grupo/post",
			        grupo)
			        .then(function (response) {
			            return response;
			        });
				
	        }
        	
		}
	]);

});