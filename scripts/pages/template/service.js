define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		apis.getTemplateList = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/organizations/'+param.orgId+'/users/'+param.userId+'/templates', param, success, error)
		}

		apis.TemplateDelete = function(param, success, error){
			return utils.http($http, 'post', '/api/v1/organizations/'+param.orgId+'/users/'+param.userId+'/templates/delete', param, success, error)
		}
		




		

		return apis;
	};	

	var services = {
		module: 'template',
		name: 'templateService',
		getApis: getApis
	};

	return services;
});