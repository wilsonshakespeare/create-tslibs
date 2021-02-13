const distFolder = './dist';
const fs = require('fs');
const { beautify, compiler } = require('flowgen');

console.log('generating flow files');

function getAllFilePaths(dirPath, filePaths = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const path = `${dirPath}/${file}`;
    if (fs.statSync(path).isDirectory()) {
      filePaths = getAllFilePaths(path, filePaths);
    } else {
      filePaths.push(path);
    }
  });
  return filePaths;
}

const paths = getAllFilePaths(distFolder);

paths.forEach((file) => {
  if (/.d.ts$/.test(file)) {
    const flowDef = compiler.compileDefinitionFile(file);
    const readableDef = beautify(flowDef);
    const flowFileName = file.replace(/.d.ts$/, '.js.flow');
    fs.writeFile(flowFileName, readableDef, (err) => {
      if (err) throw err;
      console.log(`output to ${flowFileName}`);
    });
  }
});
