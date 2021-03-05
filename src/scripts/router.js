import { route, router, getCurrentRoute } from '@riotjs/route';

function baseUrl() {
  return getCurrentRoute().replace(/#!(.*)/, '');
}

export default {
  home() {
    router.pus(baseUrl());
  },
  taglist(image) {
    router.push(`${baseUrl()}#!/taglist/${image}`);
  },
};
