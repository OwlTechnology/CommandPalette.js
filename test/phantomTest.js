var colors, address, page = require("webpage").create(),
    system = require("system");

try{
    colors = require("colors");
}catch(e){
    console.log(e);
}


const unicode = {
    ERROR: "\u2717",
    CHECK: "\u2713"
};

if (system.args.length === 1) {
    console.log('Usage: phantomTest.js <some URL>');

    phantom.exit(-1);
}

address = system.args[1];

page.open(address, function(status){
    console.log("Opened: " + address);
});

page.onConsoleMessage = function(msg){
    if(msg === "finished"){
        var x, result, successes = 0, total = 0,
            results = page.evaluate(function(){
                return window.__testResults[0];
            });

        for(x = 0; x < results.length; x++){
            result = results[x];

            if(result.passed){
                console.log(unicode.CHECK.green + " " + result.name);
                successes += 1;
            }else{
                console.log("\n" + unicode.ERROR.red + " " + result.name + "\n");
                console.log("\t" + result.message + "\n\n");
            }

            total += 1;
        }

        console.log("\n\nFinished headless testing.");

        console.log("(" + successes + "/" + total + "): " + successes + " tests succeeded out of " + total + " tests run.\n");

        phantom.exit((total - successes));
    }
};
