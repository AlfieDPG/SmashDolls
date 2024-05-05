package com.example.demo;

import java.io.EOFException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintStream;
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
@RequestMapping("/usuarios")
public class UsuarioController {
    
    // HashMap con la colección de usuarios almacenados
    Map<Long, Usuario> usuarios = new ConcurrentHashMap<>();
    AtomicLong nextId = new AtomicLong(0);

    // Petición GET para todos los usuarios que haya en la lista, no se especifica ninguno en concreto
    @GetMapping
    public Collection<Usuario> usuarios() {
        return usuarios.values();
    }

    // Petición POST para añadir el Usuario a la lista
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario añadirUs(@RequestBody Usuario us) throws FileNotFoundException {
        //Comprobar que no se repiten los nombres de equipo 
        Collection<Usuario> totalUsuarios = usuarios.values();
        boolean error = false;

        for (Usuario usuario : totalUsuarios) {
           if(us.getNombreEquipo().equals(usuario.getNombreEquipo()))  {
                error = true;
           }
        }
        
        // Se comprueba además que el nombre de equipo no esté presente en el fichero
        // Para ello, primero se leen los usuarios del fichero
        Usuario[] usuariosFichero = new Usuario[1000];
        int i=0;
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("usuarios.dat"))) {
            while (true) {
                try {
                    Usuario usuario = (Usuario) in.readObject();
                    if(usuario!=null) {
                        usuariosFichero[i] = usuario;
                        i++;
                    }
                } catch (EOFException e) {
                    // Se lanza cuando se llega al final del archivo
                    break;
                }
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
            
        // Se comprueba si se repite el nombre de equipo respecto a los del fichero
        for (Usuario usuario : usuariosFichero) {
           if(usuario != null && us.getNombreEquipo().equals(usuario.getNombreEquipo()))  {
                error = true;
           }
        }

        if(error == false){
            // Para obtener su identificador, se incrementa el id de la clase
            long id = nextId.incrementAndGet();
            us.setId(id);
            // Se añade a la lista
            usuarios.put(id, us);
            // Se escribe el objeto usuario en el fichero binario usuarios.dat             
            try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("usuarios.dat"))) {
                for (Usuario usuario : usuariosFichero) {
                     out.writeObject(usuario);
                }
                out.writeObject(us);
            } catch (IOException e) {
                e.printStackTrace();
            }
            
            return us;
        }

        return null;
    }

    // Petición PUT para actualizar un Usuario de la lista
    @PutMapping("/{id}")
    // Se necesita el id del Usuario a modificar y el nuevo Usuario en sí
    public ResponseEntity<Usuario> actualizarUs(@PathVariable long id, @RequestBody Usuario nuevoUs) {
        // Se obtiene el Usuario antiguo a modificar a través del identificador 
        Usuario usAntiguo = usuarios.get(nuevoUs.getId());

        if(usAntiguo != null) {

            usuarios.put(id, nuevoUs);
            return new ResponseEntity<>(nuevoUs, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Petición GET para obtener un solo Usuario dado su identificador
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable long id) {

        Usuario us = usuarios.get(id);

        if(us != null) {
            return new ResponseEntity<>(us, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Petición DELETE para eliminar un Usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> borraUs(@PathVariable long id) {

         Usuario usGuardado = usuarios.get(id);

        if(usGuardado != null) {
            usuarios.remove(usGuardado.getId());
            nextId.decrementAndGet();
            return new ResponseEntity<>(usGuardado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}