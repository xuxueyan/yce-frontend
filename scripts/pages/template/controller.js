/**
 * Created by Jora on 2016/7/29.
 */
define([], function() {
    'use strict';


    var ctrl = ['$scope', 'templateService', '$localStorage', '$rootScope', "$state", function($scope, templateService, $localStorage, $rootScope, $state) {
    	
    	var param = {
            "sessionId" : $localStorage.sessionId,
            "orgId" : $localStorage.orgId,
            "userId" : $localStorage.userId
        }
	    function getTemplateList(){
	    	templateService.getTemplateList(param, function(data){
	    		if(data.code == 0){

	    			$scope.templateList = JSON.parse(data.data);
	    		//	console.log(angular.toJson($scope.templateList)+"     @@@@")

	    		}
	    	});
	    }
	    getTemplateList();

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
		            "userId" : $localStorage.userIds,
		            "orgId": $localStorage.orgId,
		            "userId": $localStorage.userId,
		            "name": item.name,
		            "id": item.id
		        }
                    
            	templateService.TemplateDelete(data, function(res){

                    $rootScope.widget.tpDeldate = false;
                    getTemplateList();

                },function(){});

            })
    	}

    	/*更新模板*/
    	$scope.upItem = function(item){
    		// console.log(angular.toJson(item))
    		$state.go('main.addTp',{message: item});

    	}


        
        




    }];

    var controllers = [
        { module: 'template', name: 'templateController', ctrl: ctrl }
    ];

    return controllers;
});
