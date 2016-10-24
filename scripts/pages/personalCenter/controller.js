/**
 * Created by Jora on 2016/7/29.
 */
define([
        'AngularDrag'
    ], function(ngDrag){
        'use strict';


        var ctrl = ['$scope', 'personalCenterService', '$localStorage', function($scope, personalCenterService, $localStorage){
            


        }];




    var controllers = [
            {module: 'personalCenter', name: 'personalCenterController', ctrl: ctrl}
        ];

        return controllers;
    }
);