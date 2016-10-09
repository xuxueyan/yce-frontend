/**
 * Created by Jora on 2016/7/29.
 */
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jQuery: 'lib/jquery/jquery',
        Underscore: 'lib/underscore/underscore',
        jQueryUI: 'lib/jquery-ui/jquery-ui.min',
        rzSlider: 'lib/rzslider/rzslider.min',
        Angular: 'lib/angular/angular',
        uiRouter: 'lib/angular-ui-router/angular-ui-router.min',
        ngStorage: 'lib/angular-storage/ngStorage.min',
        base64: 'lib/base64/base64',
        utils: 'common/utils',
        d3: 'lib/d3/d3.min',
        kubernetesUI: 'lib/topology-graph/topology-graph',
        mockAngular: 'mock/mock.angular',
        mock: 'mock/mock',
        mockData: 'mock/mockData'
    },
    shim: {
        'Angular': {
            deps: ['jQuery']
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
        }
    }
});

require(['app'], function(app) {

});
