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
FROM arm32v7/nginx

LABEL maintainer="Jones MAGLOIRE @Joxit"

WORKDIR /usr/share/nginx/html/

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
COPY dist/scripts/docker-registry-ui-static.js /usr/share/nginx/html/scripts/docker-registry-ui.js
COPY bin/entrypoint /bin

ENTRYPOINT entrypoint
