# Example for issue #75

Run this command `docker-compose up -d`, then you can push your images (e.g localhost:5000/alpine).

Be careful, the docker registry is using status codes 307 for each requests, that means you must configure your s3 to accept same requests as your private registry (that means `DELETE`, `Access-Control-Allow-Origin` and others). To avoid this, we need the option `storage.redirect.disable: true`, with this you will use your registry credentials (if you are using it).

This s3 server allow all requests.