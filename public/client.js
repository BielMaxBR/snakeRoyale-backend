const screen = document.getElementById("screen")
const ctx = screen.getContext('2d')

function CreateGame() {
    const state = {
        players: {
            "player1": [
                [
                    [10,10],
                    [10,11],
                    [10,12]
                ],
                 [0,-1]
                ]
        }
    }
    function MovePlayer(command) {
        const key = command.keyPressed
        if (key == "w") {
            state.players["player1"][0][0][1] -= 1
            if (state.players["player1"][0][0][1] == -1) {
                state.players["player1"][0][0][1] = screen.width
            }
        }
    }

    return {
        MovePlayer,
        state
    }
}
const game = CreateGame()

document.addEventListener("keydown", handleKeyDown)

function handleKeyDown(e) {
    const key = e.key
    const command = {
        playerId: "player1",
        keyPressed: key
    }
    
    game.MovePlayer(command)
}

function Draw() {
    ctx.clearRect(0,0,50,50)

    for (playerId in game.state.players) {
        const player = game.state.players[playerId]
        ctx.fillStyle = "#fff"
        // console.log(player)
        for(block in player[0]) {
            const blocks = player[0][block]  
            // console.log(block)         
            ctx.fillRect(blocks[0],blocks[1],1,1)
        }
    }

    requestAnimationFrame(Draw)
}
Draw()