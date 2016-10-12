/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$http', 'rbdManageService', '$localStorage', function($scope,$http,rbdManageService,$localStorage){

            var param = {
                "Authorization" : $localStorage.sessionId
            }

            rbdManageService.setUpUser('param',function(res){
                console.log(angular.toJson(res.data)+"#####  0--");
                $scope.activities = JSON.parse(res.data);
                $scope.setUsername = function(){
                    // rbdManageService.setUsernamePost('param',function(number){

                        console.log("失焦事件啦~~");
                    //     console.log(angular.toJson(number));
                    // })
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