/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'eCharts',
    ], function(Base64,echarts){
        'use strict';

        var ctrl = ['$scope', function($scope){

            //总览实例
            var totalResEchart = echarts.init(document.getElementById('totalResource'));

            //配置项
            var totalOption = {
                title: {
                    text: '数据中心总览',
                    left: 'center',
                    textStyle: {
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:['CPU已用','CPU未用','内存已用','内存未用']
                },
                series: [
                    {
                        name:'内存使用率',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'内存已用'},
                            {value:679, name:'内存未用'},
                        ]
                    },
                    {
                        name:'CPU使用率',
                        type:'pie',
                        radius: ['40%', '55%'],
                        data:[
                            {value:335, name:'CPU已用'},
                            {value:310, name:'CPU未用'},
                        ]
                    }
                ]
            };







            totalResEchart.setOption(totalOption);
        }];



        var controllers = [
            {module: 'dashboardManage', name: 'dashboardController', ctrl: ctrl}
        ];

        return controllers;
    }
);