function autoReg(url , tm){
    var self={
        "url"        : url ,
        "arg"        : [] , 
        "times"     : 999999999 ,
        "ifr"        : null
    };
    
    var counter=0;
    
    self.reload=function(){
        self.ifr.location.reload();
    }
    
    self.submiting=function(){
        if(self.checkPage()){
            if(self.submitPage()){
                return;
            }
        }
        if(counter>=self.times)
            return;
        ++counter;
        setTimeout(self.active , tm);
    }
    
    self.start=function(){
        self.ifr=document.createElement('iframe');
        self.ifr.onload=self.submiting;
        self.ifr.src=url;
        document.body.appendChild(self.ifr);
    }
    
    self.getElements=function(tagname){
        return self.ifr.contentWindow.document.getElementsByTagName(tagname);
    }
    
    self.haveTextInput=function(){
        var inputs=self.getElements("input");
        try{
            for(var i in inputs){
                if(inputs[i].type=='text' || inputs[i].type=='number' || inputs[i].type=='password')
                    return true;
            }
        }catche(e){
            return false;
        }
        return false;
    }
    
    self.checkPage=function(){
        if(self.haveTextInput())
            return true;
    }
    
    self.setInput=function(){
        var inputs=self.getElements("input");
        try{
            var j=0;
            for(var i in inputs){
                if(inputs[i].type=='text' || inputs[i].type=='number' || inputs[i].type=='password'){
                    try{
                        if(self.arg[j]){
                            inputs[i].value=self.arg[j];
                            ++j;
                        }else
                            inputs[i].value='123456';
                    }catch(e){
                        inputs[i].value='123456';
                    }
                }
            }
        }catche(e){
            
        }
    }
    
    self.tryAllInputToSubmit=function(){
        var inputs=self.getElements("input");
        try{
            for(var i in inputs){
                if(inputs[i].type=='submit' || inputs[i].type=='button'){
                    inputs[i].click();
                    return true;
                }
            }
        }catche(e){
            
        }
        return false;
    }
    
    self.tryAllButton=function(){
        var inputs=self.getElements("button");
        try{
            if(inputs[0]){
                inputs[0].click();
                return true;
            }
        }catche(e){
        
        }
        return false;
    }
    
    self.tryAllForm=function(){
        var inputs=self.getElements("form");
        try{
            if(inputs[0]){
                inputs[0].submit();
                return true;
            }
        }catche(e){
        }
        return false;
    }
    
    self.submitPage=function(){
        if(self.tryAllInputToSubmit() || self.tryAllButton() || self.tryAllForm())
            return true;
        else
            return false;
    }
    
    self.active=function(){
        self.reload();
    }
    
    return self;
}
