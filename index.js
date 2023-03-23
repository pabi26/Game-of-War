let deck = [];
let deckId
let computerDeck = [];
let playerDeck = [];
let computerScore = 0;
let playerScore = 0;
let computerWonDeck = [];
let playerWonDeck = [];
let computerWarCards = [];
let playerWarCards = [];
let computerCard = document.getElementById('computer-card');
let playerCard = document.getElementById('player-card');
const startingPage = document.getElementById('starting-page');
const beforeDeal = document.getElementById('before-deal');
let message = document.getElementById('message')
let computerWarHands = document.getElementById('compter-war-cards');
let playerWarHands = document.getElementById('player-war-cards')
let computerForthCard = document.getElementById('computer-forth-card')
let playerForthCard = document.getElementById('player-forth-card')
let warMessage = document.getElementById('war-message')
let warTitle = document.getElementById('war-title')
let warBattle = document.getElementById('battle')
let beforeFaceOff = document.getElementById('before-faceoff')
let warFaceOff = document.getElementById('war-face-off')




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

    let computerCardObj = computerDeck[0];
    let playerCardObj = playerDeck[0];

    computerCard.innerHTML = `<img src=${computerCardObj.image} class="cards" />`;
    playerCard.innerHTML = `<img src=${playerCardObj.image} class="cards" />`;

    let result = compareCards(computerCardObj, playerCardObj);

    let removedComputerCard =  computerDeck.shift();
    let removedPlayerCard = playerDeck.shift();

    if (result === "Computer wins!") {
        computerScore++;
        document.getElementById("computer-score").textContent = computerScore;
        message.textContent = "Computer wins!";
        computerWonDeck.push(removedComputerCard,removedPlayerCard);
        console.log(computerWonDeck)
    } else if (result === "You win!") {
        playerScore++;
        document.getElementById("player-score").textContent = playerScore;
        message.textContent = "You win!";
        playerWonDeck.push(removedPlayerCard,removedComputerCard)
        console.log(playerWonDeck)
    }

    console.log(result);


    // Check if the game is over
    if (computerDeck.length === 0|| playerDeck.length === 0) {
        console.log("Game over!");
        document.getElementById('next-card-btn').style.display = 'none';
        console.log(playerDeck);
        console.log(computerDeck);
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
       WAR()
    }
}

function drawFifthCard() {
    let computerFifthCard = [];
    let playerFifthCard = [];
    computerFifthCard = computerDeck.shift();
    playerFifthCard = playerCard.shift();

    computerForthCard.innerHTML = `<img src=${computerFifthCard.image} class = "cards" />`;
    playerForthCard.innerHTML = `<img src=${playerFifthCard.image} class = "cards" />`;

    let warWarResults = compareCards(computerFifthCard,playerFifthCard);
    if (warWarResult === "Computer wins!") {
        warMessage.textContent = "Computer wins the war!";
        computerWonDeck.push(...computerWarCards, ...playerWarCards,computerFifthCard,playerFifthCard);
        return "Computer wins!";
    } else if (warWarResult === "You win!") {
        warMessage.textContent = "You win the war!";
        playerWonDeck.push(...playerWarCards, ...computerWarCards,computerFifthCard,playerFifthCard);
        return "You win!";
    }
}



function WAR(){
    if(computerDeck.length < 4 && playerDeck.length < 4) {
        message.textContent = "Not enough cards for war";
    } else {
        message.textContent = "War!" ;

        document.getElementById('war').style.display = 'block'

        setTimeout(function() {
            warTitle.style.display = 'none'
        }, 4000)

     
        setTimeout(function() {
            warBattle.style.display = 'flex'
        }, 4000)

        setTimeout(function() {
            warFaceOff.style.display = 'block'
        }, 6000)


        setTimeout(function() {
            document.getElementById('war').style.display = 'none'
            warTitle.style.display = 'flex'
            warBattle.style.display = 'none'
            warFaceOff.style.display = 'none'
        }, 9000)


        // Draw four cards from each player's deck
        computerWarCards = computerDeck.splice(0, 4);
        playerWarCards = playerDeck.splice(0, 4);

        
        computerWarHands.innerHTML =
        `
        <div id = "computer-first-card">
            <img src=${computerWarCards[0].image} class = "cards" />
        </div>
        <div id = "computer-second-card">
            <img src=${computerWarCards[1].image} class = "cards" />
        </div>
        <div id = "computer-third-card">
            <img src=${computerWarCards[2].image} class = "cards" />
        </div>
        
        `

        playerWarHands.innerHTML =
        `
        <div id = "player-first-card">
            <img src=${playerWarCards[0].image} class = "cards" />
        </div>
        <div id = "player-second-card">
            <img src=${playerWarCards[1].image} class = "cards" />
        </div>
        <div id = "player-third-card">
            <img src=${playerWarCards[2].image} class = "cards" />
        </div>
        
        `
        
        // Get the fourth card from each player's war cards
        
        computerForthCard.innerHTML = `<img src=${computerWarCards[3].image} class = "cards" />`;
        playerForthCard.innerHTML = `<img src=${playerWarCards[3].image} class = "cards" />`;


        let warResult = compareCards(computerWarCards[3], playerWarCards[3]);

        if (warResult === "Computer wins!") {
            warMessage.textContent = "Computer wins the war!";
            computerWonDeck.push(...computerWarCards, ...playerWarCards);
            return "Computer wins!";
        } else if (warResult === "You win!") {
            warMessage.textContent = "You win the war!";
            playerWonDeck.push(...playerWarCards, ...computerWarCards);
            return "You win!";
        } else {
            warMessage.textContent = "Another war!";
            drawFifthCard()
        }

        computerWarCards = [];
        playerWarCards = [];
        computerForthCard = [];
        playerForthCard = [];
    }

}

















