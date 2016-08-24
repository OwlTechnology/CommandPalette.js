var fs = require("fs");
var assert = require("assert");

// Load test code
eval(fs.readFileSync("./dist/debug/CommandPalette.js") + '');

describe("CommandPalette", function(){

    it("should have the on() method", function(){
        var palette = new CommandPalette();

        assert.equal("function", typeof palette.on);
    });
    
});
