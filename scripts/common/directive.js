define([	
	'jQueryUI',
	], function(jQueryUI){
		'use strict';

        var init = function(){
            angular.module('common')
    			.directive('uiWidget', function(){
        			return {
            			restrict: 'E',
                        templateUrl : './views/widget/widget.html',
                        scope : {
                            config : '='
                        },
                        replace : true,
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
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            console.log($scope.originalData);
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
                            console.log($scope.originalData);
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
                            console.log($scope.originalData);
                            $scope.param = {
                                dcIdList: [$scope.originalData.dcId],
                                strategy: {
                                    image: ''
                                }
                            };

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

                        }]
                    };
                });
        };
		return {
			init: init
		};	
	}
);