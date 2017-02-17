

(function (){
	'use strict';
	angular
		.module('thinkster.authentication.services')
		.factory('Authentication', Authentication);

	Authentication.$inject = ['$cookies', '$http'];

	function Authentication($cookies, $http){
		var Authentication = {
			regisster: register
		};

		return Authentication;
	}



}



	) 