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

    function fruitSpawn() {
        const segundos = 4
        const frequency = segundos*1000

        setInterval(addFruit, frequency)
    }

    function MoveLoop() {  
        setInterval(() => {
            if (state.players.length != {}) {
            for(const playerId in state.players) {
                const player = state.players[playerId]
                MovePlayer(player)
            }
        }
        }, 100)
    }


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
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 1000000000000000000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.fruits[fruitId] = {
                fruitId: fruitId,
                x: fruitX,
                y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId
        })
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]
        for(const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            
            if (player.body[1].x === fruit.x && player.body[1].y === fruit.y ) {
                notifyAll({
                    type:'collision-fruit',
                    playerId: playerId
                })
                
                removeFruit({ fruitId: fruitId })
                playerIncrease(playerId)
            }
        }
    
    }

    function playerIncrease(playerId) {
        const player = state.players[playerId]
        player.body.splice(0,0,player.body[0])
    }
    
    function PlayerDirection(command) {

        notifyAll(command)
        // console.log(command)
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

        const playerId = command.playerId
        const playerBody = command.body
        const playerDirection = command.direction
        // console.log(playerBody, 'começo')
        
        notifyAll({
            type: 'move-player',
            playerId : playerId,
            body: playerBody,
            direction: playerDirection
        })
        var nextPos = {
            x: state.players[playerId].body[0].x + state.players[playerId].direction[0],
            y: state.players[playerId].body[0].y + state.players[playerId].direction[1]
            
        }
        playerBody.pop()
        playerBody.splice(1,0, nextPos)

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

        if (nextPos.x == playerBody[2].x && nextPos.y == playerBody[2].y) {
            nextPos = [playerBody[1].x + playerDirection[0]*-1,playerBody[1].y + playerDirection[1]*-1]
        }

        const newDirection = {
            type: 'move-player',
            playerId : playerId,
            body: playerBody,
            direction: playerDirection
        }
        state.players[playerId] = newDirection
        
        // console.log(playerBody , 'final')
        checkForFruitCollision(playerId)
    }
    return {
        PlayerDirection,
        removePlayer,
        removeFruit,
        fruitSpawn,
        MovePlayer,
        addPlayer,
        subscribe,
        MoveLoop, 
        addFruit,
        setState,
        state,
    }
}