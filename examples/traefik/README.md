# Traefik example

Host the docker registry ui behind [traefik](http://traefik.io) with Docker Swarm mode.

## How to run

Open a terminal console and type

```bash
bash run-swarm.sh
```

## Authentication

The registry is protected via __Basic authentication__ but feel free to use wathever you like.
In this sample, credentials are: **admin / admin**.

To generate a new password for basic auth, run the command: `htpasswd -nb username password`.

## Contributors

Thank you [@onizet](https://github.com/onizet) for this example.