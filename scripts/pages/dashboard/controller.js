/**
 * Created by Jora on 2016/7/29.
 */
define([
    'eCharts',
    'Angular',
    'jQuery'
], function( echarts, angular, $) {
    'use strict';

    var ctrl = ['$scope', '$timeout', 'dashboardService', '$localStorage', function($scope, $timeout, dashboardService, $localStorage) {


        var param = {
            "sessionId": $localStorage.sessionId,
            "orgId": $localStorage.orgId
        };


        //  饼图
        dashboardService.getResData(param, function(res) {

            if (res.code == 0) {

                var dataPie = JSON.parse(res.data);

                $scope.resourceDom = dataPie;

                $scope.$on('$resourceRenderFinished', function() {


                    angular.forEach(dataPie, function(data, index, array) {

                        echarts.init(document.getElementById('resourceDom' + data.dcId)).setOption({
                            backgroundColor: '#fff',
                            title: {
                                text: data.dcName,
                                left: 'center',
                                top: 20,
                                textStyle: {
                                    fontSize: 16
                                }
                            },
                            color: ['#69bbff', '#64d468', '#e04f4f', '#f7954e', ], //重写颜色
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                left: 10,
                                top: 10,
                                data: ['CPU已用', 'CPU未用', '内存已用', '内存未用']
                            },
                            series: [{
                                name: '内存使用率',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],
                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                data: [
                                    { value: data.mem.used, name: '内存已用' },
                                    { value: data.mem.total - data.mem.used, name: '内存未用' }
                                ]
                            }, {
                                name: 'CPU使用率',
                                type: 'pie',
                                radius: ['40%', '55%'],
                                data: [
                                    { value: data.cpu.used, name: 'CPU已用' },
                                    { value: data.cpu.total - data.cpu.used, name: 'CPU未用' }
                                ]
                            }]
                        });

                    });
                });
            }
        });

        //  拓扑关系图
        dashboardService.getApplyData(param, function(res) {
            if (res.code == 0) {
                var dataGraph = JSON.parse(res.data);

                $scope.applyDom = dataGraph;

                $scope.$on('$applyRenderFinished', function() {


                    angular.forEach(dataGraph, function(data, index) {

                        var sourceName = data.deploymentName;
                        var dataNodes = [];
                        var linkArray = [];
                        var dataArray = [];

                        angular.forEach(data.podName, function(data) {

                            data = data.substring(data.length - 5);

                            dataNodes.push(data);

                            linkArray.push({
                                source: data,
                                target: sourceName

                            });

                        });

                        dataNodes.push(sourceName);


                        angular.forEach(dataNodes, function(data, index, array) {


                            if (index == array.length - 1) {
                                dataArray.push({
                                    'name': data,
                                    'itemStyle': {
                                        normal: {
                                            color: '#e04f4f'
                                        }
                                    }
                                })

                            } else {
                                dataArray.push({
                                    "name": data,
                                    'itemStyle': {
                                        normal: {
                                            color: '#64d468',
                                        }
                                    }
                                })
                            }

                        });



                        echarts.init(document.getElementById('applyDom' + index)).setOption({

                            backgroundColor: '#fff',
                            title: {
                                text: data.dcName,
                                left: 10,
                                top: 20,
                                textStyle: {
                                    fontSize: 16
                                }
                            },

                            series: [{
                                type: 'graph',
                                symbolSize: 20,
                                layout: 'force',
                                force: {
                                    repulsion: 500
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data: dataArray,
                                links: linkArray,
                                lineStyle: {
                                    normal: {
                                        opacity: 0.9,
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            }]


                        });


                    });


                });


            }

        });


        //  柱状图
        dashboardService.getHandleData(param, function(res) {
            if (res.code == 0) {

                var dataHistogram = JSON.parse(res.data);

                echarts.init(document.getElementById('handleDom')).setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: '操作',
                        x: 'center',
                        top: 20,
                        textStyle: {
                            fontSize: 16
                        }
                    },
                    color: ['#616eb7', '#31b0d5', '#FFC107', '#4CAF50', '#f44336'], //重写颜色
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        top: 10,
                        data: ['发布', '扩容', '滚动升级', '回滚', '删除']
                    },
                    grid: {
                        width: '600px',
                        height: '300px',
                        left: '17%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: dataHistogram.date
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '发布',
                        type: 'bar',
                        barWidth : 5,
                        data: dataHistogram.statistics.online
                    }, {
                        name: '扩容',
                        type: 'bar',
                        barWidth : 5,
                        data: dataHistogram.statistics.scale
                    }, {
                        name: '滚动升级',
                        type: 'bar',
                        barWidth : 5,
                        data: dataHistogram.statistics.rollingupgrade
                    }, {
                        name: '回滚',
                        type: 'bar',
                        barWidth : 5,
                        data: dataHistogram.statistics.rollback
                    }, {
                        name: '删除',
                        type: 'bar',
                        barWidth : 5,
                        data: dataHistogram.statistics.delete
                    }]
                })
            }
        })

        

    }];



    var controllers = [
        { module: 'dashboardManage', name: 'dashboardController', ctrl: ctrl }
    ];

    return controllers;
});
