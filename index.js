let deck = [];
let deckId
let computerDeck = [];
let playerDeck = [];
let computerScore = 0;
let playerScore = 0;
let remainingCards = document.getElementById('remainingCards');
let computerCard = document.getElementById('computer-card');
let playerCard = document.getElementById('player-card');


function displayRules() {
    document.getElementById('starting-page').style.display = 'none';
    document.getElementById('before-deal').style.display = 'flex';
} setTimeout(displayRules, 1000);

document.getElementById('start-game-btn').addEventListener('click', function() {
    document.getElementById('before-deal').style.display = 'none';
    document.getElementById('game-display').style.display = 'block';
    getDeckOfCards();
})

document.getElementById('rules-btn').addEventListener('click', function() {
    document.getElementById('rules').style.display = 'block';
})

document.getElementById('close-rules').addEventListener('click', function() {
    document.getElementById('rules').style.display = 'none';
})

document.getElementById('deal-cards-btn').addEventListener('click', function() {
    console.log('dealt');
    drawCards() ;
    document.getElementById('deal-cards-btn').style.display = 'none';
    document.getElementById('next-card-btn').style.display = 'block';
})

document.getElementById('next-card-btn').addEventListener('click', function() {
    console.log('next card');
    showNextCard();
})



function getDeckOfCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        deck = data
        console.log(deckId);
    })
}


function drawCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
    .then(res => res.json())
    .then(data => {
        deck = data.cards
            for (let i = 0; i < deck.length; i++) {
                if(i % 2 === 0) {
                    computerDeck.push(deck[i]);
                } else {
                    playerDeck.push(deck[i]);
                }
            }
        console.log(computerDeck)
        console.log(playerDeck)
        document.getElementById("computer-score").textContent = 0;
        document.getElementById("player-score").textContent = 0;
        showNextCard();
    })
}


function showNextCard() {
    computerCard.innerHTML = "";
    playerCard.innerHTML = "";
    
    const computerCardObj = computerDeck[0];
    const playerCardObj = playerDeck[0];
    
    computerCard.innerHTML = `<img src=${computerCardObj.image} class="cards" />`;
    playerCard.innerHTML = `<img src=${playerCardObj.image} class="cards" />`;
    
    const result = compareCards(computerCardObj, playerCardObj);
    
    if (result === "Computer wins!") {
        document.getElementById("computer-score").textContent = computerScore;
    } else if (result === "You win!") {
        document.getElementById("player-score").textContent = playerScore;
    }
    
    console.log(result);
    
    // Increment the scores and check if the game is over
    computerScore++;
    playerScore++;
    if (computerScore >= computerDeck.length || playerScore >= playerDeck.length) {
        console.log("Game over!");
        document.getElementById('next-card-btn').style.display = 'none';
    }
}


function compareCards(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++;
        console.log(`${computerScore}`);
        return "Computer wins!";
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore++;
        console.log(`${playerScore}`);
        return "You win!";
    } else {
        return "War!";
    }
}
























