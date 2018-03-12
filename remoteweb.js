
module['exports'] = function remoteWeb(hook) {

    // impor modul request
    var request = require('request');

  
    // function
    // start
    function Start(msg){
        if(msg.includes('start') || msg.includes('Start')){
            return true;
        }else{
            return false;
        }
    }

    function getUsername(){
        if(hook.params.message.chat.first_name==null){
            return '@'+hook.params.message.from.username;
        }else{
            return '@'+hook.params.message.chat.username;
        }
    }


    // Abas Commander
    function AbasVerify(){
        var abas = {
            name : '',
            state : false
        };
        if(hook.params.message.chat.first_name == null){
            abas.name = hook.params.message.from.first_name;
            abas.state = true;
        }else{
            abas.name = hook.params.message.chat.first_name;
            abas.state = true;
        } 
        // verif is that me?
        if(abas.name == 'Abas_'){
            return abas;
        }else{
            return abas.state;
        }
    }

    //=======================================================================

    // reply msg
    var msg = hook.params.message.text.toLowerCase();
    var rep = '';   

    //logically reply

   
    // start counter
    function tesCounter(){
        request
        .get('http://localhost:8000/tescounter')
        .post('https://api.telegram.org/bot'+hook.env.remoteweb+'/sendMessage')
        .form({
            'chat_id' : hook.params.message.chat.id,
            'text'    : rep
        })
    }


    function PublicReply(){
        request.post('https://api.telegram.org/bot' + hook.env.axavibot + '/sendMessage')
        .form(
            {
                'chat_id': hook.params.message.chat.id,
                'reply_to_message_id': hook.params.message.message_id,
                'text': rep,
            }
        );
    }

    function PrivateReply(){
        request.post('https://api.telegram.org/bot' + hook.env.axavibot + '/sendMessage?')
        .form(
            {
                'chat_id': hook.params.message.chat.id,
                'text': rep,
            }
        );
    }
    
    function AbasForwarder(){
        request.post('https://api.telegram.org/bot' + hook.env.axavibot + '/sendMessage')
        .form(
            {
                'chat_id': 140760747,
                'text': '[info]\n'+getUsername()+' : '+hook.params.message.chat.id+' \n\n[msg]\n'+msg
            }
        ); 
    }
    
    // send messages
    // cek is thats me?
    // if(getUsername()==='@ahmadbasir'){
    //     PrivateReply();
    // }
    // // cek is not me and chat is private chat
    // else if(hook.params.message.chat.type=='private'){
    //     PrivateReply();
    //     AbasForwarder(); 
    // }
    // // global chat like grup
    // else{
    //     PublicReply();  
    //     AbasForwarder();
    // }

    // service running
    if(Start(msg)){
        rep = 'service running...'
        tesCounter()
    }

}