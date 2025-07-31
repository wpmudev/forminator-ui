# Release guide

This guide helps us add changes to the project and release new versions. It uses `changesets` to track changes and automate parts of the release. 

Follow these steps to keep things simple and avoid mistakes.

## Branches

### 1. `development` Branch
- **What it's for**: This branch collects all changes (fixes, features, improvements) for the next version.
- **Rules**:
    - Don't push directly to `development`. It's meant to stay clean.
    - All pull requests (PRs) for your changes must go to this branch.
    - Before opening a PR, run `npx changeset` to create a file in the `.changeset` folder describing your changes.
    - This branch holds everything we plan to release next.

### 2. Your Working Branches
- **Naming**: Name your branches something clear, like `fix/header-bar` or `feature/add-toggle`. Don't use `release/x.x.x`—those branches are created automatically during deployment.
- **Purpose**: Use these branches to work on your fixes or features.

## Release Process

Here's how to add your changes and get a new version out:

1. **Create a New Branch**:
    - Create a branch from the latest `development` branch.
    - Example: `git checkout -b feature/add-toggle development`

2. **Add Your Changes**:
    - Make your changes (e.g., fix a bug or add a feature).
    - Run `npx changeset` to create a changeset file:
        - It'll ask you to pick a version bump (patch, minor, or major) and describe your changes.
        - Example: For a bug fix, choose "patch" and write something like "Fixed header bar alignment issue."
        - This creates a file in the `.changeset` folder (e.g., `.changeset/fix-header-bar.md`).
    - Commit your changes and the `.changeset` file:
      ```bash
      git add .
      git commit -m "Add toggle feature and changeset"
      ```
    - **Tip**: Be specific in your changeset description—it becomes part of the changelog. Avoid vague phrases like "updated stuff."

3. **Push and Open a PR**:
    - Push your branch: `git push origin feature/add-toggle`
    - Open a pull request targeting the `development` branch.
    - Do this for every fix or feature you want in the next version.

4. **Review and Merge**:
    - After review, your PR gets merged into `development`.
    - When merged, the `changeset` tool automatically:
        - Creates or updates a PR that combines all changesets into a changelog and bumps the version in `package.json`.
        - Example: If you added a fix and someone else added a feature, the PR will list both in the changelog and suggest a version like `1.12.36`.

5. **Releasing the Version**:
    - When we're ready to release, we merge the auto-generated PR into `development`.
    - This triggers deployment, which does the following:
        - Creates a `release/x.x.x` branch (e.g., `release/1.12.36`) with built files.
          - Runs `npm run build:library` and `npm run build:showcase` to build assets.
          - Commits the built files to the `release/x.x.x` branch.
        - Runs `npm run release` to deploy the library (on GitHub page) and push changes to `master` branch.
        - Creates a Git tag and a release with the changelog from all changesets.

## Common Mistakes to Avoid
- **Vague Changeset Descriptions**: Write clear, user-facing descriptions (e.g., "Added dark mode toggle" instead of "code changes").
- **Forgetting `npx changeset`**: Every PR needs a changeset file, or it won't show up in the changelog.
- **Wrong Version Bump**: Choose the right bump (patch for fixes, minor for features, major for breaking changes). If unsure, ask a maintainer.
- **Missing `.changeset` Files**: Make sure the `.changeset` folder is committed with your changes.
- **Direct Pushes to `development`**: Always use PRs to add changes.

## Debugging Tips
- **No Changelog in Auto PR?** Check that your `.changeset` file was committed and merged.
- **Builds Not Working?** Ensure `npm run build:library` and `npm run build:showcase` create files in a folder not ignored by `.gitignore` (e.g., `dist/`).
- **Need Help?** Ask a maintainer or check the GitHub Actions logs for errors.

## Things to Remember
- Always target the `development` branch for PRs.
- Run `npx changeset` for every change to keep the changelog accurate.
- Don't create `release/x.x.x` branches—the deployment automation handles that.
- Review the auto-generated PR to ensure the changelog and version bump are correct.

If you have questions or hit a snag, reach out to the project maintainers.