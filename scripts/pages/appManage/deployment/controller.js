/**
 * Created by Jora on 2016/7/29.
 */
define([
    'base64',
    'rzSlider'
], function(Base64, rzSlider) {
    'use strict';

    var ctrl = ['$scope', '$http', 'deploymentService', '$localStorage', '$rootScope', '$state', '$timeout', function($scope, $http, deploymentService, $localStorage, $rootScope, $state, $timeout) {

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
            author: $localStorage.userName
        };
        $scope.stepNum = 1;

        deploymentService.getDeploymentIint({
            sessionId: $localStorage.sessionId,
            orgId: $localStorage.orgId,
            userId: $localStorage.userIid
        }, function(data) {
            if (data.code == 0) {
                $scope.initData = JSON.parse(data.data);
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

        /*添加环境变量*/
        $scope.addEnv = function() {
            $scope.param.deployment.spec.template.spec.containers[0].env.push({ name: '', value: '' });
        };
        /*删除环境变量*/
        $scope.deleteEnv = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].env.splice($index, 1);
        };
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
            $scope.param.deployment.spec.template.spec.containers[0].ports.push({
            });
        }
        $scope.delPort = function($index) {
            $scope.param.deployment.spec.template.spec.containers[0].ports.splice($index, 1)
        }
        //$scope.activities = [
        //    "TCP",
        //    "UDP"
        //];

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
            })


            $scope.param.deployment.metadata.labels = {
                "name": $scope.param.deployment.metadata.name,
                "author": $localStorage.userName,
                "version": $scope.version
            };
            $scope.param.appName = $scope.param.deployment.metadata.name;
            $scope.dataTrans.dataCenters.forEach(function(elem, index) {
                if (elem) {
                    $scope.param.dcIdList.push($scope.initData.dataCenters[index].id);
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

                $scope.showstatusMes = true;
                if (rep.code == 0) {
                    $scope.message = rep.message;
                    $scope.status = true;

                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 1000);
                } else {
                    $scope.message = rep.message;
                    $scope.status = false;
                    $timeout(function() {
                        $state.go('main.appManage');
                    }, 1000);
                }


            }, function() {
                $scope.showstatusMes = true;
                $scope.message = '提交失败!';
                $scope.status = false;

            });
        };

        // Image
        deploymentService.delploymentImage('', function(data) {
            var dataObject = JSON.parse(data.data);

            // make new images:tags
            var imageArr = new Array();
            var k = 0
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
            alert("getImages error")
        })

    }];
    var controllers = [
        { module: 'appManage', name: 'deploymentController', ctrl: ctrl }
    ];

    return controllers;
});
