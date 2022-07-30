# docker-registry-ui

:warning: The official helm chart is now located at https://helm.joxit.dev and on GitHub [github.com/Joxit/helm-charts](https://github.com/Joxit/helm-charts).

## Usage

1. Add my Helm repository (named `joxit`)

```
helm repo add joxit https://helm.joxit.dev
```

2. Ensure you have access to the Helm chart and you see the latest chart version listed. If you have previously added the Helm repository, run `helm repo update`.

```
helm search repo joxit/docker-registry-ui
```

3. Now you're ready to install the Docker Registry UI! To install Docker Registry UI with the default configuration using Helm 3.2 run the following command below. This will deploy the Docker Registry UI on the default namespace.

```
helm upgrade --install docker-registry-ui joxit/docker-registry-ui
```
