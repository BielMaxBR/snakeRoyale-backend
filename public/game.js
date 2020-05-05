export default function CreateGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 50,
            height: 50
        }
    }
    
    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
            
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        function CreateDirection() {
            
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const Loteria = getRandomInt(1,4)
            if (Loteria == 1) {
                return [-1,0]
            }
            else if (Loteria == 2) {
                return [0,-1]
            }
            else if (Loteria == 3) {
                return [1,0]
            }
            else if (Loteria == 4) {
                return [0,1]
            }


        }
        
        const x = Math.floor(Math.random() * state.screen.width)
        const y = Math.floor(Math.random() * state.screen.height)
        const playerBody = 'body' in command ? command.body : [{x:x,y:y},{x:x,y:y},{x:x,y:y}]
        const playerDirection = 'direction' in command ? command.direction : CreateDirection()

        state.players[playerId] = {
                playerId: playerId,
                body: playerBody,
                direction: playerDirection
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            body: playerBody,
            direction: playerDirection
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type:"remove-player",
            playerId: playerId
        })
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
        console.log(state.players[player].direction)

    }
    function MovePlayer(command) {
        function LocalMove() {
            const playerId = command.playerId
            const playerBody = state.players[playerId].body
            const playerDirection = state.players[playerId].direction
            var nextPos = {
                x: playerBody[0].x + playerDirection[0],
                y: playerBody[0].y + playerDirection[1]
            }
        
         
            playerBody.pop()
            playerBody.splice(0,0, nextPos)

            if (playerBody[0].x > state.screen.width-1) {
                playerBody[0].x = 0
            }
            if (playerBody[0].x < 0) {
                playerBody[0].x = state.screen.width
            }
            if (playerBody[0].y > state.screen.height-1) {
                playerBody[0].y = 0
            }
            if (playerBody[0].y < 0) {
                playerBody[0].y = state.screen.height
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
        subscribe,
        setState,
        state
    }
}