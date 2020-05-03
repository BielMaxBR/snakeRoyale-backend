var online = false
var socket = io()
var bpm = 1200, nick, player
var canvas, ctx, WIDTH, HEIGHT, tileSize;

window.addEventListener("keydown", keyDown)

$('form').submit(function(e) {
    e.preventDefault()
    if (!online) {
        // socket.emit("ready", ($('#nick').val()))
        nick = $('#nick').val()
        online = true
        // console.log(nick)
        if (online) {
            // console.log("online")
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
        // console.log(e.key)
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
    for (var f = 1; f < body.length; f++) {
        ctx.fillRect(
            body[f][0]*tileSize,
            body[f][1]*tileSize,
            tileSize,
            tileSize)
            }
    ctx.fillStyle = "#fff"
    ctx.fillRect(body[0][0]*tileSize,
            body[0][1]*tileSize,
            tileSize,
            tileSize)
}
function Draw(players) {
    ctx.fillStyle = "#000"
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
            
            
        }
        
function update() {
    ctx.clearRect(0 ,0 ,500, 500)
    socket.on('players', (players) => {
        console.log(players)
        Draw(players)
    })
    PlayerMove()
    playerDraw(player['body'])
    socket.emit('playerMove', player)
    // console.log(player)
}
 
function PlayerMove() {
    var nextPos = [player['body'][0][0] + player['direction'][0],player['body'][0][1] + player['direction'][1]]
        
        
        player['body'].pop()
        player['body'].splice(0,0, nextPos)

        if (player['body'][0][0] < 0) {
            player['body'][0][0] = canvas.width/tileSize
        }
        if (player['body'][0][0] > canvas.width/tileSize+1) {
            player['body'][0][0] = 0
        }
        if (player['body'][0][1] < 0) {
            player['body'][0][1] = canvas.height/tileSize
        }
        if (player['body'][0][1] > canvas.height/tileSize+1) {
            player['body'][0][1] = 0
        }
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
