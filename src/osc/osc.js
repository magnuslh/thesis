const osc =require("osc/dist/osc-browser");

try {
    var oscPort = new osc.WebSocketPort({
        url: "ws://localhost:9001", // URL to your Web Socket server.
        metadata: true
    });
    oscPort.open();

    
    oscPort.on("message", function (oscMsg) {
        console.log("An OSC message just arrived!", oscMsg);
    });
}
catch(err){
    console.log(err.message)
}



