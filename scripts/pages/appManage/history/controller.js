/**
 * Created by Jora on 2016/7/29.
 */
define([
], function() {
    'use strict';

    var ctrl = ['$scope', '$http', 'historyService', '$localStorage', '$rootScope', '$state', function($scope, $http, historyService, $localStorage, $rootScope, $state) {

        $scope.param = {
            orgId: $localStorage.orgId,
            userId: $localStorage.userId,
            sessionId: $localStorage.sessionId,
        };

        var leiMap = {
            1: "查询",
            2: "上线",
            3: "回滚",
            4: "滚动升级",
            5: "扩容",
            6: "取消上线,下线",
            7: "暂停上线",
            8: "恢复上线",
            9: "删除"
        }

        /*  historyPage  */
        historyService.getOperationLog($scope.param, function(data) {

            console.log(data);
            //  console.log(angular.toJson(data))
            if (data.code == 0) {
                $scope.historyList = JSON.parse(data.data).operationLog;

                //  操作类型
                $scope.historyList.forEach(function(i) {
                    i.records.actionName = leiMap[angular.toJson(i.records.actionType)];
                })

                /*  点击显示详细信息  */
                $scope.historyShowbox = false;
                $scope.historyLi = function(item) {
                    $scope.historyShowbox = true;
                    $scope.Newreplicas = JSON.parse(item.records.json).spec.replicas;
                    $scope.Newimage = JSON.parse(item.records.json).spec.template.spec.containers[0].image;
                    $scope.Newcpu = JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.cpu;
                    $scope.Newmemory = JSON.parse(item.records.json).spec.template.spec.containers[0].resources.limits.memory;
                    $scope.NewimagePullPolicy = JSON.parse(item.records.json).spec.template.spec.containers[0].imagePullPolicy;

                }
                $scope.historyShow = function() {
                    $scope.historyShowbox = false;
                }

            }
        });

    }];
    var controllers = [
        { module: 'appManage', name: 'historyController', ctrl: ctrl }
    ];

    return controllers;
});
