(function(context){
    var CommandPaletteProto = function(config){
        config = config || {};

        this.properties = {
            id: config.id || "CommandPalette",
            hotkey: config.hotkey || "[cmd-shift-p]",
            hidden: typeof config.hidden === "undefined" ? true : config.hidden
        };
        var _element = document.getElementById(this.properties.id);

        if(_element){
            this.element = _element;
        }else{
            console.warn("Could not find element with the ID '" + this.properties.id + "'");
        }


    };

    context.CommandPalette = CommandPaletteProto;
})(this);
