package com.monekas.demo;


import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
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
        
        @GetMapping
        public Collection<Lore> obtenerLore() {
            return loreMap.values();
        }
    
        // Petición POST para añadir nuevo lore
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Lore añadirLore(@RequestBody Lore nuevoLore) {
            
           
                if (loreMap.isEmpty()) { // Si el mapa de lore está vacío, establece el ID en 0
                        nuevoLore.setID(0);
                        loreMap.put(0L, nuevoLore); // Agregar el lore inicial al mapa
                        System.out.println("Lore inicial creado con éxito: " + nuevoLore); // Imprimir un mensaje indicando que se ha creado el lore inicial
                        
                     
                }
                else if (nuevoLore.getTitulo().equals("Titulo del Lore") && nuevoLore.getTexto().equals("Texto del lore inicial")) {
                        // Si el nuevo lore tiene el mismo título y texto que el lore inicial, no lo añadas
                        System.out.println("El nuevo lore es igual al lore inicial. No se añadirá.");
                }
                else {
                    long id = nextId.incrementAndGet();
                    nuevoLore.setID(id);
                    loreMap.put(nuevoLore.getId(), nuevoLore);
                }
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
                    // Si no queda ningún lore después de la eliminación, crea un lore por defecto
                    if (loreMap.isEmpty()) {
                        loreMap.put(0L,DEFAULT_LORE);
                    }
                    return ResponseEntity.noContent().build(); // Devuelve 204 NO CONTENT si el lore se elimina correctamente
                } else {
                    return ResponseEntity.notFound().build(); // Devuelve 404 NOT FOUND si el lore no se encuentra
                }
            }
        }
    }
    

