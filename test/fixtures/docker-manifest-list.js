/**
 * Manifest of an image created with:
 * docker buildx build --platform amd64,arm -t joxit/docker-registry-ui:buildx --push --provenance false .
 */
const manifestList = {
  'mediaType': 'application/vnd.docker.distribution.manifest.list.v2+json',
  'schemaVersion': 2,
  'manifests': [
    {
      'mediaType': 'application/vnd.docker.distribution.manifest.v2+json',
      'digest': 'sha256:7d9bbfa92dbd2a9c09abe924ee7cb8f164be59f25b9457fa0c593a7110dba89f',
      'size': 2850,
      'platform': { 'architecture': 'amd64', 'os': 'linux' },
    },
    {
      'mediaType': 'application/vnd.docker.distribution.manifest.v2+json',
      'digest': 'sha256:5ef7a7d411a524beff05c9d1a541442ff78bb1ec6b45a55434dd3e51e00292b1',
      'size': 2849,
      'platform': { 'architecture': 'arm', 'os': 'linux', 'variant': 'v7' },
    },
  ],
};

const manifestAmd64 = {
  'mediaType': 'application/vnd.docker.distribution.manifest.v2+json',
  'schemaVersion': 2,
  'config': {
    'mediaType': 'application/vnd.docker.container.image.v1+json',
    'digest': 'sha256:7209907f3aa39f8b259069272274f185c4e9772ea7159722728b5f648c71eaad',
    'size': 13772,
  },
  'layers': [
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09',
      'size': 3374563,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:2ce963c369bc5690378d31c51dc575c7035f6adfcc1e286051b5a5d9a7b0cc5c',
      'size': 1799036,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:59b9d2200e632e457f800814693b3a01adf09a244c38ebe8d3beef5c476c4c55',
      'size': 626,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:3e1e579c95fece6bbe0cb9c8c2949512a3f8caaf9dbe6219dc6495abb9902040',
      'size': 956,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:547a97583f72a32903ca1357d48fa302e91e8f83ffa18e0c40fd87adb5c06025',
      'size': 773,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:1f21f983520d9a440d410ea62eb0bda61a2b50dd79878071181b56b82efa9ef3',
      'size': 1404,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:c23b4f8cf279507bb1dd3d6eb2d15ca84fac9eac215ab5b529aa8b5a060294c8',
      'size': 11607291,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1',
      'size': 32,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:a5a652ffc299e3af7414a7c48a8b287785c0c70d7e7712cc81da43cfd18dc677',
      'size': 1023,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:ac35a311bcf31486bf05fb0a0b66dd1fb313f8ac6b631c07662f5c77a017b142',
      'size': 953,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:0bbe5bab7d19c248fd83f1d7746b306b1590118dcdab99cf49b72cec4f744a15',
      'size': 878128,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:b516cdaec2158585780cfe13e196fbd6ee4e2aed81d1007903da60df2a6f8d12',
      'size': 18327,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:c93af1909df12d053ee3b101b005c15312dedeee3d18c2f23a3aa3776693a0f5',
      'size': 900629,
    },
  ],
};

const manifestArm = {
  'mediaType': 'application/vnd.docker.distribution.manifest.v2+json',
  'schemaVersion': 2,
  'config': {
    'mediaType': 'application/vnd.docker.container.image.v1+json',
    'digest': 'sha256:322f0eb73bbb441e1a0eae5dd05dfa56d7bc78b2be4682056463d919393b7d0b',
    'size': 13773,
  },
  'layers': [
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:fd4b2aeb476b6c2c0c3049dae919de20fe09e90deac95e3181d717055cbe6707',
      'size': 2868519,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:661c223f0b9c15a114f1a1cb1cfcfeea06544eb6d74e5d81bf239e3843d5963b',
      'size': 1748335,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:4edc4a7923b338722943b7ca9ab57db06e501a300e63d2694830bce5a13a8719',
      'size': 625,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:d04be6d2e446962d34ac7a76f347bf8a8bf8def411d2eb646241504f3cbc4835',
      'size': 956,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:c4eb1daa4076033e2233b6aed11887d3e6b77fbf7910ced0673fe7f2e0c218b7',
      'size': 770,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:8bdf974e3c33c7ab91a2c116867eb8007a255b8ffe7a8ff55344f0a4110eff9c',
      'size': 1403,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:b157eb398be1a483b6d89235dc72a936bc9070e13e4ce1af9e3e8101ca37f78a',
      'size': 9400541,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1',
      'size': 32,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:c4b7c519f7157460cf3fdb5bc3ef2a503e6c011cd1afb07f9c4c92df1d0d5c98',
      'size': 1023,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:5e59186ea6d831f79fb2d3b861ef2aac0e8610146f4ea86d8d0bfaff014ba168',
      'size': 954,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:4df6c8febd43820b56a4a778f4ad551395c137c42cc4c9546e642df6f7eeef9c',
      'size': 878130,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:d8b5650b9cc734d84c7f567264282cc58161d77a427c63c7380bfe8b35c916ae',
      'size': 18322,
    },
    {
      'mediaType': 'application/vnd.docker.image.rootfs.diff.tar.gzip',
      'digest': 'sha256:803176948dabb2a0a106f58bfb423dea1da98bbe05e713649e39ef13dde1de6f',
      'size': 900626,
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
  'architecture': 'arm',
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
  'created': '2023-05-18T06:18:36.698896035Z',
  'history': [
    {
      'created': '2023-03-29T18:03:38.84773971Z',
      'created_by': '/bin/sh -c #(nop) ADD file:959fa0ffb60c37c4fdc0d32ac31511f8dead32ef7f4bd848b11ff144a6b37012 in / ',
    },
    {
      'created': '2023-03-29T18:03:38.9602307Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["/bin/sh"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:27:03.894972841Z',
      'created_by': '/bin/sh -c #(nop)  LABEL maintainer=NGINX Docker Maintainers \u003cdocker-maint@nginx.com\u003e',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:27:03.977068216Z',
      'created_by': '/bin/sh -c #(nop)  ENV NGINX_VERSION=1.23.4',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:27:04.093650581Z',
      'created_by': '/bin/sh -c #(nop)  ENV PKG_RELEASE=1',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:27:44.532352816Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 addgroup -g 101 -S nginx     \u0026\u0026 adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make base                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache --virtual .gettext gettext     \u0026\u0026 mv /usr/bin/envsubst /tmp/         \u0026\u0026 runDeps="$(         scanelf --needed --nobanner /tmp/envsubst             | awk \'{ gsub(/,/, "\\nso:", $2); print "so:" $2 }\'             | sort -u             | xargs -r apk info --installed             | sort -u     )"     \u0026\u0026 apk add --no-cache $runDeps     \u0026\u0026 apk del .gettext     \u0026\u0026 mv /tmp/envsubst /usr/local/bin/     \u0026\u0026 apk add --no-cache tzdata     \u0026\u0026 ln -sf /dev/stdout /var/log/nginx/access.log     \u0026\u0026 ln -sf /dev/stderr /var/log/nginx/error.log     \u0026\u0026 mkdir /docker-entrypoint.d',
    },
    {
      'created': '2023-03-29T19:27:44.660812167Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:7b307b62e82255f040c9812421a30090bf9abf3685f27b02d77fcca99f997911 in / ',
    },
    {
      'created': '2023-03-29T19:27:44.758007971Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:5c18272734349488bd0c94ec8d382c872c1a0a435cca13bd4671353d6021d2cb in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T19:27:44.849497713Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:abbcbf84dc17ee4454b6b2e3cf914be88e02cf84d344ec45a5b31235379d722a in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T19:27:44.941848809Z',
      'created_by':
        '/bin/sh -c #(nop) COPY file:e57eef017a414ca793499729d80a7b9075790c9a804f930f1417e56d506970cf in /docker-entrypoint.d ',
    },
    {
      'created': '2023-03-29T19:27:45.021738784Z',
      'created_by': '/bin/sh -c #(nop)  ENTRYPOINT ["/docker-entrypoint.sh"]',
      'empty_layer': true,
    },
    { 'created': '2023-03-29T19:27:45.104459469Z', 'created_by': '/bin/sh -c #(nop)  EXPOSE 80', 'empty_layer': true },
    {
      'created': '2023-03-29T19:27:45.186875746Z',
      'created_by': '/bin/sh -c #(nop)  STOPSIGNAL SIGQUIT',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:27:45.267774313Z',
      'created_by': '/bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:29:39.602231315Z',
      'created_by': '/bin/sh -c #(nop)  ENV NJS_VERSION=0.7.11',
      'empty_layer': true,
    },
    {
      'created': '2023-03-29T19:31:21.652098356Z',
      'created_by':
        '/bin/sh -c set -x     \u0026\u0026 apkArch="$(cat /etc/apk/arch)"     \u0026\u0026 nginxPackages="         nginx=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-xslt=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-geoip=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-image-filter=${NGINX_VERSION}-r${PKG_RELEASE}         nginx-module-njs=${NGINX_VERSION}.${NJS_VERSION}-r${PKG_RELEASE}     "     \u0026\u0026 apk add --no-cache --virtual .checksum-deps         openssl     \u0026\u0026 case "$apkArch" in         x86_64|aarch64)             set -x             \u0026\u0026 KEY_SHA512="e09fa32f0a0eab2b879ccbbc4d0e4fb9751486eedda75e35fac65802cc9faa266425edf83e261137a2f4d16281ce2c1a5f4502930fe75154723da014214f0655"             \u0026\u0026 wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub             \u0026\u0026 if echo "$KEY_SHA512 */tmp/nginx_signing.rsa.pub" | sha512sum -c -; then                 echo "key verification succeeded!";                 mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/;             else                 echo "key verification failed!";                 exit 1;             fi             \u0026\u0026 apk add -X "https://nginx.org/packages/mainline/alpine/v$(egrep -o \'^[0-9]+\\.[0-9]+\' /etc/alpine-release)/main" --no-cache $nginxPackages             ;;         *)             set -x             \u0026\u0026 tempDir="$(mktemp -d)"             \u0026\u0026 chown nobody:nobody $tempDir             \u0026\u0026 apk add --no-cache --virtual .build-deps                 gcc                 libc-dev                 make                 openssl-dev                 pcre2-dev                 zlib-dev                 linux-headers                 libxslt-dev                 gd-dev                 geoip-dev                 libedit-dev                 bash                 alpine-sdk                 findutils             \u0026\u0026 su nobody -s /bin/sh -c "                 export HOME=${tempDir}                 \u0026\u0026 cd ${tempDir}                 \u0026\u0026 curl -f -O https://hg.nginx.org/pkg-oss/archive/${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 PKGOSSCHECKSUM=\\"8f3f6c1ddd984c0c7320d3bea25eee42749db6d69c251223cf91d69b8d80b703ab39eb94fcf731399a7693ebd8dd37d1b3232ea1184ca98e5ca0ba6165e1a05c *${NGINX_VERSION}-${PKG_RELEASE}.tar.gz\\"                 \u0026\u0026 if [ \\"\\$(openssl sha512 -r ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz)\\" = \\"\\$PKGOSSCHECKSUM\\" ]; then                     echo \\"pkg-oss tarball checksum verification succeeded!\\";                 else                     echo \\"pkg-oss tarball checksum verification failed!\\";                     exit 1;                 fi                 \u0026\u0026 tar xzvf ${NGINX_VERSION}-${PKG_RELEASE}.tar.gz                 \u0026\u0026 cd pkg-oss-${NGINX_VERSION}-${PKG_RELEASE}                 \u0026\u0026 cd alpine                 \u0026\u0026 make module-geoip module-image-filter module-njs module-xslt                 \u0026\u0026 apk index -o ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz ${tempDir}/packages/alpine/${apkArch}/*.apk                 \u0026\u0026 abuild-sign -k ${tempDir}/.abuild/abuild-key.rsa ${tempDir}/packages/alpine/${apkArch}/APKINDEX.tar.gz                 "             \u0026\u0026 cp ${tempDir}/.abuild/abuild-key.rsa.pub /etc/apk/keys/             \u0026\u0026 apk del .build-deps             \u0026\u0026 apk add -X ${tempDir}/packages/alpine/ --no-cache $nginxPackages             ;;     esac     \u0026\u0026 apk del .checksum-deps     \u0026\u0026 if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi     \u0026\u0026 if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi     \u0026\u0026 if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi     \u0026\u0026 apk add --no-cache curl ca-certificates',
    },
    {
      'created': '2023-05-18T06:18:36.4191662Z',
      'created_by': 'LABEL maintainer=Jones MAGLOIRE @Joxit',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-18T06:18:36.4191662Z',
      'created_by': 'WORKDIR /usr/share/nginx/html/',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-18T06:18:36.4191662Z',
      'created_by': 'ENV NGINX_PROXY_HEADER_Host=$http_host',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-18T06:18:36.4191662Z',
      'created_by': 'ENV NGINX_LISTEN_PORT=80',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-18T06:18:36.4191662Z',
      'created_by': 'ENV SHOW_CATALOG_NB_TAGS=false',
      'comment': 'buildkit.dockerfile.v0',
      'empty_layer': true,
    },
    {
      'created': '2023-05-18T06:18:36.433173058Z',
      'created_by': 'COPY nginx/default.conf /etc/nginx/conf.d/default.conf # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-18T06:18:36.446926669Z',
      'created_by': 'COPY bin/90-docker-registry-ui.sh /docker-entrypoint.d/90-docker-registry-ui.sh # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-18T06:18:36.464433643Z',
      'created_by': 'COPY dist/ /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-18T06:18:36.479417246Z',
      'created_by': 'COPY favicon.ico /usr/share/nginx/html/ # buildkit',
      'comment': 'buildkit.dockerfile.v0',
    },
    {
      'created': '2023-05-18T06:18:36.698896035Z',
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
      'sha256:0b9ff86f9940609d912c3e621dd6adad477087fbfc4c31c61d654a22a0f11b61',
      'sha256:f60190c8cdc262062bd7d42a07cadde6791c8449f3421dff1223bfc36a9caf82',
      'sha256:e327072a6a7f45d0af7c04f57d4729a7562f5aaca9377f0ffab6d9fd120f6ec5',
      'sha256:c26ebf2a190d73b49a5e7bb779f33448d5fbf1a0a36236510621b758790ae793',
      'sha256:6af30f71b3afff8b63313da78bda5d7b7fee2216be594cb2fc7f19a3ce69a14a',
      'sha256:2bfd4c9ec145aaf73c515d20d10f1f03e7043c191134b7bcbb75013f016c68fc',
      'sha256:b1f07242859d323324ee74a7221806532d71a0cb52f1463e9c1f661d4293fabb',
      'sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef',
      'sha256:00fd9ea6d2874d964d55c800e9ea9f812c9b6a4e8e342990f79c317b96545495',
      'sha256:90eeeac365c62a487016298dfd4dae3aef0662f243b2a6f8030c0a3cefebf0aa',
      'sha256:684c2527abcba7d7b72bef753728e030093aa6ac748e0d46034c94dc50bc8780',
      'sha256:2e0de70327c6edd8680cacf8213f2dfbae8da5f2e3da03765046c220c4e56b88',
      'sha256:282631fc20d0d4585c4ff9b37ffe0bd7b9e34834c9902d1f7934ce07fe3264a3',
    ],
  },
  'variant': 'v7',
};

export const dockerManifestList = {
  'application/vnd.docker.distribution.manifest.list.v2+json': manifestList,
  manifestList,
  'sha256:7d9bbfa92dbd2a9c09abe924ee7cb8f164be59f25b9457fa0c593a7110dba89f': manifestAmd64,
  manifestAmd64,
  'sha256:5ef7a7d411a524beff05c9d1a541442ff78bb1ec6b45a55434dd3e51e00292b1': manifestArm,
  manifestArm,
  'sha256:7209907f3aa39f8b259069272274f185c4e9772ea7159722728b5f648c71eaad': blobAmd64,
  blobAmd64,
  'sha256:322f0eb73bbb441e1a0eae5dd05dfa56d7bc78b2be4682056463d919393b7d0b': blobArm,
  blobArm,
};
