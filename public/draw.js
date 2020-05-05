export default function Draw(screen, game, requestAnimationFrame) {
    const ctx = screen.getContext('2d')
    ctx.clearRect(0,0,50,50)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        ctx.fillStyle = "white"
        for(const block of player.body) {
            ctx.fillRect(block.x,block.y,1,1)
        }
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = "white"
        ctx.fillRect(fruit.x,fruit.y,1,1)
    }


    requestAnimationFrame(() =>{
        Draw(screen, game, requestAnimationFrame)
    })
}