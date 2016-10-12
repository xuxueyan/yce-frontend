define([
	'utils'
	], function(utils){
	'use strict';

	var getApis = function($http){
		var apis = {};


		apis.setUpUser = function(param, success, error){
			return utils.http($http, 'get', '/api/v1/user/init', param, success, error)
		}

		// 判断用户名是否重名
		apis.UsernameJudge = function(requires, success, error){
			return utils.http($http, 'post', '/api/v1/user/check', requires, success, error)
		}

		// 点击提交
		apis.UserSubmit = function(putUp, success, error){
			return utils.http($http, 'post', '/api/v1/user/new', putUp, success, error)
		}

		
		return apis;
	};	

	var services = {
		module: 'rbdManage',
		name: 'rbdManageService',
		getApis: getApis
	};

	return services;
});