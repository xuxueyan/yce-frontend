Mock.mock('http://10.0.0.1:8080/api/v1/users/login', {
    "code": 0,
    "message": "",
    "data": '{\
        "userId": "2",\
        "userName": "lidawei",\
        "orgId": "1",\
        "sessionId": "sfssfd-afds-asdf-af32s"\
    }'
});
Mock.mock('http://10.0.0.1:8080/api/v1/users/logout', {
    "code": 0,
    "message": "",
    "data": ''
});

Mock.mock('http://10.0.0.1:8080/api/v1/navlist', {
    list: [
        {id: 1, name: 'Dashboard', state: 'main.dashboard',includeState: 'main.dashboard',className:'fa-dashboard'},
        {id: 2, name: '应用管理', state: 'main.appManage',includeState: 'main.appManage',className:'fa-adn',
            item: [
                {id: 21, name: '发布', state: 'main.appManageDeployment', includeState: 'main.appManageDeployment'},
                {id: 22, name: '回滚', state: 'main.appManageRollback', includeState: 'main.appManageRollback'},
                {id: 22, name: '滚动升级', state: 'main.appManageRollup', includeState: 'main.appManageRollup'},
                {id: 22, name: '撤销', state: 'main.appManageCancel', includeState: 'main.appManageCancel'},
                {id: 22, name: '历史发布', state: 'main.appManageHistory', includeState: 'main.appManageHistory'}
            ]
        },
        {id: 3, name: '镜像管理', state: 'main.imageManage', includeState: 'main.imageManage',className:'fa-file-archive-o',
            item: [
                {id: 31, name: '查找镜像', state: 'main.imageManageSearch', includeState: 'main.imageManageSearch'},
                {id: 32, name: '删除镜像', state: 'main.imageManageDelete', includeState: 'main.imageManageDelete'}
            ]
        },
        {id: 4, name: '云盘管理', state: 'main.rbdManage', includeState: 'main.rbdManage',className:'fa-cloud'},
        {id: 5, name: '扩展功能', state: 'main.extensions', includeState: 'main.extensions',className:'fa-arrows',
            item: [
                {id: 51, name: '创建服务', state: 'main.extensionsService', includeState: 'main.extensionsService'},
                {id: 52, name: '创建访问点', state: 'main.extensionsEndpoint', includeState: 'main.extensionsEndpoint'}
            ]
        },
        {id: 6, name: '计费&充值', state: 'main.costManage', includeState: 'main.costManage',className:'fa-credit-card'}
    ]
});

Mock.mock('http://10.0.0.1:8080/api/v1/organizations/1/users/2/deployments/new', {
        "code": 0,
        "message": "....",
        "data": {
            "orgId": 1,
            "orgName": "Ops",
            "dataCenters": [
                {
                    "id": "1",
                    "name": "世纪互联",
                    "budget": 10000000,
                    "balance": 10000000
                },
                {
                    "id": "2",
                    "name": "电信机房",
                    "budget": 10000000,
                    "balance": 10000000
                },
                {
                    "id": "3",
                    "name": "电子城机房",
                    "budget": 10000000,
                    "balance": 10000000
                }
            ],
            "quotas": [
                {
                    "id": 1,
                    "name": "2C4G50G",
                    "cpu": 2,
                    "mem": 4,
                    "rbd": 50,
                    "price": 1000
                },
                {
                    "id": 2,
                    "name": "4C8G100G",
                    "cpu": 4,
                    "mem": 8,
                    "rbd": 100,
                    "price": 18000
                },
                {
                    "id": 3,
                    "name": "4C16G200G",
                    "cpu": 4,
                    "mem": 16,
                    "rbd": 200,
                    "price": 2860
                }
            ]
        }
    }
);


Mock.mock('http://10.0.0.1:8080/api/v1/organizations/1/users/2/deployments', {"code":0,"message":"OK","data":"[{\"dcId\":1,\"dcName\":\"办公网\",\"podList\":{\"metadata\":{\"selfLink\":\"/api/v1/namespaces/ops/pods\",\"resourceVersion\":\"16408497\"},\"items\":[{\"metadata\":{\"name\":\"nginx-test-1252813378-39wjk\",\"generateName\":\"nginx-test-1252813378-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/nginx-test-1252813378-39wjk\",\"uid\":\"217b98e7-64ee-11e6-b957-44a84240716a\",\"resourceVersion\":\"16258268\",\"creationTimestamp\":\"2016-08-18T02:47:40Z\",\"labels\":{\"name\":\"spec-template-metadata-labels\",\"pod-template-hash\":\"1252813378\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicaSet\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"nginx-test-1252813378\\\",\\\"uid\\\":\\\"2179503e-64ee-11e6-b957-44a84240716a\\\",\\\"apiVersion\\\":\\\"extensions\\\",\\\"resourceVersion\\\":\\\"16258237\\\"}}\\n\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-jr2e0\",\"secret\":{\"secretName\":\"default-token-jr2e0\"}}],\"containers\":[{\"name\":\"nginx-test\",\"image\":\"nginx:1.7.9\",\"resources\":{},\"volumeMounts\":[{\"name\":\"default-token-jr2e0\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"IfNotPresent\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"172.21.1.21\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-18T02:47:41Z\"}],\"hostIP\":\"172.21.1.21\",\"podIP\":\"10.0.62.3\",\"startTime\":\"2016-08-18T02:47:40Z\",\"containerStatuses\":[{\"name\":\"nginx-test\",\"state\":{\"running\":{\"startedAt\":\"2016-08-18T02:47:41Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"nginx:1.7.9\",\"imageID\":\"docker://sha256:84581e99d807a703c9c03bd1a31cd9621815155ac72a7365fd02311264512656\",\"containerID\":\"docker://0ac0b1d2e4bc085a1655049e7c251c056bffe05ec26b60523bd34fd590bcc472\"}]}},{\"metadata\":{\"name\":\"nginx-test-1252813378-fcr7u\",\"generateName\":\"nginx-test-1252813378-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/nginx-test-1252813378-fcr7u\",\"uid\":\"217b817b-64ee-11e6-b957-44a84240716a\",\"resourceVersion\":\"16258273\",\"creationTimestamp\":\"2016-08-18T02:47:40Z\",\"labels\":{\"name\":\"spec-template-metadata-labels\",\"pod-template-hash\":\"1252813378\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicaSet\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"nginx-test-1252813378\\\",\\\"uid\\\":\\\"2179503e-64ee-11e6-b957-44a84240716a\\\",\\\"apiVersion\\\":\\\"extensions\\\",\\\"resourceVersion\\\":\\\"16258237\\\"}}\\n\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-jr2e0\",\"secret\":{\"secretName\":\"default-token-jr2e0\"}}],\"containers\":[{\"name\":\"nginx-test\",\"image\":\"nginx:1.7.9\",\"resources\":{},\"volumeMounts\":[{\"name\":\"default-token-jr2e0\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"IfNotPresent\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"172.21.1.11\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-18T02:47:42Z\"}],\"hostIP\":\"172.21.1.11\",\"podIP\":\"10.0.46.7\",\"startTime\":\"2016-08-18T02:47:40Z\",\"containerStatuses\":[{\"name\":\"nginx-test\",\"state\":{\"running\":{\"startedAt\":\"2016-08-18T02:47:41Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"nginx:1.7.9\",\"imageID\":\"docker://sha256:84581e99d807a703c9c03bd1a31cd9621815155ac72a7365fd02311264512656\",\"containerID\":\"docker://dd80848b47b002255b071b8a2968b0286847e48cdcd4b07300e9a44f9334eb04\"}]}},{\"metadata\":{\"name\":\"nginx-test-1252813378-vg8s9\",\"generateName\":\"nginx-test-1252813378-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/nginx-test-1252813378-vg8s9\",\"uid\":\"217b80be-64ee-11e6-b957-44a84240716a\",\"resourceVersion\":\"16258271\",\"creationTimestamp\":\"2016-08-18T02:47:40Z\",\"labels\":{\"name\":\"spec-template-metadata-labels\",\"pod-template-hash\":\"1252813378\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicaSet\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"nginx-test-1252813378\\\",\\\"uid\\\":\\\"2179503e-64ee-11e6-b957-44a84240716a\\\",\\\"apiVersion\\\":\\\"extensions\\\",\\\"resourceVersion\\\":\\\"16258237\\\"}}\\n\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-jr2e0\",\"secret\":{\"secretName\":\"default-token-jr2e0\"}}],\"containers\":[{\"name\":\"nginx-test\",\"image\":\"nginx:1.7.9\",\"resources\":{},\"volumeMounts\":[{\"name\":\"default-token-jr2e0\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"IfNotPresent\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"172.21.1.23\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-18T02:47:42Z\"}],\"hostIP\":\"172.21.1.23\",\"podIP\":\"10.0.99.3\",\"startTime\":\"2016-08-18T02:47:40Z\",\"containerStatuses\":[{\"name\":\"nginx-test\",\"state\":{\"running\":{\"startedAt\":\"2016-08-18T02:47:41Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"nginx:1.7.9\",\"imageID\":\"docker://sha256:84581e99d807a703c9c03bd1a31cd9621815155ac72a7365fd02311264512656\",\"containerID\":\"docker://88231d1e4056ed7a1515e366c9a22b01ecab48550c50161f7a91ccc52e06a05a\"}]}}]}},{\"dcId\":2,\"dcName\":\"电信机房\",\"podList\":{\"metadata\":{\"selfLink\":\"/api/v1/namespaces/ops/pods\",\"resourceVersion\":\"646176\"},\"items\":[{\"metadata\":{\"name\":\"redis-master-4sose\",\"generateName\":\"redis-master-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/redis-master-4sose\",\"uid\":\"2bc7d3d9-65bc-11e6-ba55-1418773a377f\",\"resourceVersion\":\"565577\",\"creationTimestamp\":\"2016-08-19T03:22:34Z\",\"labels\":{\"name\":\"redis-master\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicationController\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"redis-master\\\",\\\"uid\\\":\\\"2bc4c7e0-65bc-11e6-ba55-1418773a377f\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"resourceVersion\\\":\\\"565523\\\"}}\\n\",\"kubernetes.io/limit-ranger\":\"LimitRanger plugin set: cpu request for container master-memory\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-8pozf\",\"secret\":{\"secretName\":\"default-token-8pozf\"}}],\"containers\":[{\"name\":\"master-memory\",\"image\":\"registry.docker:5000/redis\",\"ports\":[{\"containerPort\":6379,\"protocol\":\"TCP\"}],\"env\":[{\"name\":\"MASTERAUTH\",\"value\":\"yeepayredis\"}],\"resources\":{\"limits\":{\"memory\":\"8092M\"},\"requests\":{\"cpu\":\"2\",\"memory\":\"8092M\"}},\"volumeMounts\":[{\"name\":\"default-token-8pozf\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"Always\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"10.149.149.7\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-19T03:22:44Z\"}],\"hostIP\":\"10.149.149.7\",\"podIP\":\"10.130.73.3\",\"startTime\":\"2016-08-19T03:22:34Z\",\"containerStatuses\":[{\"name\":\"master-memory\",\"state\":{\"running\":{\"startedAt\":\"2016-08-19T03:22:43Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"registry.docker:5000/redis\",\"imageID\":\"docker://sha256:bab6d3ebc78ce403eac7196cfa7f7625eebbc6341ddd3a807a7f71fd5d94d3df\",\"containerID\":\"docker://0c103370eadc0133dc9779c22111010bf381aad06a8013193f64c320df4da248\"}]}},{\"metadata\":{\"name\":\"redis-slave-9huhm\",\"generateName\":\"redis-slave-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/redis-slave-9huhm\",\"uid\":\"2beacbd0-65bc-11e6-ba55-1418773a377f\",\"resourceVersion\":\"565562\",\"creationTimestamp\":\"2016-08-19T03:22:34Z\",\"labels\":{\"name\":\"redis-slave\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicationController\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"redis-slave\\\",\\\"uid\\\":\\\"2be7c2f7-65bc-11e6-ba55-1418773a377f\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"resourceVersion\\\":\\\"565536\\\"}}\\n\",\"kubernetes.io/limit-ranger\":\"LimitRanger plugin set: cpu request for container worker\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-8pozf\",\"secret\":{\"secretName\":\"default-token-8pozf\"}}],\"containers\":[{\"name\":\"worker\",\"image\":\"registry.docker:5000/gcr/redis-slave:v1\",\"ports\":[{\"containerPort\":6379,\"protocol\":\"TCP\"}],\"env\":[{\"name\":\"MASTERAUTH\",\"value\":\"yeepayredis\"},{\"name\":\"GET_HOSTS_FROM\",\"value\":\"dns\"}],\"resources\":{\"limits\":{\"memory\":\"8092M\"},\"requests\":{\"cpu\":\"2\",\"memory\":\"8092M\"}},\"volumeMounts\":[{\"name\":\"default-token-8pozf\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"IfNotPresent\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"10.149.149.8\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-19T03:22:35Z\"}],\"hostIP\":\"10.149.149.8\",\"podIP\":\"10.130.34.2\",\"startTime\":\"2016-08-19T03:22:34Z\",\"containerStatuses\":[{\"name\":\"worker\",\"state\":{\"running\":{\"startedAt\":\"2016-08-19T03:22:35Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"registry.docker:5000/gcr/redis-slave:v1\",\"imageID\":\"docker://sha256:d1ae45cdf7106c080d0a74f86204301d3434815ac2f68930b7d120ab011f7908\",\"containerID\":\"docker://a356fbda7d6cd86905ec876e3e8679398c96c908d6375d47e558f0bc27b3da3c\"}]}},{\"metadata\":{\"name\":\"redis-slave-hlt6p\",\"generateName\":\"redis-slave-\",\"namespace\":\"ops\",\"selfLink\":\"/api/v1/namespaces/ops/pods/redis-slave-hlt6p\",\"uid\":\"2bf64f3c-65bc-11e6-ba55-1418773a377f\",\"resourceVersion\":\"565564\",\"creationTimestamp\":\"2016-08-19T03:22:34Z\",\"labels\":{\"name\":\"redis-slave\"},\"annotations\":{\"kubernetes.io/created-by\":\"{\\\"kind\\\":\\\"SerializedReference\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"reference\\\":{\\\"kind\\\":\\\"ReplicationController\\\",\\\"namespace\\\":\\\"ops\\\",\\\"name\\\":\\\"redis-slave\\\",\\\"uid\\\":\\\"2be7c2f7-65bc-11e6-ba55-1418773a377f\\\",\\\"apiVersion\\\":\\\"v1\\\",\\\"resourceVersion\\\":\\\"565536\\\"}}\\n\",\"kubernetes.io/limit-ranger\":\"LimitRanger plugin set: cpu request for container worker\"}},\"spec\":{\"volumes\":[{\"name\":\"default-token-8pozf\",\"secret\":{\"secretName\":\"default-token-8pozf\"}}],\"containers\":[{\"name\":\"worker\",\"image\":\"registry.docker:5000/gcr/redis-slave:v1\",\"ports\":[{\"containerPort\":6379,\"protocol\":\"TCP\"}],\"env\":[{\"name\":\"MASTERAUTH\",\"value\":\"yeepayredis\"},{\"name\":\"GET_HOSTS_FROM\",\"value\":\"dns\"}],\"resources\":{\"limits\":{\"memory\":\"8092M\"},\"requests\":{\"cpu\":\"2\",\"memory\":\"8092M\"}},\"volumeMounts\":[{\"name\":\"default-token-8pozf\",\"readOnly\":true,\"mountPath\":\"/var/run/secrets/kubernetes.io/serviceaccount\"}],\"terminationMessagePath\":\"/dev/termination-log\",\"imagePullPolicy\":\"IfNotPresent\"}],\"restartPolicy\":\"Always\",\"terminationGracePeriodSeconds\":30,\"dnsPolicy\":\"ClusterFirst\",\"serviceAccountName\":\"default\",\"nodeName\":\"10.149.149.2\",\"securityContext\":{}},\"status\":{\"phase\":\"Running\",\"conditions\":[{\"type\":\"Ready\",\"status\":\"True\",\"lastProbeTime\":null,\"lastTransitionTime\":\"2016-08-19T03:22:35Z\"}],\"hostIP\":\"10.149.149.2\",\"podIP\":\"10.130.91.3\",\"startTime\":\"2016-08-19T03:22:34Z\",\"containerStatuses\":[{\"name\":\"worker\",\"state\":{\"running\":{\"startedAt\":\"2016-08-19T03:22:35Z\"}},\"lastState\":{},\"ready\":true,\"restartCount\":0,\"image\":\"registry.docker:5000/gcr/redis-slave:v1\",\"imageID\":\"docker://sha256:d1ae45cdf7106c080d0a74f86204301d3434815ac2f68930b7d120ab011f7908\",\"containerID\":\"docker://b3dec85e534f060b71513cc028629b58101080b7ef3ece23d1e2a2bd6e65a216\"}]}}]}}]"}
);


