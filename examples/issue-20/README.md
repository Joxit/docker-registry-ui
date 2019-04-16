# Example for issue #20 (HTTPS supports)

This example will override the original nginx conf with one supporting HTTPS. You will need to rewrite all the project configuration (replaces `proxy_pass` with our value).

Generating a self signed certificate:

```
openssl req -newkey rsa:2048 -nodes -keyout nginx/privkey.pem -x509 -days 3650 -out nginx/fullchain.pem
```

The UI will be available here : https://localhost