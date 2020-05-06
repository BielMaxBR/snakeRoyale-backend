export default function CreateKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
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
            type: 'direct-player',
            playerId: state.playerId,
            keyPressed: key
        }
        notifyAll(command)
    }
    return {
        subscribe,
        registerPlayerId
    }

}
