const fs = require("fs");
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

const defaultEmptyConfig = { routes: {} };
const defaultPort = 5088;

function getConfigFileName() {
    return args.c || "./canjson.config.json";
}

function loadConfig() {
    const configFileName = getConfigFileName();

    if (fs.existsSync(configFileName)) {
        const content = fs.readFileSync(configFileName, { encoding: "utf8" });
        return JSON.parse(content);
    }

    return defaultEmptyConfig;
}

function getPort() {
   return args.p || process.env.PORT || defaultPort;
}

module.exports = function() {
    return {
        port: getPort(),
        loadConfig: loadConfig
    };
}