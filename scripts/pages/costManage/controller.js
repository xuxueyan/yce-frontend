/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64'
    ], function (Base64) {
        'use strict';

        var ctrl = ['$scope', 'costManageService', '$localStorage', function ($scope, costManageService, $localStorage) {

        }];

        var controllers = [
            {module: 'costManage', name: 'costManageController', ctrl: ctrl}
        ];

        return controllers;
    }
);