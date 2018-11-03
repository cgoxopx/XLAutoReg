(function(){

function autoReg(url , tm){
    var self={
        "url"        : url ,
        "arg"        : [] , 
        "times"     : 999999999 ,
        "ifr"        : null ,
        "running"   : false;
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
        if(!self.running)
            return;
        if(counter>=self.times)
            return;
        ++counter;
        setTimeout(self.active , tm);
    }
    
    self.start=function(){
        self.running=true;
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
        return self.haveTextInput();
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

function makeUI(){
    var div=null;
    var inputs=[];
    
    function makeBegining(){
        var button=document.createElement('button');
        button.onclick=makeConfig;
        button.innerHtml='xlautoreg';
        document.body.appendChild(button);
    }
    
    function makeConfig(){
        if(div)
            return;
        div=document.createElement('div');
        document.body.appendChild(div);
        
        var button1=document.createElement('button');
        button1.onclick=startProcess;
        button1.innerHtml='start';
        document.body.appendChild(button1);
        
        //the function have been canceled
        //you can reload the page to stop
        //in addition,you can create multiple processes to register by click start
        
        //var button2=document.createElement('button');
        //button2.onclick=stopProcess;
        //button2.innerHtml='stop';
        //document.body.appendChild(button2);
        
        var button3=document.createElement('button');
        button3.onclick=addArgs;
        button3.innerHtml='add';
        document.body.appendChild(button3);
    }
    
    function addArgs(){
        var input=document.createElement('input');
        input.type='text';
        div.appendChild(input);
        inputs.push(input);
    }
    
    function startProcess(){
        var core=autoReg(window.location.href , 1000);
        for(var i in inputs){
            core.arg.push(inputs[i].value);
        }
        core.start();
    }
}

makeUI();

})();