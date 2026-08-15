# Docker Registry with Traefik, Redis, and UI on Docker Swarm

This guide walks you through deploying a private Docker Registry with authentication and a UI, using Traefik as a reverse proxy and Redis for caching, all running in Docker Swarm mode.

## Prerequisites

* Docker and Docker Compose installed
* Docker Swarm initialized on your system (use docker swarm init to initialize)
* Traefik setup and working in your Swarm environment
* A domain (e.g., my-registry.example.com, my-registry-ui.example.com, my-traefik.example.com) pointing to your Swarm cluster

## Deployment Sources

This deployment consists of four services:

1. Traefik: A reverse proxy to route requests to the registry and the UI.
2. Docker Registry: The registry for storing and managing Docker images.
3. Redis: A caching service for Docker Registry’s blob descriptors. (OPTIONAL)
4. Docker Registry UI: A web UI for viewing and managing images in your Docker registry.


> [!IMPORTANT]
> In all configuration files, be sure to review and update all the lines with `# !!!!CHANGEME!!!!` directives with your specific values.

### 1. Traefik Reverse Proxy

The relevant file is `docker-compose-traefik.yml`, which configures Traefik to handle routing and SSL termination for both the Docker registry and the UI.

* `traefik.http.routers.traefik-public-https.rule=Host(my-traefik.example.com)` used as placeholder for traefik dashboard URL
* `<</PATH/TO/YOUR/HTPASSWD>>` used as a placeholder for your `htpasswd` to be mounted as `/auth/.htpasswd`
    * `htpasswd -c /path/to/your/htpasswd my-auth-username` then enter the password you want for basic auth
        * Needs `sudo apt-get install apache2-utils` if ubuntu
        * Needs `brew install httpd` if OSX
* `<</PATH/TO/YOUR/TRAEFIK/CONFIG/FOLDER/conf.d>>` is the placeholder for [traefik dynamic configuration files](https://doc.traefik.io/traefik/getting-started/configuration-overview/#the-dynamic-configuration) directory, which is mounted on `/conf.d` on traefik container. 
    * This is optional, you can remove it. If you do so, also remove `--providers.file.directory=/conf.d/` from the `command` section. 
* `--certificatesresolvers.le.acme.email=my-le-email.example.com` used as placeholder for let's encrypt email.

This configuration sets up Traefik to listen for requests on port 80 (HTTP) and 443 (HTTPS), with automatic SSL certificate generation using Let's Encrypt.

### 2. Docker Registry

The relevant file is `docker-compose-registry.yml`, to deploy it with Redis for blob descriptor caching, basic authentication with htpasswd, and with necessary `CORS` settings to enable the use of UI. 

* `<</PATH/TO/YOUR/REGISTRY/STORAGE>>` used as placeholder to indicate directory for docker storage, which is mounter on `/var/lib/docker` in the registry container. 
* `<</PATH/TO/YOUR/HTTPASSWD>>` used as a placeholder for your `htpasswd` to be mounted as `/auth/.htpasswd`
    * You can use the same both for traefik (see above) and registry, create two separate `htpasswd` keys, up to your discretion. 
* If you don't need redis, remove the following lines:
```diff
- REGISTRY_STORAGE_CACHE_BLOBDESCRIPTOR: redis # OPTIONAL (see docker-compose-redis.yml) remove if not needed
- REGISTRY_REDIS_ADDR: redis:6379              # OPTIONAL remove if not needed 
```      
* ` - traefik.http.routers.registry.rule=Host(my-registry.example.com)` used as placeholder for your registry URL. 
* `- traefik.http.routers.registry.middlewares=compress@file,large-upload@file,registry-ratelimit@file` some middlewares added to optimize registry. These are OPTIONAL, their role explained below: 
    * `compress@file` reduces the amount of data transferred between the server and clients (e.g., browsers or API consumers).
    * `large-upload@file` to handle large file uploads, such as Docker image layers, to ensure smooth handling and avoid request timeouts or memory overloads.
    * `registry-ratelimit@file` to implement rate-limiting on the registry, restricting the number of requests a client can make within a specific period.
* `traefik.http.middlewares.cors.headers.accesscontrolalloworiginlist=https://my-registry-ui.example.com` the UI URL which will be allowed for CORS. 

### 3. Redis 

The relevant file is `docker-compose-redis.yml`. Nothing much to change here other than resource allocation. This is OPTIONAL, if not included in the swarm deployment, make sure to remove it from `docker-compose-registry.yml` as well.

### 4. UI (finally)

The relevant configs and settings to deploy `joxit/docker-registry-ui:latest` are in `docker-compose-ui.yml`.

* `REGISTRY_URL=https://my-registry.example.com` under the `environment` section is used as placeholder for the URL of the docker registry.
* `traefik.http.routers.registry-ui.rule=Host(my-registry-ui.example.com)`  under the `label` section used as the placeholder for the URL over which the UI will be served. 

## Deploy the stack 

It is up to you to decide whether you want to deploy all services to the same stack or to individual stacks. The choice depends on how you prefer to organize and manage your services within Docker Swarm. In this guide, I used `my-registry-swarm` as the stack name for deploying all services together, but you can customize this according to your needs.

Once you edited all the files, deploy your stack to Docker Swarm by running the following commands:

1. Initialize Docker Swarm (if not already done):

```
docker swarm init
```

2. Deploy traefik

```
docker stack deploy -c docker-swarm-traefik.yml my-registry-swarm
```

3. Deploy redis (OPTIONAL)

```
docker stack deploy -c docker-swarm-redis.yml my-registry-swarm
```

4. Deploy docker registry

```
docker stack deploy -c docker-swarm-registry.yml my-registry-swarm
```

5. Deploy UI

```
docker stack deploy -c docker-swarm-ui.yml my-registry-swarm
```

6. Check status

```
docker stack ps my-registry-swarm
```
```
docker stack services my-registry-swarm
```

## Access the services

* Traefik UI: https://my-traefik.example.com
* Registry: https://my-registry.example.com
* Registry UI: https://my-registry-ui.example.com


By following these steps, you now have a private Docker Registry, complete with authentication, caching via Redis, and a web UI, all routed through Traefik in Docker Swarm mode.

## Contributed by

[Agah Karakuzu](https://agah.dev) ([@agahkarakuzu](https://github.com/agahkarakuzu)) 