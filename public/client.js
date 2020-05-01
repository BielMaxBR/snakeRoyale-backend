var online = false
var socket = io()
$('form').submit(function(e) {
    e.preventDefault()
    if (!online) {
            socket.emit("ready", () => {
        });        
        online = true
    }
    })
var canvas, ctx, WIDTH, HEIGHT, tileSize;
window.addEventListener("keydown", keyDown)

function keyDown(e) {
    console.log(e.key)
    socket.emit("keyInput", e.key)
}
function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");
    
    // newGame()
    // frisk.update()
    // run()
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
    
    init()