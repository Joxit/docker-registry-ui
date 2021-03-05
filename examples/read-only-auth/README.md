# Docker registry with read only access

This example will override the original nginx conf with read only access to the registry. You will need to rewrite all the project configuration (replaces `proxy_pass` with your own value, in this example `http://registry:5000` is fine).

There are two htpasswd files. `read-write.htpasswd` a read and write access to the registry and `read-only.htpasswd` for a read only access.

All users in `read-only.htpasswd` should be in `read-write.htpasswd`.

Read only user: login: `read` password: `regisrty`.
Read and write user: login: `write` password: `regisrty`.
