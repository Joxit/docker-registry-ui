
registryUI.bytesToSize = function (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == undefined || isNaN(bytes)) {
    return '?';
  } else if (bytes == 0) {
    return '0 Byte';
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.ceil(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

registryUI.dateFormat = function(date) {
  if (date === undefined) {
    return '';
  }
  const labels = ['a second', 'seconds', 'a minute', 'minutes', 'an hour', 'hours', 'a day', 'days', 'a month', 'months', 'a year', 'years'];
  const maxSeconds = [1, 60, 3600, 86400, 2592000, 31104000, Infinity];
  const diff = (new Date() - date) / 1000;
  for (var i = 0; i < maxSeconds.length - 1; i++) {
    if (maxSeconds[i] * 2 >= diff) {
      return labels[i * 2];
    } else if (maxSeconds[i + 1] > diff) {
      return Math.floor(diff / maxSeconds[i]) + ' ' + labels[i * 2 + 1];
    }
  }
};


registryUI.getHistoryIcon = function(attribute) {
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
    default:
      ''
  }
}

registryUI.getPage = function(elts, page, limit) {
  if (!limit) { limit = 100; }
  if (!elts) { return []; }
  return elts.slice((page - 1) * limit, limit * page);
}

registryUI.getNumPages = function(elts, limit) {
  if (!limit) { limit = 100; }
  if (!elts) { return 0; }
  return Math.trunc(elts.length / limit) + 1;
}

registryUI.getPageLabels = function(page, nPages) {
  var pageLabels = [];
  var maxItems = 10;
  if (nPages === 1) { return pageLabels; }
  if (page !== 1 && nPages >= maxItems) {
    pageLabels.push({'icon': 'first_page', page: 1});
    pageLabels.push({'icon': 'chevron_left', page: page - 1});
  }
  var start = Math.round(Math.max(1, Math.min(page - maxItems / 2, nPages - maxItems + 1)));
  for (var i = start; i < Math.min(nPages + 1, start + maxItems); i++) {
    pageLabels.push({
      page: i,
      current: i === page,
      'space-left': page === 1 && nPages > maxItems,
      'space-right': page === nPages && nPages > maxItems
    });
  }
  if (page !== nPages && nPages >= maxItems) {
    pageLabels.push({'icon': 'chevron_right', page: page + 1});
    pageLabels.push({'icon': 'last_page', page: nPages});
  }
  return pageLabels;
}

registryUI.updateQueryString = function(qs) {
  var search = '';
  for (var key in qs) {
    if (qs[key] !== undefined) {
      search += (search.length > 0 ? '&' : '?') +key + '=' + qs[key];
    }
  }
  history.pushState(null, '', search + window.location.hash);
}

registryUI.stripHttps = function (url) {
  if (!url) {
    return '';
  }
  return url.replace(/^https?:\/\//, '');
};
