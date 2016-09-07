define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		/* 获取镜像列表 */
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

		/* 获得回滚历史列表 */
		apis.getRollbackHistory = function(param, success, error) {
		    var orgId = param.orgId;
		    var dcId = param.dcId;
		    var appName = param.appName;
		    return utils.http($http, 'get', '/api/v1/organizations/' + orgId + '/datacenters/' + dcId + '/deployments/' + appName + '/history', param, success, error);
		}

		/* 提交回滚 */
		apis.submitRollback = function(param, success, error){
		    var orgId = param.orgId;
		    var appName = param.appName;
		    return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/deployments/' + appName + '/rollback', param, success, error);
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