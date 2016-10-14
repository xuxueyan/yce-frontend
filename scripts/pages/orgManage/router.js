define([], function(){
	'use strict';

	var router = {
		orgManage: {
			url: '/orgManage',
			templateUrl: 'views/orgManage/orgManage.html',
			controller: 'orgManageController'
		},
		addOrgManage: {
			url: '/addOrgManage',
			templateUrl: 'views/orgManage/addOrgManage.html',
			controller: 'orgManageController'
		}
		
	};

	return router;
});