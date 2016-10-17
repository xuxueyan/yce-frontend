define([], function(){
	'use strict';

	var router = {
		userManage: {
			url: '/userManage',
			templateUrl: 'views/userManage/userManage.html',
			controller: 'userManageController'
		},
		createUserManage: {
			url: '/createUserManage',
			templateUrl: 'views/userManage/createUserManage.html',
			controller: 'userManageController'
		}
		
	};

	return router;
});