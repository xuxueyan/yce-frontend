/**
 * Created by Jora on 2016/7/29.
 */
define([
    ], function(){
        'use strict';


        var ctrl = ['$scope', 'dcManageService', '$localStorage', '$timeout', '$state', '$rootScope', 'atomicNotifyService', function($scope, dcManageService, $localStorage, $timeout, $state, $rootScope, atomicNotifyService){
                
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
                "port" : 8080,
                "orgId" : $localStorage.orgId,
                "op" : Number($localStorage.userId)
            }
            $scope.nodeportnum1 = "30000";
            $scope.nodeportnum2 = "32767";
            // 提交  carry.secret
            $scope.addDcManageSubmit = function(){

                $scope.carry.nodePort.push($scope.nodeportnum1,$scope.nodeportnum2);
              //  $scope.carry.nodePort.push();
                $scope.carry.name = $scope.DcManageNames;

                dcManageService.addDcPostList($scope.carry, function(rep){
                    console.log(angular.toJson($scope.carry));
                    console.log(angular.toJson(rep));
                    // 显示成功绿条
                    if(rep.code == 0){
                        atomicNotifyService.success(rep.message, 2000);
                        $timeout(function() {
                            $state.go('main.dcManage');
                        }, 1000);
                    }
                    else{
                        atomicNotifyService.error(rep.message, 2000);
                    }



                },function(rep){
                    atomicNotifyService.error(rep.message, 2000);
                    //$scope.login.$invalid = true;
                })
            }

            // 数据中心列表
            $scope.nowPage = 1;
            $scope.wrapDcManage = function(page){
                dcManageService.dcManageList({sessionId:$localStorage.sessionId},function(res){

                    $scope.dcList = JSON.parse(res.data);

                    $scope.totalNum = $scope.dcList.datacenters.length;
                    if($scope.totalNum % 5 == 0){
                        page = page - 1;
                        if(page == 0)
                            page = 1;
                    }
                    $scope.pagList = $scope.dcList.datacenters.slice(5 * (page - 1), 5 * page);

                    // NodePort的转换
                    var dataCenterlist = $scope.dcList.datacenters;
                    angular.forEach(dataCenterlist, function(data){
                        data.nodePort = JSON.parse(data.nodePort);
                    })

                    if(res.code == 0){

                        // 点击删除
                        $scope.dcDelete = function(item){
                            $scope.dcDelConfig = {
                                widgetTitle: "",
                                widgetId: "dcDeldate",
                                isDcManageDel: true,
                                data: item
                            };
                            $rootScope.widget.dcDeldate = true;
                            $scope.$on('submitDelete', function(event, pwd) {
                                var res = {
                                    "op": Number($localStorage.userId),
                                    "name": item.name,
                                    "orgId": $localStorage.orgId,
                                    "sessionId" : $localStorage.sessionId
                                }
                                dcManageService.dcDelData(res, function(data){
                                    if(data == 0){
                                        atomicNotifyService.success(data.message, 2000);
                                        $rootScope.widget.dcDeldate = false;
                                        
                                        $timeout(function() {
                                            $scope.wrapDcManage($scope.nowPage);
                                        }, 1000);
                                    }
                                },function(data){
                                    atomicNotifyService.success(data.message, 2000);
                                })
                            });
                        }

                        // 点击更新
                        $scope.dcUpdata = function(item){
                            $scope.dcUpdataConfig = {
                                widgetTitle: "更新数据中心",
                                widgetId: "dcUpdate",
                                isDcManageUpdata: true,
                                data: item
                            };
                            $rootScope.widget.dcUpdate = true;

                            // 点击确定更新
                            $scope.$on('submitUpdate', function(event, pwd) {
                                // 更新的json
                                $scope.dcdate = {
                                    "op": Number($localStorage.userId),
                                    "name": item.name,
                                    "orgId": $localStorage.orgId,
                                    "nodePort": pwd.nodePort,
                                    "host": pwd.host,
                                    "port": pwd.port,
                                    "sessionId" : $localStorage.sessionId
                                }

                                dcManageService.dcUpData($scope.dcdate, function(){
                                    $rootScope.widget.dcUpdate = false;
                                    
                                    $timeout(function() {
                                        $scope.wrapDcManage($scope.nowPage);
                                    }, 1000);
                                },function(){})

                            });
                        }
                    }
                })
            }
            $scope.pagClick = function(page, pageSize, total){

                $scope.nowPage = page;
                $scope.pagList = $scope.dcList.datacenters.slice(pageSize*(page-1), pageSize*page);

            };
            $scope.wrapDcManage($scope.nowPage);
        }];




    var controllers = [
            {module: 'dcManage', name: 'dcManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);