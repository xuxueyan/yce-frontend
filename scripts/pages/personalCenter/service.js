define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		apis.eventAlertData = function(param, success, error){
			return utils.http($http, 'get', 'myData.json', param, success, error)
		}
		
		
		return apis;
	};	

	var services = {
		module: 'personalCenter',
		name: 'personalCenterService',
		getApis: getApis
	};

	return services;
});