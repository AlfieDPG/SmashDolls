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
@RequestMapping("/players")
public class PlayersController {
	//almacenamos los jugadores en un hashmap
	Map<Long, Player> players = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	private static final Player DEFAULT_PLAYER = new Player(0L,"Jugador por defecto", 0);
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
			for (String line : lines) {
				String[] parts = line.split(";", 3);
				if (parts.length == 3) {
					long id = Long.parseLong(parts[0]);
					String name = parts[1];
					int rounds = Integer.parseInt(parts[2]);
					players.put(id, new Player(id, name, rounds));
					nextId.set(Math.max(nextId.get(), id + 1));
				}
			}
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
		for (Player player : players.values()) {
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
		return players.values();
	}

	//post para añadir un nuevo jugador
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Player nuevoPlayer(@RequestBody Player player) {
		
			long id = nextId.incrementAndGet();
			player.setId(id);
			players.put(player.getId(), player);
			saveplayersToFile();
		
		return player;
	}


	//cambiamos el nombre del jugador a traves de su id
	@PutMapping("/{id}")
	public ResponseEntity<Player> actulizarPlayer(@PathVariable long id, @RequestBody Player playerActualizado) {

		Player savedPlayer = players.get(playerActualizado.getId());

		if (savedPlayer != null) {
			playerActualizado.setId(id);
			players.put(id, playerActualizado);
			saveplayersToFile();
			return new ResponseEntity<>(playerActualizado, HttpStatus.OK);
		} 
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/*obtener jugador segun el id que tenga
	@GetMapping("/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {

		Player savedPlayer = players.get(id);

		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}*/

	//eliminar el jugador segun su id
	@DeleteMapping("/{id}")
	public ResponseEntity<Player> borraPlayer(@PathVariable long id) {
		if (players.size() == 1 && players.containsKey(id)) {

			// Si este jugador es el único en el sistema, no lo elimines
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Devuelve 403 FORBIDDEN ya que no se puede eliminar el único jugador
		} else {
			Player playerExistente = players.get(id);
			if (playerExistente != null) {
				players.remove(id);
				// Si no queda ningún jugador tras la eliminacion pone el jugador por defecto
				if (players.isEmpty()) {
					players.put(0L,DEFAULT_PLAYER);
				}
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
	}

}
