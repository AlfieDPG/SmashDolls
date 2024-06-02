package com.monekas.demo;
public class Chat {

    private long id;
    private String nombre;
    private String mensaje;

public Chat(long id, String nombre, String mensaje){
    this.nombre= nombre;
    this.mensaje= mensaje;

}

public long getId(){
return id;
}
public void setID(long id){
    this.id=id;
}

public String getNombre(){
return nombre;
}
public void setNombre(String nombre){
    this.nombre= nombre;

}

public String getMensaje(){
    return mensaje;
    }
public void setMensaje(String mensaje){
    this.mensaje= mensaje;
}


    @Override
    public String toString() {
        return "Mensaje [id=" + id + ", NombreUsuario=" + nombre + ", mensaje=" + mensaje + "]";
    }

}