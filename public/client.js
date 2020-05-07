import CreateKeyboardListener from './keyboard-listener.js'
import CreateGame from './game.js'
import Draw from './draw.js'

const socket = io()

const game = CreateGame()
const keyboardListener = CreateKeyboardListener(document)

socket.on('connect', () => {
    const playerId = socket.id
    const screen = document.getElementById("screen")
    Draw(screen, game, requestAnimationFrame, playerId)
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setState(state)

    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.PlayerDirection)
    keyboardListener.subscribe((command) =>{
        socket.emit('direct-player', command)
    })
})

socket.on('add-player', (command) => {
    game.addPlayer(command)
})

socket.on('remove-player', (command) => {
    game.removePlayer(command)
})

socket.on('direct-player', (command) => {
    const playerId = socket.id
    // console.log('virou')
    if (playerId !== command.playerId) {
        game.PlayerDirection(command)
    }
})

socket.on('add-fruit', (command) => {
    game.addFruit(command)
    // console.log('client')
})

socket.on('remove-fruit', (command) => {
    game.removeFruit(command)
})

socket.on('move-player', (command) => {
    game.MovePlayer(command)
})
socket.on('collision-fruit', () => {
    const coinAudio = document.querySelector('audio')
    coinAudio.play()
})



