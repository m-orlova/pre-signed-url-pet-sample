require("whatwg-fetch");
const fs = require("fs");

const mockConfigs = [
  "./src/config",
  "./src/core/security/oidcConfig"
];

mockConfigs
  .filter(configFilePath => fs.existsSync(`${configFilePath}.ts`))
  .forEach(configFilePath => jest.mock(configFilePath, () => ({env: {}}) ));

