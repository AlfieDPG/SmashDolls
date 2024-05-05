package com.example.demo;

import java.io.Serializable;

public class Usuario implements Serializable {
    private long id;
    private String nombreEquipo;

    public Usuario(long id, String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
        this.id= id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    @Override
    public String toString() {
        return "Objeto [id=" + id + ", nombre=" + nombreEquipo + " ]";
    }
}
