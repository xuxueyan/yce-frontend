/**
 * Created by Jora on 2016/7/29.
 */
define([
    'atomicNotify'
    ], function(){
    'use strict';

    var ctrl = ['$scope', '$http', '$localStorage', '$timeout', '$state', 'extensionsService', '$rootScope', 'atomicNotifyService', function($scope, $http, $localStorage, $timeout, $state, extensionsService, $rootScope, atomicNotifyService){
        $scope.sessionName = $localStorage.userName;

        var myParam = {
            orgId: $localStorage.orgId,
            userId: $localStorage.userId,
            sessionId: $localStorage.sessionId,
        };
        //服务管理列表
        $scope.extensionsPage = function(){
            extensionsService.serviceManages(myParam,function(data){
                if(data.code == 0){
                    $scope.newExtensions = JSON.parse(data.data);
                    //列表分页处理
                    $scope.totalNum = $scope.newExtensions[0].serviceList.items.length;
                    $scope.pagList = $scope.newExtensions[0].serviceList.items.slice(0,5);
                    $scope.pageClick = function(page, pageSize, total){
                        $scope.pagList = $scope.newExtensions[0].serviceList.items.slice(pageSize*(page-1), pageSize*page);
                    };
                }
            },function(data){
                alert(data.message);
            });
        };

        //点击服务的删除
        $scope.delItem = function(dcIds, item){
            $scope.exDelConfig = {
                widgetTitle: "",
                widgetId: "exDeldate",
                isDelExtensions: true,
                data: item
            };
            $rootScope.widget.exDeldate = true;

            //确定删除按钮  内为删除函数  
            $scope.$on('submitDelete', function(event) {
                var serverNP = item.spec.ports[0].nodePort;
                var lebelType = item.metadata.labels.type;
                var nodePorts = Number(serverNP);
                $scope.LebeltypeParameter = {
                    userId : "",
                    dcId : "",
                    nodePort : "",
                    orgId : "",
                    sessionId : "",
                    serversName : ""
                };
                $scope.LebeltypeParameter.serversName = String(item.metadata.name);
                $scope.LebeltypeParameter.sessionId = $localStorage.sessionId;
                $scope.LebeltypeParameter.orgId = $localStorage.orgId;
                $scope.LebeltypeParameter.userId = Number($localStorage.userId);
                $scope.LebeltypeParameter.dcId = Number(dcIds);
                $scope.LebeltypeParameter.nodePort = nodePorts;

                //假如点击的是服务的删除，则请求删除服务的url
                if(lebelType == "service"){
                    extensionsService.lebelTypes($scope.LebeltypeParameter,function(rep){
                        if(rep.code == 0){
                            atomicNotifyService.success(rep.message, 2000);
                            $rootScope.widget.exDeldate = false;
                            $timeout(function() {
                                $scope.extensionsPage();
                            }, 1000);
                        }
                        else{
                            atomicNotifyService.error(rep.message, 2000);
                        }
                    },function(rep){
                        atomicNotifyService.error(rep.message, 2000);
                    });
                }
            });
        };
        $scope.extensionsPage();

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
                            "name": "name1",
                            "protocol": "TCP"
                        }
                    ]
                }
            }
        };

        //创建服务
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
        var i = 1;
        $scope.addPort = function () {
            i++;
            $scope.serviceParam.service.spec.ports.push({
                "name": "name"+i,
                "protocol": "",
                "port": "",
                "targetPort": "",
                "nodePort": ""
            });
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

        $scope.activities =[
            "TCP",
            "UDP"
        ];

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
        $scope.serversubmit = function(){
            $scope.objs=[];

            //协议
           // $scope.serviceParam.service.spec.ports[0].protocol = $scope.portlists[0].protocol;
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
            $scope.serviceDataTrans.dataCenters.forEach(function(elem,index){
                if(elem){
                    $scope.serviceParam.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
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
            var portForEach = $scope.serviceParam.service.spec.ports
            portForEach.forEach(function(num){
                // num.port=Number(num.port);
                // num.targetPort=Number(num.targetPort);

                if(num.nodePort != null){
                    // num.nodePort=Number(num.nodePort);
                    $scope.amock = num.nodePort;
                }
            });

          //  $scope.serviceParam.service.spec.ports = $scope.ports;
            $scope.serviceParam.userId = $localStorage.userId;
            $scope.serviceParam.orgId = $localStorage.orgId;
            $scope.serviceParam.sessionId = $localStorage.sessionId;

            //提交创建服务json发请求
            extensionsService.CreatServicePost($scope.serviceParam,function(rep){
                console.log(angular.toJson($scope.serviceParam))
                if(rep.code == 0){
                    atomicNotifyService.success(rep.message, 2000);
                    $timeout(function() {
                        $state.go('main.extensions');
                    }, 1000);
                }
                else{
                    atomicNotifyService.error(rep.message, 2000);
                }
            },function(rep){
                atomicNotifyService.error(rep.message, 2000);
            });
        };



        //创建访问点
        extensionsService.CreatAccessPoint(myParam,function(data){
            $scope.endpointsData = JSON.parse(data.data);

            if(data.code == 0){
                $scope.endleis = [];
                $scope.mockEnd = [];

                //标签组与地址端口组的添加与删除
                $scope.addendpointjlabel = function(){
                    $scope.endleis.push({});
                };
                $scope.delendpointjlabel = function($index){
                    $scope.endleis.splice($index,1);
                };
                $scope.addendpointEx = function(){
                    $scope.mockEnd.push({});
                };
                $scope.delendpointEx = function($index){
                    $scope.mockEnd.splice($index,1);
                };
            }

            $scope.endpointsJson = {
                "endpointsName": "",
                "orgName": "minimini",
                "dcIdList": [],
                "endpoints": {
                    "kind": "Endpoints",
                    "apiVersion": "v1",
                    "metadata": {    
                        "name": "",
                        "namespace": "",
                        "labels": {
                            "name": "",
                            "author": "",
                            "type" : "endpoints"
                        }
                    },
                    "subsets": []
                }
            };
            $scope.endDataTrans = {
                endDataCenters : []
            };
            var adds = [];
            adds.addresses = [];
            adds.ports = [];

            //访问点的协议
            $scope.epiPro =[
                "TCP",
                "UDP"
            ];

            //提交
            $scope.endpointBtn = function(){

                //数据中心
                $scope.endDataTrans.endDataCenters.forEach(function(elem,index){
                    if(elem){
                        $scope.endpointsJson.dcIdList.push($scope.endpointsData.dataCenters[index].id);
                    }
                });
                $scope.endpointsJson.orgName = $scope.endpointsData.orgName;
                $scope.endpointsJson.endpoints.metadata.namespace = $scope.endpointsData.orgName;

                //标签组
                $scope.endpointsJson.endpoints.metadata.labels.name = $scope.endpointsJson.endpointsName;
                $scope.endpointsJson.endpoints.metadata.labels.author = $scope.sessionName;
                $scope.endleis.forEach(function(v){
                    for(var i in v){
                        $scope.endpointsJson.endpoints.metadata.labels[v.endlabelKey]=v[i];
                    }
                });

                //端口及地址
                for(var i = 0; i < $scope.mockEnd.length; i++) {
                    adds.push({
                        addresses : [ 
                            $scope.mockEnd[i].addresses
                        ],
                        ports : [
                            {
                                name : $scope.mockEnd[i].ports.name,
                                protocol : $scope.mockEnd[i].ports.protocol,
                                port : Number($scope.mockEnd[i].ports.port)
                            }
                        ]
                    });
                }

                $scope.endpointsJson.endpoints.subsets = adds;
                $scope.endpointsJson.userId = $localStorage.userId;
                $scope.endpointsJson.orgId = $localStorage.orgId;
                $scope.endpointsJson.sessionId = $localStorage.sessionId;
                $scope.endpointsJson.endpoints.metadata.name = $scope.endpointsJson.endpointsName;

                //创建访问点提交json
                extensionsService.CreatAccessPointPost($scope.endpointsJson,function(rep){
                    $scope.showstatusMes = true;
                    if(rep.code == 0){
                        atomicNotifyService.success(rep.message, 2000);
                        $timeout(function(){
                            $state.go('main.extensions');
                        },1000);
                    }
                    else{
                        atomicNotifyService.error(rep.message, 2000);
                    }
                },function(rep){
                    atomicNotifyService.error(rep.message, 2000);
                });
            };
        });
    }]; 

    var controllers = [
        {module: 'extensionsManage', name: 'extensionsController', ctrl: ctrl}
    ];
    return controllers;
    }
);