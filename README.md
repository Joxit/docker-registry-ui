# Docker Registry User Interface

[![Stars](https://img.shields.io/github/stars/joxit/docker-registry-ui.svg?logo=github&maxAge=86400)](https://github.com/Joxit/docker-registry-ui/stargazers)
[![Pulls](https://img.shields.io/docker/pulls/joxit/docker-registry-ui.svg?maxAge=86400)](https://hub.docker.com/r/joxit/docker-registry-ui)
[![Sponsor](https://joxit.dev/images/sponsor.svg)](https://github.com/sponsors/Joxit)
[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/joxit)](https://artifacthub.io/packages/search?repo=joxit)
[![Version](https://img.shields.io/github/release/joxit/docker-registry-ui?display_name=tag&sort=semver)](https://github.com/Joxit/docker-registry-ui/releases)

## Overview

This project aims to provide a simple and complete user interface for your private docker registry. You can customize the interface with various options. The major option is `SINGLE_REGISTRY` which allows you to disable the dynamic selection of docker registries (same behavior as the old **static** tag).

You may need the [migration guide from 1.x to 2.x](https://github.com/Joxit/docker-registry-ui/wiki/Migrating-from-1.x-to-2.x) or [the 1.x readme](https://github.com/Joxit/docker-registry-ui/blob/8fe3adf12540d1316cb57628ebe86a392a703d90/README.md). The project support both [docker registry v2](https://github.com/distribution/distribution/releases/tag/v2.0.0) and [docker registry v3](https://github.com/distribution/distribution/releases/tag/v3.0.0).

This web user interface uses [Riot](https://github.com/Riot/riot) the react-like user interface micro-library and [riot-mui](https://github.com/kysonic/riot-mui) components.

If you like my work and want to support it, don't hesitate to [sponsor me](https://github.com/sponsors/Joxit).

## Supported Docker tags

* `latest`: image with the latest release of Docker Registry UI based on `nginx:alpine`
* `latest-debian`: image with the latest release of Docker Registry UI based on `nginx:debian`
* `main`, `master`: image with the beta version of  Docker Registry UI based on `nginx:alpine`
* `main-debian`, `master-debian`: image with the beta version of  Docker Registry UI based on `nginx:debian`
* `2`: image with the latest release of Docker Registry UI v2 (includes latest minor and patch version)
* `2.x`: image with the latest release of Docker Registry UI v2.x (includes latest patch version)
* `2.x.y`: image with the specific release of Docker Registry UI v2.x.y

## [Project Page](https://joxit.dev/docker-registry-ui), [Live Demo](https://joxit.dev/docker-registry-ui/demo/), [Examples](https://github.com/Joxit/docker-registry-ui/tree/main/examples), [Helm Chart](https://helm.joxit.dev/)

![preview](https://raw.github.com/Joxit/docker-registry-ui/main/docker-registry-ui.gif "Preview of Docker Registry UI")

## Hidden Features

- Many ways to delete multiple images at once
  - Select multiple tags to delete with checkboxes (see [#29](https://github.com/Joxit/docker-registry-ui/issues/29) and [#79](https://github.com/Joxit/docker-registry-ui/pull/79)). Since 1.2.0
  - Select all tags of the page with `ALT + Click` on the indeterminate checkbox (see [#80](https://github.com/Joxit/docker-registry-ui/issues/80) and [#81](https://github.com/Joxit/docker-registry-ui/pull/81)). Since 1.2.1
  - Select all contigous tags between two tags with `Shift + Click` on the first tag then `Shift + Click` on the second tag (see [#287](https://github.com/Joxit/docker-registry-ui/pull/287)). Since 2.4.0
- Show sha256 for specific tag (hover image tag).
- Sort the tag list with number compatibility (see [#45](https://github.com/Joxit/docker-registry-ui/pull/45) and [#46](https://github.com/Joxit/docker-registry-ui/pull/46)). Since 0.4.0
- Share your docker registry UI without installation or when you are deploying a UI with  `SINGLE_REGISTRY=false`.
  - Use the public demo and the query parameter `url` (e.g. `https://joxit.dev/docker-registry-ui/demo?url=https://registry.example.com`). If you need credentials on your private registry, you must set the `Access-Control-Allow-Origin` to `https://joxit.dev`.
  - You can use a single interface with many registry, add them in the menu in the top right of the page.
- Filter images and tags with the search bar.
  - You can select the search bar with the shortcut `CRTL + F` or `F3`. When the search bar is already focused, the shortcut will fallback to the default behavior (see [#213](https://github.com/Joxit/docker-registry-ui/issues/213)). Since 2.1.0
- Multi arch support in history page (see [#130](https://github.com/Joxit/docker-registry-ui/issues/130) and [#134](https://github.com/Joxit/docker-registry-ui/pull/134)). Since 1.5.0
- Show the content of the dockerfile (see [#286](https://github.com/Joxit/docker-registry-ui/pull/286)). Since 2.4.0
- The UI will cache requests from your registry, such as blobs and some manifests (URL with `sha256:`).

Checkout all options in [Available options](#available-options) section.

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
-   Why OPTIONS (aka preflight requests) and DELETE fails with 401 status code (using Basic Auth) or why the UI says to check my `Access-Control-Allow-Origin` ?
    -   This is caused by a bug in docker registry, it returns 401 status requests on preflight requests, this breaks [W3C preflight-request specification](https://www.w3.org/TR/cors/#preflight-request). I contacted docker registry maintainers and this will never be fixed ([distribution/distribution#4458](https://github.com/distribution/distribution/issues/4458)). I suggest to have your UI on the same domain than your registry e.g. registry.example.com/ui/ **or** use `NGINX_PROXY_PASS_URL` **or** configure a nginx/apache/haproxy in front of your registry that returns 200 on each OPTIONS requests. (see [#104](https://github.com/Joxit/docker-registry-ui/issues/104), [#204](https://github.com/Joxit/docker-registry-ui/issues/204), [#207](https://github.com/Joxit/docker-registry-ui/issues/207), [#214](https://github.com/Joxit/docker-registry-ui/issues/214), [#266](https://github.com/Joxit/docker-registry-ui/issues/266), [#278](https://github.com/Joxit/docker-registry-ui/issues/278)).
-   Can I use the docker registry ui as a standalone application (with Electron) ?
    -   Yes, check out the example [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/electron). (see [#129](https://github.com/Joxit/docker-registry-ui/pull/129))
-   I deleted images through the UI, but they are still present on the server. How can I delete them?
    - When you delete an image with the UI, only the reference is deleted and not the content. To remove dangling images, you need to run the garbage collector of the registry with the command `registry garbage-collect config.yml` or `docker exec registry registry garbage-collect config.yml`. (see [#77](https://github.com/Joxit/docker-registry-ui/issues/77), [#147](https://github.com/Joxit/docker-registry-ui/issues/147))
-   Why when I delete one tag, all tags with the same SHA are deleted ?
    - This a docker registry API limitation, there is only one way to [delete images with tag](https://docs.docker.com/registry/spec/api/#deleting-an-image), it's by its `name` and its `manifest` (it's a sha of the content). So when you delete a tag, this will delete all tags of this image with the same SHA/manifest.
-   Can I run the container with an unprivileged user ?
    - Yes you can run the container with the `nginx` user with the option `--user nginx`, this will also update the listen port to `8080` (see [#224](https://github.com/Joxit/docker-registry-ui/issues/224) and [#234](https://github.com/Joxit/docker-registry-ui/pull/234)).
-   Can I use the UI with a docker hub mirror and show `library/*` images ?
    - Yes but it is at your own risk using two regstry servers, check the comment [#155](https://github.com/Joxit/docker-registry-ui/issues/155#issuecomment-1286052124).
-   How to fix CORS issue on s3 bucket ?
    - You should add a CORS Policy on your bucket, check the issue [#193](https://github.com/Joxit/docker-registry-ui/issues/193).
-   Why my docker registry server is returning an error `pagination number invalid` ?
    - Since docker registry server 2.8.2 there is default limit of 1000 images in catalog. If you need more images update the configuration `REGISTRY_CATALOG_MAXENTRIES` with your max value and check the issue [#306](https://github.com/Joxit/docker-registry-ui/issues/306).
-   I'm using `NGINX_PROXY_PASS_URL`, my registry server has been recreated and the UI cannot connect with the message `[error] 176#176: *2 connect() failed (111: Connection refused) while connecting to upstream`, what can I do?
    - Nginx get the IP of all addresses only once at runtime, since your container has been recreated, its IP changed too. To prevent this kind of issue, you may use the option `NGINX_RESOLVER` and set to `127.0.0.11`.

Need more informations ? Try my [examples](https://github.com/Joxit/docker-registry-ui/tree/main/examples) or open an issue.

## Available options

You can run the container with the unprivileged user `nginx`, see the discussion [#224](https://github.com/Joxit/docker-registry-ui/issues/224).

Some env options are available for use this interface for **only one server** (when `SINGLE_REGISTRY=true`).

- `REGISTRY_URL`: The default url of your docker registry. You **may need CORS configuration** on your registry. This is usually the domain name or IP of your registry reachable by your computer (e.g `http://registry.example.com`). (default: derived from the hostname of your UI).
- `REGISTRY_TITLE`: Set a custom title for your user interface. (default: value derived from `REGISTRY_URL`) (see [#28](https://github.com/Joxit/docker-registry-ui/issues/28) and [#32](https://github.com/Joxit/docker-registry-ui/issues/32)). Since 0.3.4
- `PULL_URL`: Set a custom url when you copy the `docker pull` command (see [#71](https://github.com/Joxit/docker-registry-ui/issues/71)). (default: value derived from `REGISTRY_URL`). Since 1.1.0
- `DELETE_IMAGES`: Set if we can delete images from the UI. (default: `false`)
- `SHOW_CONTENT_DIGEST`: Show/Hide content digest in docker tag list (see [#126](https://github.com/Joxit/docker-registry-ui/issues/126) and [#131](https://github.com/Joxit/docker-registry-ui/pull/131)). (default: `false`). Since 1.4.9
- `CATALOG_ELEMENTS_LIMIT`: Limit the number of elements in the catalog page (see [#39](https://github.com/Joxit/docker-registry-ui/issues/39), [#127](https://github.com/Joxit/docker-registry-ui/pull/127), [#132](https://github.com/Joxit/docker-registry-ui/pull/132)) and [#306](https://github.com/Joxit/docker-registry-ui/issues/306). (default: `1000`). Since 1.4.9
- `SINGLE_REGISTRY`: Remove the menu that show the dialogs to add, remove and change the endpoint of your docker registry. (default: `false`). Since 2.0.0
- `NGINX_PROXY_PASS_URL`: Update the default Nginx configuration and set the **proxy_pass** to your backend docker registry (this avoid CORS configuration). This is usually the name of your registry container in the form `http://registry:5000`. Since 2.0.0
- `NGINX_PROXY_HEADER_*`: Update the default Nginx configuration and **set custom headers** for your backend docker registry via environment variable and file (`/etc/nginx/.env`). Only when `NGINX_PROXY_PASS_URL` is used (see [#89](https://github.com/Joxit/docker-registry-ui/pull/89)). Since 1.2.3
- `NGINX_PROXY_PASS_HEADER_*`: Update the default Nginx configuration and **forward custom headers** to your backend docker registry via environment variable and file (`/etc/nginx/.env`). Only when `NGINX_PROXY_PASS_URL` is used (see [#206](https://github.com/Joxit/docker-registry-ui/issues/206)). Since 2.1.0
- `NGINX_LISTEN_PORT`: Listen on a port other than 80, you can also change the default user and set to nginx `--user nginx` (see [#224](https://github.com/Joxit/docker-registry-ui/issues/224) and [#234](https://github.com/Joxit/docker-registry-ui/pull/234)). (default: `80` when the user is root, `8080` otherwise). Since 2.2.0
- `NGINX_RESOLVER`: Add [`resolver`](http://nginx.org/en/docs/http/ngx_http_core_module.html#resolver) directive to the nginx configuration for dynamic dns resolving. The value when you are using a docker network is `127.0.0.11`, you can set a custom DNS server too with a valid time. This is not needed when you are using kubernetes. (see [#333](https://github.com/Joxit/docker-registry-ui/issues/333) and [#339](https://github.com/Joxit/docker-registry-ui/issues/339)). (default: ``). Since 2.5.5
- `DEFAULT_REGISTRIES`: List of comma separated registry URLs (e.g `http://registry.example.com,http://registry:5000`), available only when `SINGLE_REGISTRY=false` (see [#219](https://github.com/Joxit/docker-registry-ui/pull/219)). (default: ` `). Since 2.1.0
- `READ_ONLY_REGISTRIES`: Deactivate dialog for remove and add new registries, available only when `SINGLE_REGISTRY=false` (see [#219](https://github.com/Joxit/docker-registry-ui/pull/219)). (default: `false`). Since 2.1.0
- `SHOW_CATALOG_NB_TAGS`: Show number of tags per images on catalog page and hide images with 0 tags. This will produce + nb images requests, **not recommended on large registries** (see [#161](https://github.com/Joxit/docker-registry-ui/issues/161) and [#239](https://github.com/Joxit/docker-registry-ui/pull/239)). (default: `false`). Since 2.2.0
- `HISTORY_CUSTOM_LABELS`: Expose custom labels in history page, custom labels will be processed like maintainer label (see [#160](https://github.com/Joxit/docker-registry-ui/issues/160) and [#240](https://github.com/Joxit/docker-registry-ui/pull/240)). Since 2.2.0
- `USE_CONTROL_CACHE_HEADER`: Use `Control-Cache` header and set to `no-store, no-cache`. This will avoid some issues on multi-arch images (see [#260](https://github.com/Joxit/docker-registry-ui/issues/260) and [#265](https://github.com/Joxit/docker-registry-ui/pull/265)). This option requires registry configuration: `Access-Control-Allow-Headers` with `Cache-Control`. (default: `false`). Since 2.3.0
- `THEME`: Chose your default theme, could be `dark`, `light` or `auto` (see [#283](https://github.com/Joxit/docker-registry-ui/pull/283)). When auto is selected, you will have a switch to manually change from light to dark and vice-versa (see [#291](https://github.com/Joxit/docker-registry-ui/pull/291)). (default: `auto`). Since 2.4.0
- `THEME_*`: See table in [Theme options](#theme-options) section (see [#283](https://github.com/Joxit/docker-registry-ui/pull/283)). Since 2.4.0
- `TAGLIST_ORDER`: Set the default order for the taglist page, could be `num-asc;alpha-asc`, `num-desc;alpha-asc`, `num-asc;alpha-desc`, `num-desc;alpha-desc`, `alpha-asc;num-asc`, `alpha-asc;num-desc`, `alpha-desc;num-asc` or `alpha-desc;num-desc` (see [#307](https://github.com/Joxit/docker-registry-ui/pull/307)). (default: `alpha-asc;num-desc`). Since 2.5.0
- `CATALOG_DEFAULT_EXPANDED`: Expand by default all repositories in catalog (see [#302](https://github.com/Joxit/docker-registry-ui/issues/302)). (default: `false`). Since 2.5.0
- `CATALOG_MIN_BRANCHES`: Set the minimum repository/namespace to expand (e.g. `joxit/docker-registry-ui` `joxit/` is the repository/namespace). Can be 0 to disable branching. (see [#319](https://github.com/Joxit/docker-registry-ui/pull/319)). (default: `1`). Since 2.5.0
- `CATALOG_MAX_BRANCHES`: Set the maximum repository/namespace to expand (e.g. `joxit/docker-registry-ui` `joxit/` is the repository/namespace). Can be 0 to disable branching. (see [#319](https://github.com/Joxit/docker-registry-ui/pull/319)). (default: `1`). Since 2.5.0
- `TAGLIST_PAGE_SIZE`: Set the number of tags to display in one page. (default: `100`). Since 2.5.0
- `REGISTRY_SECURED`: By default, the UI will check on every requests if your registry is secured or not (you will see `401` responses in your console). Set to `true` if your registry uses Basic Authentication and divide by two the number of call to your registry. (default `false`). Since 2.5.0
- `SHOW_TAG_HISTORY`: Whether to show the tag history feature or not. Allows to simplify the user interface by hiding it form the tag list if set to `false`. (default: `true`).
There are some examples with [docker-compose](https://docs.docker.com/compose/) and docker-registry-ui as proxy [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-proxy/) or docker-registry-ui as standalone [here](https://github.com/Joxit/docker-registry-ui/tree/main/examples/ui-as-standalone/).

### Theme options

This featureswas added to version 2.4.0. See more about this in [#283](https://github.com/Joxit/docker-registry-ui/pull/283).

| Environment variable | light theme value | dark theme value |
| --- | --- | --- |
| `THEME_PRIMARY_TEXT` | `#25313b` | `#98a8bd` |
| `THEME_NEUTRAL_TEXT` | `#777777` | `#6d7fab` |
| `THEME_BACKGROUND` | `#ffffff` | `#22272e` |
| `THEME_HOVER_BACKGROUND` | `#eeeeee` | `#343a4b` |
| `THEME_ACCENT_TEXT` | `#5f7796` | `#5c88ff` |
| `THEME_HEADER_TEXT` | `#ffffff` | `#ffffff` |
| `THEME_HEADER_ACCENT_TEXT` | `#7b9ac2` | `#7ea1ff` |
| `THEME_HEADER_BACKGROUND` | `#25313b` | `#333a45` |
| `THEME_FOOTER_TEXT` | `#ffffff` | `#ffffff` |
| `THEME_FOOTER_NEUTRAL_TEXT` | `#adbacd` | `#98afcf` |
| `THEME_FOOTER_BACKGROUND` | `#344251` | `#344251` |

## Recommended Docker Registry Usage

Here is a simple usage of Docker Registry UI with Docker Registry Server using docker-compose. This example should work for most of your use case and your UI will be on the same domain as you registry.

```yml
version: '3.8'

services:
  registry-ui:
    image: joxit/docker-registry-ui:main
    restart: always
    ports:
      - 80:80
    environment:
      - SINGLE_REGISTRY=true
      - REGISTRY_TITLE=Docker Registry UI
      - DELETE_IMAGES=true
      - SHOW_CONTENT_DIGEST=true
      - NGINX_PROXY_PASS_URL=http://registry-server:5000
      - SHOW_CATALOG_NB_TAGS=true
      - CATALOG_MIN_BRANCHES=1
      - CATALOG_MAX_BRANCHES=1
      - TAGLIST_PAGE_SIZE=100
      - REGISTRY_SECURED=false
      - CATALOG_ELEMENTS_LIMIT=1000
    container_name: registry-ui

  registry-server:
    image: registry:2.8.2
    restart: always
    environment:
      REGISTRY_HTTP_HEADERS_Access-Control-Allow-Origin: '[http://registry-ui.example.com]'
      REGISTRY_HTTP_HEADERS_Access-Control-Allow-Methods: '[HEAD,GET,OPTIONS,DELETE]'
      REGISTRY_HTTP_HEADERS_Access-Control-Allow-Credentials: '[true]'
      REGISTRY_HTTP_HEADERS_Access-Control-Allow-Headers: '[Authorization,Accept,Cache-Control]'
      REGISTRY_HTTP_HEADERS_Access-Control-Expose-Headers: '[Docker-Content-Digest]'
      REGISTRY_STORAGE_DELETE_ENABLED: 'true'
    volumes:
      - ./registry/data:/var/lib/registry
    container_name: registry-server
```

## Using CORS

:warning: Before posting issues about CORS, please read the and all created issues.

:warning: If you **are using credentials** and your registry is on a different host than your UI, please read the [FAQ about OPTIONS](https://github.com/Joxit/docker-registry-ui#:~:text=Why%20OPTIONS%20(aka%20preflight%20requests)), all the linked issues and [distribution/distribution#4458](https://github.com/distribution/distribution/issues/4458) first. The best way for the UI to work is using `NGINX_PROXY_PASS_URL` or configure your own proxy (nginx, haproxy...) that will be on top of your **docker registry** (and not the UI!) to override OPTIONS requests.

If your docker registry **does not need credentials**, you will need to send this HEADER:

```yml
http:
  headers:
    Access-Control-Allow-Origin: ['*']
    Access-Control-Allow-Headers: ['Accept', 'Cache-Control']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS'] # Optional
```

If your docker registry need credentials, you will need to send these HEADERS (you must add the protocol `http`/`https` and the port when not default `80`/`443`):

```yml
http:
  headers:
    Access-Control-Allow-Origin: ['http://registry-ui.example.com']
    Access-Control-Allow-Credentials: [true]
    Access-Control-Allow-Headers: ['Authorization', 'Accept', 'Cache-Control']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS'] # Optional
```

An alternative for CORS issues is a plugin on your browser, more info [here](https://github.com/Joxit/docker-registry-ui/issues/25#issuecomment-621104846) (thank you [xmontero](https://github.com/xmontero)).

## Using delete

For deleting images, you need to activate the delete feature in the UI with `DELETE_IMAGES=true` and in your registry:

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
    Access-Control-Allow-Headers: ['Authorization', 'Accept', 'Cache-Control']
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
    Access-Control-Allow-Origin: ['http://127.0.0.1:8000']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept', 'Cache-Control']
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
check out the [Electron](examples/electron/README.md) standalone application (not updated).

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
- [Use DEFAULT_REGISTRIES and READ_ONLY_REGISTRIES](https://github.com/Joxit/docker-registry-ui/tree/main/examples/pr-219) ([#219](https://github.com/Joxit/docker-registry-ui/issues/219))
