function createChatServe(url,OnMesBackFuc,OnOpBackFuc,OnErrBackFuc,OnCloseBackFuc){
    var webSocket = new WebSocket(url);

    CHAT.socket.onopen = function(){
        console.log("客户端与服务端建立连接成功");
        if(OnOpBackFuc) OnOpBackFuc();
    },
    CHAT.socket.onmessage = function(e){
        var res = JSON.parse(e.data);
        
        if(OnMesBackFuc) OnMesBackFuc(res);
    },
    CHAT.socket.onerror = function(){
        console.log("发生错误");
        if(OnErrBackFuc) OnErrBackFuc(res);
    },
    CHAT.socket.onclose = function(){
        console.log("客户端与服务端关闭连接成功");
        if(OnCloseBackFuc) OnCloseBackFuc(res);
    }	

    return webSocket;					
}



export{
    createChatServe
}