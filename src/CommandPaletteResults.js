var CommandPaletteResultsController = function(parent){
    var self = this;

    this.commandPalette = parent;
    this.results = [];

    this.resultsContainer = document.createElement("ul");
    this.resultsContainer.className = "results";

    this.resultsContainer.addEventListener("transitionend", function(e){ self.animationEnd(e); });

    this.commandPalette.element.appendChild(this.resultsContainer);
};

CommandPaletteResultsController.prototype.clearResults = function(interpolate){
    var previousHeight = this.resultsContainer.offsetHeight;

    this.resultsContainer.innerHTML = "";

    var targetHeight = this.resultsContainer.offsetHeight;

    if(typeof interpolate === 'undefined' || interpolate){
        this.interpolate(previousHeight, targetHeight);
    }
};

CommandPaletteResultsController.prototype.buildResultDOM = function(command){
    var newElement = document.createElement("li");

    newElement.innerHTML = command.name;

    return newElement;
};

CommandPaletteResultsController.prototype.interpolate = function(start, end){
    var self = this;

    this.resultsContainer.style.height = start + "px";
    this.resultsContainer.style.transition = "height 200ms ease-out";

    requestAnimationFrame(function(){
        self.resultsContainer.style.height = end + "px";
    });
};

CommandPaletteResultsController.prototype.animationEnd = function(e){
    this.resultsContainer.style.height = "";
    this.resultsContainer.style.transition = "";
};

CommandPaletteResultsController.prototype.setResults = function(results){
    var self = this;
    var previousHeight = this.resultsContainer.offsetHeight;
    this.results = results;

    this.clearResults(false);

    for(var r = 0; r < this.results.length; r++){
        var curr = this.results[r];
        var element = this.buildResultDOM(curr);

        element.className = "result command";

        this.resultsContainer.appendChild(element);
    }

    var targetHeight = this.resultsContainer.offsetHeight;

    this.interpolate(previousHeight, targetHeight);
};
