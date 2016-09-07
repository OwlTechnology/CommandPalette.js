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
            assert.equal(true, palette.properties && palette.properties.id);
        });

        it("should have the 'hotkey' attribute", function(){
            assert.equal(true, palette.properties && palette.properties.hotkey);
        });

        it("should have the 'hidden' attribute", function(){
            assert.equal(true, palette.properties && palette.properties.hidden);
        });

    });

    describe(".results", function(){

        describe(".splitNameByQuery()", function(){

            it("should return the correct array when given the set inputs", function(){
                var results = palette.results.splitNameByQuery("foo bar", "bar");

                assert.equal(false, results[0].isMatch, "Expected the first result to not be a match");
                assert.equal("foo ", results[0].value);
                assert.equal(true, results[1].isMatch, "Expected the second result to be a match");
                assert.equal("bar", results[1].value);
            });

        });

    });
});
