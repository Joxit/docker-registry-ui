export class DockerRegistryUIError extends Error {
  constructor(msg, code) {
    super(msg);
    this.isError = true;
    this.code = code;
  }
}
