# How to contribute to Docke Registry UI

I ([Jones Magloire](https://joxit.dev/)) created the Docker Registry UI from scratch, but I can't succeed without contributions from community members like you! Contributions come in many different shapes and sizes. In this file we provide guidance around two of the most common types of contributions: opening issues and opening pull requests.

Please read also the [Code Of Conduct](https://github.com/Joxit/docker-registry-ui/blob/main/CODE_OF_CONDUCT.md).

## Submitting Issues

### Did you find a bug?

* **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/joxit/docker-registry-ui/issues).

* If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/joxit/docker-registry-ui/issues/new). Be sure to
  * Use the [**Bug Report Template**](https://github.com/Joxit/docker-registry-ui/issues/new?assignees=&labels=&template=bug_report.md&title=)
  * Include a **title and clear description**
  * Write as much relevant information as possible
  * Add your **full configuration** (Docker Registry UI **AND** Docker Server) or a **screenshots** demonstrating the expected behavior that is not occurring

## Submitting Pull Request

### Do you intend to add a new feature or change an existing one?

* Suggest your change in a new issue using the [**Feature Request Template**](https://github.com/Joxit/docker-registry-ui/issues/new?assignees=&labels=&template=feature_request.md&title=) and start writing code.

* Run the interface on your computer first with `npm start`.

### Did you write a patch that fixes a bug?

* Open a new [GitHub pull request](https://github.com/Joxit/docker-registry-ui/compare) with the patch.

* Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

* Before submitting, please read the [Coding conventions](#coding-conventions) first.

### Did you fix whitespace, format code, or make a purely cosmetic patch?

Changes that are cosmetic in nature and do not add anything substantial to the stability, functionality, or testability of Docker Registry UI will generally not be accepted.

## Coding conventions

* I use prettier with custom preset, use `npm format` before any PR

* I use [semver](https://semver.org/) for package versioning

* I use Github Actions for publishing docker images and releases

* I indent with two spaces

Thank you for your help! :heart:

[Joxit](https://joxit.dev/)