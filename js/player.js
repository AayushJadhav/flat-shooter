import { c } from "../script.js"

class Bullet {
    constructor(x, y, radius, veloX, veloY, colour) {
        this.pos = {
            x: x,
            y: y
        }

        this.radius = radius

        this.velocity = {
            x: veloX,
            y: veloY
        }

        this.color = colour

    }

    draw() {
        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y

        c.ctx.beginPath()
        c.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.ctx.fillStyle = "rgb(240, 66, 34)"
        c.ctx.fill()
        c.ctx.closePath()
    }
}

export default class Player {
    constructor(colour) {
        this.pos = {
            x: c.canvas.width / 2,
            y: c.canvas.height / 2
        }
        this.radius = 40
        this.color = colour
        this.bulletArray = []
    }

    draw() {
        this.bulletArray.forEach(bullet => {
            bullet.draw()
        })

        c.ctx.beginPath()
        c.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.ctx.fillStyle = this.color
        c.ctx.fill()
        c.ctx.closePath()
    }

    shoot(veloX, veloY, color) {
        this.bulletArray.push(new Bullet(this.pos.x, this.pos.y, 10, veloX, veloY, color))
    }
}