class ListMessages{

    listMessages;

    constructor()
    {
        this.listMessages  =  new Array();

    }

    addMessageTolist(Message) {
        return this.listMessages.push(Message);
    }

    toCodeArray(){
        var res = '['
        for(var i= 0; i< this.listMessages.length; i++){
            var msg = this.listMessages[i];
            res+=`new Message(${msg.tz},${msg.uniq},${msg.semester},${msg.group},${msg.subject})`
            if(i!=this.listMessages.length-1){
                res+=','
            }
        }
        res+=']';
        return res;
    }
}