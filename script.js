function calculateChange() {
    const amountInput = document.getElementById('amount').value;
    const denominationsInput = document.getElementById('denominations').value;

    let amount = parseInt(amountInput);
    let denominations = denominationsInput.split(',').map(Number);

    // Validation
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').innerHTML = "Please enter a valid amount.";
        document.getElementById('result').style.display = "block";
        return;
    }

    if (denominations.some(isNaN)) {
        document.getElementById('result').innerHTML = "Please enter valid denominations.";
        document.getElementById('result').style.display = "block";
        return;
    }

    // Sort denominations in descending order (Greedy strategy)
    denominations.sort((a, b) => b - a);

    let result = [];
    let totalCoins = 0;

    // Greedy Algorithm
    for (let i = 0; i < denominations.length; i++) {
        let coin = denominations[i];
        if (amount >= coin) {
            let count = Math.floor(amount / coin);
            amount -= count * coin;
            totalCoins += count;
            result.push(`${count} coin(s) of ${coin}`);
        }
    }

    // Display Result
    if (amount > 0) {
        document.getElementById('result').innerHTML = "The exact amount cannot be formed with the given denominations.";
    } else {
        document.getElementById('result').innerHTML = `Minimum coins required: ${totalCoins} <br> Coins used: <br> ${result.join('<br>')}`;
    }
    document.getElementById('result').style.display = "block";
}
