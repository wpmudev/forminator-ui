# Contributing Guidelines

## Important

> To work with this branch use Node `11.15.0`.

1. Do not commit on `master` or `development` or `gh-pages` branches.
2. Branch `development` is where our base code resides and will allow us to beta test.
3. Branch `master` is where we can find **Forminator UI** compiled assets. You should never push directly to this branch.
4. Branch `gh-pages` contains only public files that handle demo site. You should never push directly to this branch.

## Workflow

1. Create a new branch from `development` branch using a descriptive name, for example:
	* `new/modal-box` for new features.
	* `enhance/modal-box` for improvements.
	* `fix/modal-box` for bugfixing.
2. Make your commits and push to the new branch you created.
3. Edit `README.md` file and list your changes. Push to the new branch you created.
4. File the new pull request against `development` branch.
5. Assign someone to review your code.
6. Once the PR is approved, the assigned reviewer will merge your changes in `development` branch.
7. Delete your branch locally and make sure it does not exist remote.

**Remember:** It is a good idea to create a Pull Request as soon as possible so everybody knows what's going on with the project from the PRs screen in Bitbucket.

## Command Line

1. Install node. It's recommended to install `nvm` to switch between node versions.
2. Execute `npm install` in root project folder to install all necessary packages.
3. Execute `npm run start` to watch css and js changes. The demo file will then automatically be served up by [Browsersync](https://browsersync.io/). All changes made will automatically be watched and the page live reloaded when changes are made.

## Updating Forminator UI

Requirements:

* Must be a developer member of the [WPMU DEV Organization](https://github.com/orgs/wpmudev/people).
* Must be on `development` branch with a clean working directory.

**Note:** The following commands handle all aspects of releasing the next version. Once ran, they will build all necessary files that corresponds to the semver version, commit them and publish to the correct branch.

### Library Release

```
npm run release:library
```

### Showcase Release

```
npm run release:showcase
```

**Important:** Remember to always run both commands since we need [showcase](https://github.com/wpmudev/forminator-ui/tree/gh-pages) to be synced with the same latest assets available on the [library](https://github.com/wpmudev/forminator-ui/tree/master).