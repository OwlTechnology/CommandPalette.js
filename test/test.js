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

        describe(".buildResultDOM()", function(){

            it("should build one span that contains the whole command name for no query matches, if the command is a single word", function(){
                var firstChild, command = new Command("baz", null);
                var newElement = palette.results.buildResultDOM(command, "bar");

                assert.equal(1, newElement.childElementCount, "Expected there to be 1 child element");

                firstChild = newElement.childNodes[0];

                assert.equal("SPAN", firstChild.nodeName, "Expected the only child to be a span");
                assert.equal("baz", firstChild.innerHTML, "Expected the only child to have the full command name");
                assert.equal("part", firstChild.className, "Expected the only child to have the 'part' class, but not the 'match' class");
            });

            it("should build one span that contains the whole command name for a full query match, if the command is a single word", function(){
                var firstChild, command = new Command("foo", null);
                var newElement = palette.results.buildResultDOM(command, "foo");

                assert.equal(1, newElement.childElementCount, "Expected there to be 1 child element");

                firstChild = newElement.childNodes[0];

                assert.equal("SPAN", firstChild.nodeName, "Expected the only child to be a span");
                assert.equal("foo", firstChild.innerHTML, "Expected the only child to have the full command name");
                assert.equal("part match", firstChild.className, "Expected the only child to have the 'part' and the 'match' classes");
            });

        });

        describe(".splitNameByQuery()", function(){

            it("should properly identify no matches", function(){
                var results = palette.results.splitNameByQuery("foo bar", "baz");

                assert.equal(1, results.length, "Expected to have exactly 1 result");
                assert.equal(false, results[0].isMatch, "Expected the first (and only) result to not be a match");
                assert.equal("foo bar", results[0].value);
            });

            it("should properly identify one match", function(){
                var results = palette.results.splitNameByQuery("foo", "foo");

                assert.equal(1, results.length, "Expected to have exactly one result");
                assert.equal(true, results[0].isMatch, "Expected the first (and only) result to be a match");
                assert.equal("foo", results[0].value);
            });

            it("should properly identify a single match result and a single unmatched result", function(){
                var results = palette.results.splitNameByQuery("foo bar", "bar");

                assert.equal(2, results.length, "Expected to have exactly 2 results");
                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal("foo ", results[0].value);
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal("bar", results[1].value);
            });

            it("should properly match two non-adjacent matched results and one unmatch result", function(){
                var results = palette.results.splitNameByQuery("foo bar foo", "foo");

                assert.equal(3, results.length, "Expected to have exactly 3 results");
                assert.equal(true, results[0].isMatch, "Expected the first result to be a match");
                assert.equal("foo", results[0].value);
                assert.equal(false, results[1].isMatch, "Expected the second result to not be a match");
                assert.equal(" bar ", results[1].value);
                assert.equal(true, results[2].isMatch, "Expected the third result to be a match");
                assert.equal("foo", results[2].value);
            });

            it("should properly match two non-adjacent unmatched results and one matched result", function(){
                var results = palette.results.splitNameByQuery("foo bar foo", "bar");

                assert.equal(3, results.length, "Expected to have exactly 3 results");
                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal(false, results[2].isMatch, "Expected the third result to not be a match");

                assert.equal("foo ", results[0].value);
                assert.equal("bar", results[1].value);
                assert.equal(" foo", results[2].value);
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

            it("should match against portions of words", function(){
                var results = palette.results.splitNameByQuery("foo bar", "ba");

                assert.equal(3, results.length, "Expected to have exactly 3 results");
                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal(false, results[2].isMatch, "Expected the third result to not be a match");

                assert.equal("foo ", results[0].value);
                assert.equal("ba", results[1].value);
                assert.equal("r", results[2].value);
            });

            it("should match against portions of multiple different words", function(){
                var results = palette.results.splitNameByQuery("foo bar baz", "ba");

                assert.equal(5, results.length, "Expected to have exactly 5 results");
                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal(false, results[2].isMatch, "Expected the third result to not be a match");
                assert.equal(true, results[3].isMatch, "Expected the fourth result to be a match");
                assert.equal(false, results[4].isMatch, "Expected the fifth result to not be a match");

                assert.equal("foo ", results[0].value);
                assert.equal("ba", results[1].value);
                assert.equal("r ", results[2].value);
                assert.equal("ba", results[3].value);
                assert.equal("z", results[4].value);
            });

            it("should match only once against a word, to match how search() works", function(){
                var results = palette.results.splitNameByQuery("barbaz", "ba");

                assert.equal(2, results.length, "Expected to have exactly 2 results");
                assert.equal(true, results[0].isMatch, "Expected the first result to be a match");
                assert.equal(false, results[1].isMatch, "Expected the second result to not be a match");

                assert.equal("ba", results[0].value);
                assert.equal("rbaz", results[1].value);
            });

        });

    });
});
