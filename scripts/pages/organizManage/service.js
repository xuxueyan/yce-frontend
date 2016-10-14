define([
    'utils'
], function(utils){
    'use strict';

    var getApis = function($http){
        var apis = {};

        apis.getOrgList = function (param, success, error){
            return utils.http($http, 'get', '/api/v1/organization/init', param, success, error);
        };
        apis.orgNameExit = function (param, success, error){
            return utils.http($http, 'post', '/api/v1/organization/check' ,param, success, error);
        };
        apis.createOrg = function (param, success, error){
            return utils.http($http, 'post', '/api/v1/organization/new', param, success, error);
        };

        return apis;
    };

    var services = {
        module: 'organizManage',
        name: 'organizManageService',
        getApis: getApis
    };

    return services;
});