const screen = document.getElementById("screen")
const ctx = screen.getContext('2d')

const game = {
    players: {
        "player1": [[10,10],[10,11],[10,12]]
    }
}

function Draw() {
    ctx.fillStyle = "#000"
    ctx.fillRect(0,0,50,50)

    for (playerId in game.players) {
        const player = game.players[playerId]
        ctx.fillStyle = "#fff"
        for(block in player) {
            const blocks = player[block]           
            ctx.fillRect(blocks[0],blocks[1],1,1)
        }
    }

    requestAnimationFrame(Draw)
}
Draw()