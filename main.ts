let rows = 0
let spawn = 0
let shot: game.LedSprite = null
let enemy: game.LedSprite = null
let clear = 0
let player = game.createSprite(2, 4)
let speed = 500
basic.forever(function () {
    if (clear == 0) {
        basic.pause(3000)
        enemy = game.createSprite(randint(0, 4), 0)
        clear = 1
    }
})
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) < 400) {
        player.change(LedSpriteProperty.X, -1)
        basic.pause(50)
    }
    if (pins.analogReadPin(AnalogPin.P0) > 600) {
        player.change(LedSpriteProperty.X, 1)
        basic.pause(50)
    }
    if (pins.analogReadPin(AnalogPin.P2) < 597) {
        shot = game.createSprite(player.get(LedSpriteProperty.X), 4)
        for (let index = 0; index < 5; index++) {
            shot.change(LedSpriteProperty.Y, -1)
            basic.pause(80)
        }
        shot.delete()
    }
})
basic.forever(function () {
    if (clear == 1) {
        spawn = 1
        if (enemy.isTouching(shot)) {
            enemy.delete()
            game.addScore(1)
            clear = 0
            rows = 0
            spawn = 0
        }
    }
})
basic.forever(function () {
    if (spawn == 1) {
        if (enemy.isTouching(player)) {
            game.gameOver()
        }
        enemy.move(1)
        rows += 1
        speed += -5
        basic.pause(speed)
        enemy.ifOnEdgeBounce()
        if (rows > 15 && enemy.isTouchingEdge()) {
            enemy.change(LedSpriteProperty.Y, 1)
        }
    }
})
