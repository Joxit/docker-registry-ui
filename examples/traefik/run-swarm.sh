#!/usr/bin/env bash

if ! [[ `docker network ls | grep "traefik-net"` ]] &>/dev/null; then
    echo "Setup traefik network"
    docker network create --driver=overlay --attachable traefik-net
fi


if ! [[ `docker service ls | grep "traefik2"` ]] &>/dev/null; then
    dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

    # ensure acme.json wich will contains the letsencrypt certificates
    touch "$dir"/acme.json && chmod 600 "$dir"/acme.json

    docker service create --name traefik2 --detach=false \
        --constraint node.role==manager \
        --update-parallelism 1 --update-delay 10s \
        --mode global \
        --publish 80:80 \
        --publish 443:443 \
        --read-only \
        --mount type=bind,source="$(pwd)"/acme.json,target=/etc/traefik/acme.json \
        --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
        --network traefik-net \
        traefik:1.7.4-alpine \
        --entrypoints='Name:http Address::80 Redirect.EntryPoint:https' \
        --entrypoints='Name:https Address::443 TLS' \
        --defaultentrypoints=http,https \
        --acme \
        --acme.storage=/etc/traefik/acme.json \
        --acme.entryPoint=https \
        --acme.httpChallenge.entryPoint=http \
        --acme.email=contact@mydomain.com \
        --docker \
        --docker.swarmMode \
        --docker.domain=mydomain.com \
        --docker.exposedByDefault=false \
        --docker.watch \
        --api
fi

docker stack deploy --compose-file docker-compose-swarm.yml docker-registry