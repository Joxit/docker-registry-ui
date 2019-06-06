# Kubernetes installation of Docker Registry UI

## Full installation
Install a registry and docker-registry-ui as frontend of this registry to kubernetes.

```sh
kubectl apply -f *.yaml
```

Please note that you'll need a PV provisionner to be able to store the uploaded images.

## Dynamic installation
Edit the image tag in the ui-deployement.yaml file and set it to `latest`, then :

```sh
kubectl apply -f ui*.yaml
```

You'll get a docker-registry-ui pod installed inside kubernetes and you'll be able to configure it to act as a frontend to your existing registry(ies).
