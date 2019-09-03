const ConfigHelper = require("./config-helper");

class Engine {
    constructor(config) {
        this.config = new ConfigHelper(config);

        this.handle = this.handle.bind(this);
        this.writeNotFoundResponse = this.writeNotFoundResponse.bind(this);
        this.ensureContentType = this.getHeadersFor.bind(this);
    }

    getHeadersFor(response) {
        const configuredHeaders = response.headers;
        const finalHeaders = {};

        for (let k in configuredHeaders) {
            if (k.toUpperCase() != "CONTENT-TYPE") {
                finalHeaders[k] = configuredHeaders[k];
            }
        }

        finalHeaders["Content-Type"] = "application/json";
        finalHeaders["X-Powered-By"] = "canjson";

        return finalHeaders;
    }

    handle(req, res) {
        const response = this.config.getResponseFor(req.url, req.method);

        if (!response) {
            this.writeNotFoundResponse(res);

        } else {
            const statusCode = response.statusCode.toString();
            const body = JSON.stringify(response.body);

            const headers = this.getHeadersFor(response);

            res.writeHead(statusCode, headers);
            res.write(body);
        }

        res.end();
    }

    writeNotFoundResponse(res) {
        res.writeHead("404", {"X-Powered-By": "canjson"});
    }
}

module.exports = Engine;