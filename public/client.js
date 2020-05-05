import CreateKeyboardListener from './keyboard-listener.js'
import CreateGame from './game.js'
import Draw from './draw.js'

const screen = document.getElementById("screen")
const socket = io()

const game = CreateGame()
const keyboardListener = CreateKeyboardListener(document)

socket.on('connect', () => {
    const playerId = socket.id
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setState(state)
    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.PlayerDirection)
})

socket.on('add-player', (command) => {
    game.addPlayer(command)
})

socket.on('remove-player', (command) => {
    game.removePlayer(command)
})



function Run() {
    for (const player in game.state.players) {
        if (game.state.players != {} && player) {
            game.MovePlayer(game.state.players[player])
        }
    }
    Draw(screen, game, requestAnimationFrame)
}



Run()

