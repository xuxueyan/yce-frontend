/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'orgManageService', '$localStorage','$rootScope','$timeout', function($scope, orgManageService, $localStorage, $rootScope, $timeout){

            $scope.param = {
                "orgId": $localStorage.orgId,
                "userId": $localStorage.userId,
                "sessionId": $localStorage.sessionId
            };

            $scope.dataCenters = [];


            $scope.loadList = function(){

                orgManageService.getOrgnzList($scope.param, function (res){

                    if(res.code == 0){

                        var data = JSON.parse(res.data);

                        var dcDesList = data.dcList;

                        angular.forEach(data.organizations, function(data, index){

                            var desc = '';

                            var dcList = JSON.parse(data.dcIdList);

                            angular.forEach(dcList.dcIdList, function(data, index, array){

                                desc += dcDesList[data] + '/';
                            });

                            data.dcDesc = desc.substr(0, desc.length - 1);

                        });

                        $scope.orgManageList = data.organizations;

                    }
                });



            };

            $scope.loadList();


            orgManageService.getInit($scope.param, function (res) {
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

                    orgManageService.orgNameExit(param, function (res) {
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
                    "userId": Number($localStorage.userId),
                    "name": $scope.orgName,
                    "dcIdList": dcArray,
                    "sessionId": $localStorage.sessionId


                };

                orgManageService.createOrg(param,function (res){
                    $scope.showstatusMes = true;

                    if(res.code == 0){
                        $scope.message = res.message;
                        $scope.status = true;

                        //$timeout(function (){
                        //
                        //    $state.go('main.orgManage');
                        //},500)
                    }else{
                        $scope.message = res.message;
                        $scope.status = false;
                    }


                },function(){
                    $scope.showstatusMes = true;
                    $scope.message = '提交失败!';
                    $scope.status = false;
                });

            };

            $scope.rollingUp = function (balance,name){
                var rollingData = {};

                rollingData.balance = balance;
                rollingData.name = name;
                rollingData.orgId = $localStorage.orgId;
                rollingData.userId =  $localStorage.userId;
                rollingData.sessionId = $localStorage.sessionId;

                orgManageService.getInit($scope.param,function(res){
                    if(res.code == 0){
                        var data = JSON.parse(res.data);
                        rollingData.quotaPkg = data.quotaPkg;
                    }
                });

                $scope.orgRollingupConf = {
                    widgetId: 'orgRollingUp',
                    widgetTitle: '更新',
                    orgRollingup: true,
                    data: rollingData
                };
                $rootScope.widget.orgRollingUp = true;
            };

            $scope.$on('$updateDone', function (event, data){
                $scope.loadList();
            });

            $scope.orgDelete = function (name){

                $rootScope.widget.widgetDelete = true;
                $scope.orgDelConfig = {
                    widgetId: 'widgetDelete',
                    widgetTitle: '删除',
                    isDelete: true
                };

                $scope.$on('submitDelete', function (){
                    var param = {
                        "orgName":name,
                        "orgId": $localStorage.orgId,
                        "userId": $localStorage.userId,
                        "sessionId": $localStorage.sessionId
                    };

                    orgManageService.orgDelete(param, function (res){

                        $rootScope.widget.widgetDelete = false;

                        if(res.code == 0){
                            $scope.loadList();
                        }
                    })

                });
            };







        }];




    var controllers = [
            {module: 'orgManage', name: 'orgManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);