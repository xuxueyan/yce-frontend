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

                    //分页
                    $scope.totalNum = $scope.templateList.templates.length;
                    if($scope.totalNum % 5 == 0)
                        page = page-1;
                    $scope.pagList = $scope.templateList.templates.slice((page-1)*5, page*5);
	    		}
	    	});
	    }
	    $scope.getTemplateList();
        //分页点击传数字
        $scope.pagClick = function(page, pageSize, total){
            $scope.nowPage = page;
            $scope.pagList = $scope.templateList.templates.slice((page-1)*5, page*5);
        }

    	//删除 
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
                    if(res.code == 0){
                        $rootScope.widget.tpDeldate = false;
                        $scope.getTemplateList();

                        $timeout(function(){
                            $scope.getTemplateList($scope.nowPage);
                        }, 1000)
                    }
                },function(){});

            })
    	};

    	/*点击更新模板按钮*/
    	$scope.upItem = function(item){
    		$state.go('main.addTp',{message: item});
    	};

    }];

    var controllers = [
        { module: 'template', name: 'templateController', ctrl: ctrl }
    ];

    return controllers;
});
