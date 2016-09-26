/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';


        var ctrl = ['$scope','$http','imageManageService', function($scope,$http,imageManageService){
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

        }];

        var controllers = [
            {module: 'imageManage', name: 'imageManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);