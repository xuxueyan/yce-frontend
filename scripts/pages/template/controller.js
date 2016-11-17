/**
 * Created by Jora on 2016/7/29.
 */
define([], function() {
    'use strict';


    var ctrl = ['$scope', 'templateService', '$localStorage', '$rootScope', "$state", '$timeout', function($scope, templateService, $localStorage, $rootScope, $state, $timeout) {
    	
    	var param = {
            "sessionId" : $localStorage.sessionId,
            "orgId" : $localStorage.orgId,
            "userId" : $localStorage.userId
        };
        $scope.getTemplateList =  function(page){
	    	templateService.getTemplateList(param, function(data){
	    		if(data.code == 0){

	    			$scope.templateList = JSON.parse(data.data);
                    console.log(angular.toJson($scope.templateList))
                   // $scope.totalNum = $scope.templateList[0].deployments.length;

                    if($scope.totalNum % 5 == 0)
                        page = page-1;

                    //$scope.pagList = $scope.templateList[0].deployments.slice((page-1)*5, page*5);

	    		}
	    	});
	    }
	    $scope.getTemplateList();

        $scope.pagClick = function(page, pageSize, total){

            $scope.nowPage = page;
            //$scope.pagList = $scope.templateList[0].deployments.slice((page-1)*5, page*5);
        }

    	/* 删除 */
    	$scope.delItem = function(item){

    		$scope.tpDelConfig = {
                widgetTitle: "删除",
                widgetId: "tpDeldate",
                isDelTemplate: true,
                data: item
            };

            $rootScope.widget.tpDeldate = true;

            $scope.$on('submitDelete', function(event, pwd) {

            	var data = {
		            "sessionId" : $localStorage.sessionId,
		            "orgId" : $localStorage.orgId,
		            "userId": $localStorage.userId,
		            "name": item.name,
		            "id": item.id
		        };
                    
            	templateService.TemplateDelete(data, function(res){
                    if(rep.code == 0){
                        $rootScope.widget.tpDeldate = false;
                        getTemplateList();

                        $timeout(function(){
                            $scope.getTemplateList($scope.nowPage);
                        }, 1000)
                    }


                },function(){});

            })
    	};

    	/*更新模板*/
    	$scope.upItem = function(item){
    		// console.log(angular.toJson(item))
    		$state.go('main.addTp',{message: item});

    	};

    }];

    var controllers = [
        { module: 'template', name: 'templateController', ctrl: ctrl }
    ];

    return controllers;
});
