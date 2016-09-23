define([], function(){
	'use strict';

	var router = {
		history: {
			url: '/history',
			templateUrl: 'views/appManage/history.html',
			controller: 'historyController'
		}
	};

	return router;
});