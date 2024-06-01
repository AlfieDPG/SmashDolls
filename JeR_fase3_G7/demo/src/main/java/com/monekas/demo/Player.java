package com.monekas.demo;

public class Player {
    private long id;
    private String name;
    private int rounds;

    public Player(long id, String name, int rounds){
        this.name= name;
        this.rounds = rounds;
    }

public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

public int getRounds() {
        return rounds;
    }
    public void setRounds(int rounds) {
        this.rounds = rounds;
    }    

    @Override
	public String toString() {
		return "Jugador [id:" + id + ", nombre:" + name + ", rondas ganadas" + rounds + "]";
	}

}
