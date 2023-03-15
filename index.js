let deck = []
let deckId
let computerDeck = [];
let playerDeck = [];
let computerScore = 0;
let playerScore = 0;
let remainingCards = document.getElementById('remainingCards')



function getDeckOfCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        remainingCards.textContent = `remaining cards: ${data.remaining}`
        deckId = data.deck_id
        console.log(deckId)
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
    })
}



document.getElementById('draw-cards-btn').addEventListener('click', function() {
    drawCards()
    document.getElementById('before-deal').style.display = 'none'
    document.getElementById('game-display').style.display = 'block'
})














function displayRules() {
    document.getElementById('starting-page').style.display = 'none';
    document.getElementById('rules').style.display = 'block';
} setTimeout(displayRules, 1000)



document.getElementById('start-game').addEventListener('click', function() {
    document.getElementById('rules').style.display = 'none';
    document.getElementById('before-deal').style.display = 'flex';
    getDeckOfCards()
})


