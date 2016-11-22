/**
 * Created by Jora on 2016/7/29.
 */
define([
    'utils',
    'rzSlider',
    'atomicNotify'
], function(utils) {
    'use strict';

    var ctrl = ['$scope', '$http', 'deploymentService', '$localStorage', '$rootScope', '$state', '$timeout', 'atomicNotifyService', function($scope, $http, deploymentService, $localStorage, $rootScope, $state, $timeout, atomicNotifyService) {

        $scope.param = {
            orgId: $localStorage.orgId,
            userId: $localStorage.userId,
            sessionId: $localStorage.sessionId,
            dcIdList: [],
            deployment: {
                metadata: {
                    name: '',
                    namespace: '',
                    labels: {}
                },
                spec: {
                    template: {
                        spec: {
                            volumes: [{
                                name: '',
                                hostPath: {}
                            }],
                            containers: [{
                                env: [{
                                    name: 'DB_USER',
                                    value: ''
                                }, {
                                    name: 'DB_PASS',
                                    value: ''
                                }],
                                image: '',
                                resources: {
                                    limits: {}
                                },
                                ports: [{
                                    name: '',
                                    containerPort: '',
                                    protocol: ''

                                }],
                                volumeMounts: [{
                                    name: '',
                                    mountPath: '',
                                    readOnly: true
                                }]
                            }]
                        }
                    }
                }
            }
        };

        $scope.dataTrans = {
            dataCenters: [],
            labels: [],
            quotas: '',
            author: $localStorage.userName,
            advancedChecked: []
        };

        //副本数 插件配置
        $scope.slider = {
            value: 1,
            options: {
                ceil: 10,
                floor: 1,
                showSelectionBar: true,
                showTicks: true,
                getTickColor: function(value) {
                    return '#d8e0f3';
                }
            }
        };

        //基础,高级选项显示切换
        $scope.stepNum = 1;

        $scope.dataTrans.advancedChecked[1] = false;

        $scope.nextStep = function(stepNum) {
            $scope.stepNum = stepNum;
        };

        var param = {
            'sessionId': $localStorage.sessionId,
            'orgId': $localStorage.orgId,
            'userId': $localStorage.userId
        };
        //创建服务初始化,获取数据中心信息
        deploymentService.getDeploymentIint(param, function(data) {
            if (data.code == 0) {
                $scope.initData = JSON.parse(data.data);
                //组织名获取
                $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                $scope.param.orgName = $scope.initData.orgName;
                $scope.dataTrans.quotas = $scope.initData.quotas[0].id;
            }
        });
        //环境变量 添加
        $scope.addEnv = function () {
            //导入模版处理
            if($scope.param.deployment.spec.template.spec.containers[0].env)
                $scope.param.deployment.spec.template.spec.containers[0].env.push({});
            else
                $scope.param.deployment.spec.template.spec.containers[0].env = [{}];
        };
        //环境变量 删除
        $scope.deleteEnv = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].env.splice($index, 1);
        };
        //开放端口 添加
        $scope.addPort = function() {
            if($scope.param.deployment.spec.template.spec.containers[0].ports)
                $scope.param.deployment.spec.template.spec.containers[0].ports.push({});
            else
                $scope.param.deployment.spec.template.spec.containers[0].ports = [{
                    name: '',
                    mountPath: '',
                    readOnly: true
                }];
        };
        //开放端口 删除
        $scope.delPort = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].ports.splice($index, 1)
        };
        //开放端口 协议静态 options
        $scope.protocolArray = ['TCP', 'UDP'];

        //标签组 添加
        $scope.addLabel = function() {
            if($scope.dataTrans.labels)
                $scope.dataTrans.labels.push({});
            else
                $scope.dataTrans.labels = [{}];
        };
        //标签组 删除
        $scope.deleteLabel = function($index) {
            $scope.dataTrans.labels.splice($index, 1);
        };
        //存储卷 添加
        $scope.addHostPath = function (){
            if($scope.param.deployment.spec.template.spec.containers[0].volumeMounts)
                $scope.param.deployment.spec.template.spec.containers[0].volumeMounts.push({});
            else
                $scope.param.deployment.spec.template.spec.containers[0].volumeMounts = [{}];
        };
        //存储卷 删除
        $scope.delHostPath = function ($index){
            $scope.param.deployment.spec.template.spec.containers[0].volumeMounts.splice($index, 1);
        };
        //导入模版 弹窗
        $scope.showImportTem = function (){
            $scope.importTemplateConf = {
                widgetId: 'widgetImportTemplate',
                widgetTitle: '选择模版',
                importTemplate: true
            };

            $rootScope.widget.widgetImportTemplate = true;
        };
        //选择模版
        $scope.$on('templateSelector', function(event, data){
            $rootScope.widget.widgetImportTemplate = false;

            $scope.param = JSON.parse(data.deployment);
            $scope.param.orgId = $localStorage.orgId;
            $scope.param.userId = $localStorage.userId;
            $scope.param.sessionId = $localStorage.sessionId;
            $scope.param.deployment.metadata.name = '';
            $scope.version = $scope.param.deployment.spec.template.spec.containers[0].image.split(":")[2];

            //数据中心选中 dcList -> BUG
            angular.forEach($scope.param.dcIdList, function (data){
                var dcId = data;
                angular.forEach($scope.initData.dataCenters, function (data, index){
                    if(dcId == data.id){
                        $scope.dataTrans.dataCenters[index] = true;
                    }
                });
            });
        });

        //选择镜像 弹窗
        $scope.showImageSelector = function() {
            $scope.imageSelectorConf = {
                widgetId: 'widgetImageSelector',
                widgetTitle: '选择镜像',
                isImageSelector: true
            };
            $rootScope.widget.widgetImageSelector = true;
        };

        //选择镜像后操作
        $scope.$on('imageSelector', function(event, data) {
            $rootScope.widget.widgetImageSelector = false;
            $scope.param.deployment.spec.template.spec.containers[0].image = data;
            $scope.version = data.split(":")[2];
        });

        //验证应用名是否存在
        $scope.nameIsExit = function (){
            if($scope.param.deployment.metadata.name !='' && $scope.param.deployment.metadata.name != undefined){
                var param = {
                    orgId: $localStorage.orgId,
                    userId: $localStorage.userId,
                    sessionId: $localStorage.sessionId,
                    name: $scope.param.deployment.metadata.name
                };
                deploymentService.applyNameisExit(param, function(res){
                    if(res.code == 1415){
                        $scope.applyTips = false;
                        $scope.applyNameExit = true;
                    }else{
                        $scope.applyTips = true;
                        $scope.applyNameExit = false;

                    }
                });
            }
            else{
                $scope.applyTips = true;
            }
        };

        //发布应用
        $scope.submitApply = function() {

            if(!$scope.dataTrans.advancedChecked[1]){
                delete $scope.param.deployment.spec.template.spec.containers[0].volumeMounts;
                delete $scope.param.deployment.spec.template.spec.volumes;
            }

            //HostPath Name值传入param .. volumes中
            angular.forEach($scope.param.deployment.spec.template.spec.containers[0].volumeMounts, function (data, index){
                $scope.param.deployment.spec.template.spec.volumes[index].name = data.name;
            });

            $scope.param.deployment.metadata.labels = {
                "name": $scope.param.deployment.metadata.name,
                "author": $localStorage.userName,
                "version": $scope.version
            };

            $scope.param.appName = $scope.param.deployment.metadata.name;

            //dcLict BUG -> 数组去重等处理
            $scope.dataTrans.dataCenters.forEach(function(elem, index) {
                if (elem) {
                    if(! utils.findInArr($scope.param.dcIdList, $scope.initData.dataCenters[index].id))
                        $scope.param.dcIdList.push($scope.initData.dataCenters[index].id);
                }else {
                    $scope.param.dcIdList.shift($scope.initData.dataCenters[index].id);
                }
            });

            $scope.dataTrans.labels.forEach(function(elem, index) {
                $scope.param.deployment.metadata.labels[elem.key] = elem.value;
            });
            var limits = $scope.initData.quotas.filter(function(item) {
                return item.id == $scope.dataTrans.quotas;
            })[0];

            $scope.param.deployment.spec.template.spec.containers[0].resources.limits = {
                cpu: limits.cpu + '000m',
                memory: limits.mem + '000M'
            };

            $scope.param.deployment.spec.template.metadata = {
                labels: $scope.param.deployment.metadata.labels
            };

            $scope.param.deployment.spec.template.spec.containers[0].name = $scope.param.deployment.metadata.name;

            deploymentService.deploymentSubmit($scope.param, function(rep) {

                if (rep.code == 0) {
                    atomicNotifyService.success(rep.message, 2000);
                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 1000);
                } else {
                    atomicNotifyService.error(rep.message, 2000);
                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 1000);
                }

            }, function(rep) {
                atomicNotifyService.error(rep.message, 2000);
            });
        };

    }];
    var controllers = [
        { module: 'appManage', name: 'deploymentController', ctrl: ctrl }
    ];

    return controllers;
});
