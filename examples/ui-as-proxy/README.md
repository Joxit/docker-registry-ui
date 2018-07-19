# Docker Registry Static as proxy example

You can set up the static user interface as proxy in several ways.

If you want to populate your registry, use `populate.sh` script.
The interface will be accessible with <http://localhost>.

The simplest way is with `simple.yml` docker-compose file.

```sh
docker-compose -f simple.yml up -d
./populate.sh
```

You can add some credentials to access your registry wit `credentials.yml` docker-compose file.
Credentials for this example are login: `registry` and password: `ui` using bcrypt.

```sh
docker-compose -f credentials.yml up -d
./populate.sh
```
