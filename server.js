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
//game.addPlayer({playerId: "player1", body:[{x:10,y:10},{x:10,y:10},{x:10,y:10}], direction: [1,0]})
game.addFruit({fruitId: "fruit1", fruitX: 14, fruitY: 14})


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
})

server.listen(process.env.PORT || 3000)
