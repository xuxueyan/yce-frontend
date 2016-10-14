/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function (Base64) {
        'use strict';

        var ctrl = ['$scope', 'costManageService', '$localStorage', function ($scope, costManageService, $localStorage) {

            $scope.param = {
                "orgId": $localStorage.orgId,
                "userId": $localStorage.userId,
                "sessionId": $localStorage.sessionId,
            };

            $scope.dataCenters = [];

            costManageService.getOrgList($scope.param, function (res) {
                if (res.code == 0) {

                    var dataCenterList = JSON.parse(res.data);

                    $scope.dcListDom = dataCenterList.dcList;

                }

            });

            $scope.nameExit = function (){

                if($scope.orgName != undefined && $scope.orgName != ''){

                    var param = {
                        "orgName": $scope.orgName,
                        "orgId": $localStorage.orgId,
                        "sessionId": $localStorage.sessionId
                    };

                    costManageService.orgNameExit(param, function (res) {
                        if(res.code == 1415){
                            $scope.orgNameExit = true;
                            $scope.orgTips = false;
                        }
                        else{
                            $scope.orgNameExit = false;
                            $scope.orgTips = true;
                        }
                    });
                }
                else{
                    $scope.orgTips = true;
                }

            };

            $scope.orgSubmit = function (){

                var dcArray =[];

                angular.forEach($scope.dataCenters,function (data,index){
                    if(data){
                        dcArray.push($scope.dcListDom[index].id);
                    }
                });

                var param = {
                    "orgId": $localStorage.orgId,
                    "userId": $localStorage.userId,
                    "name": $scope.orgName,
                    "dcIdList": dcArray

                };

                console.log(dcArray);
                //costManageService.createOrg(param, function (res){
                //
                //});

            };


        }];

        var controllers = [
            {module: 'organizManage', name: 'organizManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);