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
@RequestMapping("/players")
public class PlayersController {
	//almacenamos los jugadores en un hashmap
	Map<Long, Player> players = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<Player> obtenerPlayers() {
		return players.values();
	}

	//post para añadir un nuevo jugador
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Player nuevoPlayer(@RequestBody Player player) {


		if (players.isEmpty()){
			//si es el primer jugador que añadimos
			player.setId(0);
			players.put(0L, player);
			System.out.println("Jugador creado con éxito: " + player); 
		}
		else{
			//
			long id = nextId.incrementAndGet();
			player.setId(id);
			players.put(id, player);
		}

		return player;
	}


	//cambiamos el nombre del jugador a traves de su id
	@PutMapping("/{id}")
	public ResponseEntity<Player> actulizarPlayer(@PathVariable long id, @RequestBody Player playerActualizado) {

		Player savedPlayer = players.get(playerActualizado.getId());

		if (savedPlayer != null) {

			players.put(id, playerActualizado);

			return new ResponseEntity<>(playerActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//obtener jugador segun el id que tenga
	@GetMapping("/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {

		Player savedPlayer = players.get(id);

		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	//eliminar el jugador segun su id
	@DeleteMapping("/{id}")
	public ResponseEntity<Player> borraPlayer(@PathVariable long id) {

		Player savedPlayer= players.get(id);

		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
