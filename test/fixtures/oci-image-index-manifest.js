/**
 * Manifest of an image created with:
 * docker buildx build --platform amd64,arm -t joxit/docker-registry-ui:buildx --push --provenance true .
 */
const imageIndex = {
  'mediaType': 'application/vnd.oci.image.index.v1+json',
  'schemaVersion': 2,
  'manifests': [
    {
      'mediaType': 'application/vnd.oci.image.manifest.v1+json',
      'digest': 'sha256:868d96eea2ab3b0905caa746339541cef30ed4e0864da7f89e423cb50aee7857',
      'size': 2756,
      'platform': { 'architecture': 'amd64', 'os': 'linux' },
    },
    {
      'mediaType': 'application/vnd.oci.image.manifest.v1+json',
      'digest': 'sha256:ee45307ae7404ccfbe4536677095b1ad1258a261c79ecdf5640d24bec66e1257',
      'size': 2756,
      'platform': { 'architecture': 'arm64', 'os': 'linux' },
    },
    {
      'mediaType': 'application/vnd.oci.image.manifest.v1+json',
      'digest': 'sha256:2d0c98dae3c1936ef04d00554f9b2557cbdd1f2aa84226758fa77e84a7326f98',
      'size': 566,
      'annotations': {
        'vnd.docker.reference.digest': 'sha256:868d96eea2ab3b0905caa746339541cef30ed4e0864da7f89e423cb50aee7857',
        'vnd.docker.reference.type': 'attestation-manifest',
      },
      'platform': { 'architecture': 'unknown', 'os': 'unknown' },
    },
    {
      'mediaType': 'application/vnd.oci.image.manifest.v1+json',
      'digest': 'sha256:f239e839c36a0fc3bd9d4a6152d7a83522002bfbf09836f0a3b20613afe27d97',
      'size': 566,
      'annotations': {
        'vnd.docker.reference.digest': 'sha256:ee45307ae7404ccfbe4536677095b1ad1258a261c79ecdf5640d24bec66e1257',
        'vnd.docker.reference.type': 'attestation-manifest',
      },
      'platform': { 'architecture': 'unknown', 'os': 'unknown' },
    },
  ],
};

const manifestAmd64 = {
  'mediaType': 'application/vnd.oci.image.manifest.v1+json',
  'schemaVersion': 2,
  'config': {
    'mediaType': 'application/vnd.oci.image.config.v1+json',
    'digest': 'sha256:7209907f3aa39f8b259069272274f185c4e9772ea7159722728b5f648c71eaad',
    'size': 13772,
  },
  'layers': [
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09',
      'size': 3374563,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:2ce963c369bc5690378d31c51dc575c7035f6adfcc1e286051b5a5d9a7b0cc5c',
      'size': 1799036,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:59b9d2200e632e457f800814693b3a01adf09a244c38ebe8d3beef5c476c4c55',
      'size': 626,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:3e1e579c95fece6bbe0cb9c8c2949512a3f8caaf9dbe6219dc6495abb9902040',
      'size': 956,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:547a97583f72a32903ca1357d48fa302e91e8f83ffa18e0c40fd87adb5c06025',
      'size': 773,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:1f21f983520d9a440d410ea62eb0bda61a2b50dd79878071181b56b82efa9ef3',
      'size': 1404,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:c23b4f8cf279507bb1dd3d6eb2d15ca84fac9eac215ab5b529aa8b5a060294c8',
      'size': 11607291,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1',
      'size': 32,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:a5a652ffc299e3af7414a7c48a8b287785c0c70d7e7712cc81da43cfd18dc677',
      'size': 1023,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:ac35a311bcf31486bf05fb0a0b66dd1fb313f8ac6b631c07662f5c77a017b142',
      'size': 953,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:0bbe5bab7d19c248fd83f1d7746b306b1590118dcdab99cf49b72cec4f744a15',
      'size': 878128,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:b516cdaec2158585780cfe13e196fbd6ee4e2aed81d1007903da60df2a6f8d12',
      'size': 18327,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:c93af1909df12d053ee3b101b005c15312dedeee3d18c2f23a3aa3776693a0f5',
      'size': 900629,
    },
  ],
};

const manifestArm = {
  'mediaType': 'application/vnd.oci.image.manifest.v1+json',
  'schemaVersion': 2,
  'config': {
    'mediaType': 'application/vnd.oci.image.config.v1+json',
    'digest': 'sha256:6d0a94a37f413ae834a226070fb042386303fd80ac79c6d4a12e986a03416710',
    'size': 13771,
  },
  'layers': [
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:c41833b44d910632b415cd89a9cdaa4d62c9725dc56c99a7ddadafd6719960f9',
      'size': 3261854,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:2c2c9b85ac58c9f389d42b1033672337110dba86c12d1b0d5c7c384a7cfe110b',
      'size': 1788526,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:40f94fa3619489012a181c2b217548ea718fe485578eec4afdef4b14b3bc536e',
      'size': 624,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:ae26f20697dc7e3b86701a83a1ed42b81b1755f0763130d7f6f816a39adaf388',
      'size': 956,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:e4fa283fba0e8150c05ba453aed98ff4f4bdd65a6248837101fc16b489d1101e',
      'size': 770,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:4c53b6cdc37bcca61cf31d3308b58fda6d7d3192ddd56559cca2f67eafcb0cc1',
      'size': 1403,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:7bcac465295e8cfefa26d0ad33a638a0415ad7c4e1afba500b9633f97e277c3c',
      'size': 11108102,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1',
      'size': 32,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:7923ad4ef26285d800ddad2f7a82d428d035aafd6d6029c4bb23b2b8ac53f699',
      'size': 1026,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:ac35a311bcf31486bf05fb0a0b66dd1fb313f8ac6b631c07662f5c77a017b142',
      'size': 953,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:cb284b84c5d00c523b11f6fa3ee3886f20b146a0f6bc70160bc6e43a3a525dcc',
      'size': 878125,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:ed35f24b7cbe4d56ab109eb77be92a68460b8f932b2a42ddde9296ee7805070a',
      'size': 18329,
    },
    {
      'mediaType': 'application/vnd.oci.image.layer.v1.tar+gzip',
      'digest': 'sha256:ea6ae72ae0bc46efb9381c62a0c9f01b7d1ad2cf67dc3ec58ef8b4ff91a145f1',
      'size': 900638,
    },
  ],
};

const blobAmd64 = {
  'architecture': 'amd64',
  'config': {
    'ExposedPorts': { '80/tcp': {} },
    'Env': [
      'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      'NGINX_VERSION=1.23.4',
      'PKG_RELEASE=1',
      'NJS_VERSION=0.7.11',
      'NGINX_PROXY_HEADER_Host=$http_host',
      'NGINX_LISTEN_PORT=80',
      'SHOW_CATALOG_NB_TAGS=false',
    ],
    'Entrypoint': ['/docker-entrypoint.sh'],
    'Cmd': ['nginx', '-g', 'daemon off;'],
    'WorkingDir': '/usr/share/nginx/html/',
    'Labels': { 'maintainer': 'Jones MAGLOIRE @Joxit' },
    'StopSignal': 'SIGQUIT',
    'OnBuild': null,
  },
  'created': '2023-05-16T17:53:59.778774465Z',
  'history': [
    {
      'created': '2023-03-29T18:19:24.348438709Z',
      'created_by': '/bin/sh -c #(nop) ADD file:9a4f77dfaba7fd2aa78186e4ef0e7486ad55101cefc1fabbc1b385601bb38920 in / ',
    },
    {
      'created': '2023-03-29T18:19:24.45578926Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["/bin/sh"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:10.826996048Z',
      'created_by': '/bin/sh -c #(nop)  LABEL maintainer=NGINX Docker Maintainers \u003cdocker-maint@nginx.com\u003e',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:10.902296598Z',
      'created_by': '/bin/sh -c #(nop)  ENV NGINX_VERSION=1.23.4',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:10.975496976Z',
      'created_by': '/bin/sh -c #(nop)  ENV PKG_RELEASE=1',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:16.216540441Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 addgroup -g 101 -S nginx     \u0026\u0026 adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make base                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache --virtual .gettext gettext     \u0026\u0026 mv /usr/bin/envsubst /tmp/         \u0026\u0026 runDeps="$(         scanelf --needed --nobanner /tmp/envsubst             | awk \'{ gsub(/,/, "\\nso:", $2); print "so:" $2 }\'             | sort -u             | xargs -r apk info --installed             | sort -u     )"     \u0026\u0026 apk add --no-cache $runDeps     \u0026\u0026 apk del .gettext     \u0026\u0026 mv /tmp/envsubst /usr/local/bin/     \u0026\u0026 apk add --no-cache tzdata     \u0026\u0026 ln -sf /dev/stdout /var/log/nginx/access.log     \u0026\u0026 ln -sf /dev/stderr /var/log/nginx/error.log     \u0026\u0026 mkdir /docker-entrypoint.d',
    },
    {
      'created': '2023-03-29T22:31:16.339435018Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:7b307b62e82255f040c9812421a30090bf9abf3685f27b02d77fcca99f997911 in / ',
    },
    {
      'created': '2023-03-29T22:31:16.427781358Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:5c18272734349488bd0c94ec8d382c872c1a0a435cca13bd4671353d6021d2cb in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T22:31:16.515135125Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:abbcbf84dc17ee4454b6b2e3cf914be88e02cf84d344ec45a5b31235379d722a in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T22:31:16.601542115Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:e57eef017a414ca793499729d80a7b9075790c9a804f930f1417e56d506970cf in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T22:31:16.678093757Z',
      'created_by': '/bin/sh -c #(nop)  ENTRYPOINT ["/docker-entrypoint.sh"]',
      'empty_layer': true,
    },
    { 'created': '2023-03-29T22:31:16.756398749Z', 'created_by': '/bin/sh -c #(nop)  EXPOSE 80', 'empty_layer': true },
    {
      'created': '2023-03-29T22:31:16.839607817Z',
      'created_by': '/bin/sh -c #(nop)  STOPSIGNAL SIGQUIT',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:16.921795894Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:30.252298671Z',
      'created_by': '/bin/sh -c #(nop)  ENV NJS_VERSION=0.7.11',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T22:31:35.828698308Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-xslt=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-geoip=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-image-filter=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-njs=${NGINX_VERSION}.${NJS_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 libxslt-dev                 gd-dev                 geoip-dev                 libedit-dev                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make module-geoip module-image-filter module-njs module-xslt                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache curl ca-certificates',
    },
    {
      'created': '2023-05-16T17:53:59.527106164Z',
      'created_by': 'LABEL maintainer=Jones MAGLOIRE @Joxit',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.527106164Z',
      'created_by': 'WORKDIR /usr/share/nginx/html/',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.527106164Z',
      'created_by': 'ENV NGINX_PROXY_HEADER_Host=$http_host',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.527106164Z',
      'created_by': 'ENV NGINX_LISTEN_PORT=80',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.527106164Z',
      'created_by': 'ENV SHOW_CATALOG_NB_TAGS=false',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.549089552Z',
      'created_by': 'COPY nginx/default.conf /etc/nginx/conf.d/default.conf # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.605792395Z',
      'created_by': 'COPY bin/90-docker-registry-ui.sh /docker-entrypoint.d/90-docker-registry-ui.sh # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.627224324Z',
      'created_by': 'COPY dist/ /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.644817137Z',
      'created_by': 'COPY favicon.ico /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.778774465Z',
      'created_by':
        'RUN /bin/sh -c chown -R nginx:nginx /etc/nginx/ /usr/share/nginx/html/ /var/cache/nginx # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
  ],
  'moby.buildkit.buildinfo.v1':
    'eyJmcm9udGVuZCI6ImRvY2tlcmZpbGUudjAiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiZG9ja2VyLWltYWdlIiwicmVmIjoiZG9ja2VyLmlvL2xpYnJhcnkvbmdpbng6YWxwaW5lIiwicGluIjoic2hhMjU2OjAyZmZkNDM5YjcxZDllYTk0MDhlNDQ5YjU2OGY2NWMwYmJiYjk0YmViZDg3NTBmMWQ4MDIzMWFiNjQ5NjAwOGUifV19',
  'os': 'linux',
  'rootfs': {
    'type': 'layers',
    'diff_ids': [
      'sha256:f1417ff83b319fbdae6dd9cd6d8c9c88002dcd75ecf6ec201c8c6894681cf2b5',
      'sha256:1003ff723696bfd596cd65592fa26554840e90780f6937e6ddccc909b8ed1443',
      'sha256:1d54586a1706c0af48668c10cbd8246626acb4fec01287be54cd9b26d72df15d',
      'sha256:c1cd5c8c68ef2336b2504336206d58931e9215a863a35a741f66aa3f4970b0f5',
      'sha256:f0fb842dea4179a94f1b8c2ac178e72690fa2b30e25e03a7a7893794fe9520a5',
      'sha256:f9cb3f1f1d3d7c591c4ab02118816fe6761a8f2f7b2500a5ec7421a42b8a5ea2',
      'sha256:31531248c7cbf5b31a8d9695c20041b9b3749b8c04b9831331ad93333fcf1474',
      'sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef',
      'sha256:d2a2fde0ccbec9f84533eba6eae08e61456eae22cdb18cbd6770584a96de079c',
      'sha256:417b58457dd524a2ab48d3b4d124910aaff0680035f71816ee6efb5fb08c784a',
      'sha256:a8ecc6cb361d80fdf6d9a3149dcd7d3042cf1b26b45a6e591032033c98848de9',
      'sha256:f5fe999227158f3d3649ac32585d981b74774e9d3b8f8254104395470753c751',
      'sha256:3eaed6821acc2fcc0f298984d83dd9ca0317b028ed4a5b1cdcb58d4e1c6aec74',
    ],
  },
};

const blobArm = {
  'architecture': 'arm64',
  'config': {
    'ExposedPorts': { '80/tcp': {} },
    'Env': [
      'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      'NGINX_VERSION=1.23.4',
      'PKG_RELEASE=1',
      'NJS_VERSION=0.7.11',
      'NGINX_PROXY_HEADER_Host=$http_host',
      'NGINX_LISTEN_PORT=80',
      'SHOW_CATALOG_NB_TAGS=false',
    ],
    'Entrypoint': ['/docker-entrypoint.sh'],
    'Cmd': ['nginx', '-g', 'daemon off;'],
    'WorkingDir': '/usr/share/nginx/html/',
    'Labels': { 'maintainer': 'Jones MAGLOIRE @Joxit' },
    'StopSignal': 'SIGQUIT',
    'OnBuild': null,
  },
  'created': '2023-05-16T17:54:00.037166004Z',
  'history': [
    {
      'created': '2023-03-29T17:39:18.063622104Z',
      'created_by': '/bin/sh -c #(nop) ADD file:e51d4089e73ad6dee52b31f0c8059a00c17df6e23f6741fe11b43bd84cc99008 in / ',
    },
    {
      'created': '2023-03-29T17:39:18.167879762Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["/bin/sh"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:22:48.660484906Z',
      'created_by': '/bin/sh -c #(nop)  LABEL maintainer=NGINX Docker Maintainers \u003cdocker-maint@nginx.com\u003e',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:22:48.736880947Z',
      'created_by': '/bin/sh -c #(nop)  ENV NGINX_VERSION=1.23.4',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:22:48.811177358Z',
      'created_by': '/bin/sh -c #(nop)  ENV PKG_RELEASE=1',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:22:53.381662136Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 addgroup -g 101 -S nginx     \u0026\u0026 adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make base                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache --virtual .gettext gettext     \u0026\u0026 mv /usr/bin/envsubst /tmp/         \u0026\u0026 runDeps="$(         scanelf --needed --nobanner /tmp/envsubst             | awk \'{ gsub(/,/, "\\nso:", $2); print "so:" $2 }\'             | sort -u             | xargs -r apk info --installed             | sort -u     )"     \u0026\u0026 apk add --no-cache $runDeps     \u0026\u0026 apk del .gettext     \u0026\u0026 mv /tmp/envsubst /usr/local/bin/     \u0026\u0026 apk add --no-cache tzdata     \u0026\u0026 ln -sf /dev/stdout /var/log/nginx/access.log     \u0026\u0026 ln -sf /dev/stderr /var/log/nginx/error.log     \u0026\u0026 mkdir /docker-entrypoint.d',
    },
    {
      'created': '2023-03-30T04:22:53.48126766Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:7b307b62e82255f040c9812421a30090bf9abf3685f27b02d77fcca99f997911 in / ',
    },
    {
      'created': '2023-03-30T04:22:53.552453825Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:5c18272734349488bd0c94ec8d382c872c1a0a435cca13bd4671353d6021d2cb in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-30T04:22:53.624623412Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:abbcbf84dc17ee4454b6b2e3cf914be88e02cf84d344ec45a5b31235379d722a in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-30T04:22:53.696466901Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:e57eef017a414ca793499729d80a7b9075790c9a804f930f1417e56d506970cf in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-30T04:22:53.773577427Z',
      'created_by': '/bin/sh -c #(nop)  ENTRYPOINT ["/docker-entrypoint.sh"]',
      'empty_layer': true,
    },
    { 'created': '2023-03-30T04:22:53.855706883Z', 'created_by': '/bin/sh -c #(nop)  EXPOSE 80', 'empty_layer': true },
    {
      'created': '2023-03-30T04:22:53.934315121Z',
      'created_by': '/bin/sh -c #(nop)  STOPSIGNAL SIGQUIT',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:22:54.010915592Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:23:05.898706916Z',
      'created_by': '/bin/sh -c #(nop)  ENV NJS_VERSION=0.7.11',
      'empty_layer': true,
    },
    {
      'created': '2023-03-30T04:23:11.319535457Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-xslt=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-geoip=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-image-filter=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-njs=${NGINX_VERSION}.${NJS_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 libxslt-dev                 gd-dev                 geoip-dev                 libedit-dev                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make module-geoip module-image-filter module-njs module-xslt                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache curl ca-certificates',
    },
    {
      'created': '2023-05-16T17:53:59.777374567Z',
      'created_by': 'LABEL maintainer=Jones MAGLOIRE @Joxit',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.777374567Z',
      'created_by': 'WORKDIR /usr/share/nginx/html/',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.777374567Z',
      'created_by': 'ENV NGINX_PROXY_HEADER_Host=$http_host',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.777374567Z',
      'created_by': 'ENV NGINX_LISTEN_PORT=80',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.777374567Z',
      'created_by': 'ENV SHOW_CATALOG_NB_TAGS=false',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-16T17:53:59.792463797Z',
      'created_by': 'COPY nginx/default.conf /etc/nginx/conf.d/default.conf # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.806725927Z',
      'created_by': 'COPY bin/90-docker-registry-ui.sh /docker-entrypoint.d/90-docker-registry-ui.sh # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.82462658Z',
      'created_by': 'COPY dist/ /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:53:59.839284221Z',
      'created_by': 'COPY favicon.ico /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-16T17:54:00.037166004Z',
      'created_by':
        'RUN /bin/sh -c chown -R nginx:nginx /etc/nginx/ /usr/share/nginx/html/ /var/cache/nginx # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
  ],
  'moby.buildkit.buildinfo.v1':
    'eyJmcm9udGVuZCI6ImRvY2tlcmZpbGUudjAiLCJzb3VyY2VzIjpbeyJ0eXBlIjoiZG9ja2VyLWltYWdlIiwicmVmIjoiZG9ja2VyLmlvL2xpYnJhcnkvbmdpbng6YWxwaW5lIiwicGluIjoic2hhMjU2OjAyZmZkNDM5YjcxZDllYTk0MDhlNDQ5YjU2OGY2NWMwYmJiYjk0YmViZDg3NTBmMWQ4MDIzMWFiNjQ5NjAwOGUifV19',
  'os': 'linux',
  'rootfs': {
    'type': 'layers',
    'diff_ids': [
      'sha256:26cbea5cba74143fbe6f584f5fc5321543155aedc4a434fcaa63b643877b5a74',
      'sha256:09353074bdde293a418c894712bba3f4fca2c42cef5c2061caf611794c56ce3c',
      'sha256:2749f4c7cb991ec74071f7ccec1b7907b85956709d8fccebbe77d44f01809aa9',
      'sha256:7e1b91127bea03c6bcbec75fc482f62e5e025b9b4e08f46fe11a6a8d9375d0f2',
      'sha256:3638581487963b65388fc14d1f14a1b0be2e82a48249da474047ea2e4601dc8c',
      'sha256:fbebe8ba7beddf179286606d8a627f5dd553d78645b71f2703ab114802f0bcd5',
      'sha256:363722710bd8c3005b16061d18059259edf0108644e6ab74c36c9a040a824d10',
      'sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef',
      'sha256:2cf5b89f94fd4a7ce1bc7eaad8d4fb9ae56e83b57b94537fd96682eda514dfc9',
      'sha256:417b58457dd524a2ab48d3b4d124910aaff0680035f71816ee6efb5fb08c784a',
      'sha256:b9b82eb1d5ef5a2a6ab324c70d655e27f8109959e6dcd43cf811a451c9153b3e',
      'sha256:cab4286916ebabccd5ac123b0ee58ee2eaf190bc0bbe0339f106244eb75c0355',
      'sha256:e7dc8b731ca3be139b27a043e9d21f711c5505ecfe9f9f0bfc4ed794d88e67e4',
    ],
  },
};

export const ociImageIndexManifest = {
  'application/vnd.oci.image.index.v1+json': imageIndex,
  imageIndex,
  'sha256:868d96eea2ab3b0905caa746339541cef30ed4e0864da7f89e423cb50aee7857': manifestAmd64,
  manifestAmd64,
  'sha256:ee45307ae7404ccfbe4536677095b1ad1258a261c79ecdf5640d24bec66e1257': manifestArm,
  manifestArm,
  'sha256:7209907f3aa39f8b259069272274f185c4e9772ea7159722728b5f648c71eaad': blobAmd64,
  blobAmd64,
  'sha256:6d0a94a37f413ae834a226070fb042386303fd80ac79c6d4a12e986a03416710': blobArm,
  blobArm,
};
