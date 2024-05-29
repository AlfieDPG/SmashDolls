class ServerRequests {

    loadLore(IP) {
        return $.ajax({
            url: 'http://'+IP+'/lores'
        }).done(function(lores) {
            console.log('Lores cargados: '+ JSON.stringify(lores));
        }).fail(function() {
            console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
        })
    }
    // Función addLore
    addLore(nuevoLore, IP) {
        return $.ajax({
            method: "POST",
            url: 'http://' + IP + '/lores',
            data: JSON.stringify(nuevoLore),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (nuevoLore) {
            console.log("Lore creado: " + JSON.stringify(nuevoLore));
            
        }).fail(function() {
            console.log('ERROR de conexión, no se pudo añadir el lore al servidor.');
            throw new Error('Failed to add lore to the server.'); // Opcionalmente, puedes lanzar un error
        });
    }


    // Función updateLore
    updateLore(id, nuevoLore, IP) {
        // Devolvemos la promesa generada por $.ajax
        return $.ajax({
            method: "PUT",
            url: 'http://' + IP + '/lores/' + id,
            data: JSON.stringify(nuevoLore),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function(updatedLore) {
            console.log("Lore actualizado: " + JSON.stringify(updatedLore));
            return updatedLore; // Resolvemos la promesa con los datos actualizados
        }).fail(function(xhr, status, error) {
            console.log('ERROR de conexión, no se pudo actualizar el lore en el servidor:', error);
            throw new Error('Failed to update lore on the server.'); // Lanzamos un error para que se maneje en la función de llamada
        });
    }
// Función deleteLore
deleteLore(id, IP) {
    $.ajax({
        method: "DELETE",
        url: 'http://' + IP + '/lores/' + id
    }).done(function () {
        console.log("Lore eliminado con éxito" );
        // Aquí puedes manejar la respuesta del servidor, como actualizar la interfaz de usuario después de eliminar el lore
    }).fail(function() {
        console.log('ERROR de conexión, no se pudo eliminar el lore en el servidor.');       
    });
}
}



