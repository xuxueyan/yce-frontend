/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'walkthroghService', '$localStorage', function($scope, walkthroghService, $localStorage){
            


        }];




    var controllers = [
            {module: 'walkthrogh', name: 'walkthroghController', ctrl: ctrl}
        ];

        return controllers;
    }
);