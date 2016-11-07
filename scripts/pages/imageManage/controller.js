/**
 * Created by Jora on 2016/7/29.
 */
define([
        'ngPaging'
    ], function(){
        'use strict';


        var ctrl = ['$scope','$http','imageManageService', '$rootScope' ,function($scope,$http,imageManageService,$rootScope){
            imageManageService.myImageManage('',function(data){
                var newcode = data.code;
                if(newcode == 0){
                    $scope.newImage = JSON.parse(data.data);
                    $scope.totalNum = $scope.newImage.length;
                    $scope.pagList = $scope.newImage.slice(0, 5);
                }
            });

            $scope.pagClick = function (page, pageSize, total){
                if(page == 1){
                    $scope.pagList = $scope.newImage.slice(0, 5);

                }else{
                    if(total - page * pageSize >= pageSize)
                        $scope.pagList = $scope.newImage.slice(pageSize * (page - 1), pageSize * page);
                    else
                        $scope.pagList = $scope.newImage.slice(pageSize * (page - 1), total);
                }

            };





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