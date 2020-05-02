var online = false
var socket = io()
var bpm = 600, nick, player
var canvas, ctx, WIDTH, HEIGHT, tileSize;

window.addEventListener("keydown", keyDown)

$('form').submit(function(e) {
    e.preventDefault()
    if (!online) {
        // socket.emit("ready", ($('#nick').val()))
        nick = $('#nick').val()
        online = true
        console.log(nick)
        if (online) {
            console.log("online")
        }
    }
    })



function Player(nick) {
    this.body = [[10,10],[10,10],[10,10]]
    this.direction = [0, -1]
    this.nick = nick
    
    return { 
        'nick':this.nick,
        'body':this.body,
        'direction':this.direction,
    }
}

function keyDown(e) {
    if (online) {
        console.log(e.key)
        if(e.key == "ArrowUp"  && player.direction.toString() != [0,1].toString()|| e.key.toLowerCase() == "w" && player.direction.toString() != [0,1].toString()) {
            player.direction = [0, -1]
        }
        if(e.key == "ArrowDown" && player.direction.toString() != [0,-1].toString()|| e.key.toLowerCase() == "s" && player.direction.toString() != [0,-1].toString()) {
            player.direction = [0, 1]
        }
        if(e.key == "ArrowLeft" && player.direction.toString() != [1,0].toString()|| e.key.toLowerCase() == "a" && player.direction.toString() != [1,0].toString()) {
            player.direction = [-1, 0]
        }
        if(e.key == "ArrowRight" && player.direction.toString() != [-1,0].toString()|| e.key.toLowerCase() == "d" && player.direction.toString() != [-1,0].toString()) {
            player.direction = [1, 0]
        }
    }
}
function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    // newGame()
    // frisk.update()
    
    // console.log(player)
    run()
    
}

function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight
    
    canvas.width = 500
    canvas.height = 500

    tileSize = 10
}

function playerDraw(body) {
    ctx.fillStyle = "#f5c402"
    for (var f = 0; f < body.length; f++) {
        ctx.fillRect(
            body[f][0]*tileSize,
            body[f][1]*tileSize,
            tileSize,
            tileSize)
            }
}
function Draw(players) {
    ctx.fillStyle = "#000"
    ctx.clearRect(0 ,0 ,500, 500)
    for (var i = 0; i < players.length; i++) {
        if (players[i]['nick'] != nick) {
            for (var f = 0; f < players[i]['body'].length; f++) {
                    ctx.fillRect(
                        players[i]['body'][f][0]*tileSize,
                        players[i]['body'][f][1]*tileSize,
                        tileSize,
                        tileSize)
            }
        }
    }
    playerDraw(player['body'])

 }

function update() {
    socket.on('players', (players) => {
        Draw(players)
    })
    socket.emit('playerMove', player)
    console.log(player)
}
 
function run() {
    if (online) {
        if (player === undefined) {
            player = Player(nick)
        }
        update()
    }
    setTimeout(run, 60/bpm*1000)
}
 

init()
