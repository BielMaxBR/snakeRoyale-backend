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
        KeyInput(key, socket.id)
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
    for (var i = 0; i < players.length;i++) {
        // for (var f = 0; f < players[i]['body'].length;f++) {
            var nextPos = [players[i]['body'][0][0] + players[i]['direction'][0],players[i]['body'][0][1] + players[i]['direction'][1]]
            players[i]['body'].pop()
            players[i]['body'].splice(0,0, nextPos)
            if (players[i]['body'][0][0] < 0) {
                    players[i]['body'][0][0] = 500/10
                }
                if (players[i]['body'][0][0] > 500/10+1) {
                    players[i]['body'][0][0] = 0
                }
                if (players[i]['body'][0][1] < 0) {
                    players[i]['body'][0][1] = 500/10
                }
                if (players[i]['body'][0][1] > 500/10+1) {
                    players[i]['body'][0][1] = 0
                }
            console.log(players[i]['body'])
        // }
    }
    // console.log(players)
}
function run() {
    Update()

    setTimeout(run, (60/bpm)*1000)
}
function init() {
    run()
}
init()
server.listen(process.env.PORT || 3000)
