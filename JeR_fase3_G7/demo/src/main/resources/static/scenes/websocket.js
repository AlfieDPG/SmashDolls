import { return_IP } from "./mainMenu.js";

export const connection = new WebSocket('ws://' + return_IP() + '/chat');

connection.onerror = function(e) {
    console.log("WS error: " + e);
};

connection.onclose = function() {
    console.log("Closing socket");
};

connection.onmessage = (msg) => {
    console.log("WS message: " + msg.data);
    var message = JSON.parse(msg.data);
    var type = message.type;

    
    if (type === "playerId") {
        console.log("Id request successful. My ID = " + message.id);
        window.assignedPlayer = message.id;  //  assignedPlayer global
    }

    
    // Trigger custom events based on message type
    window.dispatchEvent(new CustomEvent('ws-message', { detail: message }));
};


