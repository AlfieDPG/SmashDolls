var ip = location.host;
//Load players from server
function loadPlayer(callback) {
    $.ajax({
        url: 'http://'+ ip + '8080/player',
    }).done(function (players) {
        console.log('Players loaded: ' + JSON.stringify(players));
        callback(players);
    })
}

//Create player in server
function createPlayer(player, callback) {
    $.ajax({
        method: "POST",
        url: 'http://'+ ip + '8080/player',
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        console.log("Player created: " + JSON.stringify(player));
        callback(player);
    })
}

//Update player in server
function updatePlayer(player) {
    $.ajax({
        method: 'PUT',
        url: 'http://'+ ip + '8080/player'+ player.id,
        data: JSON.stringify(player),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (player) {
        console.log("Updated player: " + JSON.stringify(player))
    })
}

//Delete player from server
function deletePlayer(playerId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://'+ ip + '8080/player' + playerId
    }).done(function (player) {
        console.log("Deleted item " + playerId)
    })
}

//Show player in page
function showPlayer(player) {

    var checked = '';
    var style = '';

    if (player.checked) {
        checked = 'checked';
        style = 'style="text-decoration:line-through"';
    }

    $('#info').append(
        '<div id="player-' + player.id + '"><input type="checkbox" ' + checked + '><span ' + style + '>' +
        '</span> <button>Delete</button></div>')
}

$(document).ready(function () {

    loadPlayer(function (players) {
        //When players are loaded from server
        for (var i = 0; i < players.length; i++) {
            showPlayer(players[i]);
        }
    });

    var input = $('#value-input')
    var info = $('#info')

    //Handle delete buttons
    info.click(function (event) {
        var elem = $(event.target);
        if (elem.is('button')) {
            var playerDiv = elem.parent();
            var playerId = playerDiv.attr('id').split('-')[1];
            playerDiv.remove()
            deletePlayer(playerId);
        }
    })

    //Handle players checkboxs
    info.change(function (event) {

        //Get page elements for player
        var checkbox = $(event.target);
        var playerDiv = checkbox.parent();
        var textSpan = playerDiv.find('span');

        //Read item info from elements
        
        var playerChecked = checkbox.prop('checked');
        var playerId = playerDiv.attr('id').split('-')[1];

        //Create updated item
        var updatedPlayer = {
            id: playerId,
            
            checked: playerChecked
        }

        //Update item in server
        updateItem(updatedPlayer);

        //Update page when checked
        var style = playerChecked ? 'line-through' : 'none';
        textSpan.css('text-decoration', style);

    })

    //Handle add button
    $("#add-button").click(function () {

        var value = input.val();
        input.val('');

        var player = {
            description: value,
            checked: false
        }

        createPlayer(player, function (playerWithId) {
            //When player with id is returned from server
            showPlayer(playerWithId);
        });
    })
})