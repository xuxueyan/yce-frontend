define([], function(){
	'use strict';

	var router = {
		addTp: {
			url: '/addTp',
			templateUrl: 'views/template/addTemplate.html',
			controller: 'addTemplateController'
		}
	};

	return router;
});