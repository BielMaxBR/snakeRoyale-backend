export default function Draw(screen, game, requestAnimationFrame, currentPlayerId) {
    // console.log(currentPlayerId)
    const ctx = screen.getContext('2d')
    ctx.clearRect(0,0,450,50)

    for (const playerId in game.state.players) {
        // console.log('player qualquer pintado')
        const player = game.state.players[playerId]
        const currentPlayer = game.state.players[currentPlayerId]
        if (currentPlayer == player) {
            
            ctx.fillStyle = "#c90000"
            
            for(var i = 1; i < currentPlayer.body.length; i++) {
                const block = currentPlayer.body[i]
                ctx.fillRect(block.x,block.y,1,1)
            }
            // ctx.fillStyle = 'red'
            // ctx.fillRect(currentPlayer.body[0].x,currentPlayer.body[0].y,1,1)
        }
        else {
            ctx.fillStyle = "white"
            for(const block of player.body) {
                ctx.fillRect(block.x,block.y,1,1)
            }
        }
    }

    for (const fruitId in game.state.fruits) {
        // console.log('fruta')
        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = "#00ff00"
        ctx.fillRect(fruit.x, fruit.y, 1, 1)
    }



    requestAnimationFrame(() =>{
        Draw(screen, game, requestAnimationFrame, currentPlayerId)
    })
}