package com.example.demo;


public class Tiempo {
    
    private long minutos;
    private long segundos;
    private long id;
    private String nombreEquipo;

    public Tiempo(long minutos, long segundos, long id, String nombreEquipo) {
        this.minutos = minutos;
        this.segundos = segundos;
        this.id = id;
        this.nombreEquipo = nombreEquipo;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getMinutos() {
        return minutos;
    }

    public void setMinutos(long minutos) {
        this.minutos = minutos;
    }

    public long getSegundos() {
        return segundos;
    }

    public void setSegundos(long segundos) {
        this.segundos = segundos;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    @Override
    public String toString() {
        return "Tiempo [ minutos=" + minutos + ", segundos=" + segundos + ", nombre de equipo = " + nombreEquipo + "]";
    }

}
