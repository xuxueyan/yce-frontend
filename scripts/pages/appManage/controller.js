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

            var map = {
                1 :"查询",
                2 :"上线",
                3 :"回滚",
                4 :"滚动升级",
                5 :"扩容",
                6 :"取消上线,下线",
                7 :"暂停上线",
                8 :"恢复上线"
            }

            /*  historyPage  */
            appManageService.historyPage($scope.param,function(data){
                if (data.code == 0) {
                    $scope.historyList = JSON.parse(data.data);
                    $scope.historyList[0].records.actionName = map[angular.toJson($scope.historyList[0].records.actionType)];




                    /*  点击显示详细信息  */
                    $scope.historyLi = function(item){

//                    console.log(angular.toJson(item))
//ok    console.log(JSON.parse(item.records.json).spec.replicas)
//ok    console.log(JSON.parse(item.records.json).spec.template.spec.containers[0].image);
//ok console.log(JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.cpu);
//ok console.log(JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.memory);
//ok console.log(JSON.parse(item.records.json).spec.template.spec.containers[0].imagePullPolicy);

        $scope.Newreplicas = JSON.parse(item.records.json).spec.replicas;
        $scope.Newimage = JSON.parse(item.records.json).spec.template.spec.containers[0].image;
        $scope.Newcpu = JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.cpu;
        $scope.Newmemory = JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.memory;
        $scope.NewimagePullPolicy = JSON.parse(item.records.json).spec.template.spec.containers[0].imagePullPolicy;






                    }
                }
            });



















        }]; //    ****** end


        var controllers = [
            {module: 'appManage', name: 'appManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);