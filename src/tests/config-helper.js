const mocha = require("mocha");
const assert = require("assert");

const ConfigHelper = require("./../config-helper");

describe("config helper", function () {

    it("returns expected when NO routes has been configured", function() {
        const sut = sutBuilder();
        const result = sut.getResponseFor("foo", "bar");

        assert.equal(result, null);
    });

    it("returns expected route", function() {
        const expected = "foo-bar";
        
        const sut = sutBuilder({
            routes: {
                foo: {
                    bar: expected
                }
            }
        });

        const result = sut.getResponseFor("foo", "bar");

        assert.equal(result, expected);
    });

    it("route urls are case insensitive", function() {
        const expected = "foo-bar";
        
        const sut = sutBuilder({
            routes: {
                foo: {
                    bar: expected
                }
            }
        });

        const result = sut.getResponseFor("FOO", "bar");

        assert.equal(result, expected);
    });

    it("route methods are case insensitive", function() {
        const expected = "foo-bar";
        
        const sut = sutBuilder({
            routes: {
                foo: {
                    bar: expected
                }
            }
        });

        const result = sut.getResponseFor("foo", "BAR");

        assert.equal(result, expected);
    });

    it("urls prefixed with a slash is not a problem", function() {
        const expected = "foo-bar";
        
        const sut = sutBuilder({
            routes: {
                foo: {
                    bar: expected
                }
            }
        });

        const result = sut.getResponseFor("/foo", "bar");

        assert.equal(result, expected);
    });

    it("urls with trailing slash is not a problem", function() {
        const expected = "foo-bar";
        
        const sut = sutBuilder({
            routes: {
                foo: {
                    bar: expected
                }
            }
        });

        const result = sut.getResponseFor("foo/", "bar");

        assert.equal(result, expected);
    });

});

const sutBuilder = overrides => {
    const defaults = {
        routes: {}
    };

    return new ConfigHelper({...defaults, ...overrides});
};