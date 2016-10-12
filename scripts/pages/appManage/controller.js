/**
 * Created by Jora on 2016/7/29.
 */
define([
    'base64',
    'rzSlider',
    'AngularUI'
], function(Base64, rzSlider, AngularUI) {
    'use strict';

    var ctrl = ['$scope', '$rootScope', 'appManageService', '$localStorage', '$http', function($scope, $rootScope, appManageService, $localStorage, $http) {
        $scope.canSubmit = true;
        $scope.param = { "orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId };

        $scope.loadAppList = function() {
            appManageService.getAppList($scope.param, function(data) {
                if (data.code == 0) {
                    $scope.appList = JSON.parse(data.data);
                }
                // 进度条获取值
                JSON.parse(data.data).forEach(function(app) {
                    app.deployments.forEach(function(deployment) {
                        deployment.podList.items.forEach(function(item) {
                            var a = item.status.phase;
                            if (a == 'Running') {
                                $scope.state = [{
                                    value: "100",
                                    type: "success"
                                }];
                            } else if (a == 'Pending') {
                                $scope.state = [{
                                    value: "75",
                                    type: "info"
                                }];
                            } else if (a == 'Failed') {
                                $scope.state = [{
                                    value: "100",
                                    type: "danger"
                                }];
                            } else if (a == 'Succeeded') {
                                $scope.state = [{
                                    value: "",
                                    type: ""
                                }];
                            } else if (a == 'Unknown') {
                                $scope.state = [{
                                    value: "30",
                                    type: "warning"
                                }];
                            }
                        })
                    })
                });
            });

        };
        $scope.loadAppList();
        // 发布详情
        $scope.showAppDeployDetail = function(item) {
            $scope.appDeployDetailConf = {
                widgetId: 'widgetAppDeployDetail',
                widgetTitle: '发布详情',
                isAppDeployDetail: true,
                data: item
            };
            $rootScope.widget.widgetAppDeployDetail = true;
        };




        //----------- 时间
        $scope.consoleTime = function(pod) {
            console.log(angular.toJson(pod))
        }


        // 应用实例详情
        $scope.showAppPodDetail = function(item, dcId) {
            $scope.param.dcId = dcId;
            item.param = $scope.param;
            $scope.appPodDetailConf = {
                widgetId: 'widgetAppPodDetail',
                widgetTitle: '应用实例详情',
                isAppPodDetail: true,
                data: item
            };

            $rootScope.widget.widgetAppPodDetail = true;
        };

        // 滚动升级
        $scope.endStr = "";
        $scope.rollingup = function(item, dcId, dcName, image) {
            item.dcId = dcId;
            item.dcName = dcName;
            $scope.appRollingupConf = {
                widgetId: 'widgetRollingup',
                widgetTitle: '升级',
                isRollingup: true,
                data: item
            };

            //  取用户的镜像 前面
            $rootScope.widget.widgetRollingup = true;
            var endStr = image.lastIndexOf(":");
            $scope.numNewImage = image.substring(0, endStr);

        };

        $scope.rollShow = true;

        $scope.$on('imageButton', function(event, data) {
            if (data.substring(0, data.lastIndexOf(":")) != $scope.numNewImage) {
                $scope.$broadcast('showTips', true);
                $scope.canSubmit = false;
            } else {
                $scope.$broadcast('showTips', false);
                $scope.canSubmit = true;
            }
        })

        $scope.endImgs = "";

        $scope.$on('submitRollingup', function(event, param) {
            param = angular.merge(param, $scope.param);
            if ($scope.canSubmit) {
                $scope.canSubmit = false;
                appManageService.submitRollingup(param, function(data) {
                    $rootScope.widget.widgetRollingup = false;
                    $scope.loadAppList();
                    $scope.canSubmit = true;

                }, function() {
                    $scope.canSubmit = true;
                });
            }
        });


        // 回滚
        $scope.rollback = function(item, dcId, appName) {
            $scope.appRollbackConf = {
                widgetId: 'widgetRollback',
                widgetTitle: '回滚',
                isRollback: true,
                data: item
            };

            $rootScope.widget.widgetRollback = true;

            // 查看回滚历史
            appManageService.getRollbackHistory({
                sessionId: $localStorage.sessionId,
                orgId: $localStorage.orgId,
                dcId: dcId,
                appName: item.deploy.metadata.name
            }, function(data) {
                if (data.code == 0) {
                    $scope.history = JSON.parse(data.data);
                    $scope.appRollbackConf.history = JSON.parse(data.data);
                    $scope.dcId = dcId;
                    $scope.appName = appName;
                    $scope.$broadcast('rollbackHistory', $scope.history);
                    $scope.$broadcast('rollbackDcId', $scope.dcId);
                    $scope.$broadcast('rollbackAppName', $scope.appName);
                }
            });
        };

        $scope.$on('submitRollback', function(event, param, dcId, appName) {
            param = angular.merge(param, $scope.param);
            param.dcId = dcId;
            param.appName = appName;
            if ($scope.canSubmit) {
                $scope.canSubmit = false;
                appManageService.submitRollback(param, function(data) {
                    $rootScope.widget.widgetRollback = false;
                    $scope.loadAppList();
                    $scope.canSubmit = true;
                }, function() {
                    $scope.canSubmit = true;
                });
            }
        });

        // 扩容
        $scope.scale = function(item, dcId, appName) {
            $scope.param.dcId = dcId;
            $scope.param.appName = appName;

            $scope.appScaleConf = {
                widgetId: 'widgetScale',
                widgetTitle: '扩容',
                isScale: true,
                data: item
            };

            $rootScope.widget.widgetScale = true;
        };
        $scope.$on('submitScale', function(event, param) {
            param = angular.merge(param, $scope.param);

            /************/

            if ($scope.canSubmit) {
                $scope.canSubmit = false;
                appManageService.submitScale(param, function(rep) {
                    $rootScope.widget.widgetScale = false;
                    $scope.loadAppList();
                    $scope.canSubmit = true;
                    console.log(rep)
                }, function() {
                    $scope.canSubmit = true;
                });
            }
        });

        // 删除应用
        $scope.delete = function(item, dcId, appName) {
            $scope.param.dcId = dcId;
            $scope.param.appName = appName;

            $scope.appDeleteConf = {
                widgetId: 'widgetDelete',
                widgetTitle: '删除应用',
                isDelete: true,
                data: item
            };

            $rootScope.widget.widgetDelete = true;
        };
        $scope.$on('submitDelete', function(event) {
            if ($scope.canSubmit) {
                $scope.canSubmit = false;
                appManageService.submitDelete($scope.param, function(data) {
                    $rootScope.widget.widgetDelete = false;
                    $scope.loadAppList();
                    $scope.canSubmit = true;
                }, function() {
                    $scope.canSubmit = true;
                });
            }
        });

        /*选择镜像*/
        $scope.$on('showImageSelector', function(event, data) {
            $scope.imageSelectorConf = {
                widgetId: 'widgetImageSelector',
                widgetTitle: '选择镜像',
                isImageSelector: true
            };
            $rootScope.widget.widgetImageSelector = true;
            $scope.currentWidget = data;
        });
        $scope.$on('imageSelector', function(event, data) {
            /*由于镜像选择弹窗与回滚,滚动升级弹窗是同级,镜像选择的值要传递回来,
            需要先从imageSelector页面传递到父页面(deployment.html或者appManage.html),
            然后再由appManage.html传递给回滚和滚动升级页面*/
            switch ($scope.currentWidget) {
                case 'rollingup':
                    $scope.$broadcast('rollingupImage', data);
                    break;
                case 'rollback':
                    $scope.$broadcast('rollbackImage', data);
                    break;
            }
            $rootScope.widget.widgetImageSelector = false;
        });

    }];


    var controllers = [
        { module: 'appManage', name: 'appManageController', ctrl: ctrl }
    ];
    return controllers;
});
