/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'dcManageService', '$localStorage', function($scope, dcManageService, $localStorage){
            


        }];




    var controllers = [
            {module: 'dcManage', name: 'dcManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);