(function(context){
    var CommandPaletteResultsControllerProto = function(parent){
        this.commandPalette = parent;

        this.resultsContainer = document.createElement("ul");
        this.resultsContainer.className = "results";

        this.commandPalette.element.appendChild(this.resultsContainer);
    };

    this.CommandPaletteResultsController = CommandPaletteResultsControllerProto;
})(this);
