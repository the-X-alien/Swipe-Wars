// Balance display
input.onButtonPressed(Button.A, function () {
    basic.showString("P1:" + balances[0])
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("P3:" + balances[0])
})
input.onButtonPressed(Button.B, function () {
    basic.showString("P2:" + balances[0])
})
radio.onReceivedValue(function (name, value) {
    // Balance update
    if (name.substr(0, 4) == "BAL_") {
        player = name.substr(4)
        balances[player] = value
    }
    // Sabotage attempt
    if (name.substr(0, 4) == "SAB_") {
        parts = name.split("_")
        attacker = parts[1]
        target = parts[2]
        block = value == 1
        if (sabotageUsed[attacker]) {
            basic.showString("USED")
            return
        }
        if (block && balances[target] >= 500) {
            balances[target] -= 500
basic.showString("BLOCKED")
        } else {
            if (Math.randomBoolean()) {
                balances[target] = 0
                basic.showString("ZAP!")
            } else {
                basic.showString("MISS")
            }
        }
        sabotageUsed[attacker] = true
    }
})
// Chaos tile: logo press
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    for (let player2 of Object.keys(balances)) {
        let change = Math.randomBoolean() ? 200 : -200
balances[player2] += change
radio.sendValue("BAL_" + player2, balances[player2])
    }
    basic.showString("CHAOS")
})
let block = false
let target = ""
let attacker = ""
let parts: string[] = []
let player = ""
let balances: { [key: string]: number } = {
    "P1": 670,
    "P2": 670,
    "P3": 670
}
let sabotageUsed: { [key: string]: boolean } = {
    "P1": false,
    "P2": false,
    "P3": false
}
radio.setGroup(42)
