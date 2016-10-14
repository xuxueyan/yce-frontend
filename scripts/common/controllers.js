define([
	'../pages/main/controller',
	'../pages/dashboard/controller',
	'../pages/appManage/controller',
	'../pages/costManage/controller',
	'../pages/extensions/controller',
	'../pages/imageManage/controller',
	'../pages/topology/controller',
	'../pages/appManage/deployment/controller',
	'../pages/appManage/history/controller',
	'../pages/orgManage/controller',
	'../pages/userManage/controller',
	'../pages/dcManage/controller',
	'../pages/personalCenter/controller',
	'../pages/walkthrogh/controller'
	], function(mainController, dashboardController, appManageController,  costManageController, extensionsController, imageManageController, topologyController, deploymentController, historyController, orgManageController, userManageController, dcManageController, personalCenterController, walkthroghController){

		'use strict';
		//获取全部controller
		var args = Array.prototype.slice.call(arguments, 0);

		//合并controller
		var controllers = _.reduce(args, function(memo, arg){
			return memo.concat(arg);
		}, []);

		//创建controller
		var init = function(){			
			_.each(controllers, function(controller, index, controllers){
				angular.module(controller.module).controller(controller.name, controller.ctrl);
			});			
		};

		return {
			init: init
		};
	}
);