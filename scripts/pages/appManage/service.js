define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		// 获取镜像列表
		apis.getImageList = function(param, success, error){
            return utils.http($http, 'get', '/api/v1/registry/images', param, success, error);
		}

		/* 获取应用列表 */
		apis.getAppList = function(param, success, error){
		    var orgId = param.orgId
		    var userId = param.userId
			return utils.http($http, 'get', '/api/v1/organizations/' + orgId + '/users/' + userId + '/deployments', param, success, error);
		};

		/* 提交滚动升级 */
		apis.submitRollingup = function(param, success, error){
		    var orgId = param.orgId;
		    var appName = param.appName;
			return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/deployments/' + appName + '/rolling', param, success, error);
		};
		/*  查看历史 GET /api/v1/organizations/{orgId}/operationlog */
		apis.historyPage = function(param, success, error){
		    var orgId = param.orgId;
			return utils.http($http, 'get', '/api/v1/organizations/' + orgId + '/operationlog', param, success, error);
		};











		return apis;
	};	

	var services = {
		module: 'appManage',
		name: 'appManageService',
		getApis: getApis
	};

	return services;
});