/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'userManageService', '$localStorage', '$timeout', '$rootScope', '$state', function($scope, userManageService, $localStorage, $timeout, $rootScope, $state){
            var param = {
                "sessionId" : $localStorage.sessionId
            }

            // 创建用户页面
            userManageService.setUpUser(param, function(res){

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
                }
                //  失焦时判断
                $scope.myUsernameBlur = function(){
                    $scope.showUsernams = false;
                    var requires ={
                        "sessionId": $localStorage.sessionId,
                        "userName": $scope.putUp.userName,
                        "orgName": $scope.putUp.orgName,
                        "orgId": $localStorage.orgId
                    }
                    // 用户名和组织不为空时  判断用户名是否重复
                    if($scope.putUp.userName != "" && $scope.putUp.orgName != ""){

                        $scope.againPasswordShow = false;
                        // 请求
                        userManageService.UsernameJudge(requires,function(codes){

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

                }

                // 点击提交
                $scope.setUsersubmit = function(){
                    // 如果密码相同
                    if($scope.againPassword == $scope.putUp.password){
                        $scope.againPasswordShow = false;
                    
                        //  提交请求
                        userManageService.UserSubmit($scope.putUp,function(rep){
                            $scope.showstatusMes = true;

                            // 显示成功绿条
                            if(rep.code == 0){
                                $scope.status = true;
                                $scope.message = rep.message;
                                $timeout(function() {
                                    $scope.showstatusMes = false;
                                    $state.go('main.userManage');
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
                    }else{
                        $scope.againPasswordShow = true;
                        $scope.login.$invalid = true;
                    }
                }
            })

            // 获取用户列表
            $scope.wrapUserManage = function(){
                userManageService.ObtainUserList(param, function(res){
                    if(res.code == 0){
                        $scope.UserList = JSON.parse(res.data);
                        $scope.userOrgId = [];

                        // 根据orgId的值  对应orgList的键  改变orgId的值
                        $scope.UserList.users.forEach(function(user){
                            user.orgId = $scope.UserList.orgList[user.orgId];
                        });

                        // 更新数据
                        $scope.userUpdata = function(item){
                            $scope.userUpdateConfig = {
                                widgetTitle: "更新",
                                widgetId: "userUpdate",
                                isUserManageUpdate: true,
                                data: item
                            };
                            $rootScope.widget.userUpdate = true;
                            
                            // 点击确定更新密码
                            $scope.$on('submitUpdatePW', function(event, pwd) {
                                var res = {
                                    "op": Number($localStorage.userId),
                                    "name": item.name,
                                    "orgId": $localStorage.orgId,
                                    "password": pwd,
                                    "sessionId" : $localStorage.sessionId
                                }
                                userManageService.userUpData(res, function(){
                                    $rootScope.widget.userUpdate = false;
                                    $scope.wrapUserManage();
                                },function(){})
                            });
                        }
                        // 删除数据
                        $scope.userDelete = function(item){
                            $scope.userDelConfig = {
                                widgetTitle: "删除",
                                widgetId: "userDel",
                                isUserManageDel: true,
                                data: item
                            };
                            $rootScope.widget.userDel = true;

                            // 删除数据传递的json
                            var res = {
                                "op":  Number($localStorage.userId),
                                "userName": item.name,
                                "sessionId" : $localStorage.sessionId
                            }

                            $scope.$on('submitDelete', function(event) {
                                // 删除用户
                                userManageService.delUserDate(res, function(){
                                    $rootScope.widget.userDel = false;
                                    $scope.wrapUserManage();
                                },function(){})
                            });
                        }
                    }
                })
            }
            $scope.wrapUserManage()

        }];




    var controllers = [
            {module: 'userManage', name: 'userManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);