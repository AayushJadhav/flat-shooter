import Canvas from "./js/canvas.js"
import Sound from "./js/sound.js"
import Player from "./js/player.js"
import Enemy from "./js/enemy.js"

export const gameMenu = document.getElementById("game-menu")
export const gameArea = document.getElementById("game-area")
export const endgameArea = document.getElementById("endgame-area")
export const c = new Canvas(innerWidth, innerHeight, gameArea)

const startBtn = document.getElementById("start-btn")
const endScore = document.getElementById("end-score")

const enemies = []

const hitSound = new Sound("./sounds/basketball_hit.wav", gameArea)

var gameState = -1

var score = 0

var player
var timeInterval = null

addEventListener('resize', () => {
    c.resize(innerWidth, innerHeight)
})

document.body.onload = initialScreenSetup()

function initialScreenSetup() {
    gameMenu.style.display = "flex"
    gameArea.style.display = "none"
    endgameArea.style.display = "none"

    startBtn.onclick = () => {
        gameState = 0
        startGame()
    }
}

function startGame() {
    gameMenu.style.display = "none"
    gameArea.style.display = "flex"
    endgameArea.style.display = "none"

    player = new Player(generateRandomColor())

    window.addEventListener('mousedown', ({ clientX, clientY }) => {
        shootBullet(clientX, clientY)
    })

    timeInterval = setInterval(generateEnemies, 2000)

    requestAnimationFrame(draw)
}

function endgameSetup() {
    gameMenu.style.display = "none"
    gameArea.style.display = "none"
    endgameArea.style.display = "flex"

    endScore.innerHTML = `Your score is ${score} <br> press ctrl+R to replay...`
}

function draw() {
    requestAnimationFrame(draw)
    if (gameState == 0) {
        c.draw()
        player.draw()

        c.ctx.font = "30px monospace"
        c.ctx.fillStyle = "white"
        c.ctx.fillText(`Score: ${score}`, 10, 40)

        drawEnemies()
        destroyEnemies(player.bulletArray)
        checkLose();
    } else if (gameState == 1) {
        c.clear()
    }
}

function generateRandomColor() {
    var redValue = Math.round(Math.random() * 255)

    var greenValue = Math.round(Math.random() * 255)

    var blueValue = Math.round(Math.random() * 255)

    return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

function generateEnemies() {
    var canvasWidth = c.canvas.width
    var canvasHeight = c.canvas.height

    var edge = Math.round(Math.random() * 3)
    var xPos, yPos;

    /**
     * 0 = left edge
     * 1 = top edge
     * 2 = right edge
     * 3 = bottom edge
     * ----clockwise direction
     */

    switch (edge) {
        case 0:
            xPos = 0
            yPos = Math.round(Math.random() * canvasHeight)
            break;
        case 1:
            xPos = Math.round(Math.random() * canvasWidth)
            yPos = 0
            break;
        case 2:
            xPos = canvasWidth
            yPos = Math.round(Math.random() * canvasHeight)
            break;
        case 3:
            xPos = Math.round(Math.random() * canvasWidth)
            yPos = canvasHeight
            break;
    }

    var radius = Math.round(Math.random() * 5) * 10
    if (radius == 0) {
        radius += 10
    }

    var color = generateRandomColor()

    var enemy = new Enemy(xPos, yPos, radius, color)

    assignVelocity(player.pos.x, player.pos.y, enemy)

    enemies.push(enemy)
}

function drawEnemies() {
    enemies.forEach(enemy => {
        enemy.draw()
    })
}

function assignVelocity(destinationX, destinationY, obj) {
    //dist. between player and obj, might be +ve / -ve
    var d_x = destinationX - obj.pos.x
    var d_y = destinationY - obj.pos.y

    //velocity depending upon radius of obj since we don't want larger circles running like bears.
    var a = d_x / (obj.radius * 8)
    var b = d_y / (obj.radius * 8)

    obj.velocity.x = a
    obj.velocity.y = b
}

function destroyEnemies(bulletArr) {
    for (let j = 0; j < bulletArr.length; j++) {
        for (let i = 0; i < enemies.length; i++) {
            if (checkCollision(bulletArr[j], enemies[i])) {
                switch (enemies[i].radius) {
                    case 10:
                        score += 100
                        break;
                    case 20:
                        score += 80
                        break;
                    case 30:
                        score += 60
                        break;
                    case 40:
                        score += 40
                        break;
                    case 50:
                        score += 20
                        break;
                    default:
                        score += 20
                        break;
                }

                bulletArr.splice(j, 1)
                enemies.splice(i, 1)
                hitSound.play()
            }
        }
    }
}

function checkLose() {
    enemies.forEach(enemy => {
        if (checkCollision(player, enemy)) {
            gameState = 1
            endgameSetup()
        }
    })
}

function shootBullet(mouseX, mouseY) {
    var d_x = mouseX - player.pos.x
    var d_y = mouseY - player.pos.y

    var a = d_x / 70
    var b = d_y / 70

    player.shoot(a, b, generateRandomColor())
}

function checkCollision(o1, o2) {
    if (o1.pos.x + o1.radius >= o2.pos.x - o2.radius && o1.pos.x - o1.radius <= o2.pos.x + o2.radius &&
        o1.pos.y + o1.radius >= o2.pos.y - o2.radius && o1.pos.y - o1.radius <= o2.pos.y + o2.radius) {
        return true
    } else {
        return false
    }
}