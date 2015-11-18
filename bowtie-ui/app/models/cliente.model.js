define(['app'], function (app) {
	app.factory('ClienteModel',  function() 
	{
		function Cliente() {};

		Cliente.prototype = 
		{
			nombre 		: "",
	        email  		: "",
	        telefono 	: "",
	        notas 		: "",
	        clearCliente	: function() 
	        {
	        	this.nombre = "";
		        this.email  = "";
		        this.telefono = "";
		        this.notas 	= "";
	        }
		};

		return Cliente;
	});	
});