let deck = [];
let deckId
let computerDeck = [];
let playerDeck = [];
let computerScore = 0;
let playerScore = 0;
let computerCard = document.getElementById('computer-card');
let playerCard = document.getElementById('player-card');
const startingPage = document.getElementById('starting-page');
const beforeDeal = document.getElementById('before-deal');
let message = document.getElementById('message')

//First two pages opacity set to 0 so the user can not see them
startingPage.style.opacity = 0;
beforeDeal.style.opacity = 0;

//function to show title
function fadeInTitle() {
    let opacity = parseFloat(startingPage.style.opacity);
    if (opacity < 1) {
      opacity += 0.1;
      startingPage.style.opacity = opacity;
      setTimeout(fadeInTitle, 100);
    }
}  
setTimeout(fadeInTitle, 500);

//function to show the second page
function fadeInSecondPage() {
    document.getElementById('starting-page').style.display = 'none';
    document.getElementById('before-deal').style.display = 'flex';
    let opacity = parseFloat(beforeDeal.style.opacity);
    if (opacity < 1) {
      opacity += 0.1;
      beforeDeal.style.opacity = opacity;
      setTimeout(fadeInSecondPage, 100);
    }
}setTimeout(fadeInSecondPage, 2000);


//button functions

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



//function to get a deck of cards from a api
function getDeckOfCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        deck = data
        console.log(deckId);
    })
}

//function to split the deck into 2 even parts for both the computer and the player
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

//function to show the next card in the computer and player deck.
function showNextCard() {
    computerCard.innerHTML = "";
    playerCard.innerHTML = "";

    const computerCardObj = computerDeck[0];
    const playerCardObj = playerDeck[0];

    computerCard.innerHTML = `<img src=${computerCardObj.image} class="cards" />`;
    playerCard.innerHTML = `<img src=${playerCardObj.image} class="cards" />`;

    const result = compareCards(computerCardObj, playerCardObj);

    if (result === "Computer wins!") {
        computerScore++;
        document.getElementById("computer-score").textContent = computerScore;
        message.textContent = "Computer wins!";
    } else if (result === "You win!") {
        playerScore++;
        document.getElementById("player-score").textContent = playerScore;
        message.textContent = "You win!";
    }

    console.log(result);

    // Remove the first card from the decks
    computerDeck.shift();
    playerDeck.shift();

    // Check if the game is over
    if (computerScore >= computerDeck.length || playerScore >= playerDeck.length) {
        console.log("Game over!");
        document.getElementById('next-card-btn').style.display = 'none';
    }
}


//function to compare computer's card to player's card so see which has a higher value
function compareCards(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        console.log(`${computerScore}`);
        return "Computer wins!";
    } else if (card1ValueIndex < card2ValueIndex) {
        console.log(`${playerScore}`);
        return "You win!";
    } else {
        console.log("War!");
        // Draw four cards from each player's deck
        const computerWarCards = computerDeck.splice(0, 4);
        const playerWarCards = playerDeck.splice(0, 4);

        // Get the fourth card from each player's war cards
        const computerFourthCard = computerWarCards[3];
        const playerFourthCard = playerWarCards[3];

        console.log(`Computer's fourth card: ${computerFourthCard.code}`);
        console.log(`Player's fourth card: ${playerFourthCard.code}`);

        const warResult = compareCards(computerFourthCard, playerFourthCard);

        if (warResult === "Computer wins!") {
            console.log("Computer wins the war!");
            computerDeck.push(...computerWarCards, ...playerWarCards);
            return "Computer wins!";
        } else if (warResult === "You win!") {
            console.log("You win the war!");
            playerDeck.push(...playerWarCards, ...computerWarCards);
            return "You win!";
        } else {
            console.log("Another war!");
            return compareCards(computerFourthCard, playerFourthCard);
        }
    }
}























