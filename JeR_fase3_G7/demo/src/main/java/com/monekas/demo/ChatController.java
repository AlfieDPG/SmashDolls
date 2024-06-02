package com.monekas.demo;

import java.io.BufferedWriter;
import java.io.File;  // Import the File class
import java.io.FileWriter;
import java.io.IOException;  // Import the IOException class to handle errors
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mensajes")
public class ChatController {
    
        // HashMap para almacenar el chat del juego
        Map<Long, Chat> chatMap = new ConcurrentHashMap<>();
        AtomicLong nextId = new AtomicLong(0);
        private static final String FILE_NAME = "mensajes.txt";
          public ChatController() {
            loadMensajesFromFile();
          }

    // Método para cargar mensajes desde el fichero
    private void loadMensajesFromFile() {
        try {
            File file = new File(FILE_NAME);
            if (file.exists()) {
                List<String> lines = Files.readAllLines(Paths.get(FILE_NAME));
                long maxId = 0;
                System.out.println("File found, reading players...");
                for (String line : lines) {
                    System.out.println("Processing line: " + line);
                    String[] parts = line.split(";", 3);
                    if (parts.length == 3) {
                        try {
                            long id = Long.parseLong(parts[0]);
                            String name = parts[1];
                            String message = parts[2];
                            chatMap.put(id, new Chat(id, name, message));
                            System.out.println("Chat loaded: ID=" + id + ", Name=" + name + ", Mensaje=" + message);
                            if (id > maxId) {
                                maxId = id;
                            }
                        } catch (NumberFormatException e) {
                            System.err.println("Invalid number format in line: " + line);
                        }
                    }
                }
                nextId.set(maxId);
            } else {
                Files.createFile(Paths.get(FILE_NAME));
                
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // Método para guardar los mensajes en el fichero
    private void saveMensajesToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Chat chat : chatMap.values()) {
                writer.write(chat.getId() + ";" + chat.getNombre() + ";" + chat.getMensaje());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
        // ^Mirar si existe un fichero que lllama mensajes.txt, si existe, miro las líneas uqe tiene. y cargo las líneas en la aplicación. Esto sustituye la línea 29. 
        // Cada vez que se anade un nuevo mensaje se vuelca en el fichero
        // Cada vez que se elimina, se elimina la línea del fichero, actualización...
        
        @GetMapping
        public Collection<Chat> obtenerMensajes() {
            return chatMap.values();
        }
    
        // Petición POST para añadir nuevo mensaaje
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Chat añadirMensaje(@RequestBody Chat nuevoMensaje) {
            long id;
            if (chatMap.isEmpty()) {
                id = 0;
                nextId.set(id);
            } else {
                id = nextId.incrementAndGet();
            }
            nuevoMensaje.setID(id);
            chatMap.put(nuevoMensaje.getId(), nuevoMensaje);
                saveMensajesToFile();
                return nuevoMensaje;
            }
    
        
        }
     
    
    
