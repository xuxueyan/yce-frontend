define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};
		// 数据中心名校验
		apis.addDcMangaePOST = function(param, success, error){
			return utils.http($http, 'post', '/api/v1/datacenter/check', param, success, error)
		}

		// 提交表单
		apis.addDcPostList = function(param, success, error){
			return utils.http($http, 'post', '/api/v1/datacenter/new', param, success, error)
		}
		
		return apis;
	};	

	var services = {
		module: 'dcManage',
		name: 'dcManageService',
		getApis: getApis
	};

	return services;
});