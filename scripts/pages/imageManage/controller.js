/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function(Base64){
        'use strict';


        var ctrl = ['$scope','$http', function($scope,$http){

            $http({
                url : "/api/v1/registry/images",
                method : 'GET'
            })
            .success(function(data){
                var newcode = data.code;
                if(newcode == 0){
                    $scope.newImage = JSON.parse(data.data);
                    var newImages = JSON.parse(data.data);
                }
            })
            .error(function(){
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