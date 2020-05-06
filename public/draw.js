export default function Draw(screen, game, requestAnimationFrame, currentPlayerId) {
    // console.log(currentPlayerId)
    const ctx = screen.getContext('2d')
    ctx.clearRect(0,0,50,50)

    for (const playerId in game.state.players) {
        // console.log('player qualquer pintado')
        const player = game.state.players[playerId]
        ctx.fillStyle = "white"
        for(const block of player.body) {
            ctx.fillRect(block.x,block.y,1,1)
        }
    }

    for (const fruitId in game.state.fruits) {
        // console.log('fruta')
        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = "#00ff00"
        ctx.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if (currentPlayer) {
        ctx.fillStyle = "#ff0000"
        for(const block of currentPlayer.body) {

            ctx.fillRect(block.x,block.y,1,1)
        }
    }

    requestAnimationFrame(() =>{
        Draw(screen, game, requestAnimationFrame, currentPlayerId)
    })
}