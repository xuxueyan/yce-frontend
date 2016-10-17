define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		apis.getInit = function (param, success, error){
			return utils.http($http, 'get', '/api/v1/organization/init', param, success, error);
		};
		apis.orgNameExit = function (param, success, error){
			return utils.http($http, 'post', '/api/v1/organization/check' ,param, success, error);
		};
		apis.createOrg = function (param, success, error){
			return utils.http($http, 'post', '/api/v1/organization/new', param, success, error);
		};
		apis.getOrgnzList = function (param, success, error){
			return utils.http($http, 'get', '/api/v1/organization', param, success, error);
		};
		apis.orgUpdate = function (param, success, error){
			return utils.http($http, 'post', '/api/v1/organization/update', param, success, error);
		};
		apis.orgDelete = function (param, success, error){
			return utils.http($http, 'post', '/api/v1/organization/delete', param, success, error);
		};


		return apis;
	};	

	var services = {
		module: 'orgManage',
		name: 'orgManageService',
		getApis: getApis
	};

	return services;
});