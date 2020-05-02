const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var players = [], bpm = 600
app.use(express.static(path.join(__dirname, "public")))

io.on('connection', (socket) => {
    // socket.on("ready", () => {
    //     CreatePlayer(socket.id)
    //     // console.log(players)
    //     socket.emit('players',players)
    // })

    socket.on('playerMove', (player) => {
        if (players.length == 0) {
            players.push(player)
            // console.log(players)
        }
        else {
            for (var i = 0;i < players.length; i++) {
                if (players[i]['nick'] != player['nick']) {
                    players.push(player)
                    // console.log(players)
                }
                else {
                    players[i] = player
                    console.log(players[i]['direction'])
                }
            }
        }
    })

    socket.on('disconnect', () => {
            console.log('um jogador saiu da partida')
            for (var i = 0; i < players.length; i++) {
                if(players[i]['id'] == socket.id) {
                    players.splice(i, 1)
                }
            }
            console.log(players)
    })
})

function CreatePlayer(player) {
    players.push(player)
}



function Update() {
    io.emit('players', players)
    // for (var i = 0; i < players.length;i++) {
    //     // for (var f = 0; f < players[i]['body'].length;f++) {
    //         var nextPos = [players[i]['body'][0][0] + players[i]['direction'][0],players[i]['body'][0][1] + players[i]['direction'][1]]
    //         players[i]['body'].pop()
    //         players[i]['body'].splice(0,0, nextPos)
    //         if (players[i]['body'][0][0] < 0) {
    //                 players[i]['body'][0][0] = 500/10
    //             }
    //             if (players[i]['body'][0][0] > 500/10+1) {
    //                 players[i]['body'][0][0] = 0
    //             }
    //             if (players[i]['body'][0][1] < 0) {
    //                 players[i]['body'][0][1] = 500/10
    //             }
    //             if (players[i]['body'][0][1] > 500/10+1) {
    //                 players[i]['body'][0][1] = 0
    //             }
    //         console.log(players[i]['body'])
        // }
    // }
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
