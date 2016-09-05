var CommandTree = function(){
    this.commands = [];
};

CommandTree.prototype.addCommand = function(command){
    var x, s, currName, currSequence, splitName, name = command.name;

    splitName = name.split(/[: ]/);

    for(s = 0; s < splitName.length; s++){
        currName = splitName[s];

        for(x = 0; x < currName.length; x++){
            currSequence = currName.substring(0, (x + 1)).toLowerCase();

            if(!this.commands[x]){
                this.commands[x] = {};
            }

            if(!(this.commands[x])[currSequence]){
                (this.commands[x])[currSequence] = [];
            }

            (this.commands[x])[currSequence].push(command);
        }
    }
};

CommandTree.prototype.search = function(depth, value){
    if(!value){
        
    }else{

    }
};
