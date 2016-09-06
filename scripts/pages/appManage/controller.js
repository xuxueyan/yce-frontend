/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$rootScope', 'appManageService', '$localStorage', '$http', function($scope, $rootScope, appManageService, $localStorage, $http){
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
            $scope.rollingup = function(item, dcId, dcName){
                item.dcId = dcId;
                item.dcName = dcName;
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

            // 回滚
            $scope.rollback = function(item){
                $scope.appRollbackConf = {
                    widgetId : 'widgetRollback',
                    widgetTitle : '回滚',
                    isRollback: true,
                    data : item
                };

                $rootScope.widget.widgetRollback = true;
            };

            $scope.$on('submitRollback',function(event,param){
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

            // 回滚
            $scope.scale = function(item){
                $scope.appScaleConf = {
                    widgetId : 'widgetScale',
                    widgetTitle : '扩容',
                    isScale: true,
                    data : item
                };

                $rootScope.widget.widgetScale = true;
            };

            $scope.$on('submitScale',function(event,param){
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

            // 获取镜像列表
            appManageService.getImageList({
                sessionId : $localStorage.sessionId,
                orgId : $localStorage.orgId,
                userId :$localStorage.userIid
             }, function(data){
                if(data.code == 0){
                    var dataObject = JSON.parse(data.data);
                    console.log("xxxxx: " + dataObject)

                    // make new images:tags
                    var imageArr = new Array();
                    var k = 0
                    for (var i in dataObject) {
                        var list = dataObject[i].tags;
                        for (var j in list) {
                            imageArr[k] = dataObject[i].name + ":" + list[j];
                            k=k+1
                        }
                    }

                    $scope.imageList = imageArr;
                    $scope.getImages = function(x) {
                        $scope.param.deployment.spec.template.spec.containers[0].image=x;
                        x.replace(/:(\S+)$/,function($0,$1){
                            $scope.param.deployment.metadata.labels.version = $1;
                        });
                    };
                }
            });
        }];


        var controllers = [
            {module: 'appManage', name: 'appManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);