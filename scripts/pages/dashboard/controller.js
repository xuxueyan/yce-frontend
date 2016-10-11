/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'eCharts',
        'Angular',
        'jQuery'
    ], function(Base64,echarts,angular,$){
        'use strict';

        var ctrl = ['$scope','$timeout', 'dashboardService', function($scope,$timeout,dashboardService){




            //  饼图
            dashboardService.getResData('', function (res){

                if(res.code == 0)
                {

                    $scope.resourceDom = res.data;

                    $scope.$on('$resourceRenderFinished',function(){

                        angular.forEach(res.data,function (data,index,array){                            

                            echarts.init(document.getElementById('resourceDom' + data.dcId)).setOption(
                                {
                                    title: {
                                        text: data.dcName,
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
                                            data:[
                                                {value: data.mem.used, name:'内存已用'},
                                                {value: data.mem.total - data.mem.used, name:'内存未用'}
                                            ]
                                        },
                                        {
                                            name:'CPU使用率',
                                            type:'pie',
                                            radius: ['40%', '55%'],
                                            data:[
                                                {value:data.cpu.used, name:'CPU已用'},
                                                {value:data.cpu.total - data.cpu.used, name:'CPU未用'}
                                            ]
                                        }
                                    ]
                                }
                            );

                        });
                    });
                }
            });

            //  拓扑关系图
            dashboardService.getApplyData('',function(res){
                if(res.code == 0)
                {

                    //$scope.applyDom = res.data;

                    var domNodes = [];

                    angular.forEach(res.data,function(data,index,array){
                      //  console.log(angular.toJson(data)+"-----  data")
                        angular.forEach(data.deployments,function(data){

                            domNodes.push(data);

                        })

                    });

                    console.log('dom节点总个数' + domNodes.length);

                    $scope.applyDom = domNodes;

                    $scope.$on('$applyRenderFinished',function(){


                        angular.forEach(domNodes,function(data,index){

                         //   console.log(JSON.stringify(data));

                            var sourceName = data.rsName;
                            var dataNodes = [];
                            var linkArray = [];
                            var dataArray = [];


                            angular.forEach(data.podName,function(data){

                                dataNodes.push(data);

                                linkArray.push({
                                    source : data,
                                    target: sourceName

                                });

                            });

                            dataNodes.push(sourceName);

                            angular.forEach(dataNodes,function(data){
                                dataArray.push(
                                    {
                                        "name": data
                                    }
                                )
                            });



                            echarts.init(document.getElementById('applyDom' + index)).setOption({
                                title: {
                                    text: data.dcName,
                                    left: 'left',
                                    textStyle: {
                                        fontSize: 16
                                    }
                                },

                                series : [
                                    {
                                        type: 'graph',
                                        symbolSize: 20,
                                        layout: 'force',
                                        force: {
                                            repulsion: 1500
                                        },
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top'
                                            }
                                        },
                                        edgeSymbol: ['none', 'none'],
                                        data: dataArray,
                                        links: linkArray,
                                        lineStyle: {
                                            normal: {
                                                opacity: 0.9,
                                                width: 2,
                                                curveness: 0
                                            }
                                        }
                                    }
                                ]


                            });


                        });


                        //angular.forEach(res.data, function (data,index){
                        //
                        //    var itemTitle = data.dcName;
                        //
                        //
                        //
                        //    var applyArray = [];
                        //    //
                        //    var seriesArray = [];
                        //
                        //
                        //    angular.forEach(data.deployments,function(data, index){
                        //
                        //        var nodes = [];
                        //        var dataArray = [];
                        //
                        //        //关系集合
                        //        var linkArray = [];
                        //
                        //
                        //        var souceName = data.rsName;
                        //
                        //        //push podName
                        //        angular.forEach(data.podName,function(data){
                        //            nodes.push(data);
                        //
                        //            linkArray.push({
                        //                source : data,
                        //                target: souceName
                        //
                        //            })
                        //
                        //        });
                        //
                        //        //所有点的集合
                        //        nodes.push(data.rsName);
                        //
                        //        // 转换 data
                        //        angular.forEach(nodes,function(data){
                        //            dataArray.push(
                        //                {
                        //                    "name": data
                        //                }
                        //            )
                        //        });
                        //
                        //        seriesArray.push({
                        //            type: 'graph',
                        //            symbolSize: 20,
                        //            layout: 'force',
                        //            force: {
                        //                repulsion: 1500
                        //            },
                        //            left: ((index+1) % 4) * 20 + "%",
                        //            top: ((index+1) % 4) * 20 + '%',
                        //            width: '20%',
                        //            height: '20%',
                        //            roam: 'move',
                        //
                        //            label: {
                        //                normal: {
                        //                    show: true,
                        //                    position: 'top'
                        //                }
                        //            },
                        //            edgeSymbol: ['none', 'none'],
                        //            data: dataArray,
                        //            links: linkArray,
                        //            lineStyle: {
                        //                normal: {
                        //                    opacity: 0.9,
                        //                    width: 2,
                        //                    curveness: 0
                        //                }
                        //            }
                        //
                        //        });
                        //
                        //        console.log(JSON.stringify(seriesArray));
                        //
                        //    });
                        //
                        //    echarts.init(document.getElementById('applyDom' + data.dcId)).setOption({
                        //        title: {
                        //            text: data.dcName,
                        //            left: 'left',
                        //            textStyle: {
                        //                fontSize: 16
                        //            }
                        //        },
                        //        series: seriesArray
                        //    })
                        //
                        //});



                    });


                }

            });

            //  柱状图
            dashboardService.getHandleData('',function(res){
                if(res.code == 0){
                    console.log(angular.toJson(res.data.date))

                    echarts.init(document.getElementById('handleDom')).setOption(
                        {
                            title: {
                                text: '操作',
                                left: 'center',
                                textStyle: {
                                    fontSize: 16
                                }
                            },
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                x: 'left',
                                orient: 'vertical',
                                data:['发布','扩容','滚动升级','回滚','删除']
                            },
                            grid: {
                                width: '730px',
                                height: '300px',
                                left: '17%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : res.data.date
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'发布',
                                    type:'bar',
                                    data:res.data.statistics.online
                                },
                                {
                                    name:'扩容',
                                    type:'bar',
                                    data:res.data.statistics.scale
                                },
                                {
                                    name:'滚动升级',
                                    type:'bar',
                                    data:res.data.statistics.rollingupgrade
                                },
                                {
                                    name:'回滚',
                                    type:'bar',
                                    data:res.data.statistics.rollback
                                },
                                {
                                    name:'删除',
                                    type:'bar',
                                    data:res.data.statistics.delete
                                }
                            ]
                        }
                    )
                }
            })

        }];



        var controllers = [
            {module: 'dashboardManage', name: 'dashboardController', ctrl: ctrl}
        ];

        return controllers;
    }
);