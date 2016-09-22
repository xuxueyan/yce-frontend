/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
    'use strict';

    var ctrl = ['$scope','$http','$localStorage', function($scope,$http,$localStorage){
        var userId = $localStorage.userId;
        var orgId = $localStorage.orgId;
        var sessionId = $localStorage.sessionId;
        $scope.sessionName = $localStorage.userName;

        //  服务管理页面
        $scope.extensionsPage = function(){
            $http({
                url : '/api/v1/organizations/'+orgId+'/users/'+userId+'/extensions',
                method : 'GET',
                headers : {sessionId}
            })
            .success(function(data){
                if(data.code == 0){
                    $scope.newExtensions = JSON.parse(data.data);
                    var NewExtensions = JSON.parse(data.data);
                    NewExtensions.forEach(function(v){
                        for(var itemLength in v.serviceList.items){ }
                        $scope.itemLength = itemLength;
                    });

                    /*  点击服务的删除 */
                    $scope.alertBox1 = false;   //  alert的文本框
                    $scope.delItem = function(dcIds,item){
                        $scope.alertBox1 = !false;
                        /*  确定删除按钮  内为删除函数  */
                        $scope.extnesionsDel = function(){
                            $scope.alertBox1 = false;
                            var serverNP = item.spec.ports[0].nodePort;
                            var lebelType = item.metadata.labels.type;
                            var serversName = String(item.metadata.name);
                            var nodePorts = Number(serverNP);
                            $scope.np = {
                                userId: "",
                                dcId: "",
                                nodePort: "" 
                            }

                            $scope.np.userId = Number(userId);
                            $scope.np.dcId = Number(dcIds);
                            $scope.np.nodePort = nodePorts;
                            if(lebelType == "service"){
                               /* $http({
                                    url : '/api/v1/organizations/'+orgId+'/services/'+serversName,
                                    method : 'POST',
                                    headers : np
                                }).success(function(){})
                                .error(function(data) {
                                    alert("lose");
                                });
                                */

                                $http.post('/api/v1/organizations/'+orgId+'/services/'+serversName, $scope.np).success(function(){
                                    alert("ok")

                                    $scope.extensionsPage();
                                }).error(function(data) {
                                    alert("lose");
                                });
                            }
                        }
                        /*  取消删除按钮  */
                        $scope.extnesionsBack = function(){
                            console.log("quxiao")
                            $scope.alertBox1 = false;
                        }
                    }

                    /*  点击访问点的删除 */
                    $scope.cutItem = function(dcIds,item){
                        $scope.alertBox1 = !false;
                        /*  确定删除按钮  内为删除函数  */
                        $scope.extnesionsDel = function(){
                            $scope.alertBox1 = false;
                            var lebelType = item.metadata.labels.type;
                            var serversName = String(item.metadata.name);
                            $scope.np2 = {
                                dcId: ""
                            }
                            $scope.np2.dcId = Number(dcIds)
                            if(lebelType == "endpoint"){
                              /*  $http({
                                    url : '/api/v1/organizations/'+orgId+'/datacenters/'+dcIds+'/endpoints/'+serversName,
                                    method : 'DELETE'
                                })
                                .success(function(){})
                                .error(function(data) {
                                    alert("lose");
                                });*/
                                $http.post('/api/v1/organizations/'+orgId+'/endpoints/'+serversName, $scope.np2).success(function(){
                                    alert("ok")
                                    $scope.extensionsPage();
                                }).error(function(data) {
                                    alert("lose");
                                });
                            }
                        }
                        /*  取消删除按钮  */
                        $scope.extnesionsBack = function(){
                        //    console.log("quxiao")
                            $scope.alertBox1 = false;
                        }
                    }
                }
            })
            .error(function(){
                if(data.code != 0){
                    alert(data.message);
                }
            })
        }

        $scope.extensionsPage();

       
        //  创建服务   GET
        $http({
            url : '/api/v1/organizations/'+orgId+'/users/'+userId+'/services/init',
            method : 'GET'
        })
        .success(function(data){
            $scope.extentServers = data;
            var extentServers = data;
            $scope.extentServerLei = JSON.parse($scope.extentServers.data);
            var demoss = $scope.extentServerLei.orgName;
            if($scope.extentServers.code == 0){
                    $scope.serverClick1 = function(){
                        if($scope.serverRadios == 1){
                            $scope.serverDisabled = false;
                        }else if($scope.serverRadios == 0){
                            $scope.serverDisabled = true;
                        }
                    }
                    //   label add....
                    $scope.leis = [];
                    $scope.addLabels = function(){
                        $scope.leis.push({})
                    }
                    //   del
                    $scope.delLabels = function($index){
                        $scope.leis.splice($index,1)
                    }

                    //   port add....
                    $scope.ports = [];
                    $scope.addPort = function(){
                        $scope.ports.push({});
                    }
                    //   del
                    $scope.delPort = function($index){
                        $scope.ports.splice($index,1)
                    }

            }
            // 拼接json
            $scope.param = {
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
                                "protocol": "",
                                "port": "",
                                "targetPort": "",
                                "nodePort": ""
                            }
                        ]
                    }
                }
            }

            $scope.formData={}
            var demo = [];
            $scope.mocks ={};
            $scope.dataTrans = {
                dataCenters : []
            };

            // 选择器
            $scope.Checkeds = [];
            $scope.addCheckeds = function(){
                $scope.Checkeds.push({});
            }
            $scope.delCheckeds = function($index){
                $scope.Checkeds.splice($index,1);
            }

            // 协议
            $scope.portlists = [
                {protocol : "TCP"}
            ];
            $scope.activities =[
                "TCP",
                "UDP"
            ];
            $scope.serversubmit = function(){
                // 协议
                $scope.param.service.spec.ports[0].protocol = $scope.portlists[0].protocol;
                // 服务类型  ok
                var type = "NodePort";
                if($scope.serverRadios == 0){
                    var type="ClusterIP";
                }
                else if($scope.serverRadios == 1){
                    var type="NodePort";
                }
                $scope.param.service.spec.type = type;
                $scope.param.service.metadata.name = $scope.param.serviceName;
                demo.push($scope.formData.Case);
                    $scope.objs=[];
                    demo.forEach(function(v){
                        for(var i in v){
                            if(v[i] != false){
                                $scope.objs.push(i)
                            }
                        }
                    })

                // 数据中心 ok
                $scope.dataTrans.dataCenters.forEach(function(elem,index){
                    if(elem){
                        $scope.param.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
                    }
                })
                $scope.param.service.metadata.labels.name = $scope.param.serviceName;
                $scope.param.service.metadata.labels.author = $scope.sessionName;
                $scope.param.service.metadata.labels.namespace = demoss;
                $scope.param.orgName = demoss;

                // 选择器  
                $scope.Checkeds.forEach(function(v){
                    for(var i in v){
                        $scope.param.service.spec.selector[v.mylistKey]=v[i]
                    }
                })
                // label
                $scope.leis.forEach(function(v){
                    for(var i in v){
                        $scope.param.service.metadata.labels[v.leiKey]=v[i]
                    }
                })

                // 端口组  ok  
                $scope.ports.forEach(function(num){
                    num.port=Number(num.port);
                    num.targetPort=Number(num.targetPort);

                    if(num.nodePort != null){
                        num.nodePort=Number(num.nodePort);
                        $scope.amock = num.nodePort;
                    }
                })
                /*  提交 post  */
                $scope.param.service.spec.ports = $scope.ports;
                console.log(angular.toJson($scope.param)+"@@@@ !")
                $http.post('/api/v1/organizations/'+orgId+'/users/'+userId+'/services/new', $scope.param).success(function(){
                    alert("ok")
                }).error(function(data) {
                    alert("lose");
                });
            }
            // 创建服务 - 端口组 - 失焦判断
            $scope.serNoderportsN = function(){
                $scope.ports.forEach(function(im){
                    // NodePort
                    if(29999 < Number(im.nodePort) &&  Number(im.nodePort)< 32768){
                        console.log("ok");
                        $scope.myText1 = "";
                    }else{
                        console.log(10101)
                        $scope.myText1 = " NodePort大于30000 小于32767";
                    }
                })
            }
            // 创建服务 - 端口组 - nodeport失焦判断
            $scope.serNoderportsN = function(){
                $scope.ports.forEach(function(im){
                    if(29999 < Number(im.nodePort) &&  Number(im.nodePort)< 32768){
                        console.log("ok");
                        $scope.myText1 = "";
                    }else{
                        console.log(10101)
                        $scope.myText1 = " NodePort大于30000 小于32767";
                    }
                })
            }
            // 创建服务 - 端口组 - port失焦判断
            $scope.serNoderportsP = function(){
                $scope.ports.forEach(function(im){
                    if(0 < Number(im.port) &&  Number(im.port)< 65536){
                        console.log("ok");
                        $scope.myText1 = "";
                    }else{
                        console.log(10101)
                        $scope.myText1 = " port大于0 小于65536";
                    }
                })
            }
            // 创建服务 - 端口组 - targetPort失焦判断
            $scope.serNoderportsT = function(){
                $scope.ports.forEach(function(im){
                    if(0 < Number(im.targetPort) &&  Number(im.targetPort)< 65536){
                        console.log("ok");
                        $scope.myText1 = "";
                    }else{
                        console.log(10101)
                        $scope.myText1 = " Target Port大于0 小于65536";
                    }
                })
            }
                    
        })
        .error(function(){
            alert(extentServers.message);
        })

        //  创建访问点  GET

        $http({
            url : '/api/v1/organizations/'+orgId+'/users/'+userId+'/endpoints/init',
            method : 'GET'
        })
        .success(function(data){
            $scope.endpointsData = JSON.parse(data.data);
            if(data.code == 0){
                // add label
                $scope.endleis = [];
                $scope.addendpointjlabel = function(){
                    $scope.endleis.push({})
                }
                // del label
                $scope.delendpointjlabel = function($index){
                    $scope.endleis.splice($index,1);
                }
                // add Ex
                $scope.mockEnd = [];
                $scope.addendpointEx = function(){
                    $scope.mockEnd.push({});
                }
                // del Ex
                $scope.delendpointEx = function($index){
                    $scope.mockEnd.splice($index,1);
                }
                // 创建访问点 - 地址端口组 - 端口失焦判断
                $scope.endpointPort = function(){
                    console.log(angular.toJson($scope.mockEnd));
                    var mockP = angular.toJson($scope.mockEnd[0].ports.port);
                    if(mockP > 65535 || mockP < 1){
                        $scope.endtext = " 端口范围为：1-65535";
                    }else{
                        $scope.endtext = "";
                    }
                }
                $scope.endpointId = function(){
                    var mockI = angular.toJson($scope.mockEnd[0]);
                    var mockA = angular.toJson($scope.mockEnd[0].addresses);
                    if(mockI == "{}"){
                        $scope.endtext = " IP地址不正确";
                    }else if(!mockA){
                        $scope.endtext = " IP地址不正确";
                    }else if(mockA == "{}"){
                        $scope.endtext = " IP地址不正确";
                    }else{
                        $scope.endtext = "";
                    }
                }
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
                            "type" : "endpoint"
                        }
                    },
                    "subsets": []
                }
            }
            $scope.endDataTrans = {
                endDataCenters : []
            };
            var adds = [];
            adds.addresses = [];
            adds.ports = [];

            // 访问点的协议

            $scope.epiPro =[
                "TCP",
                "UDP"
            ];
            // 提交
            $scope.endpointBtn = function(){

                // 数据中心 ok
                $scope.endDataTrans.endDataCenters.forEach(function(elem,index){
                    if(elem){
                        $scope.endpointsJson.dcIdList.push($scope.endpointsData.dataCenters[index].id)
                    }
                })
                $scope.endpointsJson.orgName = $scope.endpointsData.orgName;
                $scope.endpointsJson.endpoints.metadata.namespace = $scope.endpointsData.orgName;

                // 标签组 ok
                $scope.endpointsJson.endpoints.metadata.labels.name = $scope.endpointsJson.endpointsName;
                $scope.endpointsJson.endpoints.metadata.labels.author = $scope.sessionName;
                $scope.endleis.forEach(function(v){
                    for(var i in v){
                        $scope.endpointsJson.endpoints.metadata.labels[v.endlabelKey]=v[i]
                    }
                })

                // 端口及地址
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
                $scope.endpointsJson.endpoints.metadata.name = $scope.endpointsJson.endpointsName;

                console.log(angular.toJson($scope.endpointsJson));
                //  提交 post
                $http.post('/api/v1/organizations/'+orgId+'/users/'+userId+'/endpoints/new', $scope.endpointsJson).success(function(){
                    alert("ok")
                }).error(function(data) {
                    alert("lose");
                });
            }
        })
        .error(function(){
            console.log("lose");
        })

    }]; 

    var controllers = [
        {module: 'extensionsManage', name: 'extensionsController', ctrl: ctrl}
    ];
    return controllers;
    }
);