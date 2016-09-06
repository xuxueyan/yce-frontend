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