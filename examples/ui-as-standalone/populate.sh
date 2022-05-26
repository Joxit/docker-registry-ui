#!/bin/bash

docker tag joxit/docker-registry-ui:latest localhost:5000/joxit/docker-registry-ui:static
docker tag joxit/docker-registry-ui:latest localhost:5000/joxit/docker-registry-ui:0.3
docker tag joxit/docker-registry-ui:latest localhost:5000/joxit/docker-registry-ui:0.3.0
docker tag joxit/docker-registry-ui:latest localhost:5000/joxit/docker-registry-ui:0.3.0-latest
docker tag joxit/docker-registry-ui:latest localhost:5000/joxit/docker-registry-ui:0.3-latest

docker push localhost:5000/joxit/docker-registry-ui

docker tag registry:2.7 localhost:5000/registry:latest
docker tag registry:2.7 localhost:5000/registry:2.7
docker tag registry:2.7 localhost:5000/registry:2.7.0
docker tag registry:2.7 localhost:5000/registry:2

docker push localhost:5000/registry
