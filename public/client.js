const screen = document.getElementById("screen")
const ctx = screen.getContext('2d')

function CreateGame() {
    const state = {
        players: {
            "player1": {
                body: [
                    {
                        x:10,
                        y:10
                    },{
                        x:10,
                        y:11
                    },{
                        x:10,
                        y:12
                    }
                ],
                direction: [0,-1]
            }
        }
    }
    function PlayerDirection(command) {
        const key = command.keyPressed
        const player = command.playerId

        
        const acceptedMoves = {
            ArrowUp(player) {
                state.players[player].direction = [0,-1]
            },
            W(player) {
                state.players[player].direction = [0,-1]
            },
            w(player) {
                state.players[player].direction = [0,-1]
            },
            ArrowLeft(player) {
                state.players[player].direction = [-1,0]              
            },
            A(player) {
                state.players[player].direction = [-1,0]
            },
            a(player) {
                state.players[player].direction = [-1,0]
            },
            ArrowDown(player) {
                state.players[player].direction = [0, 1]
            },
            S(player) {
                state.players[player].direction = [0, 1]
            },
            s(player) {
                state.players[player].direction = [0, 1]
            },
            ArrowRight(player) {
                state.players[player].direction = [1, 0]
            },
            D(player) {
                state.players[player].direction = [1, 0]
            },
            d(player) {
                state.players[player].direction = [1, 0]
            },
        }
        const MoveFunction = acceptedMoves[key]
        if (MoveFunction){
            MoveFunction(player)
        }
    }
    function MovePlayer() {
        var nextPos = {
            x: game.state.players["player1"].body[0].x + game.state.players["player1"].direction[0],
            y: game.state.players["player1"].body[0].y + game.state.players["player1"].direction[1]
        }
    
        console.log(nextPos)
        console.log(game.state.players["player1"].direction[0])
        
        game.state.players["player1"].body.pop()
        game.state.players["player1"].body.splice(0,0, nextPos)
        
        setTimeout(Run, 60/1200*1000)
        
    }
    return {
        MovePlayer,
        PlayerDirection,
        state
    }
}
const game = CreateGame()
const keyboardListener = CreateKeyboardListener()
keyboardListener.subscribe(game.PlayerDirection)

function CreateKeyboardListener() {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
            
        }
    }
    document.addEventListener("keydown", handleKeyDown)

    function handleKeyDown(e) {
        const key = e.key
        const command = {
            playerId: "player1",
            keyPressed: key
        }
        
        notifyAll(command)
    }
    return {
        subscribe
    }

}

function Run() {
    game.MovePlayer()
    Draw()
}

function Draw() {
    ctx.clearRect(0,0,50,50)

    for (playerId in game.state.players) {
        const player = game.state.players[playerId]
        ctx.fillStyle = "#fff"
        for(block of player.body) {
            ctx.fillRect(block.x,block.y,1,1)
        }
    }

    requestAnimationFrame(Draw)
}
Run()