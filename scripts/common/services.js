define([		
	'../pages/main/service',
	'../pages/dashboard/service',
	'../pages/appManage/service',
	'../pages/costManage/service',
	'../pages/extensions/service',
	'../pages/imageManage/service',
	'../pages/topology/service',
	'../pages/appManage/deployment/service',
	'../pages/appManage/history/service',
	'../pages/orgManage/service',
	'../pages/userManage/service',
	'../pages/dcManage/service',
	'../pages/personalCenter/service',
	'../pages/walkthrogh/service',
	'../pages/template/service',
	'../pages/template/addTemplate/service'
], function(mainService, dashboardService, appManageService, costManageService, extensionsService, imageManageService, topologyService, deploymentService, historyService, orgManageService, userManageService, dcManageService, personalCenterService, walkthroghService, templateService, addTemplateService){

	'use strict';
	//获取全部service
	var args = Array.prototype.slice.call(arguments, 0);

	//services[]
	var services = args;

	//创建service
	var init = function(){
		_.each(services, function(service, index, services){
			angular.module(service.module).factory(service.name,['$http', function($http){
				return service.getApis($http);
			}]);
		});
	};

	return {
		init: init
	};
});