package com.monekas.demo;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;  // Import the File class
import java.io.IOException;
import java.nio.file.Files;  // Import the IOException class to handle errors
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/lores")
public class LoreController {
    
        // HashMap para almacenar el lore del juego
        Map<Long, Lore> loreMap = new ConcurrentHashMap<>();
        AtomicLong nextId = new AtomicLong(0);
        private static final Lore DEFAULT_LORE = new Lore(0L,"Titulo del Lore", "Texto del lore inicial");
        private static final String FILE_NAME = "lores.txt";
          public LoreController() {
            loadLoresFromFile();
          }

    // Método para cargar lores desde el fichero
    private void loadLoresFromFile() {
        try {
            File file = new File(FILE_NAME);
            if (file.exists()) {
                List<String> lines = Files.readAllLines(Paths.get(FILE_NAME));
                for (String line : lines) {
                    String[] parts = line.split(";", 3);
                    if (parts.length == 3) {
                        long id = Long.parseLong(parts[0]);
                        String title = parts[1];
                        String text = parts[2];
                        loreMap.put(id, new Lore(id, title, text));
                         
                    } else {
                        System.out.println("Formato incorrecto en la línea: " + line);
                    }
                }
                if (loreMap.isEmpty()) {
                    loreMap.put(0L, DEFAULT_LORE);
                    System.out.println("No se encontraron lores en el archivo, se cargó el lore predeterminado.");
                }
            } else {
                Files.createFile(Paths.get(FILE_NAME));
                loreMap.put(0L, DEFAULT_LORE);
                System.out.println("Archivo de lores no encontrado, se creó uno nuevo con el lore predeterminado.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Método para guardar los lores en el fichero
    private void saveLoresToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (Lore lore : loreMap.values()) {
                writer.write(lore.getId() + ";" + lore.getTitulo() + ";" + lore.getTexto());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
        // ^Mirar si existe un fichero que lllama lores.txt, si existe, miro las líneas uqe tiene. y cargo las líneas en la aplicación. Esto sustituye la línea 29. 
        // Cada vez que se anade un nuevo lore se vuelva en el fichero
        // Cada vez que se elimina, se elimina la línea del fichero, actualización...
        
        @GetMapping
        public Collection<Lore> obtenerLore() {
            return loreMap.values();
            
        }
    
        // Petición POST para añadir nuevo lore
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Lore añadirLore(@RequestBody Lore nuevoLore) {
                long id = nextId.incrementAndGet();
                nuevoLore.setID(id);
                loreMap.put(nuevoLore.getId(), nuevoLore);
                saveLoresToFile();
                return nuevoLore;
            }
    
        // Petición PUT para actualizar el lore del juego
        @PutMapping("/{id}")
        public ResponseEntity<Lore> actualizarLore(@PathVariable long id, @RequestBody Lore nuevoLore) {
            Lore loreExistente = loreMap.get(id);
    
            if (loreExistente != null) {
                // Establecer el ID del nuevo lore como el ID del lore existente
                nuevoLore.setID(id);
                loreMap.put(id, nuevoLore);
                saveLoresToFile();
                return new ResponseEntity<>(nuevoLore, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        // Petición DELETE para eliminar el lore del juego
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> eliminarLore(@PathVariable long id) {
            if (loreMap.size() == 1 && loreMap.containsKey(id)) {
                // Si este lore es el único en el sistema, no lo elimines
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Devuelve 403 FORBIDDEN ya que no se puede eliminar el único lore
            } else {
                Lore loreExistente = loreMap.get(id);
                if (loreExistente != null) {
                    loreMap.remove(id);
                
                    saveLoresToFile();
                    return ResponseEntity.noContent().build(); // Devuelve 204 NO CONTENT si el lore se elimina correctamente
                } else {
                    return ResponseEntity.notFound().build(); // Devuelve 404 NOT FOUND si el lore no se encuentra
                }
            }
        }
    }