module.exports = {
  rollup(config, options) {
    const outputDir = process.cwd() + '/dist/';
    const extension =
      '.' +
      config.output.file
        .split('.')
        .slice(1)
        .join('.');
    let filename = config.input.split('src/')[1]; // remove src/
    filename = filename.split('.')[0]; // remove extension, if any

    config.output.file = outputDir + filename + extension;
    console.log(config.output.file);
    // replace / with __ for UMD names
    config.output.name = filename.replace('/', '__');
    return config;
  },
};
