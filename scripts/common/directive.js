define([	
	'jQuery',
	], function(jQuery){
		'use strict';

        var init = function(){
            angular.module('common')
    			.directive('uiWidget', function(){
        			return {
            			restrict: 'EC',
                        templateUrl: './views/widget/widget.html',
                        scope: {
                            config : '='
                        },
                        replace: true,
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                           $scope.closeWidget = function(widgetId){
                               $rootScope.widget[widgetId] = false;
                           };
                           $scope.$on('closeWidget',function(event, widgetId){
                               $scope.closeWidget(widgetId);
                           });
                        }]
			        };
    			})
    			.directive('uiImageSelector', function(){
        			return {
            			restrict: 'A',
                        templateUrl : './views/widget/imageSelector.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope', 'appManageService', function($scope, $rootScope, appManageService){
                            $scope.imageList = [];
                            appManageService.getImageList({sessionId : $rootScope.sessionId},function(data){
                                $scope.imageList = [];
                                if(data.code == 0){
                                    var list = JSON.parse(data.data);
                                    list.forEach(function(item,index){
                                        item.tags.forEach(function(tag,i){
                                            $scope.imageList.push(item.name + ':' + tag);
                                        });
                                    });
                                }
                            },function(){
                                alert('请求失败');
                            });
                            $scope.clickImageSelector = function(image){
                                $scope.$emit('imageButton', image);
                                $scope.$emit('imageSelector',image);
                            };
                        }]
			        };
    			})
    			.directive('uiAppPodDetail', function(){
        			return {
            			restrict: 'A',
                        templateUrl : './views/widget/appPodDetail.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope', 'appManageService', function($scope, $rootScope, appManageService){

                       //     console.log(angular.toJson($scope.originalData));
                            /*查看日志*/
                            $scope.data = {};
                            $scope.param = $scope.originalData.param;
                            $scope.tabSwitchAndLogs = function(podName) {
                                $scope.data.tabSwitch = 1;
                                $scope.param.podName = podName;
                                appManageService.getLogs($scope.param, function(data){
                                    $scope.logsData = data.data.split('\n');
                                    $scope.canSubmit = true;
                                }, function(){
                                    $scope.canSubmit = true;
                                });
                            }
                        }]

			        };
    			})
    			.directive('uiAppDeployDetail', function(){
        			return {
            			restrict: 'A',
                        templateUrl : './views/widget/appDeployDetail.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                        }]
			        };
    			})
    			.directive('uiAppRollingup', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/rollingup.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            $scope.param = {
                                dcIdList: [$scope.originalData.dcId],
                                strategy: {
                                    image: ''
                                }
                            };

                            $scope.rollShow = false; 
                            $scope.$on('showTips', function(event, tips){
                                $scope.rollShow = tips;
                            });
                            /*监听来自appManage(父)页面的broadcast事件*/
                            $scope.$on('rollingupImage',function(event, image){
                                $scope.param.strategy.image = image;
                            });
                        }]
                    };
                })
                .directive('uiAppRollback', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/rollback.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            $scope.param = {
                                image : ''
                            };
                            /*监听来自appManage(父)页面的broadcast事件*/
                            $scope.$on('rollbackImage',function(event, image){
                                $scope.param.image = image;
                            });

                            $scope.$on('rollbackHistory', function(event, history){
                                $scope.param.history = history;
                            });

                            $scope.$on('rollbackDcId', function(event, dcId){
                                $scope.param.dcId = dcId;
                            });

                            $scope.$on('rollbackAppName', function(event, appName){
                                $scope.param.appName = appName;
                            });
                        }]
                    };
                })
                .directive('uiAppScale', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/scale.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            /*滑块 2016/10/09 by licheng*/
                            $scope.slider = {
                                value: 1,
                                options: {
                                    ceil: 10,
                                    floor: 1,
                                    showSelectionBar: true,
                                    showTicks: true,
                                    getTickColor: function(value) {
                                        return '#d8e0f3';
                                    }
                                }
                            };
                        }]
                    };
                })
                .directive('uiAppDelete', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/delete.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){

                        }]
                    };
                })

                .directive('uiUserdataUpdate', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/userManageUpdate.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){

                        }]
                    };
                })
                .directive('uiUserdataDelete', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/userManageDel.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){

                        }]
                    };
                })
                .directive('uiDcdataDelete', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/dcDelete.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){

                        }]
                    };
                })
                .directive('uiUpdata', function(){
                    return {
                        restrict: 'A',
                        templateUrl : './views/widget/dcUpdata.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){

                            $scope.nodePort = JSON.parse($scope.originalData.nodePort).nodePort;
                            
                        }]
                    };
                })


                .directive('uiOrgRollingUp',function (){
                    return {
                        restrict: 'A',
                        templateUrl: './views/widget/orgRollingUp.html',
                        scope: {
                            originalData : '='
                        },
                        controller : function ($scope, $rootScope, orgManageService){
                            $scope.dataTrans = {
                                quotas: ''
                            };
                            $scope.orgUpdate = function (){

                                var param = {};

                                param.orgId = $scope.originalData.orgId;
                                param.userId =  Number($scope.originalData.userId);
                                param.sessionId = $scope.originalData.sessionId;

                                param.name = $scope.originalData.name;
                                var quota = $scope.originalData.quotaPkg[$scope.dataTrans.quotas];
                                param.cpuQuota = quota.cpu;
                                param.memQuota = quota.mem;

                                orgManageService.orgUpdate(param, function(res){
                                    $rootScope.widget.orgRollingUp = false;

                                    if(res.code == 0){
                                        $scope.$emit('$updateDone', res.message);
                                    }else{
                                        $scope.$emit('$updateError', res.message);
                                    }


                                });
                            };
                        }
                    };
                })

                /*
                *   @desc:
                *       状态指令(适用于Ajax回调函数使用)
                *       message -> 显示信息 status -> 成功失败状态码
                *
                *   @author: mark
                */

                .directive('statusMes', function(){
                    return {
                        restrict: 'EC',
                        replace: true,
                        templateUrl : './views/widget/status.html',
                        scope: {
                            message: '=',
                            status: '='
                        },

                        link: function(scope, element, attr){
                            if(scope.status)
                                element.addClass('suc');
                            else
                                element.addClass('err');

                        }
                    }
                })

                // 扩展功能 - 详细信息
                .directive('uiExtensionsDatails', function(){
                    return {
                        restrict : 'A',
                        replace : true,
                        templateUrl : './views/widget/extensionsdatails.html',
                        scope : {
                            originalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                        }]
                    }
                })

                // 镜像管理 - 详细信息  （暂不显示所以注释）
                // .directive('uiImgDatails', function(){
                //     return {
                //         restrict : 'A',
                //         replace : true,
                //         templateUrl : './views/widget/imgdatails.html',
                //         scope : {
                //             originalData : '='
                //         },
                //         controller : ['$scope', '$rootScope',function($scope, $rootScope){
                //         }]
                //     }
                // })

                /*
                 *   @desc: ng-repeat finished render
                 *
                 *   @author: mark
                 */

                .directive('resourceDomFinished', function($timeout){
                    return {
                        restrict: 'A',
                        link: function (scope,element,attr){

                            if(scope.$last === true)
                            {
                                $timeout(function () {
                                    scope.$emit('$resourceRenderFinished');
                                });
                            }
                        },
                    }
                })
                .directive('applyDomFinished', function($timeout){
                    return {
                        restrict: 'A',
                        link: function (scope,element,attr){

                            if(scope.$last === true)
                            {
                                $timeout(function () {
                                    scope.$emit('$applyRenderFinished');
                                });
                            }
                        },


                    }

                })





        };
		return {
			init: init
		};	
	}
);