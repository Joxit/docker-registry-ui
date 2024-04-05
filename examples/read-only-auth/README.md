# Docker registry with read only access

This example will override the original nginx conf with read only access to the registry. You will need to rewrite all the project configuration (replaces `proxy_pass` with your own value, in this example `http://registry:5000` is fine).

There are two htpasswd files:

- `write.htpasswd` for write access
- `read.htpasswd` for read access

All users in `write.htpasswd` should also be in `read.htpasswd` so that they can read and write.

Read only user: login: `read` password: `registry`.
Read and write user: login: `write` password: `registry`.
