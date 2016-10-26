/**
 * Created by Jora on 2016/7/29.
 */
define([
    'base64',
    'kubernetesUI',
    'jQuery'
], function(Base64, kubernetesUI, $) {
    'use strict';


    var ctrl = ['$scope', 'topologyService', '$localStorage', function($scope, topologyService, $localStorage) {
        $scope.param = { "orgId": $localStorage.orgId, "userId": $localStorage.userId, "sessionId": $localStorage.sessionId };


        $scope.graph = function() {
            $scope.index = 0;
            $scope.datasets = [];
            topologyService.getDatasets($scope.param, function(data) {
                if (data.code == 0) {
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
            if (item) {
                console.log(item);
                $scope.selectKind = item.kind
                $scope.selectText = "Selected: " + item.metadata.name;
                $scope.selectName = item.metadata.name;
                $scope.selectSpace = item.metadata.namespace;
                $scope.selectTime = item.metadata.creationTimestamp;
                angular.element(document.getElementById("selected")).text($scope.selectText).addClass('btn btn-primary');;
                if ($scope.selectKind == 'ReplicaSet') {
                    $scope.Rshow = false;
                    $scope.Pshow = false;
                    $scope.Nshow = false;
                    $scope.Sshow = false;
                    $scope.showSelect = function() {
                        $scope.Rshow = !$scope.Rshow;
                    }
                    $scope.close = function() {
                        $scope.Rshow = false;
                    }
                    $scope.selectSpace = item.metadata.namespace;
                    $scope.selectImage = item.spec.template.spec.containers[0].image;

                    angular.element(document.getElementById("selectRSpace")).text($scope.selectSpace);
                    angular.element(document.getElementById("selectRImage")).text($scope.selectImage);
                    angular.element(document.getElementById("selectRTime")).text($scope.selectTime);
                    angular.element(document.getElementById('selectRName')).text($scope.selectName);
                    angular.element(document.getElementById('selectRKind')).text($scope.selectKind)

                } else if ($scope.selectKind == 'Pod') {
                    $scope.Rshow = false;
                    $scope.Pshow = false;
                    $scope.Nshow = false;
                    $scope.Sshow = false;
                    $scope.showSelect = function() {
                        $scope.Pshow = !$scope.Pshow;
                    }
                    $scope.close = function() {
                        $scope.Pshow = false;
                    }
                    $scope.selectImage = item.spec.containers[0].image;
                    $scope.selectNode = item.spec.nodeName;
                    $scope.selectPhase = item.status.phase;
                    $scope.selectIp = item.status.podIP;
                    $scope.selectCount = item.status.containerStatuses[0].restartCount;
                    angular.element(document.getElementById("selectPSpace")).text($scope.selectSpace);
                    angular.element(document.getElementById("selectPImage")).text($scope.selectImage);
                    angular.element(document.getElementById("selectPTime")).text($scope.selectTime);
                    angular.element(document.getElementById('selectPName')).text($scope.selectName);
                    angular.element(document.getElementById('selectPKind')).text($scope.selectKind);
                    angular.element(document.getElementById('selectPNode')).text($scope.selectNode);
                    angular.element(document.getElementById('selectPPhase')).text($scope.selectPhase);
                    angular.element(document.getElementById('selectPIp')).text($scope.selectIp);
                    angular.element(document.getElementById('selectPCount')).text($scope.selectCount);
                } else if ($scope.selectKind == 'Node') {
                    $scope.Rshow = false;
                    $scope.Pshow = false;
                    $scope.Nshow = false;
                    $scope.Sshow = false;
                    $scope.showSelect = function() {
                        $scope.Nshow = !$scope.Nshow;
                    }
                    $scope.close = function() {
                        $scope.Nshow = false;
                    }

                    $scope.selectRequestC = item.status.capacity.cpu;
                    console.log($scope.selectRequestC)
                    $scope.selectRequestm = item.status.capacity.memory;
                    $scope.selectRequestM = $scope.selectRequestm.substring(0, 3) + "G"
                    console.log($scope.selectRequestm)
                    console.log($scope.selectRequestM)
                    $scope.selectSystem = item.status.nodeInfo.osImage;
                    $scope.selectPort = item.status.daemonEndpoints.kubeletEndpoint.Port;
                    $scope.selectHear = item.status.conditions[0].lastHeartbeatTime;
                    angular.element(document.getElementById("selectNRequestC")).text($scope.selectRequestC);
                    angular.element(document.getElementById("selectNRequestM")).text($scope.selectRequestM);
                    angular.element(document.getElementById("selectNSystem")).text($scope.selectSystem);
                    angular.element(document.getElementById("selectNPort")).text($scope.selectPort);
                    angular.element(document.getElementById("selectNHear")).text($scope.selectHear);
                    angular.element(document.getElementById("selectNTime")).text($scope.selectTime);
                    angular.element(document.getElementById('selectNName')).text($scope.selectName);
                    angular.element(document.getElementById('selectNKind')).text($scope.selectKind);
                } else if ($scope.selectKind == 'Service') {
                    $scope.Rshow = false;
                    $scope.Pshow = false;
                    $scope.Nshow = false;
                    $scope.Sshow = false;
                    $scope.showSelect = function() {
                        $scope.Sshow = !$scope.Sshow;
                    }
                    $scope.close = function() {
                        $scope.Sshow = false;
                    }
                    $scope.selectType = item.spec.type
                    $scope.selectClusterIP = item.spec.clusterIP
                    angular.element(document.getElementById("selectSSpace")).text($scope.selectSpace);
                    angular.element(document.getElementById("selectSTime")).text($scope.selectTime);
                    angular.element(document.getElementById('selectSName')).text($scope.selectName);
                    angular.element(document.getElementById('selectSType')).text($scope.selectType);
                    angular.element(document.getElementById('selectSClusterIP')).text($scope.selectClusterIP);
                }
            } else {
                angular.element(document.getElementById("selected")).text('').removeClass('btn btn-primary');
                $scope.showSelect = function() {
                    $scope.Rshow = false;
                    $scope.Pshow = false;
                    $scope.Nshow = false;
                    $scope.Sshow = false;
                }
            }
        });
        // $scope.$on("select",function(ev,item){
        //     if (item) {
        //         $scope.selectText = "Selected: " + item.metadata.name;
        //         angular.element(document.getElementById("selected")).text($scope.selectText).addClass('btn btn-primary');
        //     }else{
        //         angular.element(document.getElementById("selected")).text('').removeClass('btn btn-primary');
        //     }
        // })
    }];

    var controllers = [
        { module: 'topology', name: 'topologyController', ctrl: ctrl }
    ];

    return controllers;
});
