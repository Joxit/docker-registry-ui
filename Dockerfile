# Copyright (C) 2016-2018  Jones Magloire @Joxit
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
FROM nginx:alpine

LABEL maintainer="Jones MAGLOIRE @Joxit"

WORKDIR /usr/share/nginx/html/

ENV NGINX_PROXY_HEADER_Host '$http_host'
ENV NGINX_LISTEN_PORT '80'
ENV SHOW_CATALOG_NB_TAGS 'false'

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY bin/90-docker-registry-ui.sh /docker-entrypoint.d/90-docker-registry-ui.sh
COPY dist/ /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/

RUN chown -R nginx:nginx /etc/nginx/ /usr/share/nginx/html/ /var/cache/nginx