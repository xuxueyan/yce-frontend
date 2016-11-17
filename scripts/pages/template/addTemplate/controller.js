/**
 * Created by Jora on 2016/7/29.
 */
define([], function() {
    'use strict';


    var ctrl = ['$scope', 'addTemplateService', '$localStorage', 'deploymentService', 'extensionsService', '$rootScope', 'templateService', 'atomicNotifyService', '$stateParams', function($scope, addTemplateService, $localStorage, deploymentService, extensionsService, $rootScope, templateService, atomicNotifyService, $stateParams) {

        $scope.showService = function () {
            $scope.serviceShow = true;
            $scope.applyShow = false;

            //$scope.serviceParam.serviceName = $scope.param.deployment.metadata.name + '-svc';
            //$scope.Checkeds[0].mylistValue = $scope.param.deployment.metadata.name;
            //
            //if($scope.param.deployment.spec.template.spec.containers[0].ports[0]!= undefined)
            //    $scope.ports[0].targetPort = $scope.param.deployment.spec.template.spec.containers[0].ports[0].containerPort;
            //
            //$scope.ports[0].port = $scope.param.deployment.spec.template.spec.containers[0].ports[0].containerPort;
        };

        
        
        
        $scope.showApply = function () {
            $scope.serviceShow = false;
            $scope.applyShow = true;
        };

        $scope.param = {
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



        deploymentService.getDeploymentIint({
            sessionId: $localStorage.sessionId,
            orgId: $localStorage.orgId,
            userId: $localStorage.userIid
        }, function (data) {
            if (data.code == 0) {
                $scope.initData = JSON.parse(data.data);
                $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                $scope.param.orgName = $scope.initData.orgName;
                $scope.dataTrans.quotas = $scope.initData.quotas[0].id;
            }
            $scope.nextStep = function (stepNum) {
                $scope.stepNum = stepNum;
            };
        });

        /*添加标签*/
        $scope.addLabel = function () {
            $scope.dataTrans.labels.push({key: '', value: ''});
        };
        /*删除标签*/
        $scope.deleteLabel = function ($index) {
            $scope.dataTrans.labels.splice($index, 1);
        };

        $scope.addHostPath = function (){
            $scope.param.deployment.spec.template.spec.containers[0].volumeMounts.push({
                name: '',
                mountPath: '',
                readOnly: true
            });
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
        $scope.deleteEnv = function ($index) {
            $scope.param.deployment.spec.template.spec.containers[0].env.splice($index, 1);
        };
        /*选择镜像*/
        $scope.showImageSelector = function () {
            $scope.imageSelectorConf = {
                widgetId: 'widgetImageSelector',
                widgetTitle: '选择镜像',
                isImageSelector: true
            };
            $rootScope.widget.widgetImageSelector = true;
        };
        $scope.version = "";
        /*监听imageSelector(子)页面的emit*/
        $scope.$on('imageSelector', function (event, data) {
            $scope.param.deployment.spec.template.spec.containers[0].image = data;
            $rootScope.widget.widgetImageSelector = false;
            $scope.version = data.split(":")[2];
        });

        $scope.param.deployment.spec.template.spec.containers[0].ports = [
            {protocol: "TCP"}
        ];
        $scope.addApplyPort = function () {
            if($scope.param.deployment.spec.template.spec.containers[0].ports)
                $scope.param.deployment.spec.template.spec.containers[0].ports.push({});
            else
                $scope.param.deployment.spec.template.spec.containers[0].ports = [{}];
        };
        $scope.delApplyPort = function ($index) {
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
                getTickColor: function (value) {
                    return '#d8e0f3';
                }
            }
        };

        $scope.templateNameIsExit = function (){
            if($scope.templateName != '' && $scope.templateName != undefined){
                var data = {
                    orgId: $localStorage.orgId,
                    userId: $localStorage.userId,
                    sessionId: $localStorage.sessionId,
                    "name": $scope.templateName
                };
                templateService.templateNameExit(data, function (rep){
                    if(rep.code == 1415){
                        $scope.templateNameExit = true;
                        $scope.templateNameTips = false;
                    }else{
                        $scope.templateNameExit = false;
                        $scope.templateNameTips = true;
                    }

                });
            }else{
                $scope.templateNameTips = true;
            }
        };

        $scope.nameIsExit = function () {

            if ($scope.param.deployment.metadata.name != '' && $scope.param.deployment.metadata.name != undefined) {
                var param = {
                    orgId: $localStorage.orgId,
                    userId: $localStorage.userId,
                    sessionId: $localStorage.sessionId,
                    "name": $scope.param.deployment.metadata.name
                };
                deploymentService.applyNameisExit(param, function (res) {
                    if (res.code == 1415) {
                        $scope.applyTips = false;
                        $scope.applyNameExit = true;

                    } else {
                        $scope.applyTips = true;
                        $scope.applyNameExit = false;
                    }
                });
            }
            else {
                $scope.applyTips = true;
            }
        };
        // Image
        deploymentService.delploymentImage('', function (data) {
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
            $scope.getImages = function (x) {
                $scope.param.deployment.spec.template.spec.containers[0].image = x;
                x.replace(/:(\S+)$/, function ($0, $1) {
                    $scope.param.deployment.metadata.labels.version = $1;
                });
            }
        }, function () {
            alert("getImages error");
        });

        $scope.sessionName = $localStorage.userName;
        






        // 创建服务
        extensionsService.CreatService({
            orgId: $localStorage.orgId,
            userId: $localStorage.userId,
            sessionId: $localStorage.sessionId,
        }, function (data) {
            $scope.extentServers = data;

            $scope.extentServerLei = JSON.parse(data.data);

            if ($scope.extentServers.code == 0) {
                $scope.serverDisabled = false;
                $scope.serverClick1 = function () {
                    if ($scope.serverRadios == 1) {
                        $scope.serverDisabled = false;
                    } else if ($scope.serverRadios == 0) {
                        $scope.serverDisabled = true;
                    }
                };
            }
        }, function () {
            alert(extentServers.message)
        });

        $scope.serviceParam = {
            "serviceName": "",
            "orgName": "",
            "dcIdList": [],
            "service": {
                "kind": "Service",
                "apiVersion": "v1",
                "metadata": {
                    "name": "",
                    "labels": {
                        "name": "",
                        "namespace": "",
                        "author": "",
                        "type": "service"
                    }
                },
                "spec": {
                    "type": "",
                    "selector": {},
                    "ports": [
                        {
                            "name": "port",
                            "protocol": "TCP",
                            "port": "",
                            "targetPort": "",
                            "nodePort": ""
                        }
                    ]
                }
            }
        };

        $scope.leis = [];

        // // 协议
        // $scope.portlists = [
        //     {protocol: "TCP"}
        // ];
        $scope.activities = [
            "TCP",
            "UDP"
        ];


        //   del
        $scope.delLabels = function ($index) {
            $scope.leis.splice($index, 1);
        };
        var i = 1;
        $scope.addPort = function () {
            console.log(1234567)
            $scope.serviceParam.service.spec.ports.push({
                            "name": "port",
                            "protocol": "",
                            "port": "",
                            "targetPort": "",
                            "nodePort": ""
                        });
        };
        //   del
        $scope.delPort = function ($index) {
            $scope.serviceParam.service.spec.ports.splice($index, 1);
        };

        $scope.formData = {};
        $scope.mocks = {};
        $scope.serviceDataTrans = {
            dataCenters: []
        };

        // 选择器
        $scope.Checkeds = [{"mylistKey":"name","mylistValue":""}];

        // //   port add....
        // $scope.ports = [{"name":"port1","targetPort":"","port":"","nodePort":""}];

        //   label add....
        $scope.addLabels = function () {
            $scope.leis.push({});
        };
        $scope.addCheckeds = function () {
            $scope.Checkeds.push({});
        };
        $scope.delCheckeds = function ($index) {
            $scope.Checkeds.splice($index, 1);
        };

        /*提交服务*/
        $scope.serviceNameExit = function () {
            if ($scope.serviceParam.serviceName != undefined && $scope.serviceParam.serviceName != '') {
                var param = {
                    orgId: $localStorage.orgId,
                    userId: $localStorage.userId,
                    sessionId: $localStorage.sessionId,
                    "name": $scope.serviceParam.serviceName
                };
                extensionsService.serviceExit(param, function (res) {
                    if (res.code == 1415) {
                        $scope.nameExit = true;
                    } else {
                        $scope.nameExit = false;
                    }
                });
            }else{
                $scope.serviceNameInit = true;
            }
        };



        $scope.applySerSubmit = function(){

            if(!$scope.dataTrans.advancedChecked[1]){
                delete $scope.param.deployment.spec.template.spec.containers[0].volumeMounts;
                delete $scope.param.deployment.spec.template.spec.volumes;
            }

            angular.forEach($scope.param.deployment.spec.template.spec.containers[0].volumeMounts, function (data, index){
                $scope.param.deployment.spec.template.spec.volumes[index].name = data.name;
            });

            // $scope.param.deployment.spec.template.spec.containers[0].ports.forEach(function(m) {
            //     m.containerPort = Number(m.containerPort);
            // });


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

            // 协议
            //$scope.serviceParam.service.spec.ports[0].protocol = $scope.portlists[0].protocol;
            // 服务类型  ok
            var type = "NodePort";
            if ($scope.serverRadios == 0) {
                var type = "ClusterIP";
            }
            else if ($scope.serverRadios == 1) {
                var type = "NodePort";
            }

            var demo = [];
            $scope.serviceParam.service.spec.type = type;
            $scope.serviceParam.service.metadata.name = $scope.serviceParam.serviceName;
            demo.push($scope.formData.Case);
            $scope.objs = [];
            demo.forEach(function (v) {
                for (var i in v) {
                    if (v[i] != false) {
                        $scope.objs.push(i)
                    }
                }
            });

            // 数据中心 ok
            //$scope.serviceDataTrans.dataCenters.forEach
            $scope.extentServerLei.dataCenters.forEach(function (elem, index) {

                if (elem) {
                    $scope.serviceParam.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
                }
            });
            var demoss = $scope.extentServerLei.orgName;
            $scope.serviceParam.service.metadata.labels.name = $scope.serviceParam.serviceName;
            $scope.serviceParam.service.metadata.labels.author = $scope.sessionName;
            $scope.serviceParam.service.metadata.labels.namespace = demoss;
            $scope.serviceParam.orgName = demoss;

            // 选择器
            $scope.Checkeds.forEach(function (v) {
                $scope.serviceParam.service.spec.selector[v.mylistKey] = v.mylistValue;
            });
            // label
            $scope.leis.forEach(function (v) {
                $scope.serviceParam.service.metadata.labels[v.leiKey] = v.leiValue;
            });

            // 端口组  ok
            var NewPort = $scope.serviceParam.service.spec.ports;
            NewPort.forEach(function (num) {
                if (num.nodePort != null) {
                    $scope.amock = num.nodePort;
                }
            })
            /*  提交 post  */
          //  $scope.serviceParam.service.spec.ports = $scope.ports;


            var data = {
                "name": $scope.templateName,
                "deployment": $scope.param,
                "service": $scope.serviceParam,
                "orgId": $localStorage.orgId,
                "userId": $localStorage.userId,
                "sessionId": $localStorage.sessionId
            };

            templateService.createTemplate(data, function (rep) {
                console.log(angular.toJson(data)+"   --@@== ")
                if (rep.code == 0) {
                    atomicNotifyService.success(rep.message, 2000);
                }else {
                    atomicNotifyService.error(rep.message, 2000);
                }

            })
        };

        /*点击更新，跳到创建模板页面，被传递过来的参数填充创建模板页面，作为修改*/
        if($stateParams.message){
            $scope.param = JSON.parse($stateParams.message.deployment);
            $scope.templateName = $stateParams.message.name;

            $scope.serviceParam = JSON.parse($stateParams.message.service);

            // $scope.version = "";
            // /*监听imageSelector(子)页面的emit*/
            // $scope.$on('imageSelector', function (event, data) {
            //     $scope.param.deployment.spec.template.spec.containers[0].image = data;
            //     $rootScope.widget.widgetImageSelector = false;
            //     $scope.version = data.split(":")[2];
            // });
            

            var NewSelector = $scope.serviceParam.service.spec.selector;
            $scope.Checkeds =[];
            for(var i in NewSelector){
                $scope.Checkeds.push({"mylistKey":i,"mylistValue":NewSelector[i]});
            }

        }


    }];

    var controllers = [
        { module: 'template', name: 'addTemplateController', ctrl: ctrl }
    ];

    return controllers;
});
