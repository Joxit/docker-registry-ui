# How to build Docker Registry UI

This file contains tips to help you take (and understand) your first steps in Docker Registry UI development.

## Clone and install the repository

```bash
git clone https://github.com/Joxit/docker-registry-ui.git
cd docker-registry-ui
npm install
```

## Run the local server

```bash
npm start
```

Open your browser <http://localhost:8000> you can configure your options by updating the `src/index.html` file.

# For setting up local docker registry

Run the following command
```
docker run -d -p 5000:5000 -e \
REGISTRY_HTTP_HEADERS_Access-Control-Allow-Origin="[http://localhost:8000]" \
-e REGISTRY_HTTP_HEADERS_Access-Control-Allow-Credentials="[true]" \
-e REGISTRY_HTTP_HEADERS_Access-Control-Allow-Methods="[HEAD,GET,OPTIONS,DELETE]" \
-e REGISTRY_HTTP_HEADERS_Access-Control-Expose-Headers="[Docker-Content-Digest]" \
-- restart=always --name registry-srv registry:2
```
It will run the local docker registry in port 5000.

Commands for pushing the images to local registry. This just an example of busybox image. Like wise you can choose the images you want for testing.
```
docker pull busybox
docker tag busybox localhost:5000/busybox
docker push localhost:5000/busybox
```
 
Happy Developing. 