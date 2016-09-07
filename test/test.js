// Setup
var palette = new CommandPalette({
    hidden: false,
    floating: false
});

palette.on("Test", function(){
    console.log("Test");
});

// Tests
var assert = chai.assert;

describe("CommandPalette", function(){

    it("should have the on() method", function(){
        assert.equal("function", typeof palette.on);
    });

    it("should have the onAll() method", function(){
        assert.equal("function", typeof palette.onAll);
    });

    it("should have the config() method", function(){
        assert.equal("function", typeof palette.config);
    });

    it("should have the 'properties' attribute", function(){
        assert.equal("object", typeof palette.properties);
    });

    describe(".properties", function(){

        it("should have the 'id' attribute", function(){
            assert.equal(true, !!(palette.properties && palette.properties.id));
        });

        it("should have the 'hotkey' attribute", function(){
            assert.equal(true, !!(palette.properties && palette.properties.hotkey));
        });

        it("should have the 'hidden' attribute", function(){
            assert.equal(true, !!(palette.properties && typeof palette.properties.hidden !== 'undefined'));
        });

    });

    describe(".results", function(){

        describe(".splitNameByQuery()", function(){

            it("should properly identify a single match result and a single unmatched result", function(){
                var results = palette.results.splitNameByQuery("foo bar", "bar");

                assert.equal(2, results.length, "Expected to have exactly 2 results");
                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal("foo ", results[0].value);
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal("bar", results[1].value);
            });

            it("should properly match two non-adjacent unmatched results and one match result", function(){
                var results = palette.results.splitNameByQuery("foo bar foo", "foo");

                assert.equal(3, results.length, "Expected to have exactly 3 results");
                assert.equal(true, results[0].isMatch, "Expected the first result to be a match");
                assert.equal("foo", results[0].value);
                assert.equal(false, results[1].isMatch, "Expected the second result to not be a match");
                assert.equal(" bar ", results[1].value);
                assert.equal(true, results[2].isMatch, "Expected the third result to be a match");
                assert.equal("foo", results[2].value);
            });

            it("should properly match 3 adjacent match results seperately", function(){
                var results = palette.results.splitNameByQuery("foo foo foo", "foo");

                assert.equal(5, results.length, "Expected to have exactly 5 results");
                assert.equal(true, results[0].isMatch, "Expected the first result to be a match");
                assert.equal(true, results[2].isMatch, "Expected the third result to be a match");
                assert.equal(true, results[4].isMatch, "Expected the fifth result to be a match");

                assert.equal("foo", results[0].value);
                assert.equal("foo", results[2].value);
                assert.equal("foo", results[4].value);
                assert.equal(" ", results[1].value);
                assert.equal(" ", results[3].value);
            });

        });

    });
});
