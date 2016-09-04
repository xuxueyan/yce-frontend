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
                            console.log($scope.config);
                            $scope.closeWidget = function(){
                                $rootScope.widget = {};
                            };
                            $scope.$on('closeWidget',function(){
                                $scope.closeWidget();
                            });
                        }]
			        };
    			})
    			.directive('uiAppPodDetail', function(){
        			return {
            			restrict: 'A',
                        templateUrl : './views/widget/appPodDetail.html',
                        scope : {
                            orginalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            console.log($scope.orginalData);
                        }]
			        };
    			})
    			.directive('uiAppDeployDetail', function(){
        			return {
            			restrict: 'A',
                        templateUrl : './views/widget/appDeployDetail.html',
                        scope : {
                            orginalData : '='
                        },
                        controller : ['$scope', '$rootScope',function($scope, $rootScope){
                            console.log($scope.orginalData);
                        }]
			        };
    			});
        };
		return {
			init: init
		};	
	}
);