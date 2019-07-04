---
title: Project Page
---

# Docker Registry UI

![Stars](https://img.shields.io/github/stars/joxit/docker-registry-ui.svg?logo=github&maxAge=86400)
![Pulls](https://img.shields.io/docker/pulls/joxit/docker-registry-ui.svg?maxAge=86400)

## Overview

This project aims to provide a simple and complete user interface for your private docker registry.
You have the choice between two versions, the **standard interface** and the **static interface**.

In the **standard interface**, there is no default registry, you need to add your own within the UI.
You can manage more than one registry server.
All registries will be stored in the [local storage](https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage) of your browser. No configuration is needed when you launch the UI.

In the **static interface**, it will connect to a single registry and will not change. The configuration is done at the start of the interface, when you use the docker images whose tags contain the `static` keyword.

This web user interface uses [Riot](https://github.com/Riot/riot) the react-like user interface micro-library and [riot-mui](https://github.com/kysonic/riot-mui) components.

## [Project Page](https://joxit.dev/docker-registry-ui), [Live Demo](https://joxit.dev/docker-registry-ui/demo/) [Examples](https://github.com/Joxit/docker-registry-ui/tree/master/examples)

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
-   Add custom header via environment variable and file (see [#89](https://github.com/Joxit/docker-registry-ui/pull/89)) **static interface**

## Getting Started

### Basic

First you need node and npm in order to download dependencies.

```sh
git clone https://github.com/Joxit/docker-registry-ui.git
cd docker-registry-ui
npm install
```

Now you can open index.html with your browser or use a http-server

```sh
npm install -g http-server
http-server
```

### Docker

The docker contains the source code and a node webserver in order to serve the docker-registry-ui.

#### Get the docker image

You can get the image in three ways

From sources with this command:

```sh
git clone https://github.com/Joxit/docker-registry-ui.git
# Alpine
docker build -t joxit/docker-registry-ui:latest docker-registry-ui
docker build -t joxit/docker-registry-ui:static -f docker-registry-ui/static.dockerfile docker-registry-ui
# Debian
docker build -t joxit/docker-registry-ui:debian -f docker-registry-ui/debian.dockerfile docker-registry-ui
docker build -t joxit/docker-registry-ui:static -f docker-registry-ui/debian-static.dockerfile docker-registry-ui
```

Or build with the url:

```sh
# Alpine
docker build -t joxit/docker-registry-ui:latest github.com/Joxit/docker-registry-ui
docker build -t joxit/docker-registry-ui:static -f static.dockerfile github.com/Joxit/docker-registry-ui
# Debian
docker build -t joxit/docker-registry-ui:debian -f debian.dockerfile github.com/Joxit/docker-registry-ui
docker build -t joxit/docker-registry-ui:debian-static -f debian-static.dockerfile github.com/Joxit/docker-registry-ui
```

Or pull the image from [docker hub](https://hub.docker.com/r/joxit/docker-registry-ui/):

```sh
# Alpine
docker pull joxit/docker-registry-ui:latest
docker pull joxit/docker-registry-ui:static
# Debian
docker pull joxit/docker-registry-ui:debian
docker pull joxit/docker-registry-ui:debian-static
```

#### Run the docker

To run the docker and see the website on your 80 port, try this:

```sh
docker run -d -p 80:80 joxit/docker-registry-ui
```

#### Run the static interface

Some env options are available for use this interface for only one server.

-   `URL`: set the static URL to use (You will need CORS configuration). Example: `http://127.0.0.1:5000`. (`Required`)
-   `REGISTRY_URL`: your docker registry URL to contact (CORS configuration is not needed). Example: `http://my-docker-container:5000`. (Can't be used with `URL`, since 0.3.2).
-   `DELETE_IMAGES`: if this variable is empty or `false`, delete feature is deactivated. It is activated otherwise.
-   `REGISTRY_TITLE`: Set a custom title for your user interface when using `REGISTRY_URL` (since 0.3.4).
-   `PULL_URL`: Set a custom url for the docker pull command, this is useful when you use `REGISTRY_URL` and your registry is on a different host (since 1.1.0).

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
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS'] # Optional
```

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
    Access-Control-Allow-Headers: ['Authorization']
    Access-Control-Max-Age: [1728000]
    Access-Control-Allow-Credentials: [true]
    Access-Control-Expose-Headers: ['Docker-Content-Digest']
auth:
  htpasswd:
    realm: basic-realm
    path: /etc/docker/registry/htpasswd
```

## All examples

- [Use docker-registry-ui as a proxy (use REGISTRY_URL)](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-proxy)
- [Use docker-registry-ui as standalone (use URL)](https://github.com/Joxit/docker-registry-ui/tree/master/examples/ui-as-standalone)
- [Use docker-registry-ui with traefik](https://github.com/Joxit/docker-registry-ui/tree/master/examples/traefik)
- [Use docker-registry-ui with docker registry and Amazon s3](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-75) ([#75](https://github.com/Joxit/docker-registry-ui/issues/88))
- [FIX revproxy to registry does not work when published under non-root url](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-73) ([#73](https://github.com/Joxit/docker-registry-ui/issues/73))
- [Use docker-registry-ui with HTTPS](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-20) ([#20](https://github.com/Joxit/docker-registry-ui/issues/20))
- [Unable to push image when docker-registry-ui is used as a proxy on non 80 port](https://github.com/Joxit/docker-registry-ui/tree/master/examples/issue-88) ([#88](https://github.com/Joxit/docker-registry-ui/issues/88))
- [Add custom headers bases on environment variable and/or file when the ui is used as proxy](https://github.com/Joxit/docker-registry-ui/tree/master/examples/proxy-headers) ([#89](https://github.com/Joxit/docker-registry-ui/pull/89))