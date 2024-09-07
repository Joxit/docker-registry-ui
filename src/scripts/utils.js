const LOCAL_STORAGE_KEY = 'registryServer';

export function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == undefined || isNaN(bytes)) {
    return '?';
  } else if (bytes === 0) {
    return '0 Byte';
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  const number = bytes / Math.pow(1024, i);
  if (number < 10) {
    const decimal = (bytes - Math.floor(number) * Math.pow(1024, i)) / Math.pow(1024, i);
    return `${Math.floor(number)}.${Math.floor(decimal * 10)} ${sizes[i]}`;
  }
  return Math.ceil(number) + ' ' + sizes[i];
}

export function dateFormat(date) {
  if (date === undefined) {
    return '';
  }
  const labels = [
    'a second',
    'seconds',
    'a minute',
    'minutes',
    'an hour',
    'hours',
    'a day',
    'days',
    'a month',
    'months',
    'a year',
    'years',
  ];
  const maxSeconds = [1, 60, 3600, 86400, 2592000, 31104000, Infinity];
  const diff = (new Date() - date) / 1000;
  for (var i = 0; i < maxSeconds.length - 1; i++) {
    if (maxSeconds[i] * 2 >= diff) {
      return labels[i * 2];
    } else if (maxSeconds[i + 1] > diff) {
      return Math.floor(diff / maxSeconds[i]) + ' ' + labels[i * 2 + 1];
    }
  }
}

export function getHistoryIcon(attribute) {
  switch (attribute) {
    case 'architecture':
      return 'memory';
    case 'created':
      return 'event';
    case 'docker_version':
      return '';
    case 'os':
      return 'developer_board';
    case 'Cmd':
      return 'launch';
    case 'Entrypoint':
      return 'input';
    case 'Env':
      return 'notes';
    case 'Labels':
      return 'label';
    case 'User':
      return 'face';
    case 'Volumes':
      return 'storage';
    case 'WorkingDir':
      return 'home';
    case 'author':
      return 'account_circle';
    case 'id':
    case 'digest':
      return 'settings_ethernet';
    case 'created_by':
      return 'build';
    case 'size':
      return 'get_app';
    case 'ExposedPorts':
      return 'router';
    case 'comment':
      return 'chat';
    case 'home':
      return 'home';
    case 'sources':
      return 'link';
    case 'keywords':
      return 'receipt';
    case 'name':
      return 'abc';
    case 'kubeVersion':
    case 'appVersion':
      return '123';
    default:
      if (attribute.startsWith('custom-label-')) {
        return 'label';
      }
      return '';
  }
}

export function getPage(elts, page, limit) {
  if (!limit) {
    limit = 100;
  }
  if (!elts) {
    return [];
  }
  return elts.slice((page - 1) * limit, limit * page);
}

export function getNumPages(elts, limit) {
  if (!limit) {
    limit = 100;
  }
  if (!elts) {
    return 0;
  }
  return Math.trunc(elts.length / limit) + 1;
}

export function getPageLabels(page, nPages) {
  var pageLabels = [];
  var maxItems = 10;
  if (nPages === 1) {
    return pageLabels;
  }
  if (page !== 1 && nPages >= maxItems) {
    pageLabels.push({ 'icon': 'first_page', page: 1 });
    pageLabels.push({ 'icon': 'chevron_left', page: page - 1 });
  }
  var start = Math.round(Math.max(1, Math.min(page - maxItems / 2, nPages - maxItems + 1)));
  for (var i = start; i < Math.min(nPages + 1, start + maxItems); i++) {
    pageLabels.push({
      page: i,
      current: i === page,
      'space-left': page === 1 && nPages > maxItems,
      'space-right': page === nPages && nPages > maxItems,
    });
  }
  if (page !== nPages && nPages >= maxItems) {
    pageLabels.push({ 'icon': 'chevron_right', page: page + 1 });
    pageLabels.push({ 'icon': 'last_page', page: nPages });
  }
  return pageLabels;
}

export function stripHttps(url) {
  if (!url) {
    return '';
  }
  return url.replace(/^https?:\/\//, '');
}

function kebabToCamelCase(s) {
  return s.replace(/-[a-z]/, (x) => x[1].toUpperCase());
}

export function eventTransfer(from, to) {
  from.on('*', function (event, param) {
    to[kebabToCamelCase(event)] = param;
    to.trigger(event, param);
  });
}

export function isDigit(char) {
  return char >= '0' && char <= '9';
}

export const ERROR_CAN_NOT_READ_CONTENT_DIGEST = {
  message:
    'Access on registry response was blocked. Try adding the header ' +
    '`Access-Control-Expose-Headers: Docker-Content-Digest`' +
    ' to your proxy or registry: ' +
    'https://docs.docker.com/registry/configuration/#http',
  isError: true,
};

export function getRegistryServers(i) {
  try {
    const res = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (res instanceof Array) {
      return !isNaN(i) ? res[i] : res.map((url) => url.trim().replace(/\/*$/, ''));
    }
  } catch (e) {}
  return !isNaN(i) ? '' : [];
}

export function setRegistryServers(registries) {
  if (typeof registries === 'string') {
    registries = registries.split(',');
  } else if (!Array.isArray(registries)) {
    throw new Error('setRegistries must be called with string or array parameter');
  }
  registries = registries.map((registry) => registry.replace(/\/*$/, ''));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(registries));
}

export function addRegistryServers(registry) {
  const url = registry.trim().replace(/\/*$/, '');
  const registryServer = getRegistryServers().filter((e) => e !== url);
  setRegistryServers([url].concat(registryServer));
  return url;
}

export function removeRegistryServers(registry) {
  const registryServers = getRegistryServers().filter((e) => e !== registry);
  setRegistryServers(registryServers);
}

export function encodeURI(url) {
  if (!url) {
    return;
  }
  return url.indexOf('&') < 0 ? window.encodeURIComponent(url) : btoa(url);
}

export function decodeURI(url) {
  if (!url) {
    return;
  }
  return url.startsWith('http') ? window.decodeURIComponent(url) : atob(url);
}

export function truthy(value) {
  return value === true || value === 'true';
}

/**
 * only is false if explicitly set to boolean false or string 'false'.
 * defaults to true in any other case, e.g. if empty.
 *
 * @param {string|boolean} value the input value to check
 * @returns {boolean} false if explicity set, true otherwise
 */
export function falsy(value) {
  return value !== false && value !== 'false';
}

export function stringToArray(value) {
  return value && typeof value === 'string' ? value.split(',') : [];
}

const compareNumbers = (a, b) => {
  const na = parseInt(a);
  const nb = parseInt(b);
  if (na > nb) return 1;
  if (nb > na) return -1;
  if (!isNaN(na) && isNaN(nb)) return 1;
  if (isNaN(na) && !isNaN(nb)) return -1;
  return 0;
};

export function isNewestVersion(current = '0.0.0', release = '0.0.0') {
  if (current === release) {
    return true;
  }
  current = current.split('.');
  release = release.split('.');
  const isDev = current[2].indexOf('-') >= 0;
  const major = compareNumbers(current[0], release[0]);
  const minor = compareNumbers(current[1], release[1]);
  const patch = compareNumbers(current[2], release[2]);
  if (!isDev && (major > 0 || (major === 0 && minor > 0) || (major === 0 && minor === 0 && patch >= 0))) {
    return true;
  } else if (isDev && (major > 0 || (major === 0 && minor > 0))) {
    return true;
  }
  return false;
}

export function parseJSON(json) {
  if (!json) {
    return;
  }
  try {
    return JSON.parse(json);
  } catch (e) {}
}
