var fs = require('fs');
var path = require('path');
var dirPath = path.resolve('./dist');
var filesList;

console.log('generate module.js files')

fs.readdir(dirPath, function(err, files) {
  filesList = files.filter(function(e) {
    return e.includes('esm.js.map');
  });
  console.log('built modules to convert:');
  console.log(filesList);
});

fs.readFile('./scripts/index.tpl', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  filesList.forEach(element => {
    const moduleName = element.split('.')[0];
    var result = data.replace(/__MODULE__/g, moduleName);
    console.log(`output to ./dist/${moduleName}.js`);
    fs.writeFile(`./dist/${moduleName}.js`, result, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
});

