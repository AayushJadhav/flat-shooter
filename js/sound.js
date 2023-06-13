export default class Sound {
    constructor(src, gameArea) {
        this.sound = document.createElement("audio")
        this.sound.src = src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.style.display = "none"
        gameArea.appendChild(this.sound)
    }

    play() {
        this.sound.play()
    }

    pause() {
        this.sound.pause()
    }
}