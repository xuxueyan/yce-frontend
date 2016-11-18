/**
 * Created by Jora on 2016/7/29.
 */
define([
    'utils'
    ], function(utils) {
    'use strict';
    var ctrl = ['$scope', 'addTemplateService', '$localStorage', 'deploymentService', 'extensionsService', '$rootScope', 'templateService', 'atomicNotifyService', '$stateParams', '$state', '$timeout', function($scope, addTemplateService, $localStorage, deploymentService, extensionsService, $rootScope, templateService, atomicNotifyService, $stateParams, $state, $timeout) {

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

        //数据中心
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

                if($stateParams.message)
                    activeAppDc();
            }
        });


        deploymentService.getDeploymentIint(param, function(data) {
            if (data.code == 0) {
                $scope.initData = JSON.parse(data.data);
                //组织名获取
                $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                $scope.param.orgName = $scope.initData.orgName;
                $scope.dataTrans.quotas = $scope.initData.quotas[0].id;

                if($stateParams.message)
                    activeSvcDc();
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

        $scope.showService = function () {
            $scope.serviceShow = true;
            $scope.applyShow = false;

        };

        $scope.showApply = function () {
            $scope.serviceShow = false;
            $scope.applyShow = true;
        };

        
        //验证模板名是否存在
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
                    "ports": [{}]
                }
            }
        };
        var myParam = {
            orgId: $localStorage.orgId,
            userId: $localStorage.userId,
            sessionId: $localStorage.sessionId
        };
        $scope.leis = [];
        $scope.formData = {};
        var demo = [];
        $scope.mocks = {};
        $scope.serviceDataTrans = {
            dataCenters : []
        };
        var demoss = "";

        extensionsService.CreatService(myParam,function(data){
            $scope.extentServerLei = JSON.parse(data.data);
            demoss = $scope.extentServerLei.orgName;
            if(data.code == 0){
                $scope.serverDisabled = true;
                $scope.serverClick1 = function(){
                    if($scope.serverRadios == 1){
                        $scope.serverDisabled = false;
                    }else if($scope.serverRadios == 0){
                        $scope.serverDisabled = true;
                    }
                };
            }
        },function(data){
            alert(data.message);
        });
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

        // 选择器
        $scope.Checkeds = [{}];
        $scope.addCheckeds = function(){
            $scope.Checkeds.push({});
        };
        $scope.delCheckeds = function($index){
            $scope.Checkeds.splice($index,1);
        };




        //验证服务名是否已存在
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
            
            //$scope.serviceParam.service.spec.ports[0].protocol = $scope.portlists[0].protocol;
            // 服务类型  
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

            // 数据中心 BUG
            $scope.serviceDataTrans.dataCenters.forEach(function (elem, index) {
                if (elem) {
                    if(! utils.findInArr($scope.serviceParam.dcIdList, $scope.extentServerLei.dataCenters[index].id))
                        $scope.serviceParam.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
                }else{
                    $scope.serviceParam.dcIdList.shift($scope.extentServerLei.dataCenters[index].id);
                }
            });
            var demoss = $scope.extentServerLei.orgName;

            $scope.sessionName = $localStorage.userName;
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
            });
           


            var data = {
                "name": $scope.templateName,
                "deployment": $scope.param,
                "service": $scope.serviceParam,
                "orgId": $localStorage.orgId,
                "userId": $localStorage.userId,
                "sessionId": $localStorage.sessionId
            };

            templateService.createTemplate(data, function (rep) {
                if (rep.code == 0) {
                    atomicNotifyService.success(rep.message, 2000);
                    $timeout(function(){
                        $state.go('main.tpManage');
                    }, 1000);
                }else {
                    atomicNotifyService.error(rep.message, 2000);
                    $timeout(function(){
                        $state.go('main.tpManage');
                    }, 1000);
                }

            })
        };

        /*点击更新，跳到创建模板页面，被传递过来的参数填充创建模板页面，作为修改*/
        if($stateParams.message){

            $scope.param = JSON.parse($stateParams.message.deployment);
            //应用模版 数据中心选中

            console.log($scope.param);

            var activeAppDc = function (){
                if($scope.initData){
                    angular.forEach($scope.param.dcIdList, function (data){
                        var dcId = data;
                        angular.forEach($scope.initData.dataCenters, function (data, index){
                            if(dcId == data.id){
                                $scope.dataTrans.dataCenters[index] = true;
                            }
                        });
                    });
                }
            };







            //模版名称
            $scope.templateName = $stateParams.message.name;

            $scope.serviceParam = JSON.parse($stateParams.message.service);


            var NewSelector = $scope.serviceParam.service.spec.selector;
            $scope.Checkeds =[];
            for(var i in NewSelector){
                $scope.Checkeds.push({"mylistKey":i,"mylistValue":NewSelector[i]});
            }

            var activeSvcDc = function (){
                if($scope.extentServerLei){
                    angular.forEach($scope.serviceParam.dcIdList, function (data){
                        var dcId = data;
                        angular.forEach($scope.extentServerLei.dataCenters, function (data, index){
                            if(dcId == data.id){
                                $scope.serviceDataTrans.dataCenters[index] = true;
                            }
                        });
                    });
                }

            };



        }


    }];

    var controllers = [
        { module: 'template', name: 'addTemplateController', ctrl: ctrl }
    ];

    return controllers;
});
