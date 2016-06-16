# Copyright (C) 2016  Jones Magloire @Joxit
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
FROM node:slim

MAINTAINER Jones MAGLOIRE @Joxit

WORKDIR /usr/src/app

RUN npm install -g http-server && npm cache clean

COPY package.json /usr/src/app

RUN npm install \
    && find node_modules/ \
      -maxdepth 1 -mindepth 1 -type d \
      ! -name riot \
      ! -name material-design-icons \
      ! -name material-design-* \
      ! -name dialog-polyfill \
      ! -name riotgear-router \
      -exec rm -rf {} \; \
    && find node_modules/material-design-* \
      -maxdepth 1 -mindepth 1 \
      ! -name package.json \
      ! -name iconfont \
      ! -name LICENSE \
      ! -name material* \
      ! -name dist \
      -exec rm -rf {} \; \
    && find node_modules/material-design-lite/dist/ -maxdepth 1 -mindepth 1 \
      ! -name "*.js*" \
      ! -name "*.css*" \
      -exec rm -rf {} \; \
    && npm cache clean

COPY . /usr/src/app

EXPOSE 8080

ENTRYPOINT http-server
