/**
 * Created by Jora on 2016/7/29.
 */
define([], function() {
    'use strict';


    var ctrl = ['$scope', 'templateService', '$localStorage', '$rootScope', "$state", '$timeout', 'atomicNotifyService', function($scope, templateService, $localStorage, $rootScope, $state, $timeout, atomicNotifyService) {
    	
    	var param = {
            "sessionId" : $localStorage.sessionId,
            "orgId" : $localStorage.orgId,
            "userId" : $localStorage.userId
        };
        $scope.nowPage = 1;
        $scope.getTemplateList =  function(page){
	    	templateService.getTemplateList(param, function(data){
	    		if(data.code == 0){
                    $scope.templateList = JSON.parse(data.data);

                    angular.forEach($scope.templateList.templates, function(i){

                        i.deployment = JSON.parse(i.deployment);
                        i.service = JSON.parse(i.service);

                    });

                    //分页
                    $scope.totalNum = $scope.templateList.templates.length;
                    if($scope.totalNum % 5 == 0){
                        page = page - 1;
                        if(page == 0)
                            page = 1;
                    }
                    $scope.pagList = $scope.templateList.templates.slice((page - 1) * 5, page * 5);
	    		}
	    	});
	    }
        //分页点击传数字
        $scope.pagClick = function(page, pageSize, total){
            $scope.nowPage = page;
            $scope.pagList = $scope.templateList.templates.slice(pageSize*(page-1), pageSize*page);
        }
        $scope.getTemplateList($scope.nowPage);

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
                        atomicNotifyService.success(res.message, 2000);
                        $rootScope.widget.tpDeldate = false;
                        $timeout(function(){
                            $scope.getTemplateList($scope.nowPage);
                        }, 1000)
                    }else{
                        atomicNotifyService.error(res.message, 2000);
                    }
                }, function(res){
                    atomicNotifyService.error(res.message, 2000);
                });

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
