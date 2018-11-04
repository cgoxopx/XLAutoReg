//UNLICENSE 2018 : cgoxopx<cgoxopx@qq.com>
//main.js
(function(){

function autoReg(url , tm){
    var self={
        "url"        : url ,
        "arg"        : [] , 
        "times"     : 999999999 ,
        "ifr"        : null ,
        "running"   : false
    };
    
    var counter=0;
    
    self.reload=function(){
        self.ifr.contentWindow.location.reload();
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
        
        self.ifr.src=self.url;
        
        document.body.appendChild(document.createElement('br'));
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
        }catch(e){
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
        }catch(e){
            
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
        }catch(e){
            
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
        }catch(e){
        
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
        }catch(e){
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
    var urlbox=null;
    
    function makeBegining(){
        var button=document.createElement('input');
        button.type='submit';
        button.onclick=makeConfig;
        button.value='xlautoreg';
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(button);
    }
    
    function makeConfig(){
        if(div)
            return;
        div=document.createElement('div');
        document.body.appendChild(div);
        
        urlbox=document.createElement('input');
        urlbox.placeholder='url';
        urlbox.type='text';
        document.body.appendChild(document.createElement('hr'));
        document.body.appendChild(urlbox);
        document.body.appendChild(document.createElement('br'));
        
        var button1=document.createElement('input');
        button1.type='submit';
        button1.onclick=startProcess;
        button1.value='start';
        document.body.appendChild(button1);
        
        var button3=document.createElement('input');
        button3.type='submit';
        button3.onclick=addArgs;
        button3.value='add';
        document.body.appendChild(button3);
    }
    
    function addArgs(){
        var input=document.createElement('input');
        input.type='text';
        div.appendChild(input);
        div.appendChild(document.createElement('br'));
        inputs.push(input);
    }
    
    function startProcess(){
        var attacking=urlbox.value;
        var showing=document.createElement('div');
        showing.innerText="attacking:"+attacking;
        document.body.appendChild(showing);
        var core=autoReg(attacking , 1000);
        for(var i in inputs){
            core.arg.push(inputs[i].value);
        }
        core.start();
    }
    
    makeBegining();//create a botton in the end of the page
}

setTimeout(makeUI,2000);

})();
