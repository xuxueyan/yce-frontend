/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$http', 'rbdManageService', '$localStorage', '$timeout', function($scope,$http,rbdManageService,$localStorage,$timeout){

            var param = {
                "sessionId" : $localStorage.sessionId
            }

            rbdManageService.setUpUser(param, function(res){

                $scope.activities = JSON.parse(res.data)

                $scope.putUp = {
                    "sessionId" : $localStorage.sessionId,
                    "userName": "",
                    "password": "",
                    "orgName": $scope.activities[0],
                    "orgId": $localStorage.orgId, 
                    "op": $localStorage.userId
                }
                $scope.againPwJudge = function(){
                    $scope.againPasswordShow = false;
                }

                // 点击提交
                $scope.setUsersubmit = function(){
                    if($scope.againPassword != $scope.putUp.password){
                        $scope.againPasswordShow = true;
                    }else{
                        $scope.againPasswordShow = false;
                    }

                    var requires ={
                        "sessionId" : $localStorage.sessionId,
                        "userName": $scope.putUp.userName,
                        "orgName": $scope.putUp.orgName,
                        "orgId": $localStorage.orgId
                    }
                    // 用户名和组织不为空时  判断用户名
                    if($scope.putUp.userName != "" && $scope.putUp.orgName != ""){

                        // 请求
                        rbdManageService.UsernameJudge(requires,function(codes){

                            if(codes.code == "1415"){

                                $scope.showUsernams = true;
                                // 触焦username文本框 错误提示隐藏
                                $scope.myUserNameFocus = function(){
                                    $scope.showUsernams = false;
                                    $scope.login.userName.$error.pattern = false;
                                }
                            }
                        })
                    }

                    //  提交
                    rbdManageService.UserSubmit($scope.putUp,function(rep){
                        
                        $scope.showstatusMes = true;
                        if(rep.code == 0){
                            $scope.status = true;
                            $scope.message = rep.message;
                            $timeout(function() {
                                $scope.showstatusMes = false;
                            }, 1000);
                        }
                        else{
                            $scope.message = rep.message;
                            $scope.status = false;
                        }

                    },function(){
                        $scope.message = rep.message;
                        $scope.status = false;
                    })
                }

            })

        }];


        var controllers = [
            {module: 'rbdManage',
            name: 'rbdManageController',
            ctrl: ctrl}
        ];

        return controllers;
    }
);