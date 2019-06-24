# Set custom headers to the registry example

The interface and the docker registry will be accessible with <http://localhost>.

This example highlight the usage of custom headers when the UI is used as a proxy. When you wants to use a header name with hyphens, replace them by underscores in the variable.

Headers can be useful in some cases such as avoid sending credentials when you are on the UI. Or give to the registry server other properties such as X-Forward-For header.

I will set these two headers in this example.

In order to set your credentials in the header, you need to know how [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header works. Here we use the `Basic` authentication scheme, the credentials are constructed like this:
- The username and the password are combined with a colon (`registry:ui`).
- The resulting string is base64 encoded (`cmVnaXN0cnk6dWk=`). You can simply run `echo -n "registry:ui" | base64`.
- In your header, put this value `Basic cmVnaXN0cnk6dWk=`
- In your docker-compose, the environment will look like `NGINX_PROXY_HEADER_Authorization=Basic cmVnaXN0cnk6dWk=`

Tip: Use [docker-compose .env file](https://docs.docker.com/compose/environment-variables/#the-env-file) for this .


For X-Forward-For, replace all hyphens by underscores, and the value will be a nginx variable which is `$proxy_add_x_forwarded_for`. In your docker compose you will need to duplicate the `$` character. In your docker-compose, your environment will look like `NGINX_PROXY_HEADER_X_Forwarded_For=$$proxy_add_x_forwarded_for`

As usual, run the project with `docker-compose up -d` (for background mode)