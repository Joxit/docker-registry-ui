# Standalone Application

## Overview

This standalone application is based on Electron which encapsulates the whole
docker-registry-ui in a single executable, that can be run on your local
computer.

## Building
* Check out or download the repository, open a terminal at the checkout
  directory, download the dependencies and build the web app:
    ```bash
    npm install
    npm run build
    ```
* After building the web application, navigate to the ```electron``` directory
  and execute following commands to build the executable:
    ```bash
    cd examples/electron
    npm install
    npm run dist
    ```
* Run the application:
   ```bash
   npm start
   ```
If you encounter any issues, please check the troubleshooting below.


## Password Protected Registries
If you want to interact with password protected Docker Registries, this
application will use the keystore of your system to gather the credentials for
accessing the Registry.

This is accomplished with the [keytar](https://www.npmjs.com/package/keytar)
package. In concjunction with keytar, the integrated credential
helper supports you with managing the credentials to the Registries.

![alt Authentication on macOS](./doc/assets/authentication.gif)


## Troubleshooting
*   Problem: The application does not start with ```npm start``` and exits with following message:
    ```
    [7742:0509/001117.199224:FATAL:setuid_sandbox_host.cc(157)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that ./node_modules/electron dist/chrome-sandbox is owned by root and has mode 4755.
    ```

    Solution: Add proper rights to the chrome-sanbox
    ```bash
    sudo chown root ./node_modules/electron/dist/chrome-sandbox
    sudo chmod 4755 ./node_modules/electron/dist/chrome-sandbox
    ```

* Problem: I am on Linux and to not have any password wallet for keytar.

  Solution: Install following dependencies according to the official [setup instructions](https://atom.github.io/node-keytar/) for keytar on Linux:
    * Debian/Ubuntu: ```sudo apt-get install libsecret-1-dev```
    * Red Hat-based: ```sudo yum install libsecret-devel```
    * Arch Linux: ```sudo pacman -S libsecret```


