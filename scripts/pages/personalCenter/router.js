define([], function(){
	'use strict';

	var router = {
		personalCenter: {
			url: '/personalCenter',
			templateUrl: 'views/personalCenter/personalCenter.html',
			controller: 'personalCenterController'
		},
		personalSetting: {
			url: '/personalSetting',
			templateUrl: 'views/personalCenter/personalSetting.html',
			controller: 'personalCenterController'
		},
		personalPassword: {
			url: '/personalPassword',
			templateUrl: 'views/personalCenter/personalPassword.html',
			controller: 'personalCenterController'
		},
		eventAlert: {
			url: '/eventAlert',
			templateUrl: 'views/personalCenter/eventAlert.html',
			controller: 'personalCenterController'
		},
		recharge: {
			url: '/recharge',
			templateUrl: 'views/personalCenter/recharge.html',
			controller: 'personalCenterController'
		}
		
	};

	return router;
});