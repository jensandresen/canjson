function extractRoutesFrom(config) {
    const routes = config.routes || { };
    const result = new Map();

    for (let key in routes) {
        const value = routes[key];
        
        const route = new RouteDefinition(key, value);
        result.set(route.getUrl(), route);
    }

    return result;
}

class RouteDefinition {
    constructor(url, verbs) {
        this.url = url.toLowerCase();

        this.verbs = new Map();
        for (let key in verbs) {
            const value = verbs[key];
            this.verbs.set(key.toLowerCase(), value);
        }

        this.getUrl = this.getUrl.bind(this);
        this.getVerb = this.getVerb.bind(this);
    }

    getUrl() {
        return this.url;
    }

    getVerb(verb) {
        return this.verbs.get(verb.toLowerCase());
    }
}

class ConfigHelper {
    constructor(config) {
        this.config = extractRoutesFrom(config);
        this.getResponseFor = this.getResponseFor.bind(this);
    }

    getResponseFor(url, method) {
        const caseInsensitiveUrl = url
            .replace(/^\/*(.*?)\/*$/g, '$1')
            .toLowerCase();

        const route = this.config.get(caseInsensitiveUrl);
        if (!route) {
            return null;
        }

        const verbDefinition = route.getVerb(method);
        if (!verbDefinition) {
            return null;
        }

        return verbDefinition;
    }
}

module.exports = ConfigHelper;