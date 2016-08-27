var CommandTreeNode = function(){
    this.commands = {};
    this.order = {};
};

CommandTreeNode.prototype.reindex = function(){
    var newOrder = {};

    for(var firstLetter in this.commands){
        var charNum = firstLetter.charCodeAt(0);

        newOrder[charNum] = firstLetter;
    }

    this.order = newOrder;
};

CommandTreeNode.prototype.addCommand = function(command){
    var firstLetter = command.name[0];

    if(!this.commands[firstLetter]){
        this.commands[firstLetter] = [];
    }

    this.commands[firstLetter].push(command);
    this.reindex();
};

CommandTreeNode.prototype.search = function(depth, value){
    var output = [];

    if(!value){
        var depthCounter = 0;

        for(var currFirstCharacter in this.order){
            var target = this.commands[this.order[currFirstCharacter]];

            for(var x = 0; x < target.length; x++){
                var currCommand = target[x];



                output.push(currCommand);
                depthCounter += 1;

                if(depthCounter > depth) break;
            }

            if(depthCounter > depth) break;
        }
    }else{
        // TODO: implement this
    }

    return output;
};
