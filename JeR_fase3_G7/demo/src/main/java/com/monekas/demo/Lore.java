package com.monekas.demo;

public class Lore {
    private long id;
    private String titulo;
    private String texto;

public Lore(long id, String titulo, String text){
    this.titulo= titulo;
    this.texto= text;

}

public long getId(){
return id;
}
public void setID(long id){
    this.id=id;
}

public String getTitulo(){
return titulo;
}

public void setTitulo(String titulo){
    this.titulo= titulo;
}

public String getTexto(){
    return texto;
    }
    
    public void setTexto(String texto){
        this.texto= texto;
    }


    @Override
    public String toString() {
        return "Lore [id=" + id + ", titulo=" + titulo + ", descripcion=" + texto + "]";
    }

}
