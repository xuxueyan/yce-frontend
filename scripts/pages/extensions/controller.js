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

            //  服务管理页面
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

                  })
                }
            })
            .error(function(){
                if(data.code != 0){
                    alert(data.message);
                }
            })


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


                
                $scope.param = {
                    "serviceName": "",
                    "orgName": "",
                    "dcIdList": [],
                    "service": {
                        "kind": "",
                        "apiVersion": "",
                        "metadata": {
                            "name": "",
                            "labels": {
                                "name": ""
                            }
                        },
                        "spec": {
                            "type": "",
                            "selector": {
                                "name": ""
                            },
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


              //  console.log(JSON.stringify($scope.param.service.spec.type.push(myLei))+"@@@@@@@@@@@@@@@@@@")




                // 数据中心
                var serverDataCenters = $scope.extentServerLei.dataCenters;
                for(var dataL in serverDataCenters){ }
                $scope.param.dcIdList.push(dataL-(-1)); 

                // 服务类型
                console.log($scope.serverRadios+"........")















            // 点击console
            $scope.serversubmit = function(){
                console.log(JSON.stringify($scope.param)+"@1234567890");/*
                if($scope.serverRadios == 0){
                    $scope.param.service.spec.type.push(0);
                }
                else if($scope.serverRadios == 1){
                    $scope.param.service.spec.type.push(1);
                }*/
                console.log($scope.param.service.spec.type+"[[[[[[[[[[")
            }
/*
                $http({
                    url : '/api/v1/organizations/'+orgId+'/users/'+userId+'/services/new',
                    method : 'POST'
s
                })
                .success(function(data){
                    









                })
                .error(function(){
                    alert(456)
                })

*/













            })
            .error(function(){
                alert(extentServers.message);
            })

            
        }];      //    ----- ****************************



        var controllers = [
            {module: 'extensionsManage', name: 'extensionsController', ctrl: ctrl}
        ];

        return controllers;
    }
);