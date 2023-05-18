export class DockerRegistryUIError extends Error {
  constructor(msg) {
    super(msg);
    this.isError = true;
  }
}
