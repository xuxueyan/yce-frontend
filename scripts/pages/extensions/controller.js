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
                $scope.leis = [];
                if($scope.extentServers.code == 0){
                        $scope.serverClick1 = function(){
                            if($scope.serverRadios == 1){
                                $scope.serverDisabled = false;
                            }else if($scope.serverRadios == 0){
                                $scope.serverDisabled = true;
                            }
                        }
                        //   label add....
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







            $scope.formData={}
            var demo = [];

            $scope.param = {}
            $scope.mocks ={}
            $scope.serversubmit = function(){
                // 服务类型  ok
                var type = "";
                if($scope.serverRadios == 0){
                    var type="ClusterIP";
                }
                else if($scope.serverRadios == 1){
                    var type="NodePort";
                }
                $scope.param.service = {};
                $scope.param.service.spec = {};
                $scope.param.service.spec.type = {};
                $scope.param.service.spec.type = type;




                //   ---  xx
             //   var serverCenter = $scope.extentServerLei.dataCenters;


            demo.push($scope.formData.Case);

                    $scope.objs=[];
                    
                    demo.forEach(function(v){
                        for(var i in v){
                            if(v[i] != false){
                                $scope.objs.push(i)
                            }
                        }
                    })

                $scope.param.dcIdList = [];
               // $scope.param.dcIdList = $scope.objs;
                // serverCenter.forEach(function(w){
                //     $scope.param.dcIdList.push(w.id); 
                // })



            var user = ""
            $scope.param.dcIdList.forEach(function(elem,index){
                user[elem.key] = elem.value;
            })
            console.log(user)



        








                // 选择器  ok
                $scope.param.service.spec.selector = {};
                $scope.param.service.spec.selector[$scope.mocks.mylistKey] = $scope.mocks.mylistValue

                // label
                $scope.param.service.metadata={}
                $scope.param.service.metadata.labels={}
                $scope.leis.forEach(function(v){
                    for(var i in v){
                        $scope.param.service.metadata.labels[i]=v[i]
                    }
                })

                // 端口组  ok
                $scope.param.service.spec.ports = [];
                $scope.param.service.spec.ports = $scope.ports;

            console.log(angular.toJson($scope.param)+"---myJson");
            }





/*
                $http({
                    url : '/api/v1/organizations/'+orgId+'/users/'+userId+'/services/new',
                    method : 'POST'

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