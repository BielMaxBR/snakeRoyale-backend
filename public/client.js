var socket = io()
// $('form').submit(function(e) {
//     e.preventDefault()
//     socket.emit("nick", $('#nick').val());
//     $('#nick').val('');
// })
var canvas, ctx, WIDTH, HEIGHT, tileSize;
window.addEventListener("keydown", keyDown)

function keyDown(e) {}
function init() {
    canvas = document.createElement("canvas")
    resizeWindow()
    document.body.appendChild(canvas)
    ctx = canvas.getContext("2d");

    // newGame()
    // frisk.update()
    // run()
}

function resizeWindow() {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    canvas.width = 500
    canvas.height = 500

    tileSize = 10
}
init()