/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'eCharts',
    ], function(Base64,echarts){
        'use strict';

        var ctrl = ['$scope', function($scope){

            //eCharts实例
            var docEchart = echarts.init(document.getElementById('docker'));

            //配置项
            var options = {
                //backgroundColor: '#fff',
                title: {
                    text: 'ECharts 示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]

            };

            docEchart.setOption(options);


        }];



        var controllers = [
            {module: 'dashboardManage', name: 'dashboardController', ctrl: ctrl}
        ];

        return controllers;
    }
);