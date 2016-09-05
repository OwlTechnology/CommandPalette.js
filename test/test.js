describe("CommandPalette", function(){

    it("should have the on() method", function(){
        expect("function", typeof palette.on);
    });

    it("should have the onAll() method", function(){
        expect("function", typeof palette.onAll);
    });

    it("should have the config() method", function(){
        expect("function", typeof palette.config);
    });

    it("should have the 'properties' attribute", function(){
        expect("object", typeof palette.properties);
    });

    describe(".properties", function(){

        it("should have the 'id' attribute", function(){
            expect(true, palette.properties && palette.properties.id);
        });

        it("should have the 'hotkey' attribute", function(){
            expect(true, palette.properties && palette.properties.hotkey);
        });

        it("should have the 'hidden' attribute", function(){
            expect(true, palette.properties && palette.properties.hidden);
        });

    });
});
