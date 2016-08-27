var fs = require("fs");
var assert = require("assert");

// Load test code
var window = {};
eval(fs.readFileSync("./dist/debug/CommandPalette.js") + '');
var CommandPalette = window.CommandPalette;

describe("CommandPalette", function(){

    it("should have the on() method", function(){
        var palette = new CommandPalette();

        assert.equal("function", typeof palette.on);
    });

    it("should have the onAll() method", function(){
        var palette = new CommandPalette();

        assert.equal("function", typeof palette.onAll);
    });

    it("should have the config() method", function(){
        var palette = new CommandPalette();

        assert.equal("function", typeof palette.config);
    });

    it("should have the 'properties' property", function(){
        var palette = new CommandPalette();

        assert.equal("object", typeof palette.properties);
    });

    describe(".properties", function(){

        it("should have the 'id' attribute", function(){
            var palette = new CommandPalette();

            assert.equal(true, palette.properties && palette.properties.id);
        });

        it("should have the 'hotkey' attribute", function(){
            var palette = new CommandPalette();

            assert.equal(true, palette.properties && palette.properties.hotkey);
        });

        it("should have the 'hidden' attribute", function(){
            var palette = new CommandPalette();

            assert.equal(true, palette.properties && palette.properties.hidden);
        });

    });

});
