/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'orgManageService', '$localStorage', function($scope, orgManageService, $localStorage){
            


        }];




    var controllers = [
            {module: 'orgManage', name: 'orgManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);