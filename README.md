---
title: Docker Registry User Interface
---

# Docker Registry UI

![Stars](https://img.shields.io/github/stars/joxit/docker-registry-ui.svg?logo=github&maxAge=86400)
![Pulls](https://img.shields.io/docker/pulls/joxit/docker-registry-ui.svg?maxAge=86400)

## Overview

This project aims to provide a simple and complete user interface for your private docker registry. You can customize the interface with various options. The major option is `SINGLE_REGISTRY` which allows you to disable the dynamic selection of docker registeries (same behavior as the old **static** tag).

You may need the [migration guide from 1.x to 2.x](https://github.com/Joxit/docker-registry-ui/wiki/Migrating-from-1.x-to-2.x) or [the 1.x readme](https://github.com/Joxit/docker-registry-ui/blob/8fe3adf12540d1316cb57628ebe86a392a703d90/README.md)

This web user interface uses [Riot](https://github.com/Riot/riot) the react-like user interface micro-library and [riot-mui](https://github.com/kysonic/riot-mui) components.

## [Project Page](https://joxit.dev/docker-registry-ui), [Live Demo](https://joxit.dev/docker-registry-ui/demo/), [Examples](https://github.com/Joxit/docker-registry-ui/tree/main/examples)

![preview](https://raw.github.com/Joxit/docker-registry-ui/main/docker-registry-ui.gif "Preview of Docker Registry UI")

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
-   One interface for many registries (when `SINGLE_REGISTRY=false`).
-   Share your docker registry with query parameter `url` (e.g. `https://joxit.dev/docker-registry-ui/demo?url=https://registry.example.com`) (when `SINGLE_REGISTRY=false`).
-   Use the UI as reverse proxy (with `NGINX_PROXY_PASS_URL` environment variable) to your docker registry (This will avoid CORS).
-   Add Title when using `REGISTRY_TITLE` (see [#28](https://github.com/Joxit/docker-registry-ui/issues/28)).
-   Customise docker pull command on static registry UI (see [#71](https://github.com/Joxit/docker-registry-ui/issues/71)).
-   Add custom header via environment variable and file via `NGINX_PROXY_HEADER_*` (see [#89](https://github.com/Joxit/docker-registry-ui/pull/89))
-   Show/Hide content digest in taglist via `SHOW_CONTENT_DIGEST` (values are: [`true`, `false`], default: `true`) (see [#126](https://github.com/Joxit/docker-registry-ui/issues/126)).
-   Limit the number of elements in the image list via `CATALOG_ELEMENTS_LIMIT` (see [#127](https://github.com/Joxit/docker-registry-ui/pull/127)).
-   Multi arch support in history page (see [#130](https://github.com/Joxit/docker-registry-ui/issues/130) and [#134](https://github.com/Joxit/docker-registry-ui/pull/134))

## FAQ

-   What is the difference between **`SINGLE_REGISTRY=false`** and **`SINGLE_REGISTRY=true`** options ?
    -   When `SINGLE_REGISTRY` is set to false, a menu appears on the interface allowing you to dynamically change docker registry URLs.
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
    -   Yes, check out the example [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/electron). (see [#129](https://github.com/Joxit/docker-registry-ui/pull/129))
-   I deleted images through the UI, but they are still present on the server. How can I delete them?
    - When you delete an image with the UI, only the reference is deleted and not the content. To remove dangling images, you need to run the garbage collector of the registry with the command `registry garbage-collect config.yml` or `docker exec registry registry garbage-collect config.yml`. (see [#77](https://github.com/Joxit/docker-registry-ui/issues/77) [#147](https://github.com/Joxit/docker-registry-ui/issues/147))
-   Why when I delete one tag, all tags with the same SHA are deleted ?
    - This a docker registry API limitation, there is only one way to [delete images with tag](https://docs.docker.com/registry/spec/api/#deleting-an-image), it's by its `name` and its `manifest` (it's a sha of the content). So when you delete a tag, this will delete all tags of this image with the same SHA/manifest.


Need more informations ? Try my [examples](https://github.com/Joxit/docker-registry-ui/tree/main/examples) or open an issue.

## Available options

Some env options are available for use this interface for **only one server**.

- `REGISTRY_URL`: The default url of your docker registry. You may need CORS configuration on your registry. This is usually the domain name or IP of your registry reachable by your computer (e.g `http://registry.example.com`). (default: derived from the hostname of your UI).
- `REGISTRY_TITLE`: Set a custom title for your user interface. (default: value derived from `REGISTRY_URL`).
- `PULL_URL`: Set a custom url when you copy the `docker pull` command. (default: value derived from `REGISTRY_URL`).
- `DELETE_IMAGES`: Set if we can delete images from the UI. (default: `false`)
- `SHOW_CONTENT_DIGEST`: Show content digest in docker tag list. (default: `true`)
- `CATALOG_ELEMENTS_LIMIT`: Limit the number of elements in the catalog page. (default: `100000`).
- `SINGLE_REGISTRY`: Remove the menu that show the dialogs to add, remove and change the endpoint of your docker registry. (default `false`)
- `NGINX_PROXY_PASS_URL`: Update the default Nginx configuration and set the **proxy_pass** to your backend docker registry (this avoid CORS configuration). This is usually the name of your registry container in the form `http://registry:5000`.
- `NGINX_PROXY_HEADER_*`: Update the default Nginx configuration and set **custom headers** for your backend docker registry. Only when `NGINX_PROXY_PASS_URL` is used.

There are some examples with [docker-compose](https://docs.docker.com/compose/) and docker-registry-ui as proxy [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-proxy/) or docker-registry-ui as standalone [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-standalone/).

## Using CORS

Your server should be configured to accept CORS.

If your docker registry does not need credentials, you will need to send this HEADER:

    Access-Control-Allow-Origin: ['*']

If your docker registry need credentials, you will need to send these HEADERS (you must add the protocol `http`/`https` and the port when not default `80`/`443`):

```yml
http:
  headers:
    Access-Control-Allow-Origin: ['http://registry.example.com']
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
    Access-Control-Allow-Origin: ['http://127.0.0.1:8000']
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

- [Use docker-registry-ui as a proxy (use REGISTRY_URL)](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-proxy)
- [Use docker-registry-ui as standalone (use URL)](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-standalone)
- [Use docker-registry-ui with traefik](https://github.com/Joxit/docker-registry-ui/tree/main/examples/traefik)
- [Use docker-registry-ui with docker registry and Amazon s3](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-75) ([#75](https://github.com/Joxit/docker-registry-ui/issues/75))
- [FIX revproxy to registry does not work when published under non-root url](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-73) ([#73](https://github.com/Joxit/docker-registry-ui/issues/73))
- [Use docker-registry-ui with HTTPS](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-20) ([#20](https://github.com/Joxit/docker-registry-ui/issues/20))
- [Unable to push image when docker-registry-ui is used as a proxy on non 80 port](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-88) ([#88](https://github.com/Joxit/docker-registry-ui/issues/88))
- [Add custom headers bases on environment variable and/or file when the ui is used as proxy](https://github.com/Joxit/docker-registry-ui/tree/main/examples/proxy-headers) ([#89](https://github.com/Joxit/docker-registry-ui/pull/89))
- [UI showing same sha256 content digest for all tags + Delete is not working](https://github.com/Joxit/docker-registry-ui/tree/main/examples/issue-116) ([#116](https://github.com/Joxit/docker-registry-ui/issues/116))
- [Electron-based Standalone Application](https://github.com/Joxit/docker-registry-ui/tree/main/examples/electron) ([#129](https://github.com/Joxit/docker-registry-ui/pull/129))
- [Use docker-registry-ui as proxy with read-only right](https://github.com/Joxit/docker-registry-ui/tree/main/examples/read-only-auth) ([#47](https://github.com/Joxit/docker-registry-ui/issues/47))
