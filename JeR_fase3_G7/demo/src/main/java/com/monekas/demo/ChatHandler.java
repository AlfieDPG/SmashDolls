package com.monekas.demo;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ChatHandler extends TextWebSocketHandler {

    private static final int MAX_SESSIONS = 2;
    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private ObjectMapper mapper = new ObjectMapper();

    private WebSocketSession player1;
    private WebSocketSession player2;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        if (sessions.size() < MAX_SESSIONS) {
            System.out.println("New user: " + session.getId());
            sessions.put(session.getId(), session);

            // Assign player ID and send it
            if (player1 == null) {
                player1 = session;
                sendPlayerId(session, 1);
            } else if (player2 == null) {
                player2 = session;
                sendPlayerId(session, 2);
            }
        } else {
            System.out.println("Connection refused: " + session.getId());
            session.close(CloseStatus.SERVICE_OVERLOAD); // Custom close status for service overload
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Session closed: " + session.getId());
        sessions.remove(session.getId());

        if (session.equals(player1)) {
            player1 = null;
        } else if (session.equals(player2)) {
            player2 = null;
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Message received: " + message.getPayload());
        JsonNode node = mapper.readTree(message.getPayload());

        sendOtherParticipants(session, node);
    }

    private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
        System.out.println("Message sent: " + node.toString());

        //ObjectNode newNode = mapper.createObjectNode();
        //newNode.put("type", node.get("type").asText());

        for (WebSocketSession participant : sessions.values()) {
            if (!participant.getId().equals(session.getId())) {
                participant.sendMessage(new TextMessage(node.toString()));
            }
        }
    }

    private void sendPlayerId(WebSocketSession session, int playerId) throws IOException {
        ObjectNode idNode = mapper.createObjectNode();
        idNode.put("type", "playerId");
        idNode.put("id", playerId);

        session.sendMessage(new TextMessage(idNode.toString()));
    }


}
