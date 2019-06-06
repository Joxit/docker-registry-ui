# docker-registry-ui

[docker-registry-ui](https://joxit.dev/docker-registry-ui/) is the simplest and most complete UI for your private registry!


## TL;DR;

```bash
$ helm install .
```

## Introduction

This chart bootstraps a [docker-registry-ui](https://joxit.dev/docker-registry-ui/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also may deploy the [docker registry](https://docs.docker.com/registry/) if you havent have one already.

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm update --install my-release .
```

The command deploys docker-registry-ui on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Redmine chart and their default values.

|            Parameter              |              Description                 |                          Default                        | 
| --------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| `ui.title`                        | Title of the managed repository          | `Docker registry UI`                                    |
| `ui.delete_images`                | Allow to delete image from the front-end | `false`                                                 |
| `ui.proxy`                        | The UI service act as a proxy of the registry | `true`                                             |
| `ui.replicaCount`                 | Number of replicas to start              | `1`                                                     |
| `ui.image.registry`               | registry to pull the docker-registry-ui image from | `docker.io`                                   |
| `ui.image.repository`             | docker-registry-ui image name            | `joxit/docker-registry-ui`                              |
| `ui.image.tag`                    | docker-registry-ui image tag (change to latest to have multi registry support) | `static`          |
| `ui.image.pullPolicy`             | docker-registry-ui image pull policy     | `Always`                                                |
| `ui.probe.liveness`               | Ask kubernetes to check the service port for liveness | `true`                                     |
| `ui.probe.readyness `             | Ask kubernetes to check the service port for readyness | `true`                                    |
| `ui.service.type`                 | Desired service type                     | `ClusterIP`                                             |
| `ui.service.port`                 | Service exposed port                     | `80`                                                    |
| `ui.ingress.enabled`              | Create an ingress for docker-regstry-ui  | `false`                                                 |
| `registry.external` 		    | Use an already available registry        | `false`						 |
| `registry.url` 		    | URL of the existing registry             | `http://localhost:5000`				 |
| `registry.replicaCount`           | Number of replicas to start              | `1`                                                     |
| `registry.image.registry`         | registry to pull the docker-registry image from | `docker.io`                                      |
| `registry.image.repository`       | docker-registry-ui image name            | `registry`                              		 |
| `registry.image.tag`              | docker-registry-ui image tag             | `2.6.2`           					 |
| `registry.image.pullPolicy`       | docker-registry-ui image pull policy     | `Always`                                                |
| `registry.probe.liveness`         | Ask kubernetes to check the service port for liveness | `true`                                     |
| `registry.probe.readyness `       | Ask kubernetes to check the service port for readyness | `true`                                    |
| `registry.persistence.enabled`    | Enable persistence using PVC for the registry | `false`                                            |
| `registry.persistence.storageClass` | PVC Storage Class 		       | `-`		                                         |
| `registry.persistence.size`       | PVC Storage Request size 		       | `1Gi`		                                         |
| `registry.service.type`           | Desired service type                     | `ClusterIP`                                             |
| `registry.service.port`           | Service exposed port                     | `5000`                                                  |
| `registry.ingress.enabled`        | Create an ingress for the regstry        | `false`                                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm upgrade --install my-release \
  --set registry.external=true \
  --set registry.url=http://registry.example.com:5000 \
    .
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```bash
$ helm upgrade --install my-release -f values.yaml .
```

> **Tip**: You can use the default [values.yaml](values.yaml)

