let playerID = "P1" // Change to "P2" or "P3" for other players
let balance = 670
let sabotageUsed = false

radio.setGroup(42)

// Send updated balance to terminal
function sendBalance() {
    radio.sendValue("BAL_" + playerID, balance)
}

// Earn: Press A to gain $100 (or 5% chance of $10 if broke)
input.onButtonPressed(Button.A, function () {
    if (balance >= 0) {
        balance += 100
        basic.showString("+100")
    } else {
        if (Math.randomRange(1, 100) <= 5) {
            balance += 10
            basic.showString("+10")
        } else {
            basic.showString("TRY")

        }
    }
    sendBalance()
})

// Spend: Press B to lose $50
input.onButtonPressed(Button.B, function () {
    if (balance >= 50) {
        balance -= 50
        basic.showString("-50")
        sendBalance()
    } else {
        basic.showString("NO $")
    }
})

// Sabotage: Press A+B to attack another player (once per game)
input.onButtonPressed(Button.AB, function () {
    if (sabotageUsed) {
        basic.showString("USED")
        return
    }

    // Set target manually (change to "P2" or "P3" as needed)
    let target = "P2"

    // If target blocks sabotage, set block = true
    let block = false

    radio.sendValue("SAB_" + playerID + "_" + target, block ? 1 : 0)
    sabotageUsed = true
    basic.showString("SAB!")
})
