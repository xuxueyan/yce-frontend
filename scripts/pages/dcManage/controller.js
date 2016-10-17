/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'dcManageService', '$localStorage', '$timeout', '$state', function($scope, dcManageService, $localStorage, $timeout, $state){
                
                // 验证用户名
                $scope.DcManageNameBlur = function(){
                    var param = {
                        "sessionId" : $localStorage.sessionId,
                        "name" : $scope.DcManageNames,
                        "orgId" : $localStorage.orgId
                    }
                    dcManageService.addDcMangaePOST(param,function(res){
                        $scope.dcNameShow = false;
                        if(res.code == "1415"){
                            $scope.dcNameShow = true;
                            $scope.login.name.$error.pattern = false;
                        } 
                    })
                }
                $scope.DcManageNameFocus = function(){
                    $scope.dcNameShow = false;
                }

                // json
                $scope.carry = {
                    "sessionId" : $localStorage.sessionId,
                    "name" : "",
                    "nodePort" : [],
                    "host" : "",
                    "port" : "",
                    "orgId" : $localStorage.orgId,
                    "op" : Number($localStorage.userId)
                }
                // 提交  carry.secret
                $scope.addDcManageSubmit = function(){

                    $scope.carry.nodePort.push($scope.nodeportnum1);
                    $scope.carry.nodePort.push($scope.nodeportnum2);
                    $scope.carry.name = $scope.DcManageNames;

                    dcManageService.addDcPostList($scope.carry, function(rep){

                        $scope.showstatusMes = true;

                        // 显示成功绿条
                        if(rep.code == 0){
                            $scope.status = true;
                            $scope.message = rep.message;
                            $timeout(function() {
                                $scope.showstatusMes = false;
                                $state.go('main.dcManage');
                            }, 1000);
                        }
                        else{
                            $scope.message = rep.message;
                            $scope.status = false;
                        }
                    },function(){
                        $scope.login.$invalid = true;
                    })
                }
                
            


        }];




    var controllers = [
            {module: 'dcManage', name: 'dcManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);