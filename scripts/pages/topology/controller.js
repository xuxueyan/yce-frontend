/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function(Base64, kubernetesUI,$){
        'use strict';


        var ctrl = ['$scope', 'topologyService', '$localStorage', function($scope, topologyService, $localStorage){
            $scope.param = {"orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId};


            $scope.graph = function(){
                $scope.index = 0;
                $scope.datasets = [];
                topologyService.getDatasets($scope.param,function(data){
                    if (data.code == 0){
                        $scope.datasets.push(JSON.parse(data.data));
                        $scope.data = $scope.datasets[$scope.index];

                    }
                });
            };


            $scope.graph();

            $scope.kinds = {
                Pod: '#vertex-Pod',
                ReplicaSet: '#vertex-ReplicaSet',
                Node: '#vertex-Node',
                Service: '#vertex-Service',
            };


            $scope.poke = function() {
                $scope.index += 1;
                $scope.data = $scope.datasets[$scope.index % $scope.datasets.length];
            };

            $scope.$on("select", function(ev, item) {
                if (item){
                    $scope.selectText = "Selected: " + item.metadata.name;
                    angular.element(document.getElementById("selected")).text($scope.selectText).addClass('btn btn-primary');
                }else{
                    angular.element(document.getElementById("selected")).text('').removeClass('btn btn-primary');
                }
            });



        }];




    var controllers = [
            {module: 'topology', name: 'topologyController', ctrl: ctrl}
        ];

        return controllers;
    }
);