/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$rootScope', 'appManageService', '$localStorage', function($scope, $rootScope, appManageService, $localStorage){

            $scope.param = {"orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId}

            appManageService.getAppList($scope.param,function(data){
                if (data.code == 0) {
                   $scope.appList = JSON.parse(data.data);
                }
            });

            // 发布详情
            $scope.showAppDeployDetail = function(item){
                    $scope.appDeployDetailConf = {
                        widgetId : 'widgetAppDeployDetail',
                        widgetTitle : '发布详情',
                        isAppDeployDetail : true,
                        data : item
                    };
                    $rootScope.widget = {
                        showDeployAppDetail : true
                    };
            };


            // 应用实例详情
            $scope.showAppPodDetail = function(item){
                $scope.appPodDetailConf = {
                    widgetId : 'widgetAppPodDetail',
                    widgetTitle : '应用实例详情',
                    isAppPodDetail : true,
                    data : item
                };
                $rootScope.widget = {
                    showPodAppDetail : true
                };
            };
        }];


        var controllers = [
            {module: 'appManage', name: 'appManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);