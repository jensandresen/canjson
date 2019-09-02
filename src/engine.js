const ConfigHelper = require("./config-helper");

class Engine {
    constructor(config) {
        this.config = new ConfigHelper(config);

        this.handle = this.handle.bind(this);
        this.writeNotFoundResponse = this.writeNotFoundResponse.bind(this);
    }

    get defaultHeaders() {
        return {
            "X-Powered-By": "canjson"
        };
    }

    handle(req, res) {
        const response = this.config.getResponseFor(req.url, req.method);

        if (!response) {
            this.writeNotFoundResponse(res);

        } else {
            const headers = {...this.defaultHeaders, ...response.headers};
            const statusCode = response.statusCode.toString();
            const body = JSON.stringify(response.body);

            res.writeHead(statusCode, headers);
            res.write(body);
        }

        res.end();
    }

    writeNotFoundResponse(res) {
        res.writeHead("404");
    }
}

module.exports = Engine;