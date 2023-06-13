import { c } from "../script.js";

export default class Enemy {
    constructor(x, y, radius, colour) {
        this.pos = {
            x: x,
            y: y
        }
        this.radius = radius
        this.color = colour
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y

        c.ctx.beginPath()
        c.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.ctx.fillStyle = this.color
        c.ctx.fill()
        c.ctx.closePath()
    }
}