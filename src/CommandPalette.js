var CommandPalette = function(config){
    config = config || {};

    this.properties = {
        id: config.id || "CommandPalette",
        hotkey: config.hotkey || "[cmd-shift-p]",
        hidden: typeof config.hidden === "undefined" ? true : config.hidden,
        floating: typeof config.floating === "undefined" ? true : config.floating,
        commandsToShow: 10
    };
    this.elements = {};
    this.commands = new CommandTree();
    this.ready = false;

    this.init();
};

CommandPalette.prototype.on = function(name, action){
    var newCommand = new Command(name, action);

    this.commands.addCommand(newCommand);
};

CommandPalette.prototype.init = function(){
    this.findElement();
    this.buildDOM();

    this.ready = true;
};

CommandPalette.prototype.search = function(depth, value){
    
};

CommandPalette.prototype.findElement = function(){
    var _element = document.getElementById(this.properties.id);

    if(_element){
        this.element = _element;

        return true;
    }else{
        console.warn("Could not find element with the ID '" + this.properties.id + "'");

        return false;
    }
};

CommandPalette.prototype.buildDOM = function(){
    this.elements.input = this.constructChild("input");
    this.elements.input.type = "text";

    this.results = new CommandPaletteResultsController(this);

    this.setClasses();
};

CommandPalette.prototype.setClasses = function(){
    this.element.className = "command-palette " + (this.properties.floating ? "floating" : "grounded");
    this.elements.input.className = "command-line";
};

CommandPalette.prototype.constructChild = function(type){
    var child = document.createElement(type);

    this.element.appendChild(child);

    return child;
};
