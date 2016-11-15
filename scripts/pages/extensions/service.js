define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		// 服务管理
		apis.serviceManages = function(myparem, success, error){
			return utils.http($http,'get','/api/v1/organizations/'+myparem.orgId+'/users/'+myparem.userId+'/extensions',myparem,success,error)
		};

		// 服务管理 post
		apis.lebelTypes = function(LebeltypeParameter, success, error){
			return utils.http($http,'post','/api/v1/organizations/'+LebeltypeParameter.orgId+'/services/'+LebeltypeParameter.serversName,LebeltypeParameter,success,error)
		};

		// 创建服务 get
		apis.CreatService = function(param, success, error){
			return utils.http($http,'get','/api/v1/organizations/'+param.orgId+'/users/'+param.userId+'/services/init',param, success, error)
		};
		// 创建服务 post
		apis.CreatServicePost = function(param, success, error){
			return utils.http($http,'post','/api/v1/organizations/'+param.orgId+'/users/'+param.userId+'/services/new',param, success, error)
		};

		// 创建访问点 get
		apis.CreatAccessPoint = function(param, success, error){
			return utils.http($http,'get','/api/v1/organizations/'+param.orgId+'/users/'+param.userId+'/endpoints/init',param, success, error)
		};

		// 创建访问点 post
		apis.CreatAccessPointPost = function(endpointsJson, success, error){
			return utils.http($http, 'post', '/api/v1/organizations/'+endpointsJson.orgId+'/users/'+endpointsJson.userId+'/endpoints/new',endpointsJson,success,error)
		};

		// 创建服务名字验证
		apis.serviceExit = function (param, success, error){
			return utils.http($http, 'post', '/api/v1/organizations/'+ param.orgId+'/users/'+ param.userId+'/services/check', param, success, error);
		};

		return apis;
	};	

	var services = {
		module: 'extensionsManage',
		name: 'extensionsService',
		getApis: getApis
	};

	return services;
});