/**
 * Created by Jora on 2016/7/29.
 */
define([
        'base64',
        'kubernetesUI',
        'jQuery'
    ], function (Base64, kubernetesUI, $) {
        'use strict';


        var ctrl = ['$scope', '$rootScope', 'walkthroghService', '$localStorage', 'deploymentService', 'extensionsService', '$timeout', '$state', function ($scope, $rootScope, walkthroghService, $localStorage, deploymentService, extensionsService, $timeout, $state) {

            $scope.stepNum = 1;
            $scope.showService = function () {
                $scope.serviceShow = true;
                $scope.applyShow = false;
            };

            $scope.showApply = function () {
                $scope.serviceShow = false;
                $scope.applyShow = true;
            };

            $scope.param = {
                orgId: $localStorage.orgId,
                userId: $localStorage.userId,
                sessionId: $localStorage.sessionId,
                dcIdList: [],
                deployment: {
                    metadata: {
                        name: '',
                        namespace: '',
                        labels: {}
                    },
                    spec: {
                        template: {
                            spec: {
                                containers: [{
                                    env: [{
                                        name: 'DB_USER',
                                        value: ''
                                    }, {
                                        name: 'DB_PASS',
                                        value: ''
                                    }],
                                    image: '',
                                    resources: {
                                        limits: {}
                                    },
                                    ports: [{
                                        name: '',
                                        hostPort: {},
                                        containerPort: {},
                                        protocol: '',
                                        hostIP: ''
                                    }]
                                }]
                            }
                        }
                    }
                }
            };

            $scope.dataTrans = {
                dataCenters: [],
                labels: [],
                quotas: '',
                author: $localStorage.userName
            };


            deploymentService.getDeploymentIint({
                sessionId: $localStorage.sessionId,
                orgId: $localStorage.orgId,
                userId: $localStorage.userIid
            }, function (data) {
                if (data.code == 0) {
                    $scope.initData = JSON.parse(data.data);
                    $scope.param.deployment.metadata.namespace = $scope.initData.orgName;
                    $scope.param.orgName = $scope.initData.orgName;
                    $scope.dataTrans.quotas = $scope.initData.quotas[0].id;
                }
                $scope.nextStep = function (stepNum) {
                    $scope.stepNum = stepNum;
                };
            });

            /*添加标签*/
            $scope.addLabel = function () {
                $scope.dataTrans.labels.push({key: '', value: ''});
            };
            /*删除标签*/
            $scope.deleteLabel = function ($index) {
                $scope.dataTrans.labels.splice($index, 1);
            };

            /*添加环境变量*/
            $scope.addEnv = function () {
                $scope.param.deployment.spec.template.spec.containers[0].env.push({name: '', value: ''});
            };
            /*删除环境变量*/
            $scope.deleteEnv = function ($index) {
                $scope.param.deployment.spec.template.spec.containers[0].env.splice($index, 1);
            };
            /*选择镜像*/
            $scope.showImageSelector = function () {
                $scope.imageSelectorConf = {
                    widgetId: 'widgetImageSelector',
                    widgetTitle: '选择镜像',
                    isImageSelector: true
                };
                $rootScope.widget.widgetImageSelector = true;
            };
            $scope.version = "";
            /*监听imageSelector(子)页面的emit*/
            $scope.$on('imageSelector', function (event, data) {
                $scope.param.deployment.spec.template.spec.containers[0].image = data;
                $rootScope.widget.widgetImageSelector = false;
                $scope.version = data.split(":")[2];
            });

            $scope.param.deployment.spec.template.spec.containers[0].ports = [
                {protocol: "TCP"}
            ];
            $scope.addApplyPort = function () {
                $scope.param.deployment.spec.template.spec.containers[0].ports.push({});
            }
            $scope.delApplyPort = function ($index) {
                $scope.param.deployment.spec.template.spec.containers[0].ports.splice($index, 1)
            }
            $scope.activities = [
                "TCP",
                "UDP"
            ];

            /*滑块*/
            $scope.slider = {
                value: 1,
                options: {
                    ceil: 10,
                    floor: 1,
                    showSelectionBar: true,
                    showTicks: true,
                    getTickColor: function (value) {
                        return '#d8e0f3';
                    }
                }
            };

            $scope.nameIsExit = function () {

                if ($scope.param.deployment.metadata.name != '' && $scope.param.deployment.metadata.name != undefined) {
                    var param = {
                        orgId: $localStorage.orgId,
                        userId: $localStorage.userId,
                        sessionId: $localStorage.sessionId,
                        "name": $scope.param.deployment.metadata.name
                    };
                    deploymentService.applyNameisExit(param, function (res) {
                        if (res.code == 1415) {
                            $scope.applyTips = false;
                            $scope.applyNameExit = true;

                        } else {
                            $scope.applyTips = true;
                            $scope.applyNameExit = false;

                        }
                    });
                }
                else {
                    $scope.applyTips = true;
                }
            };

            /*提交表单*/
            $scope.submit = function() {

                $scope.param.deployment.spec.template.spec.containers[0].ports.forEach(function(m) {
                    m.containerPort = Number(m.containerPort);
                })


                $scope.param.deployment.metadata.labels = {
                    "name": $scope.param.deployment.metadata.name,
                    "author": $localStorage.userName,
                    "version": $scope.version
                };
                $scope.param.appName = $scope.param.deployment.metadata.name;
                $scope.dataTrans.dataCenters.forEach(function(elem, index) {
                    if (elem) {
                        $scope.param.dcIdList.push($scope.initData.dataCenters[index].id);
                    }
                });
                $scope.dataTrans.labels.forEach(function(elem, index) {
                    $scope.param.deployment.metadata.labels[elem.key] = elem.value;
                });
                var limits = $scope.initData.quotas.filter(function(item) {
                    return item.id == $scope.dataTrans.quotas;
                })[0];
                $scope.param.deployment.spec.template.spec.containers[0].resources.limits = {
                    cpu: limits.cpu + '000m',
                    memory: limits.mem + '000M'
                };

                $scope.param.deployment.spec.template.metadata = {
                    labels: $scope.param.deployment.metadata.labels
                };

                $scope.param.deployment.spec.template.spec.containers[0].name = $scope.param.deployment.metadata.name;

                deploymentService.deploymentSubmit($scope.param, function(rep) {

                    $scope.showstatusMes = true;
                    if (rep.code == 0) {
                        $scope.message = rep.message;
                        $scope.status = true;

                        $timeout(function() {
                            $state.go('main.appManage');
                            $scope.loadAppList();

                        }, 500);
                    } else {
                        $scope.message = rep.message;
                        $scope.status = false;
                        $timeout(function() {
                            $state.go('main.appManage');
                        }, 500);
                    }


                }, function() {
                    $scope.showstatusMes = true;
                    $scope.message = '提交失败!';
                    $scope.status = false;
                });
            };

            // Image
            deploymentService.delploymentImage('', function (data) {
                var dataObject = JSON.parse(data.data);

                // make new images:tags
                var imageArr = new Array();
                var k = 0
                for (var i in dataObject) {
                    var list = dataObject[i].tags;
                    for (var j in list) {
                        imageArr[k] = dataObject[i].name + ":" + list[j];
                        k = k + 1
                    }
                }

                $scope.imageList = imageArr;
                $scope.getImages = function (x) {
                    $scope.param.deployment.spec.template.spec.containers[0].image = x;
                    x.replace(/:(\S+)$/, function ($0, $1) {
                        $scope.param.deployment.metadata.labels.version = $1;
                    });
                }
            }, function () {
                alert("getImages error")
            });


            $scope.sessionName = $localStorage.userName;

            $scope.myParam = {
                orgId: $localStorage.orgId,
                userId: $localStorage.userId,
                sessionId: $localStorage.sessionId,
            };

            $scope.extensionsPage = function () {
                extensionsService.serviceManages($scope.myParam, function (data) {
                    if (data.code == 0) {
                        $scope.newExtensions = JSON.parse(data.data);
                        var NewExtensions = JSON.parse(data.data);
                        NewExtensions.forEach(function (v) {
                            for (var itemLength in v.serviceList.items) {
                            }
                            $scope.itemLength = itemLength;
                        });

                        /*  点击服务的删除 */
                        $scope.alertBox1 = false;   //  alert的文本框
                        $scope.delItem = function (dcIds, item) {
                            $scope.alertBox1 = !false;
                            /*  确定删除按钮  内为删除函数  */
                            $scope.extnesionsDel = function () {
                                $scope.alertBox1 = false;
                                var serverNP = item.spec.ports[0].nodePort;
                                var lebelType = item.metadata.labels.type;
                                var nodePorts = Number(serverNP);
                                $scope.LebeltypeParameter = {
                                    userId: "",
                                    dcId: "",
                                    nodePort: "",
                                    orgId: "",
                                    sessionId: "",
                                    serversName: ""
                                }
                                $scope.LebeltypeParameter.serversName = String(item.metadata.name);
                                $scope.LebeltypeParameter.sessionId = $localStorage.sessionId;
                                $scope.LebeltypeParameter.orgId = $localStorage.orgId;
                                $scope.LebeltypeParameter.userId = Number($localStorage.userId);
                                $scope.LebeltypeParameter.dcId = Number(dcIds);
                                $scope.LebeltypeParameter.nodePort = nodePorts;

                                if (lebelType == "service") {
                                    extensionsService.lebelTypes($scope.LebeltypeParameter, function (rep) {
                                        $scope.showstatusMes = true;
                                        if (rep.code == 0) {
                                            $scope.status = true;
                                            $scope.message = rep.message;
                                            $timeout(function () {
                                                $scope.extensionsPage();
                                            }, 1000);
                                        }
                                        else {
                                            $scope.message = rep.message;
                                            $scope.status = false;
                                        }
                                    }, function () {
                                        $scope.message = '操作失败！';
                                        $scope.status = false;
                                        $scope.showstatusMes = true;
                                    })
                                }
                            }
                            /*  取消删除按钮  */
                            $scope.extnesionsBack = function () {
                                $scope.alertBox1 = false;
                            }
                        }

                        /*  点击访问点的删除 */
                        $scope.cutItem = function (dcIds, item) {
                            $scope.alertBox1 = !false;
                            /*  确定删除按钮  内为删除函数  */
                            $scope.extnesionsDel = function () {
                                $scope.alertBox1 = false;
                                var lebelType = item.metadata.labels.type;
                                var serversName = String(item.metadata.name);
                                $scope.np2 = {
                                    dcId: ""
                                }
                                $scope.np2.dcId = Number(dcIds)
                                if (lebelType == "endpoints") {
                                    $http.post('/api/v1/organizations/' + orgId + '/endpoints/' + serversName, $scope.np2).success(function (rep) {
                                        $scope.showstatusMes = true;
                                        if (rep.code == 0) {
                                            $scope.status = true;
                                            $scope.message = rep.message;
                                            $timeout(function () {
                                                $scope.extensionsPage();
                                            }, 1000);
                                        }
                                        else {
                                            $scope.message = rep.message;
                                            $scope.status = false;
                                        }
                                    }).error(function (data) {
                                        $scope.message = '操作失败！';
                                        $scope.status = false;
                                        $scope.showstatusMes = true;
                                    });
                                }
                            }
                            /*  取消删除按钮  */
                            $scope.extnesionsBack = function () {
                                $scope.alertBox1 = false;
                            }
                        }
                    }
                }, function () {
                    if (data.code != 0) {
                        alert(data.message);
                    }
                })
            }
            $scope.extensionsPage();

            // 创建服务
            extensionsService.CreatService($scope.myParam, function (data) {
                $scope.extentServers = data;
                var extentServers = data;
                $scope.extentServerLei = JSON.parse($scope.extentServers.data);
                var demoss = $scope.extentServerLei.orgName;
                if ($scope.extentServers.code == 0) {
                    $scope.serverDisabled = true;
                    $scope.serverClick1 = function () {
                        if ($scope.serverRadios == 1) {
                            $scope.serverDisabled = false;
                        } else if ($scope.serverRadios == 0) {
                            $scope.serverDisabled = true;
                        }
                    };
                    //   label add....
                    $scope.leis = [];
                    $scope.addLabels = function () {
                        $scope.leis.push({})
                    };
                    //   del
                    $scope.delLabels = function ($index) {
                        $scope.leis.splice($index, 1)
                    };
                    //   port add....
                    $scope.ports = [];

                    var i = 0;
                    $scope.addPort = function () {
                        i++;
                        $scope.ports.push({"name": "port" + i});
                    };
                    //   del
                    $scope.delPort = function ($index) {
                        $scope.ports.splice($index, 1)
                    }

                }
                // 拼接json
                $scope.serviceParam = {
                    "serviceName": "",
                    "orgName": "",
                    "dcIdList": [],
                    "service": {
                        "kind": "Service",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "",
                            "labels": {
                                "name": "",
                                "namespace": "",
                                "author": "",
                                "type": "service"
                            }
                        },
                        "spec": {
                            "type": "",
                            "selector": {},
                            "ports": [
                                {
                                    "name": "",
                                    "protocol": "",
                                    "port": "",
                                    "targetPort": "",
                                    "nodePort": ""
                                }
                            ]
                        }
                    }
                };

                $scope.formData = {};
                var demo = [];
                $scope.mocks = {};
                $scope.serviceDataTrans = {
                    dataCenters: []
                };

                // 选择器
                $scope.Checkeds = [];
                $scope.addCheckeds = function () {
                    $scope.Checkeds.push({});
                };
                $scope.delCheckeds = function ($index) {
                    $scope.Checkeds.splice($index, 1);
                };

                // 协议
                $scope.portlists = [
                    {protocol: "TCP"}
                ];
                $scope.activities = [
                    "TCP",
                    "UDP"
                ];

                $scope.serviceNameExit = function () {

                    if ($scope.serviceParam.serviceName != undefined && $scope.serviceParam.serviceName != '') {
                        var param = {
                            orgId: $localStorage.orgId,
                            userId: $localStorage.userId,
                            sessionId: $localStorage.sessionId,
                            "name": $scope.serviceParam.serviceName
                        };
                        extensionsService.serviceExit(param, function (res) {
                            if (res.code == 1415) {
                                $scope.nameExit = true;
                            } else {
                                $scope.nameExit = false;

                            }

                        });
                    }else{
                        $scope.serviceNameInit = true;
                    }
                };

                $scope.serverSubmit = function () {
                    // 协议
                    $scope.serviceParam.service.spec.ports[0].protocol = $scope.portlists[0].protocol;
                    // 服务类型  ok
                    var type = "NodePort";
                    if ($scope.serverRadios == 0) {
                        var type = "ClusterIP";
                    }
                    else if ($scope.serverRadios == 1) {
                        var type = "NodePort";
                    }
                    $scope.serviceParam.service.spec.type = type;
                    $scope.serviceParam.service.metadata.name = $scope.serviceParam.serviceName;
                    demo.push($scope.formData.Case);
                    $scope.objs = [];
                    demo.forEach(function (v) {
                        for (var i in v) {
                            if (v[i] != false) {
                                $scope.objs.push(i)
                            }
                        }
                    })

                    // 数据中心 ok
                    $scope.serviceDataTrans.dataCenters.forEach(function (elem, index) {
                        if (elem) {
                            $scope.serviceParam.dcIdList.push($scope.extentServerLei.dataCenters[index].id);
                        }
                    })
                    $scope.serviceParam.service.metadata.labels.name = $scope.serviceParam.serviceName;
                    $scope.serviceParam.service.metadata.labels.author = $scope.sessionName;
                    $scope.serviceParam.service.metadata.labels.namespace = demoss;
                    $scope.serviceParam.orgName = demoss;

                    // 选择器
                    $scope.Checkeds.forEach(function (v) {
                        for (var i in v) {
                            $scope.serviceParam.service.spec.selector[v.mylistKey] = v[i]
                        }
                    })
                    // label
                    $scope.leis.forEach(function (v) {
                        for (var i in v) {
                            $scope.serviceParam.service.metadata.labels[v.leiKey] = v[i]
                        }
                    })

                    // 端口组  ok
                    $scope.ports.forEach(function (num) {
                        num.port = Number(num.port);
                        num.targetPort = Number(num.targetPort);

                        if (num.nodePort != null) {
                            num.nodePort = Number(num.nodePort);
                            $scope.amock = num.nodePort;
                        }
                    })
                    /*  提交 post  */
                    $scope.serviceParam.service.spec.ports = $scope.ports;

                    $scope.serviceParam.userId = $localStorage.userId;
                    $scope.serviceParam.orgId = $localStorage.orgId;
                    $scope.serviceParam.sessionId = $localStorage.sessionId;

                    extensionsService.CreatServicePost($scope.serviceParam, function (rep) {

                        $scope.showstatusMes = true;
                        if (rep.code == 0) {
                            $scope.message = rep.message;
                            $scope.status = true;
                            $timeout(function () {
                                $state.go('main.extensions')
                            }, 1000);
                        }
                        else {
                            $scope.message = rep.message;
                            $scope.status = false;
                        }

                    }, function () {
                        $scope.message = '提交失败';
                        $scope.status = false;
                        $scope.showstatusMes = true;

                    })
                }

            }, function () {
                alert(extentServers.message)
            })


            //创建访问点
            extensionsService.CreatAccessPoint($scope.myParam, function (data) {
                $scope.endpointsData = JSON.parse(data.data);

                if (data.code == 0) {
                    // add label
                    $scope.endleis = [];
                    $scope.addendpointjlabel = function () {
                        $scope.endleis.push({})
                    }
                    // del label
                    $scope.delendpointjlabel = function ($index) {
                        $scope.endleis.splice($index, 1);
                    }
                    // add Ex
                    $scope.mockEnd = [];
                    $scope.addendpointEx = function () {
                        $scope.mockEnd.push({});
                    }
                    // del Ex
                    $scope.delendpointEx = function ($index) {
                        $scope.mockEnd.splice($index, 1);
                    }
                }

                $scope.endpointsJson = {
                    "endpointsName": "",
                    "orgName": "minimini",
                    "dcIdList": [],
                    "endpoints": {
                        "kind": "Endpoints",
                        "apiVersion": "v1",
                        "metadata": {
                            "name": "",
                            "namespace": "",
                            "labels": {
                                "name": "",
                                "author": "",
                                "type": "endpoints"
                            }
                        },
                        "subsets": []
                    }
                }
                $scope.endDataTrans = {
                    endDataCenters: []
                };
                var adds = [];
                adds.addresses = [];
                adds.ports = [];

                // 访问点的协议
                $scope.epiPro = [
                    "TCP",
                    "UDP"
                ];

                // 提交
                $scope.endpointBtn = function () {

                    // 数据中心 ok
                    $scope.endDataTrans.endDataCenters.forEach(function (elem, index) {
                        if (elem) {
                            $scope.endpointsJson.dcIdList.push($scope.endpointsData.dataCenters[index].id)
                        }
                    })
                    $scope.endpointsJson.orgName = $scope.endpointsData.orgName;
                    $scope.endpointsJson.endpoints.metadata.namespace = $scope.endpointsData.orgName;

                    // 标签组 ok
                    $scope.endpointsJson.endpoints.metadata.labels.name = $scope.endpointsJson.endpointsName;
                    $scope.endpointsJson.endpoints.metadata.labels.author = $scope.sessionName;
                    $scope.endleis.forEach(function (v) {
                        for (var i in v) {
                            $scope.endpointsJson.endpoints.metadata.labels[v.endlabelKey] = v[i]
                        }
                    })

                    // 端口及地址
                    for (var i = 0; i < $scope.mockEnd.length; i++) {
                        adds.push({
                            addresses: [
                                $scope.mockEnd[i].addresses
                            ],
                            ports: [
                                {
                                    name: $scope.mockEnd[i].ports.name,
                                    protocol: $scope.mockEnd[i].ports.protocol,
                                    port: Number($scope.mockEnd[i].ports.port)
                                }
                            ]
                        });
                    }

                    $scope.endpointsJson.endpoints.subsets = adds;

                    $scope.endpointsJson.userId = $localStorage.userId;
                    $scope.endpointsJson.orgId = $localStorage.orgId;
                    $scope.endpointsJson.sessionId = $localStorage.sessionId;
                    $scope.endpointsJson.endpoints.metadata.name = $scope.endpointsJson.endpointsName;

                    extensionsService.CreatAccessPointPost($scope.endpointsJson, function (rep) {

                        $scope.showstatusMes = true;
                        if (rep.code == 0) {
                            $scope.message = rep.message;
                            $scope.status = true;
                            $timeout(function () {
                                $state.go('main.extensions');
                            }, 1000);
                        }
                        else {
                            $scope.message = rep.message;
                            $scope.status = false;
                        }

                    }, function () {
                        $scope.message = "提交失败！";
                        $scope.status = false;
                        $scope.showstatusMes = false;
                    })

                }
            })

            //  ******  扩展功能 详情
            $scope.extensionsnameBtn = function (item) {

                $scope.extensionsConfig = {
                    widgetId: 'extensionDatails',
                    widgetTitle: '服务详情',
                    extensionsDatails: true,
                    data: item
                }
                $rootScope.widget.extensionDatails = true;

            };

            $scope.applySerSubmit = function(){
                $scope.submit();
                $scope.serverSubmit();
            };


        }];


        var controllers = [
            {module: 'walkthrogh', name: 'walkthroghController', ctrl: ctrl}
        ];

        return controllers;
    }
);