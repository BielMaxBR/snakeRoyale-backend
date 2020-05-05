const screen = document.getElementById("screen")
const ctx = screen.getContext('2d')

function CreateGame() {
    const state = {
        players: {},
        fruits: {}
    }
    

    function addPlayer(command) {
        const playerId = command.playerId
        const playerBody = command.body
        const playerDirection = command.direction

        state.players[playerId] = {
                playerId: playerId,
                body: playerBody,
                direction: playerDirection
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
                fruitId: fruitId,
                x: fruitX,
                y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for(const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            if (player.body[0].x === fruit.x &&player.body[0].y === fruit.y ) {
                console.log("bateu!!")
                const coinAudio = document.querySelector('audio')
                removeFruit({ fruitId: fruitId })
                coinAudio.play()
                playerIncrease(playerId)
            }
        }
    
    }

    function playerIncrease(playerId) {
        const player = state.players[playerId]
        player.body.splice(0,0,player.body[0])
    }

    function PlayerDirection(command) {
        const key = command.keyPressed
        const player = command.playerId

        
        const acceptedMoves = {
            ArrowUp(player) {
                if(state.players[player].direction.toString() != [0,1].toString()) {
                    state.players[player].direction = [0,-1]
                }
            },
            W(player) {
                if(state.players[player].direction.toString() != [0,1].toString()) {
                    state.players[player].direction = [0,-1]
                }
            },
            w(player) {
                if(state.players[player].direction.toString() != [0,1].toString()) {
                    state.players[player].direction = [0,-1]
                }
            },
            ArrowLeft(player) {
                if(state.players[player].direction.toString() != [1,0].toString()) {
                    state.players[player].direction = [-1,0] 
                }             
            },
            A(player) {
                if(state.players[player].direction.toString() != [1,0].toString()) {
               
                    state.players[player].direction = [-1,0]
                }
            },
            a(player) {
                if(state.players[player].direction.toString() != [1,0].toString()) {
                    state.players[player].direction = [-1,0]
                }
            },
            ArrowDown(player) {
                if(state.players[player].direction.toString() != [0,-1].toString()) {
                    state.players[player].direction = [0, 1]
                }
            },
            S(player) {
                if(state.players[player].direction.toString() != [0,-1].toString()) {
                    state.players[player].direction = [0, 1]
                }
            },
            s(player) {
                if(state.players[player].direction.toString() != [0,-1].toString()) {
                    state.players[player].direction = [0, 1]
                }
            },
            ArrowRight(player) {
                if(state.players[player].direction.toString() != [-1,0].toString()) {
                    state.players[player].direction = [1, 0]
                }
            },
            D(player) {
                if(state.players[player].direction.toString() != [-1,0].toString()) {
                    state.players[player].direction = [1, 0]
                }
            },
            d(player) {
                if(state.players[player].direction.toString() != [-1,0].toString()) {
                    state.players[player].direction = [1, 0]
                }
            },
        }
        const DirectionFunction = acceptedMoves[key]
        if (player && DirectionFunction){
            DirectionFunction(player)
        }
    }
    function MovePlayer(command) {
        function LocalMove() {
            const playerId = command.playerId
            const playerBody = game.state.players[playerId].body
            const playerDirection = game.state.players[playerId].direction
            var nextPos = {
                x: playerBody[0].x + playerDirection[0],
                y: playerBody[0].y + playerDirection[1]
            }
        
         
            playerBody.pop()
            playerBody.splice(0,0, nextPos)

            if (playerBody[0].x > screen.width-1) {
                playerBody[0].x = 0
            }
            if (playerBody[0].x < 0) {
                playerBody[0].x = screen.width
            }
            if (playerBody[0].y > screen.height-1) {
                playerBody[0].y = 0
            }
            if (playerBody[0].y < 0) {
                playerBody[0].y = screen.height
            }

            if (nextPos.x == playerBody[1].x && nextPos.y == playerBody[1].y) {
                nextPos = [playerBody[0].x + this.direction[0]*-1,playerBody[0].y + this.direction[1]*-1]
            }

            back()
        }
        LocalMove()
        function back() {            
            const playerId = command.playerId

            checkForFruitCollision(playerId)
            setTimeout(LocalMove, 60/1200*1000)
        }
    }
    return {
        removeFruit,
        addFruit,
        removePlayer,
        addPlayer,
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
        console.log(command)
        notifyAll(command)
    }
    return {
        subscribe
    }

}

function Run() {
    for (player in game.state.players) {
        if (game.state.players != {} && player) {
            console.log(game.state.players[player])
            game.MovePlayer(game.state.players[player])
        }
    }
    Draw()
}

function Draw() {
    ctx.clearRect(0,0,50,50)

    for (playerId in game.state.players) {
        const player = game.state.players[playerId]
        ctx.fillStyle = "white"
        for(block of player.body) {
            ctx.fillRect(block.x,block.y,1,1)
        }
    }

    for (fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        ctx.fillStyle = "white"
        ctx.fillRect(fruit.x,fruit.y,1,1)
    }


    requestAnimationFrame(Draw)
}
game.addPlayer({playerId: "player1", body:[{x:10,y:10},{x:10,y:10},{x:10,y:10}], direction: [1,0]})
game.addFruit({fruitId: "fruit1", fruitX: 14, fruitY: 14})
Run()

