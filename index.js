#!/usr/bin/env node
// Note: This Run From Wherever the current process is

const shell = require('shelljs');
const colors = require('colors');
const isFilenameValid = require('valid-filename');
const utilzed = require('utilzed').default;
const test = require('utilzed/dist/promise').default;
const fs = require('fs-extra');
const path = require('path');

function getAuthorName() {
  let author = '';

  author = shell
    .exec('npm config get init-author-name', { silent: true })
    .stdout.trim();
  if (author) return author;

  author = shell
    .exec('git config --global user.name', { silent: true })
    .stdout.trim();
  if (author) {
    setAuthorName(author);
    return author;
  }

  author = shell
    .exec('npm config get init-author-email', { silent: true })
    .stdout.trim();
  if (author) return author;

  author = shell
    .exec('git config --global user.email', { silent: true })
    .stdout.trim();
  if (author) return author;

  // whoami will be the last fall back
  author = shell
    .exec('whoami', { silent: true })
    .stdout.trim();

  return author;
}

async function run() {
  const args = process.argv;

  const templateNodeVersions = new Map();

  templateNodeVersions.set('tslib', '*');
  templateNodeVersions.set('express', );

  const optionMap = new Map();
  optionMap.set('tslib', {
    base: 'v10.13.0',
    ceil: null
  })
  optionMap.set('express', {
    base: 'v12.19.0',
    ceil: null
  })

  // ['tslib', 'express']
  const option = args.find(arg => arg.indexOf('--option') >= 0);
  const folder = args.find(arg => arg.indexOf('--folder') >= 0);

  // STEP 1: check if necessary arguments present
  if (!option || !folder) {
    shell.echo(`
      ${(!option) ? 'option argument is not defined\n' : ''}
      ${(!folder) ? 'folder argument is not defined' : ''}
    `);
    shell.exit(1);
  }

  // STEP 2: check if value for option argument is legit
  const optionValue = option.split('=')[1];
  if(!optionMap.has(optionValue)) {
    shell.echo(`
      ${optionValue} is not a valid option, select from one of the followings:
      ${optionMap.keys.reduce((prev, curr) => `${prev}\n\t--option=${curr}`, '')}
    `);
    shell.exit(1);
  }

  // STEP 3: check if filename given is legit
  const folderValue = folder.split('=')[1];
  if(!isFilenameValid(folderValue)) {
    shell.echo('Please determine your app name or enter a valid filename');
    shell.exit(1);
  }

  const appDirectory = `${process.cwd()}/${folderValue}`;

  // STEP 4: check if directory already exist 
  shell.cd(process.cwd());
  if (shell.test('-d', folderValue)) {
    shell.echo(
      `${appDirectory} already exist, will not proceed on creating template`
    );
    shell.exit(1);
  }

  // STEP 5: check node version
  // For express or nextjs has ceil node version requirement
  const versionConfig = optionMap.get(optionValue);

  if (!shell.which('node')) {
    shell.echo(`Please install node min ${versionConfig.base} for this template`);
    shell.exit(1);
  }

  shell.echo('Checking node version compatibility:');
  const version = shell.exec('node -v').toString();

  const { OPERATORS, isVersionValid } = utilzed.versionCheck;

  if (versionConfig.base) {
    if (!isVersionValid(version, OPERATORS.MORE_THAN_EQUAL, versionConfig.base)) {
      shell.echo(`Please install node min ${versionConfig.base} for this template`);
      shell.exit(1);
    }
  }

  if (versionConfig.ceil) {
    if (!isVersionValid(version, OPERATORS.LESS_THAN_EQUAL, versionConfig.base)) {
      shell.echo(`Please install node <= ${versionConfig.ceil} for this template`);
      shell.exit(1);
    }
  }

  // STEP 6: Copying the template
  shell.mkdir(folderValue);

  // 6.1 Copy base code
  //*/
  await fs.copy(
    path.resolve(__dirname, `./templates/${optionValue}`),
    appDirectory,
    {
      overwrite: true,
    },
    (err) => {
      if (err) {
        shell.error(err);
        return;
      }
    }
  );
  //*/

  // 6.2 Replacing files with placeholder
  const files = ['package.json', 'lock.json', 'LICENSE', 'CHANGELOG.md', 'README.md'];

  const author = getAuthorName();

  const date = new Date();
  
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
  files.forEach((file) => {
    const path = `${appDirectory}/placeholder/${file}`;
    const hasFile = fs.pathExistsSync(path);
    shell.echo(`${path}`);
    shell.echo(`contain file: ${hasFile}`);
    if (hasFile){
      // const data = fs.readFileSync(`./placeholder/${optionValue}/${file}`, 'utf8');
      const data = fs.readFileSync(`${path}`, 'utf8');
      var result = data.replace(/__LIB__/g, folderValue)
                      .replace(/__AUTHOR__/g, author)
                      .replace(/__YEAR__/g, date.getFullYear())
                      .replace(/__DATE__/g, dateString);

      fs.writeFileSync(`${appDirectory}/${file}`, result, 'utf8');
      shell.echo(`create file complete: ${path}`);
    }
  });

  fs.renameSync(`${appDirectory}/lock.json`, `${appDirectory}/package-lock.json`);

  shell.cd(folderValue);
  shell.rm('-rf', 'placeholder');
  shell.echo(`${folderValue} created`);

  shell.exit(0);
}

run();
