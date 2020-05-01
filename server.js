const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var players = [], bpm = 600
app.use(express.static(path.join(__dirname, "public")))

io.on('connection', (socket) => {
    socket.on("ready", () => {
        CreatePlayer(socket.id)
        console.log(players)
        socket.emit('players',players)
    })

    socket.on('keyInput', (key) => {
        // KeyInput(key)
        console.log(key)
    })

    socket.on('disconnect', (reason) => {
            console.log('um jogador saiu da partida')
            for (var i = 0; i < players.length; i++) {
                if(players[i]['id'] == socket.id) {
                    players.splice(i, 1)
                }
            }
            console.log(players)
    })
})

function CreatePlayer(id) {
    players.push(Snake(id))
}


function Snake(id) {
    this.body = [[10,10],[10,10],[10,10]]
    this.direction = [0, -1]
    this.id = id
    
    return { 
        'id':this.id,
        'body':this.body,
        'direction':this.direction,
    }
}

function Update() {
    io.emit('players', players)
    // console.log(players)
}
function run() {
    Update()

    setTimeout(run, (60/bpm)*1000)
}

run()
server.listen(3000)
