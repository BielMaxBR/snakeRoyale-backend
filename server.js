import express from 'express'
import http from 'http'
import CreateGame from './public/game.js'
import socketio from 'socket.io'
const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
var players = [], up

app.use(express.static("public"))


const game = CreateGame()
game.fruitSpawn()
game.MoveLoop()
game.subscribe((command) => {
    sockets.emit(command.type, command)
    console.log(command)
})
sockets.on('connection', (socket) => {
    const playerId = socket.id
    game.addPlayer({ playerId:playerId })
    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
    })

    socket.on('direct-player', (command) => {
        command.playerId = playerId
        command.type = 'direct-player'

        game.PlayerDirection(command)
    })
})

server.listen(process.env.PORT || 3000)
