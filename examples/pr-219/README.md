# Example for pull request #219

Basic usage for `DEFAULT_REGISTRIES` and `READ_ONLY_REGISTRIES`.

Behaviors: 
- `DEFAULT_REGISTRIES`:
    - will set the list of registries in the localstorage when the localstorage is empty.
    - will overwrite the list of registries every time when  `READ_ONLY_REGISTRIES=true`
- `READ_ONLY_REGISTRIES`:
    - will remove dialog for Add and Remove registries

These options works only when `SINGLE_REGISTRY=false`

See [#219](https://github.com/Joxit/docker-registry-ui/pull/219)