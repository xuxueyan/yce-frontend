/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI'
    ], function(Base64, kubernetesUI){
        'use strict';


        var ctrl = ['$scope', 'topologyService', '$localStorage', function($scope, topologyService, $localStorage){
            $scope.param = {"orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId};

            var index = 0;
            $scope.datasets = [];
            topologyService.getDatasets($scope.param,function(data){
                if (data.code == 0){
                    $scope.datasets.push(JSON.parse(data.data));
                    $scope.data = $scope.datasets[index];

                }
            });

            $scope.kinds = {
                Pod: '#vertex-Pod',
                ReplicaSet: '#vertex-ReplicaSet',
                Node: '#vertex-Node',
                Service: '#vertex-Service',
            };


            $scope.poke = function() {
                index += 1;
                $scope.data = $scope.datasets[index % $scope.datasets.length];
            };

            $scope.$on("select", function(ev, item) {
                var text = "";
                if (item){
                    text = "Selected: " + item.metadata.name;
                }
                angular.element(document.getElementById("selected")).text(text);
            });
        }];



        var controllers = [
            {module: 'topology', name: 'topologyController', ctrl: ctrl}
        ];

        return controllers;
    }
);