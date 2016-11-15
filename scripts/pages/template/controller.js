/**
 * Created by Jora on 2016/7/29.
 */
define([], function() {
    'use strict';


    var ctrl = ['$scope', 'templateService', '$localStorage', '$rootScope', function($scope, templateService, $localStorage, $rootScope) {
    	
    	var param = {
            "sessionId" : $localStorage.sessionId,
            "orgId" : $localStorage.orgId,
            "userId" : $localStorage.userId
        }

    	templateService.getTemplateList(param, function(data){
    		if(data.code == 0){

    			$scope.templateList = JSON.parse(data.data);


		    	/* 删除 */
		    	$scope.delItem = function(item, name, id){

		    		//console.log(name,id)

		    		$scope.tpDelConfig = {
		                widgetTitle: "删除",
		                widgetId: "tpDeldate",
		                isDelTemplate: true,
		                data: item
		            };

		            $rootScope.widget.tpDeldate = true;

		          //   $scope.$on('submitDelete', function(event, pwd) {
		          //   	var data = {
				        //     "sessionId" : $localStorage.sessionId,
				        //     "orgId" : $localStorage.orgId,
				        //     "userId" : $localStorage.userIds,
				        //     "orgId": item.orgId,
				        //     "userId": item.userId
				        // }
		                    

		          //   	templateService.TemplateDelete(data, function(res){

		          //           $rootScope.widget.tpDeldate = false;

		          //       },function(){})

		          //   })
		    	}







    		}
    	});




        
        




    }];

    var controllers = [
        { module: 'template', name: 'templateController', ctrl: ctrl }
    ];

    return controllers;
});
