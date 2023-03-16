// War Card Game
while (computerDeck.length > 0 && playerDeck.length > 0) {
    let computerCard = computerDeck.shift();
    let playerCard = playerDeck.shift();
    console.log("Computer Card:", computerCard);
    console.log("Player Card:", playerCard);

    let computerValue = getValue(computerCard);
    let playerValue = getValue(playerCard);

    if (computerValue > playerValue) {
        console.log("Computer Wins!");
        computerDeck.push(computerCard, playerCard);
    } else if (playerValue > computerValue) {
        console.log("Player Wins!");
        playerDeck.push(computerCard, playerCard);
    } else {
        console.log("War!");
        let warCards = [computerCard, playerCard];
        while (computerValue === playerValue) {
            if (computerDeck.length < 4 || playerDeck.length < 4) {
                console.log("Not enough cards for war!");
                return;
            }
            for (let i = 0; i < 4; i++) {
                warCards.push(computerDeck.shift());
                warCards.push(playerDeck.shift());
            }
            computerCard = computerDeck.shift();
            playerCard = playerDeck.shift();
            console.log("Computer Card:", computerCard);
            console.log("Player Card:", playerCard);
            computerValue = getValue(computerCard);
            playerValue = getValue(playerCard);
        }
        if (computerValue > playerValue) {
            console.log("Computer Wins War!");
            computerDeck.push(...warCards);
        } else {
            console.log("Player Wins War!");
            playerDeck.push(...warCards);
        }
    }
}

if (computerDeck.length === 0) {
    console.log("Player Wins the Game!");
} else {
    console.log("Computer Wins the Game!");
}

// Helper Function to Get Card Value
function getValue(card) {
    let value = card.split(' ')[0];
    if (isNaN(value)) {
        switch (value) {
            case 'ace':
                return 14;
            case 'jack':
                return 11;
            case 'queen':
                return 12;
            case 'king':
                return 13;
        }
    }
    return parseInt(value);
}