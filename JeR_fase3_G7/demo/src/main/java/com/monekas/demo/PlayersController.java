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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players")
public class PlayersController {
	//almacenamos los jugadores en un hashmap
	Map<Long, Player> playerMap = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	private static final String FILE_NAME = "players.txt";
	
	public PlayersController() {
		loadPlayersFromFile();
	  }

// Método para cargar players desde el fichero
private void loadPlayersFromFile() {
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
                        int rounds = Integer.parseInt(parts[2]);
                        playerMap.put(id, new Player(id, name, rounds));
                        System.out.println("Player loaded: ID=" + id + ", Name=" + name + ", Rounds=" + rounds);
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

// Método para guardar los players en el fichero
private void saveplayersToFile() {
	try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
		for (Player player : playerMap.values()) {
			writer.write(player.getId() + ";" + player.getName() + ";" + player.getRounds());
			writer.newLine();
		}
	} catch (IOException e) {
		e.printStackTrace();
	}
}
	// ^Mirar si existe un fichero que lllama players.txt, si existe, miro las líneas uqe tiene. y cargo las líneas en la aplicación. Esto sustituye la línea 29. 
	// Cada vez que se anade un nuevo player se vuelva en el fichero
	// Cada vez que se elimina, se elimina la línea del fichero, actualización...
	

	@GetMapping
	public Collection<Player> obtenerPlayers() {
		return playerMap.values();
	}

	//post para añadir un nuevo jugador
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Player nuevoPlayer(@RequestBody Player player) {
		long id;
		if (playerMap.isEmpty()) {
			id = 0;
			nextId.set(id);
		} else {
			id = nextId.incrementAndGet();
		}
		player.setId(id);
		playerMap.put(player.getId(), player);
		saveplayersToFile();
		return player;
	}

	

	//eliminar el jugador segun su id
	@DeleteMapping("/{id}")
	public ResponseEntity<Player> borraPlayer(@PathVariable long id) {
		if (playerMap.size() == 1 && playerMap.containsKey(id)) {

			// Si este jugador es el único en el sistema, no lo elimines
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Devuelve 403 FORBIDDEN ya que no se puede eliminar el único jugador
		} else {
			Player playerExistente = playerMap.get(id);
			if (playerExistente != null) {
				playerMap.remove(id);
				
				saveplayersToFile();
				return ResponseEntity.noContent().build(); // Devuelve 204 NO CONTENT si el jugador se elimina correctamente
			} else {
				return ResponseEntity.notFound().build(); // Devuelve 404 NOT FOUND si el jugador no se encuentra
			}
		}
	


		/*Player savedPlayer= players.get(id);

		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}*/

		// RONDAS 
		


	}

}