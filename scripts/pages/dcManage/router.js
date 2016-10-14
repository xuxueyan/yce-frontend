define([], function(){
	'use strict';

	var router = {
		dcManage: {
			url: '/dcManage',
			templateUrl: 'views/dcManage/dcManage.html',
			controller: 'dcManageController'
		},
		addDcManage: {
			url: '/addDcManage',
			templateUrl: 'views/dcManage/addDcManage.html',
			controller: 'dcManageController'
		}
		
	};

	return router;
});