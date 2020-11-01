# Docker registry with read only access

This is the configuration for a docker registry UI using `REGISTRY_URL` (as a proxy) with read only access to the registry.

There are two htpasswd files. `read-write.htpasswd` a read and write access to the registry and `read-only.htpasswd` for a read only access.

All users in `read-only.htpasswd` should be in `read-write.htpasswd`.

Read only user: login: `read` password: `regisrty`.
Read and write user: login: `write` password: `regisrty`.
