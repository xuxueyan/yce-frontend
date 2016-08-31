/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$rootScope', '$state', 'mainService', '$stateParams', '$localStorage', function($scope, $rootScope, $state, mainService, $stateParams, $localStorage){
            // login
            $scope.login = function () {
                mainService.login({
                    'username': $scope.username,
                    'password': $scope.pwd
                }, function (data) {
                    if (data.code == 0) {
                        $scope.loginData = JSON.parse(data.data);
                        $localStorage.userName =  $scope.loginData.userName;
                        $localStorage.sessionId =  $scope.loginData.sessionId;
                        $localStorage.userId = $scope.loginData.userId;
                        $localStorage.orgId = $scope.loginData.orgId;
                        $scope.jump();
                    }else{
                        alert("用户名密码错误");
                    }
                });
            };

            // logout
            $scope.logout = function(){
                mainService.logout({
                    'username':  $localStorage.userName,
                    'sessionId': $localStorage.sessionId
                }, function(data) {
                    if (data.code == 0) {
                        $localStorage.$reset();
                        // alert("退出成功~");
                        $state.go('login');
                    }

                });
            }

            $scope.jump = function(){
                $state.go('main.dashboard');
                $rootScope.widget = {};
                $scope.data = {
                    username : $localStorage.userName,
                    showSubnav: [],
                    toggleNav : false
                };
                mainService.getNavlist({"sessionId": $localStorage.sessionId}, function (data) {
                    $scope.navList = data.list;
                });

                $scope.showSubnav = function (index) {
                    $scope.data.showSubnav[index] = !$scope.data.showSubnav[index];
                };
            };

            if(!$localStorage.userId) {
                $state.go('login');
            }else{
                $scope.jump();
            }
        }];



        var controllers = [
            {module: 'yce-manage', name: 'mainController', ctrl: ctrl}
        ];

        return controllers;
    }
);





