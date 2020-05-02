var online = false
var socket = io()
var bpm = 600

$('form').submit(function(e) {
    e.preventDefault()
    if (!online) {
            socket.emit("ready", ($('nick').val()))
        online = true
    }
    })
var canvas, ctx, WIDTH, HEIGHT, tileSize;
window.addEventListener("keydown", keyDown)

function keyDown(e) {
    console.log(e.key)
    socket.emit("keyInput", e.key)

}

function KeyInput(key, id) {
    for (var i = 0; i < players.length; i++) {
        if(key == "ArrowUp"  && players[i]['id'] == id && players[i]['direction'].toString() != [0,1].toString()|| key.toLowerCase() == "w" && players[i]['id'] == id && players[i]['direction'].toString() != [0,1].toString()) {
            players[i]['direction'] = [0, -1]      
        }
        if(key == "ArrowDown" && players[i]['id'] == id && players[i]['direction'].toString() != [0,-1].toString()|| key.toLowerCase() == "s" && players[i]['id'] == id && players[i]['direction'].toString() != [0,-1].toString()) {
            players[i]['direction'] = [0, 1]
        }
        if(key == "ArrowLeft" && players[i]['id'] == id && players[i]['direction'].toString() != [1,0].toString()|| key.toLowerCase() == "a" && players[i]['id'] == id && players[i]['direction'].toString() != [1,0].toString()) {
            players[i]['direction'] = [-1, 0]
        }
        if(key == "ArrowRight" && players[i]['id'] == id && players[i]['direction'].toString() != [-1,0].toString()|| key.toLowerCase() == "d" && players[i]['id'] == id && players[i]['direction'].toString() != [-1,0].toString()) {
            players[i]['direction'] = [1, 0]
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
    run()
}

function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight
    
    canvas.width = 500
    canvas.height = 500

    tileSize = 10
}

socket.on('players', (players) => {
    Draw(players)
})
function Draw(players) {
    ctx.fillStyle = "#000"
    ctx.clearRect(0 ,0 ,500, 500)
    for (var i = 0; i < players.length; i++) {
        for (var f = 0; f < players[i]['body'].length; f++) {
                ctx.fillRect(
                    players[i]['body'][f][0]*tileSize,
                    players[i]['body'][f][1]*tileSize,
                    tileSize,
                    tileSize)
                
        }
            
    }
 }

function update() {
    
}
 
function run() {
    update()
    setTimeout(run, 60/bpm*1000)
}
 
init()