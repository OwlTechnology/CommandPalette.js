var CommandPaletteResultsController = function(parent){
    this.commandPalette = parent;

    this.resultsContainer = document.createElement("ul");
    this.resultsContainer.className = "results";

    this.commandPalette.element.appendChild(this.resultsContainer);
};
