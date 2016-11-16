define([], function(){
	'use strict';

	var router = {
		addTp: {
			params:{
				'message': null
			},
			url: '/addTp',
			templateUrl: 'views/template/addTemplate.html',
			controller: 'addTemplateController'
		}
	};

	return router;
});