const mocha = require("mocha");
const assert = require("assert");

const Engine = require("./../engine");

describe("engine", function () {

    it("always ends the response", function() {
        let wasEndInvoked = false;

        const resSpy = responseBuilder({ end: () => wasEndInvoked = true });
        const reqStub = requestBuilder();

        const sut = sutBuilder();
        sut.handle(reqStub, resSpy);

        assert.equal(wasEndInvoked, true);
    });

    it("returns expected status code by default", function() {
        let resultStatusCode = null;

        const resSpy = responseBuilder({ writeHead: (statusCode) => resultStatusCode = statusCode });
        const reqStub = requestBuilder();

        const sut = sutBuilder();
        sut.handle(reqStub, resSpy);

        assert.equal(resultStatusCode, 404);
    });

    it("returns expected status code from config", function() {
        let resultStatusCode = null;
        const expectedStatusCode = 200;

        const resSpy = responseBuilder({ writeHead: (statusCode) => resultStatusCode = statusCode });
        const reqStub = requestBuilder({ method: "get", url: "foo" });

        const sut = sutBuilder({
            routes: {
                foo: {
                    get: {
                        statusCode: expectedStatusCode
                    }
                }
            }
        });

        sut.handle(reqStub, resSpy);

        assert.equal(resultStatusCode, expectedStatusCode);
    });

    it("returns expected body from config", function() {
        let result = null;
        const expected = "foo";

        const resSpy = responseBuilder({ write: (data) => result = data });
        const reqStub = requestBuilder({ method: "get", url: "foo" });

        const dummyStatusCode = 200;

        const sut = sutBuilder({
            routes: {
                foo: {
                    get: {
                        body: expected,
                        statusCode: dummyStatusCode
                    }
                }
            }
        });

        sut.handle(reqStub, resSpy);

        assert.equal(result, JSON.stringify(expected));
    });

    it("is case insensitive with regards to route verbs/method found in config", function() {
        let actualBody = null;
        const expected = "foo body";

        const resSpy = responseBuilder({ write: (data) => actualBody = data });
        const reqStub = requestBuilder({ method: "GET", url: "foo" });

        const dummyStatusCode = 200;

        const sut = sutBuilder({
            routes: {
                foo: {
                    get: {
                        body: expected,
                        statusCode: dummyStatusCode
                    }
                }
            }
        });

        sut.handle(reqStub, resSpy);

        assert.equal(actualBody, JSON.stringify(expected));
    });

    it("adds x-powered-by header to response when no headers are predefined", function() {
        let actualHeaders = {};
        
        const resSpy = responseBuilder({ writeHead: (statusCode, headers) => actualHeaders = headers });
        const reqStub = requestBuilder({ method: "get", url: "foo" });

        const dummyBody = "dummy";
        const dummyStatusCode = 200;

        const sut = sutBuilder({
            routes: {
                foo: {
                    get: {
                        body: dummyBody,
                        statusCode: dummyStatusCode
                    }
                }
            }
        });

        sut.handle(reqStub, resSpy);

        assert.equal(
            JSON.stringify(actualHeaders), 
            JSON.stringify({ "X-Powered-By": "canjson" })
        );
    });

    it("adds expected headers from config to response", function() {
        let actualHeaders = {};
        
        const resSpy = responseBuilder({ writeHead: (statusCode, headers) => actualHeaders = headers });
        const reqStub = requestBuilder({ method: "get", url: "foo" });

        const dummyBody = "dummy";
        const dummyStatusCode = 200;

        const expectedHeaders = { 
            "foo-header": "foo-value",
            "bar-header": "bar-value",
        };

        const sut = sutBuilder({
            routes: {
                foo: {
                    get: {
                        headers: expectedHeaders,
                        body: dummyBody,
                        statusCode: dummyStatusCode
                    }
                }
            }
        });

        sut.handle(reqStub, resSpy);

        assert.equal(
            JSON.stringify(actualHeaders), 
            JSON.stringify({...sut.defaultHeaders, ...expectedHeaders})
        );
    });


});

const sutBuilder = config => {
    const defaults = {
        routes: { }
    };

    const finalConfig = {...defaults, ...config };
    return new Engine(finalConfig);
}

const responseBuilder = overrides => {
    const defaults = {
        writeHead: () => {},
        write: () => {},
        end: () => {}
    };
    return {...defaults, ...overrides};
}

const requestBuilder = overrides => {
    const defaults = {
        method: "GET",
        url: "/foo"
    };
    return {...defaults, ...overrides};
};