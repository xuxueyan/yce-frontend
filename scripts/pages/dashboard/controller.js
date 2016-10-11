/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'eCharts',
    ], function(Base64,echarts){
        'use strict';

        var ctrl = ['$scope', 'dashboardService', function($scope,dashboardService){

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
                            {value:330, name:'内存已用'},
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


            // 办公室实例    --------

            var officeResEchart = echarts.init(document.getElementById('officeResource'));
            var officeOption = {
                title: {
                    show: true,  // 是否显示头信息
                    text: '办公网总览',
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
                            {value:330, name:'内存已用'},
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
            }
            officeResEchart.setOption(officeOption)


            var officeAppEchart = echarts.init(document.getElementById('officeApply'));

            var officeOption = {
                title: {
                    text: '办公网应用',
                    left: 'left',
                    textStyle: {
                        fontSize: 16
                    }
                },
                series : [
                    {
                        type: 'graph',
                        symbolSize: 20,
                        layout: 'circular',
                        roam: 'move',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        edgeSymbol: ['none', 'none'],
                        data: [{
                            name: '节点1'
                        }, {
                            name: '节点2'

                        }, {
                            name: '节点3'

                        }, {
                            name: '节点4'

                        },{
                            name: '节点5'

                        }],
                        links: [{
                            source: '节点2',
                            target: '节点5'

                        }, {
                            source: '节点1',
                            target: '节点5'
                        }, {
                            source: '节点3',
                            target: '节点5'
                        }, {
                            source: '节点4',
                            target: '节点5'
                        }],
                        lineStyle: {
                            normal: {
                                opacity: 0.9,
                                width: 2,
                                curveness: 0
                            }
                        }
                    }
                ]



            };

            officeAppEchart.setOption(officeOption);


            totalResEchart.setOption(totalOption);


            //  --
            // dashboardService.CreatService('',function(data){
            //     // 成功
            // },
            // function(){
            //     // 失败
            // })

        }];



        var controllers = [
            {module: 'dashboardManage', name: 'dashboardController', ctrl: ctrl}
        ];

        return controllers;
    }
);