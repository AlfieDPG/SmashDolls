package com.example.demo;

public class Objeto {
    
    private long id;
    private String nombre;
    private char jugador;
    private String nombreUsuario;

    public Objeto(long id, String nombre, char jugador, String nombreUsuario) {
        this.nombre = nombre;
        this.jugador = jugador;
        this.nombreUsuario = nombreUsuario;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public char getJugador() {
        return jugador;
    }

    public void setJugador(char c) {
        this.jugador = c;
    }

     public String getUsuario() {
        return nombreUsuario;
    }

    public void setUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    @Override
    public String toString() {
        return "Objeto [id=" + id + ", nombre=" + nombre + ", jugador=" + jugador + ", nombre de equipo = " + nombreUsuario + "]";
    }

}
