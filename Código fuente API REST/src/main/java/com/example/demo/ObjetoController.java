package com.example.demo;

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
@RequestMapping("/objetos")
public class ObjetoController {
    
    // HashMap con la colección de objetos almacenados
    Map<Long, Objeto> objetos = new ConcurrentHashMap<>();
    AtomicLong nextId = new AtomicLong(0);

    // Petición GET para todos los objetos que haya en la lista, no se especifica ninguno en concreto
    @GetMapping
    public Collection<Objeto> objetos() {
        return objetos.values();
    }

    // Petición POST para añadir el objeto a la lista
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Objeto añadirObjeto(@RequestBody Objeto obj) {
        // Para obtener su identificador, se incrementa el id de la clase
        long id = nextId.incrementAndGet();
        obj.setId(id);
        // Se añade a la lista
        objetos.put(id, obj);

        return obj;
    }

    // Petición PUT para actualizar un objeto de la lista
    @PutMapping("/{id}")
    // Se necesita el id del objeto a modificar y el nuevo objeto en sí
    public ResponseEntity<Objeto> actualizarObj(@PathVariable long id, @RequestBody Objeto nuevoObj) {
        // Se obtiene el objeto antiguo a modificar a través del identificador 
        Objeto objAntiguo = objetos.get(nuevoObj.getId());

        if(objAntiguo != null) {

            objetos.put(id, nuevoObj);
            return new ResponseEntity<>(nuevoObj, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Petición GET para obtener un solo objeto dado su identificador
    @GetMapping("/{id}")
    public ResponseEntity<Objeto> getObjeto(@PathVariable long id) {

        Objeto obj = objetos.get(id);

        if(obj != null) {
            return new ResponseEntity<>(obj, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Petición DELETE para eliminar un objeto
    @DeleteMapping("/{id}")
    public ResponseEntity<Objeto> borraObj(@PathVariable long id) {

        Objeto objGuardado = objetos.get(id);

        if(objGuardado != null) {
            objetos.remove(objGuardado.getId());
            nextId.decrementAndGet();
            return new ResponseEntity<>(objGuardado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
