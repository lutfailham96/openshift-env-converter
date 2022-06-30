const args = process.argv.slice(2);
const fs = require('fs');
const yaml = require('js-yaml');

const convertedConfig = {};
let envConfig = [];
let yamlFile = "";

const isYamlFileExist = (yamlFile) => {
  try {
    if (fs.existsSync(yamlFile)) {
      return true
    }
    console.log('File not found')
    process.exit(1);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

if (args.length < 1) {
  console.log('File not specified');
  process.exit(1);
}

if (isYamlFileExist(args[0])) {
  yamlFile = args[0];
  const content = fs.readFileSync(yamlFile);
  const yamlObject = yaml.load(fs.readFileSync(yamlFile, {encoding: 'utf-8'}));
  envConfig = yamlObject.spec ? yamlObject.spec.template.spec.containers[0].env : yamlObject.data;
}

if (Array.isArray(envConfig)) {
  envConfig.forEach((data) => {
    convertedConfig[data.name] = data.value || "";
  });
} else {
  Object.assign(convertedConfig, envConfig);
}

console.log(JSON.stringify(convertedConfig, null, 2));
