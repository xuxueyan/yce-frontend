/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';

        var ctrl = ['$scope', '$rootScope', 'appManageService', '$localStorage', function($scope, $rootScope, appManageService, $localStorage){

            $scope.param = {"orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId}

            appManageService.getAppList($scope.param,function(data){
<<<<<<< HEAD
                console.log(data+"@@@@@@@@@@@@@@")
                 if (data.code == 0) {
                    $scope.appList = JSON.parse(data.data);
                //    console.log($scope.appList);
=======
                 if (data.code == 0) {
                    $scope.appList = JSON.parse(data.data);
                    console.log($scope.appList);
>>>>>>> 497c39254dd7c2386a796d12deefb970c5b4bc4f
                 }
            });

            $scope.showAppDetail = function(item){
                $scope.appDetailConf = {
                    widgetId : 'widgetAppDetail',
                    widgetTitle : '应用详情',
                    isAppDetail : true,
                    data : item
                };
                $rootScope.widget = {
                    showAppDetail : true
                };
            };

        }];


        var controllers = [
            {module: 'appManage', name: 'appManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);