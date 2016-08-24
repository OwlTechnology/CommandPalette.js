var fs = require("fs");
var assert = require("assert");

// Load test code
eval(fs.readFileSync("./dist/debug/CommandPalette.js") + '');

describe("CommandPalette", function(){
    describe("test", function(){
        it("should have the 'test' property set to a test string", function(){
            var palette = new CommandPalette();

            assert.equal("test testing", palette.test);
        });
    });
});
