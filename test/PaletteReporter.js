function PaletteReporter(runner){
    var self = this;

    this.passes = 0;
    this.failures = 0;
    this.total = 0;
    this.results = [];

    runner.on("pass", function(test){
        self.passes += 1;
        self.total += 1;

        self.results.push(new PaletteReporterResults(true, test.fullTitle(), ""));
    });

    runner.on("fail", function(test, err){
        self.failures += 1;
        self.total += 1;

        self.results.push(new PaletteReporterResults(false, test.fullTitle(), err.message));
    });

    runner.on("end", function(){
        self.finish();
    });

};

PaletteReporter.prototype.finish = function(){
    if(!window.__testResults){
        window.__testResults = [];
    }

    window.__testResults.push(this.results);
    console.log("finished");
};

function PaletteReporterResults(hasPassed, name, message){
    this.passed = hasPassed;
    this.name = name;
    this.message = message;
};
