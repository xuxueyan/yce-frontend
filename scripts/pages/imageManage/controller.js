/**
 * Created by Jora on 2016/7/29.
 */
define([
    ], function(){
        'use strict';


        var ctrl = ['$scope','$http','imageManageService', '$rootScope' ,function($scope,$http,imageManageService,$rootScope){
            imageManageService.myImageManage('',function(data){
                var newcode = data.code;
                if(newcode == 0){
                    $scope.newImage = JSON.parse(data.data);
                    var newImages = JSON.parse(data.data);
                }
            },function(){
                var newcode = data.code;
                if(newcode != 0){
                    console.log(data.message)
                }
            })

            //  ******  镜像管理 详情  (暂不显示所以注释)
            // $scope.imgnameBtn = function(item){
            //     console.log(angular.toJson(item));
            //     $scope.imgConfig = {
            //         widgetId : 'imgDatails',
            //         widgetTitle : '镜像详情',
            //         imgDatails : true,
            //         data : item
            //     }
            //     $rootScope.widget.imgDatails = true;
            // }

        }];

        var controllers = [
            {module: 'imageManage', name: 'imageManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);