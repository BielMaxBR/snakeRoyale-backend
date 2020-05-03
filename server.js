const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
var players = [], up
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
            console.log('criando o primeiro player')
        }
        else {
            for (var i = 0;i < players.length; i++) {
                if (players[i]['nick'] == player['nick']) {
                    players[i] = player
                    up = true
                    break
                }             
            }
            if (!up) {
                players.push(player)
            }
            up = false
        }
        Update()
        
        console.log(players.length)
        
    })

    socket.on('disconnect', () => {
            console.log('um jogador saiu da partida')
            for (var i = 0; i < players.length; i++) {
                if(players[i]['id'] == socket.id) {
                    players.splice(i, 1)
                    console.log('removendo um player')
                    break
                }
            }
    })
})




function Update() {
    io.emit('players', players)
    setTimeout(()=>{}, 60/600*1000)
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
// function run() {
//     Update()

//     setTimeout(run, (60/bpm)*1000)
// }
// function init() {
//     // run()
// }
// init()
server.listen(process.env.PORT || 3000)
