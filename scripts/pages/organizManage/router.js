define([], function(){
    'use strict';

    var router = {
        organizManage: {
            url: '/organizManage',
            templateUrl: 'views/organizManage/organizAppend.html',
            controller: 'organizManageController'
        }
    };

    return router;
});