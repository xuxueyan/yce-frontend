define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};

		/* 获取镜像列表 */
		apis.getImageList = function(param, success, error){
            return utils.http($http, 'get', '/api/v1/registry/images', param, success, error);
		};

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

		/* 获得回滚历史列表 */
		apis.getRollbackHistory = function(param, success, error) {

		    var orgId = param.orgId;
		    var dcId = param.dcId;
		    var appName = param.appName;
		    return utils.http($http, 'get', '/api/v1/organizations/' + orgId + '/datacenters/' + dcId + '/deployments/' + appName + '/history', param, success, error);
		};

		/* 提交回滚 */
		apis.submitRollback = function(param, success, error){
		    var orgId = param.orgId;
		    var appName = param.appName;
		    var request = {
                appName: appName,
                dcIdList: [param.dcId],
		        userId: param.userId,
		        image: param.image,
		        revision: param.revision,
		        comments: "rollback to revision: " + param.revision + " and image: " + param.image,
		        sessionId: param.sessionId
		    };

		    return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/deployments/' + appName + '/rollback', request, success, error);
		};

		/* 提交扩容 */
		apis.submitScale = function(param, success, error){
            var orgId = param.orgId;
		    var appName = param.appName;
            var request = {
                newSize: param.newSize,
                dcIdList: [param.dcId],
                userId: Number(param.userId),
                comments: "scale to " + param.newSize + " instances",
                sessionId: param.sessionId
            };
		    return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/deployments/' + appName + '/scale', request, success, error);
		};

		/* 提交删除 */
		apis.submitDelete = function(param, success, error){
		    var orgId = param.orgId;
            var appName = param.appName;
            var request = {
                userId: param.userId,
                dcIdList: [param.dcId],
                sessionId: param.sessionId,
                comments: "delete app: " + param.appName
            };
		    return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/deployments/' + appName + '/delete', request, success, error);
		};

		/* 查看pod日志 */
		apis.getLogs = function(param, success, error){
		    var orgId = param.orgId;
		    var podName = param.podName;
		    var request = {
                userId: param.userId,
                dcIdList: [param.dcId],
                sessionId: param.sessionId,
                logOption: {
                    container: "",
                    follow: false,
                    previous: false,
                    timeStamps: true,
                    tailLines: 100,
                }
		    };

		    return utils.http($http, 'post', '/api/v1/organizations/' + orgId + '/pods/' + podName + '/logs', request, success, error);
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