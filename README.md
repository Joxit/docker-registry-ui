---
title: Docker Registry User Interface
---

# Docker Registry UI

![Stars](https://img.shields.io/github/stars/joxit/docker-registry-ui.svg?logo=github&maxAge=86400)
![Pulls](https://img.shields.io/docker/pulls/joxit/docker-registry-ui.svg?maxAge=86400)

## Overview

This project aims to provide a simple and complete user interface for your private docker registry.
You have the choice between two versions, the **standard interface** (`joxit/docker-registry-ui:latest`) and the **static interface** (`joxit/docker-registry-ui:static`).

In the **standard interface**, there is no default registry, you need to add your own within the UI.
With this version, you can manage **more than one** registry server but all the environment variables will be **unavailable**.
All registries will be stored in the [local storage](https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage) of your browser. No configuration is needed when you launch the UI.

In the **static interface**, it will connect to a single registry and will not change. The configuration is done at the start of the interface, when you use the docker images whose tags contain the `static` keyword. With this version, you can manage **only one registry** and all environment variables will be **available**.

This web user interface uses [Riot](https://github.com/Riot/riot) the react-like user interface micro-library and [riot-mui](https://github.com/kysonic/riot-mui) components.

## [Project Page](https://joxit.dev/docker-registry-ui), [Live Demo](https://joxit.dev/docker-registry-ui/demo/), [Examples](https://github.com/Joxit/docker-registry-ui/tree/master/examples)

![preview](https://raw.github.com/Joxit/docker-registry-ui/master/docker-registry-ui.gif "Preview of Docker Registry UI")

## Features

-   List all your repositories/images.
-   List all tags for a image.
-   Sort the tag list with number compatibility (see [#46](https://github.com/Joxit/docker-registry-ui/pull/46)).
-   Use a secured docker registry.
-   Display image size (see [#30](https://github.com/Joxit/docker-registry-ui/issues/30)).
-   Multi arch supports, Alpine and Debian based images with supports for arm32v7 and arm64v8.
-   Copy `docker pull` command to clipboard (see [#42](https://github.com/Joxit/docker-registry-ui/issues/42)).
-   Show sha256 for specific tag (hover image tag).
-   Display image creation date (see [#49](https://github.com/Joxit/docker-registry-ui/issues/49))
-   Display image history (see [#58](https://github.com/Joxit/docker-registry-ui/pull/58) & [#61](https://github.com/Joxit/docker-registry-ui/pull/61)).
-   Image aggregation (see [#56](https://github.com/Joxit/docker-registry-ui/issues/56)).
-   Display image/tag count (see [#56 issue comment](https://github.com/Joxit/docker-registry-ui/issues/56#issuecomment-449246524)).
-   Select multiple tags to delete (see [#29](https://github.com/Joxit/docker-registry-ui/issues/29)).
-   Select all tags with ALT + Click to delete (see [#80](https://github.com/Joxit/docker-registry-ui/issues/80)).
-   One interface for many registries **standard interface**.
-   Share your docker registry with query parameter `url` (e.g. `https://joxit.dev/docker-registry-ui/demo?url=https://registry.example.com`) **standard interface**.
-   Use `joxit/docker-registry-ui:static` as reverse proxy (with `REGISTRY_URL` environment variable) to your docker registry (This will avoid CORS) **static interface**.
-   Add Title when using `REGISTRY_URL` (see [#28](https://github.com/Joxit/docker-registry-ui/issues/28)) **static interface**.
-   Customise docker pull command on static registry UI (see [#71](https://github.com/Joxit/docker-registry-ui/issues/71)) **static interface**.
-   Add custom header via environment variable and file via `NGINX_PROXY_HEADER_*` (see [#89](https://github.com/Joxit/docker-registry-ui/pull/89)) **static interface**
-   Show/Hide content digest in taglist via `SHOW_CONTENT_DIGEST` (values are: [`true`, `false`], default: `true`) (see [#126](https://github.com/Joxit/docker-registry-ui/issues/126)) **static interface**.
-   Limit the number of elements in the image list via `CATALOG_ELEMENTS_LIMIT` (see [#127](https://github.com/Joxit/docker-registry-ui/pull/127)) **static interface**.
-   Multi arch support in history page (see [#130](https://github.com/Joxit/docker-registry-ui/issues/130) and [#134](https://github.com/Joxit/docker-registry-ui/pull/134))

## FAQ

-   What is the difference between **`joxit/docker-registry-ui:latest`** and **`joxit/docker-registry-ui:static`** tags ?
    -    The `latest` tag was the first version of the project, one UI for many docker registries. The `static` tag allows you to have an interface for a single registry and also allows you select your features.
-   Why, when I delete all tags of an image, the image is still in the UI ?
    -   This is a limitation of docker registry, the garbage collector don't remove empty images. If you want to delete dangling images, you will need to delete the folder in your registry data. (see [#77](https://github.com/Joxit/docker-registry-ui/issues/77))
-   Why the image size in the UI is not the same as displayed during `docker images` ?
    -   The UI displays the compressed size of the image and not the extracted size version.
-   Can I use HTTPS on the UI ?
    -   Yes, put your favourite reverse proxy on the front of the UI. Your reverse proxy will take care of HTTPS connection.
-   Does the UI support authentication ?
    -   Yes, but it supports only basic auth. It's a simple standalone frontend, it will use your browser window for authentication.
-   Can I use the UI and docker client with an insecure registry (registry url without https) ?
    -   Yes you can, you must first configure your docker client. (see [#76](https://github.com/Joxit/docker-registry-ui/issues/76))
-   What does Mixed Content error mean ?
    -   This means you are using a UI with HTTPS and your registry is using HTTP (unsecured). When you are on a HTTPS site, you can't get HTTP content. Upgrade you registry with a HTTPS connection.
-   Why the default nginx `Host` is set to `$http_host` ?
    -   This fixes the issue [#88](https://github.com/Joxit/docker-registry-ui/issues/88). More about this in [#113](https://github.com/Joxit/docker-registry-ui/issues/113).
-   Why DELETE fails with 401 status code (using Basic Auth) ?
    -   This is caused by a bug in docker registry, I suggest to have your UI on the same domain than your registry e.g. registry.example.com/ui/. (see [#104](https://github.com/Joxit/docker-registry-ui/issues/104)).
-   Can I use the docker registry ui as a standalone application (with Electron) ?
    -   Yes, check out the example [here](https://github.com/Joxit/docker-registry-ui/tree/master/examples/electron). (see [#129](https://github.com/Joxit/docker-registry-ui/pull/129))
-   I deleted images through the UI, but they are still present on the server. How can I delete them?
    - When you delete an image with the UI, only the reference is deleted and not the content. To remove dangling images, you need to run the garbage collector of the registry with the command `registry garbage-collect config.yml` or `docker exec registry registry garbage-collect config.yml`. (see [#77](https://github.com/Joxit/docker-registry-ui/issues/77) [#147](https://github.com/Joxit/docker-registry-ui/issues/147))

Need more informations ? Try my [examples](https://github.com/Joxit/docker-registry-ui/tree/master/examples) or open an issue.

## Getting Started

The docker image contains the source code and nginx in order to serve the docker-registry-ui. Please remember the difference between the **standard interface** (`latest` tag) and **static interface** (`static` tags).

### Run the standard interface

You can run the standard interface see the website on your 80 port. You will be able to use the interface for **many registry servers**, but all the configuration via environment variables from the static interface will be **unavailable**.

```sh
docker run -d -p 80:80 joxit/docker-registry-ui:latest
```

### Run the static interface

Some env options are available for use this interface for **only one server**.

-   [`URL`](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-standalone): set the static URL to use (You will need CORS configuration). Example: `http://127.0.0.1:5000`. (`Required`)
-   [`REGISTRY_URL`](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-proxy): your docker registry URL to contact (CORS configuration is not needed). Example: `http://my-docker-container:5000`. (Can't be used with `URL`, since 0.3.2).
-   `DELETE_IMAGES`: if this variable is empty or `false`, delete feature is deactivated. It is activated otherwise.
-   `REGISTRY_TITLE`: Set a custom title for your user interface when using `REGISTRY_URL` (since 0.3.4).
-   `PULL_URL`: Set a custom url for the docker pull command, this is useful when you use `REGISTRY_URL` and your registry is on a different host (since 1.1.0).
-   [`NGINX_PROXY_HEADER_*`](https://github.com/Joxit/docker-registry-ui/tree/master/examples/proxy-headers): Set custom headers for your docker registry, usefull when you want to add your credentials. (Can be use only with `REGISTRY_URL`).
-   [`SHOW_CONTENT_DIGEST`](https://github.com/Joxit/docker-registry-ui/issues/126): Show content digest in docker tag list. Default: `true`.
-   [`CATALOG_ELEMENTS_LIMIT`](https://github.com/Joxit/docker-registry-ui/pull/132): Limit the number of elements in the catalog page. Default: `100000`.

Example with `URL` option.

```sh
docker run -d -p 80:80 -e URL=http://127.0.0.1:5000 -e DELETE_IMAGES=true joxit/docker-registry-ui:static
```

Example with `REGISTRY_URL`, this will add a proxy to your registry.
Your registry will be accessible here : `http://127.0.0.1/v2`, this will avoid CORS errors (see [#25](https://github.com/Joxit/docker-registry-ui/issues/25#issuecomment-360522487)).
Be careful, `joxit/docker-registry-ui` and `registry:2` will communicate, both containers should be in the same network or use your private IP.

```sh
docker network create registry-ui-net
docker run -d --net registry-ui-net --name registry-srv registry:2
docker run -d --net registry-ui-net -p 80:80 -e REGISTRY_URL=http://registry-srv:5000 -e DELETE_IMAGES=true -e REGISTRY_TITLE="My registry" joxit/docker-registry-ui:static
```

There are some examples with [docker-compose](https://docs.docker.com/compose/) and docker-registry-ui as proxy [here](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-proxy/) or docker-registry-ui as standalone [here](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-standalone/).

## Using CORS

Your server should be configured to accept CORS.

If your docker registry does not need credentials, you will need to send this HEADER:

    Access-Control-Allow-Origin: ['*']

If your docker registry need credentials, you will need to send these HEADERS:

```yml
http:
  headers:
    Access-Control-Allow-Origin: ['<your docker-registry-ui url>']
    Access-Control-Allow-Credentials: [true]
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS'] # Optional
```

An alternative for CORS issues is a plugin on your browser, more info [here](https://github.com/Joxit/docker-registry-ui/issues/25#issuecomment-621104846) (thank you [xmontero](https://github.com/xmontero)).

## Using delete

For deleting images, you need to activate the delete feature in your registry:

```yml
storage:
    delete:
      enabled: true
```

And you need to add these HEADERS:

```yml
http:
  headers:
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Expose-Headers: ['Docker-Content-Digest']
```

If you are running the **static interface** don't forget the environment variable `DELETE_IMAGES`.

## Registry example

Example of docker registry configuration file:

```yml
version: 0.1
log:
  fields:
    service: registry
storage:
  delete:
    enabled: true
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['http://127.0.0.1:8001']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Max-Age: [1728000]
    Access-Control-Allow-Credentials: [true]
    Access-Control-Expose-Headers: ['Docker-Content-Digest']
auth:
  htpasswd:
    realm: basic-realm
    path: /etc/docker/registry/htpasswd
```

## Standalone Application
If you do not want to install the docker-registry-ui on your server, you may
check out the [Electron](examples/electron/README.md) standalone application.

## All examples

- [Use docker-registry-ui as a proxy (use REGISTRY_URL)](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-proxy)
- [Use docker-registry-ui as standalone (use URL)](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-standalone)
- [Use docker-registry-ui with traefik](https://github.com/Joxit/docker-registry-ui/tree/master/examples/traefik)
- [Use docker-registry-ui with docker registry and Amazon s3](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-75) ([#75](https://github.com/Joxit/docker-registry-ui/issues/75))
- [FIX revproxy to registry does not work when published under non-root url](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-73) ([#73](https://github.com/Joxit/docker-registry-ui/issues/73))
- [Use docker-registry-ui with HTTPS](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-20) ([#20](https://github.com/Joxit/docker-registry-ui/issues/20))
- [Unable to push image when docker-registry-ui is used as a proxy on non 80 port](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-88) ([#88](https://github.com/Joxit/docker-registry-ui/issues/88))
- [Add custom headers bases on environment variable and/or file when the ui is used as proxy](https://github.com/Joxit/docker-registry-ui/tree/master/examples/proxy-headers) ([#89](https://github.com/Joxit/docker-registry-ui/pull/89))
- [UI showing same sha256 content digest for all tags + Delete is not working](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-116) ([#116](https://github.com/Joxit/docker-registry-ui/issues/116))
- [Electron-based Standalone Application](https://github.com/Joxit/docker-registry-ui/tree/master/examples/electron) ([#129](https://github.com/Joxit/docker-registry-ui/pull/129))
- [Use docker-registry-ui as proxy with read-only right](https://github.com/Joxit/docker-registry-ui/tree/master/examples/read-only-auth) ([#47](https://github.com/Joxit/docker-registry-ui/issues/47))
