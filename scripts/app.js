define([
    'jQuery',
    'Underscore',
    'Angular',
    'uiRouter',
    'ngStorage',
    'kubernetesUI',
    'rzSlider',
    'AngularUI',
    'mock',
    'mockAngular',
    'mockData',
    './common/constant',
    './common/factory',
    './common/filter',
    './common/directive',
    './common/services',
    './common/routers',
    './common/controllers',
    'ngPaging'
], function($, _, angular, uiRouter, ngStorage, kubernetesUI, rzSlider, AngularUI, Mock, mockAngular, mockData, constant, factory, filter, directive, services, routers, controllers) {
    'use strict';

    //通用模块
    angular.module('common', []);
    angular.module('dashboardManage', ['common']);
    angular.module('appManage', ['common', 'rzModule', 'atomic-notify', 'bw.paging']);
    angular.module('rbdManage', ['common']);
    angular.module('costManage', ['common']);
    angular.module('extensionsManage', ['common']);
    angular.module('imageManage', ['common', 'bw.paging']);
    angular.module('topology', ['common']);
    angular.module('orgManage', ['common']);
    angular.module('userManage', ['common']);
    angular.module('dcManage', ['common']);
    angular.module('personalCenter', ['common']);
    angular.module('walkthrogh', ['common']);
    angular.module('template', ['common']);


    //主应用
    var app = angular.module('yce-manage', ['ui.router', 'common', 'ngStorage', 'kubernetesUI', 'dashboardManage', 'appManage', 'rbdManage', 'costManage', 'extensionsManage', 'imageManage', 'topology', 'orgManage', 'userManage', 'dcManage', 'personalCenter', 'walkthrogh', 'template']);
    //路由引导
    Mock.mockjax(app);

    //常量
    constant.init();

    //方法
    factory.init();

    //过滤
    filter.init();

    //指令
    directive.init();

    //服务
    services.init();

    //路由引导
    routers.init(app);

    //控制器引导
    controllers.init();

    angular.bootstrap(window.document, ['yce-manage']);
});
