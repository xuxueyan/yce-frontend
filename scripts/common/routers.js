define([
	'../pages/main/router',
	'../pages/dashboard/router',
	'../pages/appManage/router',
	'../pages/costManage/router',
	'../pages/extensions/router',
	'../pages/imageManage/router',
	'../pages/topology/router',
	'../pages/appManage/deployment/router',
	'../pages/appManage/history/router',
	'../pages/orgManage/router',
	'../pages/userManage/router',
	'../pages/dcManage/router',
	'../pages/personalCenter/router',
	'../pages/walkthrogh/router'
		], function(mainRouter, dashboardRouter, appManageRouter, costManageRouter, extensionsRouter, imageManageRouter, topologyRouter, deploymentRouter, historyRouter, orgManageRouter, userManageRouter, dcManageRouter, personalCenterRouter, walkthroghRouter){

		'use strict';

		var init = function(app){
			app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
				$urlRouterProvider.otherwise("/login");

				$stateProvider
					.state('login', mainRouter.login)
					.state('main', mainRouter.main)
					.state('main.dashboard', dashboardRouter.dashboard)
					.state('main.appManage', appManageRouter.appManage)
					.state('main.appManageDeployment', deploymentRouter.deployment)
					.state('main.appManageHistory', historyRouter.history)
					.state('main.costManage', costManageRouter.costManage)
					.state('main.extensions', extensionsRouter.extensions)
					.state('main.extensionsService', extensionsRouter.service)
					.state('main.extensionsEndpoint', extensionsRouter.endpoint)
					.state('main.imageManage', imageManageRouter.imageManage)
					.state('main.imageManageBase', imageManageRouter.base)
					.state('main.imageManageSearch', imageManageRouter.search)
					.state('main.imageManageDelete', imageManageRouter.delete)
					.state('main.topology', topologyRouter.topology)
					.state('main.orgManage',orgManageRouter.orgManage)
					.state('main.addOrg',orgManageRouter.addOrgManage)
					.state('main.userManage',userManageRouter.userManage)
					.state('main.createUser',userManageRouter.createUserManage)
					.state('main.dcManage',dcManageRouter.dcManage)
					.state('main.addDc',dcManageRouter.addDcManage)
					.state('main.personalCenter',personalCenterRouter.personalCenter)
					.state('main.personalSetting',personalCenterRouter.personalSetting)
					.state('main.personalPassword',personalCenterRouter.personalPassword)
					.state('main.eventAlert',personalCenterRouter.eventAlert)
					.state('main.recharge',personalCenterRouter.recharge)
					.state('main.walkthrogh',walkthroghRouter.walkthrogh)

			}]);
		};

		return {
			init: init
		};	
	}
);