export default class Canvas {
    constructor(width, height, gameArea) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        this.ctx = this.canvas.getContext("2d")
        gameArea.appendChild(this.canvas)
    }

    draw() {
        this.ctx.fillStyle = "rgba(0, 0, 0, .1)"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    resize(width, height) {
        this.canvas.width = width
        this.canvas.height = height
    }
}