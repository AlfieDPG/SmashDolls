

class PeticionesServidor {

    // Función para cargar la lista de objetos del servidor
    cargarObjetos(IP) {
        $.ajax({
            url: 'http://'+IP+'/objetos'
        }).done(function(objetos) {
            console.log('Objetos cargados: '+ JSON.stringify(objetos));
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }
    // Función para añadir un objeto al servidor
    añadirObjeto(objeto, IP) {
        $.ajax({
            method: "POST",
            url: 'http://'+IP+'/objetos',
            data: JSON.stringify(objeto),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (objeto) {
            console.log("Item created: " + JSON.stringify(objeto));
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }
    // Función para consultar el número de objetos que hay en el servidor
    consultarNumeroObjetos(IP) {
        var longitud = 0;
        $.ajax({
            url: 'http://'+IP+'/objetos'
        }).done(function(objetos) {
            console.log('Objetos cargados: '+ JSON.stringify(objetos));
            longitud = objetos.length;
            return longitud;
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }
    // Función para destruir un objeto
    destruirObjeto(id, IP) {
        $.ajax({
            method: 'DELETE',
            url: 'http://'+IP+'/objetos/' + id
        }).done(function () {
            console.log("Objeto eliminado " + id);
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }

    añadirRecordTiempo(tiempo, IP) {
        $.ajax({
            method: "POST",
            url: 'http://'+IP+'/tiempo',
            data: JSON.stringify(tiempo),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (tiempo) {
            console.log("Nuevo registro de tiempo: " + JSON.stringify(tiempo));
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }

    cargarRecordsTiempo(IP) {
        $.ajax({
            url: 'http://'+IP+'/tiempo'
        }).done(function(objetos) {
            console.log('Objetos cargados: '+ JSON.stringify(objetos));
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }

    añadirEquipo(equipo, IP){
        $.ajax({
           method: "POST",
           url: 'http://'+IP+'/usuarios',
           data: JSON.stringify(equipo),
           processData: false,
           headers: {
               "Content-Type": "application/json"
           }
        }).done(function(equipo){
            console.log("Equipo registrado: "+ JSON.stringify(equipo));
            if(equipo == ""){
            console.log("Tu nombre ya ha sido previamente registrado")
            console.log("¡Tu puntuación se guardará junto a las existentes con este nombre!")
            window.alert("Tu nombre ya ha sido previamente registrado, ¡tu puntuación se guardará junto a las existentes con este nombre! ");
            }
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }
}
