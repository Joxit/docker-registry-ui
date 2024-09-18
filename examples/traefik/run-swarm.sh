#!/usr/bin/env bash

if ! [[ `docker network ls | grep "traefik-net"` ]] &>/dev/null; then
    echo "Setup traefik network"
    docker network create --driver=overlay --attachable traefik-net
fi


docker stack deploy --compose-file docker-compose-swarm-traefik.yml docker-traefik

docker stack deploy --compose-file docker-compose-swarm-registry.yml docker-registry