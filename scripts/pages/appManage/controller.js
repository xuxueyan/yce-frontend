/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$rootScope', 'appManageService', '$localStorage', function($scope, $rootScope, appManageService, $localStorage){
            $scope.canSubmit = true;
            $scope.param = {"orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId};

            $scope.loadAppList = function(){
                appManageService.getAppList($scope.param,function(data){
                    if (data.code == 0) {
                       $scope.appList = JSON.parse(data.data);
                    }
                });
            };
            $scope.loadAppList();

            // 发布详情
            $scope.showAppDeployDetail = function(item){
                $scope.appDeployDetailConf = {
                    widgetId : 'widgetAppDeployDetail',
                    widgetTitle : '发布详情',
                    isAppDeployDetail : true,
                    data : item
                };
                $rootScope.widget.widgetAppDeployDetail = true;
            };


            // 应用实例详情
            $scope.showAppPodDetail = function(item){
                $scope.appPodDetailConf = {
                    widgetId : 'widgetAppPodDetail',
                    widgetTitle : '应用实例详情',
                    isAppPodDetail : true,
                    data : item
                };
                $rootScope.widget.widgetAppPodDetail = true;
            };

            // 滚动升级
            $scope.rollingup = function(item){
                $scope.appRollingupConf = {
                    widgetId : 'widgetRollingup',
                    widgetTitle : '升级',
                    isRollingup: true,
                    data : item
                };

                $rootScope.widget.widgetRollingup = true;
            };
            $scope.$on('submitRollingup',function(event,param){
                param = angular.merge(param, $scope.param);
                if($scope.canSubmit){
                    $scope.canSubmit = false;
                    appManageService.submitRollingup(param,function(data){
                        console.log(data);
                        $rootScope.widget.widgetRollingup = false;
                        $scope.loadAppList();
                        $scope.canSubmit = true;
                    },function(){
                        $scope.canSubmit = true;
                    });
                }
            });
        }];


        var controllers = [
            {module: 'appManage', name: 'appManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);