var CommandTree = function(){
    this.node = new CommandTreeNode();
};

CommandTree.prototype.addCommand = function(command){
    this.node.addCommand(command);
};

CommandTree.prototype.search = function(depth, value){
    return this.node.search(depth, value);
}
