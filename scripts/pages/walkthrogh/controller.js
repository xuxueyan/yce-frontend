/**
 * Created by Jora on 2016/7/29.
 */
define([
    'utils'
    ], function (utils) {
        'use strict';


        var ctrl = ['$scope', '$rootScope', 'walkthroghService', '$localStorage', 'deploymentService', 'extensionsService', '$timeout', '$state', '$interval',  function ($scope, $rootScope, walkthroghService, $localStorage, deploymentService, extensionsService, $timeout, $state, $interval) {

            $scope.stepNum = 1;

            $scope.showService = function() {
                $scope.serviceShow = true;
                $scope.applyShow = false;

                if($scope.param.deployment.metadata.name){
                    $scope.serviceParam.serviceName = $scope.param.deployment.metadata.name + '-svc';
                    //$scope.Checkeds[0].mylistValue = $scope.param.deployment.metadata.name;
                }
                // if($scope.param.deployment.spec.template.spec.containers[0].ports[0].containerPort){
                //     $scope.ports[0].targetPort = $scope.param.deployment.spec.template.spec.containers[0].ports[0].containerPort;
                //     $scope.ports[0].port = $scope.param.deployment.spec.template.spec.containers[0].ports[0].containerPort;
                // }

            };

            $scope.showApply = function () {
                $scope.serviceShow = false;
                $scope.applyShow = true;
            };

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
                'userId': $localStorage.userIid
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
            $scope.addApplyPort = function() {
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
            $scope.delApplyPort = function($index) {
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
                        console.info('应用发布成功');
                    } else {
                        console.error('应用发布失败');
                    }
                });
            };


            $scope.sessionName = $localStorage.userName;

            var myParam = {
                orgId: $localStorage.orgId,
                userId: $localStorage.userId,
                sessionId: $localStorage.sessionId
            };


            var demoss = "";
            $scope.leis = [];
            $scope.formData = {};
            var demo = [];
            $scope.mocks = {};
            $scope.serviceDataTrans = {
                dataCenters: []
            };

            //拼接json
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
                            "namespace":"",
                            "author" : "",
                            "type" : "service"
                        }
                    },
                    "spec": {
                        "type": "",
                        "selector": {},
                        "ports": [
                            {
                                "name": "",
                                "protocol": ""
                            }
                        ]
                    }
                }
            };

            //创建服务
            extensionsService.CreatService(myParam,function(data){
                
                if(data.code == 0){
                    $scope.extentServerLei = JSON.parse(data.data);
                    demoss = $scope.extentServerLei.orgName;
                }
            },function(data){
                alert(data.message);
            });
            $scope.serverDisabled = false;
            $scope.serverClick1 = function(){
                if($scope.serverRadios == 1){
                    $scope.serverDisabled = false;
                }else if($scope.serverRadios == 0){
                    $scope.serverDisabled = true;
                }
            };

            //标签 添加
            $scope.addLabels = function(){
                $scope.leis.push({});
            };
            //标签 删除
            $scope.delLabels = function($index){
                $scope.leis.splice($index,1);
            };
            //端口 添加
            $scope.addPort = function () {
                $scope.serviceParam.service.spec.ports.push({});
            };
            //端口 删除
            $scope.delPort = function ($index) {
                $scope.serviceParam.service.spec.ports.splice($index, 1);
            };

            //选择器
            $scope.Checkeds = [{}];
            $scope.addCheckeds = function(){
                $scope.Checkeds.push({});
            };
            $scope.delCheckeds = function($index){
                $scope.Checkeds.splice($index,1);
            };


            //文本框失焦的时候创建服务重名验证
            $scope.serviceNameExit = function(){
                if( $scope.serviceParam.serviceName != undefined && $scope.serviceParam.serviceName != ''){
                    var param = {
                        orgId: $localStorage.orgId,
                        userId: $localStorage.userId,
                        sessionId: $localStorage.sessionId,
                        "name": $scope.serviceParam.serviceName
                    };
                    extensionsService.serviceExit(param, function(res){
                        if(res.code == 1415){
                            $scope.nameExit = true;
                        }else{
                            $scope.nameExit = false;
                        }
                    });
                }
            };

            //提交创建服务json
            $scope.serverSubmit = function(){
                $scope.objs=[];

                //服务类型
                var type = "NodePort";
                if($scope.serverRadios == 0){
                    var type="ClusterIP";
                }
                else if($scope.serverRadios == 1){
                    var type="NodePort";
                }
                $scope.serviceParam.service.spec.type = type;
                $scope.serviceParam.service.metadata.name = $scope.serviceParam.serviceName;
                demo.push($scope.formData.Case);
                demo.forEach(function(v){
                    for(var i in v){
                        if(v[i] != false){
                            $scope.objs.push(i)
                        }
                    }
                });

                //数据中心
                $scope.serviceDataTrans.dataCenters.forEach(function (elem, index) {
                    if (elem) {
                        if(! utils.findInArr($scope.serviceParam.dcIdList, $scope.extentServerLei.dataCenters[index].id))
                            $scope.serviceParam.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
                    }else{
                        $scope.serviceParam.dcIdList.shift($scope.extentServerLei.dataCenters[index].id);
                    }
                });
                $scope.serviceParam.service.metadata.labels.name = $scope.serviceParam.serviceName;
                $scope.serviceParam.service.metadata.labels.author = $scope.sessionName;
                $scope.serviceParam.service.metadata.labels.namespace = demoss;
                $scope.serviceParam.orgName = demoss;

                //选择器
                $scope.Checkeds.forEach(function(v){
                    $scope.serviceParam.service.spec.selector[v.mylistKey] = v.mylistValue;
                });
                //标签
                $scope.leis.forEach(function(v){
                    $scope.serviceParam.service.metadata.labels[v.leiKey] = v.leiValue;
                });

                //端口组
                var portForEach = $scope.serviceParam.service.spec.ports;
                portForEach.forEach(function(num){
                    // num.port=Number(num.port);
                    // num.targetPort=Number(num.targetPort);

                    if(num.nodePort != null){
                        // num.nodePort=Number(num.nodePort);
                        $scope.amock = num.nodePort;
                    }
                });

                $scope.serviceParam.userId = $localStorage.userId;
                $scope.serviceParam.orgId = $localStorage.orgId;
                $scope.serviceParam.sessionId = $localStorage.sessionId;

                //提交创建服务json发请求
                extensionsService.CreatServicePost($scope.serviceParam,function(rep){
                    if(rep.code == 0){
                        console.info('服务发布成功');

                    }else{
                        console.error('服务发布失败');
                    }
                });
            };



            $scope.applySerSubmit = function(){
                $scope.submitApply();
                $scope.serverSubmit();

                $scope.serviceAndApplySuc = true;
                $scope.serviceShow = false;
                $scope.successSecond = 3;
                $interval(function (){
                    $scope.successSecond--;
                    if($scope.successSecond == 0){
                        $state.go('main.topology');
                    }
                },1000);
            };

            $scope.goTopo = function(){
                $state.go('main.topology');

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



                $scope.serviceParam = JSON.parse(data.service);
                $scope.serviceParam.orgId = $localStorage.orgId;
                $scope.serviceParam.userId = $localStorage.userId;
                $scope.serviceParam.sessionId = $localStorage.sessionId;


                if($scope.serviceParam.service.spec.type == "ClusterIP"){
                    $scope.serverRadios = 0;
                    $scope.serverDisabled = true;
                }
                //清空所有nodePort
                angular.forEach($scope.serviceParam.service.spec.ports, function(item){
                    delete item.nodePort;
                });
                var NewSelector = $scope.serviceParam.service.spec.selector;
                $scope.Checkeds =[];
                for(var i in NewSelector){
                    $scope.Checkeds.push({"mylistKey":i ,"mylistValue":NewSelector[i]});
                }

                angular.forEach($scope.serviceParam.dcIdList, function (data){
                    var dcId = data;
                    angular.forEach($scope.extentServerLei.dataCenters, function (data, index){
                        if(dcId == data.id){
                            $scope.serviceDataTrans.dataCenters[index] = true;
                        }
                    });
                });

            });
        }];


        var controllers = [
            {module: 'walkthrogh', name: 'walkthroghController', ctrl: ctrl}
        ];

        return controllers;
    }
);