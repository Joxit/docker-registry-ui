# Example for issue #88

When the docker registry ui is used as a proxy and its port is not 80, we can't push images.
To fix that, I added the correct Host header in the proxy_set_header.