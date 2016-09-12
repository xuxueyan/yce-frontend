define([], function(){
	'use strict';

	var router = {
		topology: {
			url: '/topology',
			templateUrl: 'views/topology/topology.html',
			controller: 'topologyController'
		}
	};

	return router;
});