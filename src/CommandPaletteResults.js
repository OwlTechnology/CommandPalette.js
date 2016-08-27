var CommandPaletteResultsController = function(parent){
    this.commandPalette = parent;
    this.results = [];

    this.resultsContainer = document.createElement("ul");
    this.resultsContainer.className = "results";

    this.commandPalette.element.appendChild(this.resultsContainer);
};

CommandPaletteResultsController.prototype.clearResults = function(){
    this.resultsContainer.innerHTML = "";
};

CommandPaletteResultsController.prototype.buildResultDOM = function(command){
    var newElement = document.createElement("li");

    newElement.innerHTML = command.name;

    return newElement;
};

CommandPaletteResultsController.prototype.setResults = function(results){
    this.results = results;

    this.clearResults();

    for(var r = 0; r < this.results.length; r++){
        var curr = this.results[r];
        var element = this.buildResultDOM(curr);

        element.className = "result command";

        this.resultsContainer.appendChild(element);
    }
};
