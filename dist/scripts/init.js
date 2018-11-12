const REGISTRY_SERVER_KEY = 'registryServer';
let registryServersStr = localStorage.getItem(REGISTRY_SERVER_KEY);
let registryServers = [];
if (registryServersStr !== null){
    let rs = JSON.parse(registryServersStr);
    if (rs instanceof Array) {
        registryServers = rs;
    }
}

const apiHost = location.protocol+'//'+location.host;
if (!registryServers.includes(apiHost)) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiHost+"/v2/", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const version = xhr.getResponseHeader('Docker-Distribution-Api-Version');
                if (version.startsWith('registry/2.')) {
                    registryServers.unshift(apiHost);
                    localStorage.setItem(REGISTRY_SERVER_KEY, JSON.stringify(registryServers));
                }
            }
        }
    };
    xhr.send();
}
