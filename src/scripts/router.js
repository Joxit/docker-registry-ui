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
import { encodeURI, decodeURI } from './utils';

function getQueryParams() {
  const queries = {};
  window.location.search
    .slice(1)
    .split('&')
    .forEach((qs) => {
      const splitIndex = qs.indexOf('=');
      queries[qs.slice(0, splitIndex)] = splitIndex < 0 ? '' : qs.slice(splitIndex + 1);
    });
  return queries;
}

function updateQueryParams(qs) {
  const queryParams = getQueryParams();
  for (let key in qs) {
    if (qs[key] === null) {
      delete queryParams[key];
    } else {
      queryParams[key] = qs[key];
    }
  }
  return queryParams;
}

function toSearchString(queries) {
  let search = [];
  for (let key in queries) {
    if (key && queries[key] !== undefined) {
      search.push(`${key}=${queries[key]}`);
    }
  }
  return search.length === 0 ? '' : `?${search.join('&')}`;
}

function baseUrl(qs) {
  const location = window.location;
  const queryParams = updateQueryParams(qs);
  return location.origin + location.pathname + toSearchString(queryParams);
}

export default {
  home() {
    router.push(baseUrl({ page: null }));
  },
  taglist(image) {
    router.push(`${baseUrl({ page: null })}#!/taglist/${image}`);
  },
  getTagListImage() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taglist\//, '');
  },
  history(image, tag) {
    router.push(`${baseUrl({ page: null })}#!/taghistory/image/${image}/tag/${tag}`);
  },
  getTagHistoryImage() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taghistory\/image\/(.*)\/tag\/(.*)\/?$/, '$2');
  },
  getTagHistoryTag() {
    return getCurrentRoute().replace(/^.*(#!)?\/?taghistory\/image\/(.*)\/tag\/(.*)\/?$/, '$3');
  },
  updateQueryString(qs) {
    const search = toSearchString(updateQueryParams(qs));
    history.pushState(null, '', search + window.location.hash);
  },
  updateUrlQueryParam(url) {
    this.updateQueryString({ url: encodeURI(url) });
  },
  getUrlQueryParam() {
    const queries = getQueryParams();
    const url = queries['url'];
    if (url) {
      try {
        return decodeURI(url);
      } catch (e) {
        console.error(`Can't decode query parameter URL: ${url}`, e);
      }
    }
  },
  updatePageQueryParam(page) {
    this.updateQueryString({ page });
  },
  getPageQueryParam() {
    const queries = getQueryParams();
    return queries['page'];
  },
};
