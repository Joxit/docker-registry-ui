/*
 * Copyright (C) 2016-2021 Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { router, getCurrentRoute } from '@riotjs/route';

function baseUrl() {
  return getCurrentRoute().replace(/#!(.*)/, '');
}

export default {
  home() {
    router.push(baseUrl());
  },
  taglist(image) {
    router.push(`${baseUrl()}#!/taglist/${image}`);
  },
  getTagListImage() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taglist\//, '');
  },
  history(image, tag) {
    router.push(`${baseUrl()}#!/taghistory/image/${image}/tag/${tag}`);
  },
  getTagHistoryImage() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taghistory\/image\/(.*)\/tag\/(.*)\/?$/, '$2');
  },
  getTagHistoryTag() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taghistory\/image\/(.*)\/tag\/(.*)\/?$/, '$3');
  },
};
