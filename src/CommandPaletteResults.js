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
    var targetHeight, previousHeight = this.resultsContainer.offsetHeight;

    this.resultsContainer.innerHTML = "";

    targetHeight = this.resultsContainer.offsetHeight;

    if(typeof interpolate === 'undefined' || interpolate){
        this.interpolate(previousHeight, targetHeight);
    }
};

CommandPaletteResultsController.prototype.buildResultDOM = function(command, query){
    var newElement = document.createElement("li");
    var splitName = this.splitNameByQuery(command.name, query);
    var output = "";

    for(var x = 0; x < splitName.length; x++){
        var currSection = splitName[x];
        var className = "part";

        if(currSection.isMatch){
            className += " match";
        }

        output += "<span class='" + className + "'>" + currSection.value + "</span>";
    }

    newElement.innerHTML = output;

    return newElement;
};

CommandPaletteResultsController.prototype.splitNameByQuery = function(name, query){
    var output = [], possibleMatch = "", currString = "", currChar, matching = 0, x;

    for(x = 0; x < name.length; x++){
        currChar = name[x];

        if(currChar === query[matching]){
            matching += 1;

            possibleMatch += currChar;
        }else if(matching > 0){
            matching = 0;

            currString += possibleMatch;
            possibleMatch = "";
        }

        if(matching < 1)
            currString += currChar;

        if(matching >= query.length){

            if(currString != ""){
                output.push({
                    isMatch: false,
                    value: currString
                });
            }

            output.push({
                isMatch: true,
                value: possibleMatch
            });

            currString = "";
            possibleMatch = "";
            matching = 0;
        }

        if(x == name.length - 1 && currString !== ''){
            output.push({
                isMatch: matching == currString.length && matching != 0,
                value: currString
            });
        }
    }

    return output;
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

CommandPaletteResultsController.prototype.setResults = function(results, query){
    var targetHeight,
        self = this, previousHeight = this.resultsContainer.offsetHeight;
    this.results = results;

    this.clearResults(false);

    for(var r = 0; r < this.results.length; r++){
        var curr = this.results[r];
        var element = this.buildResultDOM(curr, query);

        element.className = "result command";

        this.resultsContainer.appendChild(element);
    }

    targetHeight = this.resultsContainer.offsetHeight;

    //this.interpolate(previousHeight, targetHeight);
};
