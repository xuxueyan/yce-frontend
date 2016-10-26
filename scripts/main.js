/**
 * Created by Jora on 2016/7/29.
 */
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jQuery: 'lib/jquery/jquery',
        Underscore: 'lib/underscore/underscore',
        jQueryUI: 'lib/jquery-ui/jquery-ui.min',
        eCharts: 'lib/echarts/echarts',
        Angular: 'lib/angular/angular',
        AngularUI: 'lib/angular-ui/echarts-all',
        uiRouter: 'lib/angular-ui-router/angular-ui-router.min',
        ngStorage: 'lib/angular-storage/ngStorage.min',
        rzSlider: 'lib/rzslider/rzslider',
        utils: 'common/utils',
        d3: 'lib/d3/d3.min',
        kubernetesUI: 'lib/topology-graph/topology-graph',
        mockAngular: 'mock/mock.angular',
        mock: 'mock/mock',
        mockData: 'mock/mockData',
        AngularDrag: 'lib/angular-drag/angular-drag'
    },
    shim: {
        'Angular': {
            deps: ['jQuery']
        },
        'AngularUI': {
            deps: ['Angular']
        },
        'uiRouter': {
            deps: ['Angular']
        },
        'ngStorage': {
            deps: ['Angular']
        },
        'jQueryUI': {
            deps: ['jQuery']
        },
        'mockAngular': {
            deps: ['mock']
        },
        'mockData': {
            deps: ['mock']
        },
        'kubernetesUI': {
            deps: ['Angular']
        },
        'rzSlider': {
            deps: ['Angular']
        },
        'AngularDrag': {
            deps: ['Angular']
        }
    }
});

require(['app'], function(app) {

});
