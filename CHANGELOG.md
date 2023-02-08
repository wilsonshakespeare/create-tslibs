# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

And for each point, add semantics:
https://seesparkbox.com/foundry/semantic_commit_messages

For each keypoint, treat like commit messages, follow [Chris Beams' rules](https://chris.beams.io/posts/git-commit/)

## [Unreleased]
- chore: Upgrade outdated packages for boilerplate

## [0.1.17] - 2023-02-08
- feat: Upgrade using pnpm instead of npm
## [0.1.16] - 2023-02-08
- fix: Remove deprecated references (setAuthorName and unused package)
## [0.1.15] - 2021-02-13
### Fixed:
- fix: Remove dependency to package-lock.json

Note: 
fs.copySync unable to copy package-lock.json with intention to run `npm ci`
Hence instead of copying package-lock.json run `npm install` instead

## [0.1.14] - 2021-02-13
### Fixed:
- fix: Change to copySync to avoid incomplete copy
## [0.1.13] - 2021-02-13
### Fixed:
- fix: Remove callback function
## [0.1.12] - 2021-02-13
### Changed:
- test: Test if file naming was the issue
## [0.1.11] - 2021-02-13
### Changed:
- chore: Add callback function to fs.copy
## [0.1.10] - 2021-02-13
### Changed:
- chore: Change console.log to shell.echo
## [0.1.9] - 2021-02-13
### Changed:
- chore: Add debug log (package-lock.json not showing)
## [0.1.8] - 2021-02-13
### Changed:
- chore: Add Usage section to tslib README.md

## [0.1.7] - 2021-02-13
### Changed:
- chore: Update tslib .vscode/setting.json and README.md

## [0.1.6] - 2021-02-13
### Added:
- chore: Add CHANGELOG.md to repo

## [0.1.5] - 2021-02-13
### Changed:
- doc: Update caveat note on np command


## [0.1.4] - 2021-02-13

Intiial successful publish with np package

### Added:

- test: Update publish version to test np package
- Note: np package may have issue with initial npm publish

```shell
~/D/L/create-tslib ❯❯❯ npm access 2fa-required create-tslibs
npm ERR! code E400
npm ERR! 400 Bad Request - POST https://registry.npmjs.org/-/package/create-tslibs/access
```
