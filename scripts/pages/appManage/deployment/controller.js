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
                                    hostPort: {},
                                    containerPort: {},
                                    protocol: '',
                                    hostIP: ''
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

        $scope.dataTrans.advancedChecked[1] = false;
        $scope.stepNum = 1;

        deploymentService.getDeploymentIint({
            sessionId: $localStorage.sessionId,
            orgId: $localStorage.orgId,
            userId: $localStorage.userIid
        }, function(data) {
            if (data.code == 0) {
                $scope.initData = JSON.parse(data.data);
                //组织名
                $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                $scope.param.orgName = $scope.initData.orgName;

                $scope.dataTrans.quotas = $scope.initData.quotas[0].id;
            }
            $scope.nextStep = function(stepNum) {
                $scope.stepNum = stepNum;
            };
        });

        /*添加标签*/
        $scope.addLabel = function() {
            $scope.dataTrans.labels.push({ key: '', value: '' });
        };
        /*删除标签*/
        $scope.deleteLabel = function($index) {
            $scope.dataTrans.labels.splice($index, 1);
        };

        $scope.addHostPath = function (){

            if($scope.param.deployment.spec.template.spec.containers[0].volumeMounts)
                $scope.param.deployment.spec.template.spec.containers[0].volumeMounts.push({
                    name: '',
                    mountPath: '',
                    readOnly: true
                });
            else
                $scope.param.deployment.spec.template.spec.containers[0].volumeMounts = [{
                    name: '',
                    mountPath: '',
                    readOnly: true
                }];

        };

        $scope.delHostPath = function ($index){
            $scope.param.deployment.spec.template.spec.containers[0].volumeMounts.splice($index, 1);
        };

        /*添加环境变量*/
        $scope.addEnv = function () {
            if($scope.param.deployment.spec.template.spec.containers[0].env)
                $scope.param.deployment.spec.template.spec.containers[0].env.push({name: '', value: ''});
            else
                $scope.param.deployment.spec.template.spec.containers[0].env = [{name: '', value: ''}];
        };

        /*删除环境变量*/
        $scope.deleteEnv = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].env.splice($index, 1);
        };
        $scope.showImportTem = function (){

            $scope.importTemplateConf = {
                widgetId: 'widgetImportTemplate',
                widgetTitle: '选择模版',
                importTemplate: true
            };

            $rootScope.widget.widgetImportTemplate = true;
        };
        $scope.$on('templateSelector', function(event, data){

            $rootScope.widget.widgetImportTemplate = false;

            $scope.param = JSON.parse(data.deployment);
            $scope.param.orgId = $localStorage.orgId;
            $scope.param.userId = $localStorage.userId;
            $scope.param.sessionId = $localStorage.sessionId;

            angular.forEach($scope.param.dcIdList, function (data, index ,array){
                var dcId = data;
                angular.forEach($scope.initData.dataCenters, function (data, index, array){
                    if(dcId == data.id){
                        $scope.dataTrans.dataCenters[index] = true;
                    }

                });
            });



        });


        /*选择镜像*/
        $scope.showImageSelector = function() {
            $scope.imageSelectorConf = {
                widgetId: 'widgetImageSelector',
                widgetTitle: '选择镜像',
                isImageSelector: true
            };
            $rootScope.widget.widgetImageSelector = true;
        };
        $scope.version = "";
        /*监听imageSelector(子)页面的emit*/
        $scope.$on('imageSelector', function(event, data) {
            $scope.param.deployment.spec.template.spec.containers[0].image = data;
            $rootScope.widget.widgetImageSelector = false;
            $scope.version = data.split(":")[2];
        });

        $scope.param.deployment.spec.template.spec.containers[0].ports = [
            { protocol: "TCP" }
        ];
        $scope.addPort = function() {
            if($scope.param.deployment.spec.template.spec.containers[0].ports)
                $scope.param.deployment.spec.template.spec.containers[0].ports.push({});
            else
                $scope.param.deployment.spec.template.spec.containers[0].ports = [{}];
        };
        $scope.delPort = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].ports.splice($index, 1)
        };
        $scope.activities = [
            "TCP",
            "UDP"
        ];

        /*滑块*/
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

        $scope.nameIsExit = function (){

            if($scope.param.deployment.metadata.name !='' && $scope.param.deployment.metadata.name != undefined){
                var param = {
                    orgId: $localStorage.orgId,
                    userId: $localStorage.userId,
                    sessionId: $localStorage.sessionId,
                    "name": $scope.param.deployment.metadata.name
                };
                deploymentService.applyNameisExit(param, function(res){
                    if(res.code == 1415){
                        $scope.applyTips = false;
                        $scope.applyNameExit = true;
                        $scope.submit = function(){
                            return;
                        }

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

        /*提交表单*/
        $scope.submit = function() {

            $scope.param.deployment.spec.template.spec.containers[0].ports.forEach(function(m) {
                m.containerPort = Number(m.containerPort);
            });

            angular.forEach($scope.param.deployment.spec.template.spec.containers[0].volumeMounts, function (data, index){
                $scope.param.deployment.spec.template.spec.volumes[index].name = data.name;
            });

            $scope.param.deployment.metadata.labels = {
                "name": $scope.param.deployment.metadata.name,
                "author": $localStorage.userName,
                "version": $scope.version
            };

            $scope.param.appName = $scope.param.deployment.metadata.name;

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


            if(!$scope.dataTrans.advancedChecked[1]){
                delete $scope.param.deployment.spec.template.spec.containers[0].volumeMounts;
                delete $scope.param.deployment.spec.template.spec.volumes;
            }

            deploymentService.deploymentSubmit($scope.param, function(rep) {

                if (rep.code == 0) {
                    atomicNotifyService.success(rep.message, 2000);
                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 500);
                } else {
                    atomicNotifyService.error(rep.message, 2000);
                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 500);
                }
                
            }, function(rep) {
                atomicNotifyService.error(rep.message, 2000);
            });
        };

        // Image
        deploymentService.delploymentImage('', function(data) {
            var dataObject = JSON.parse(data.data);

            // make new images:tags
            var imageArr = new Array();
            var k = 0;
            for (var i in dataObject) {
                var list = dataObject[i].tags;
                for (var j in list) {
                    imageArr[k] = dataObject[i].name + ":" + list[j];
                    k = k + 1
                }
            }

            $scope.imageList = imageArr;
            $scope.getImages = function(x) {
                $scope.param.deployment.spec.template.spec.containers[0].image = x;
                x.replace(/:(\S+)$/, function($0, $1) {
                    $scope.param.deployment.metadata.labels.version = $1;
                });
            }
        }, function() {
            alert("getImages error");
        })

    }];
    var controllers = [
        { module: 'appManage', name: 'deploymentController', ctrl: ctrl }
    ];

    return controllers;
});
