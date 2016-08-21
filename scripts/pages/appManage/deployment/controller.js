/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope','$http','deploymentService','$sessionStorage', function($scope,$http, deploymentService, $sessionStorage){
            $scope.param = {
                dataCenters : [],
                deployment : {
                    metadata : {
                        name : '',
                        namespace : '',
                        labels : {}
                    },
                    spec : {
                        template : {
                            spec : {
                                containers : [{
                                    env : [],
                                    image : '',
                                    resources : {
                                        limits : {}
                                    }
                                }]
                            }
                        }
                    }
                }
            };
            $scope.param.deployment.metadata.labels = {
                name : $scope.param.deployment.metadata.name,
                namespace : $scope.param.deployment.metadata.namespace,
                author : $sessionStorage.userName
            };
            $scope.dataTrans = {
                dataCenters : [],
                labels : [],
                quotas : ''
            };
            $scope.stepNum = 1;

            deploymentService.getDeploymentIint({
                orgId : $sessionStorage.orgId,
                userId :$sessionStorage.userId
            },function(data){
                if(data.code == 0){
                    $scope.initData = data.data;
                    $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                    $scope.dataTrans.quotas = $scope.initData.quotas[0].id;
                }
                $scope.nextStep = function(stepNum){
                    $scope.stepNum = stepNum;
                };
            });

            /*添加标签*/
            $scope.addLabel = function(){
                $scope.dataTrans.labels.push({key:'',value:''});
            };
            /*删除标签*/
            $scope.deleteLabel = function($index){
                $scope.dataTrans.labels.splice($index,1);
            };

            /*添加环境变量*/
            $scope.addEnv = function(){
                $scope.param.deployment.spec.template.spec.containers[0].env.push({name:'',value:''});
            };
            /*删除环境变量*/
            $scope.deleteEnv = function($index){
                $scope.param.deployment.spec.template.spec.containers[0].env.splice($index,1);
            };

            /*提交表单*/
            $scope.submit = function(){
                $scope.param.dataCenters = [];
                $scope.dataTrans.dataCenters.forEach(function(elem, index){
                    if(elem){
                        $scope.param.dataCenters.push($scope.initData.dataCenters[index].id);
                    }
                });
                var limits = $scope.initData.quotas.filter(function(item){
                    return item.id == $scope.dataTrans.quotas;
                })[0];
                $scope.param.deployment.spec.template.spec.containers[0].resources.limits = {
                    cpu : limits.cpu,
                    memory : limits.mem
                };
                deploymentService.deploymentSubmit($scope.param,function(data){
                    alert('提交成功');
                },function(){
                    alert('提交失败');
                });
            };

            // Image
            $scope.shows=false;
            $scope.getImages = function() {
                $http({
                    method: 'GET',
                    url: '/api/v1/registry/images'
                })
                    .success(function(data) {
                        $scope.images=data.data;
                        console.log("getImages success")
                    })
                    .error(function() {
                        console.log("getImages error")
                    })
            }
        }];



        var controllers = [
            {module: 'appManage', name: 'deploymentController', ctrl: ctrl}
        ];

        return controllers;
    }
);