
'use strict';

alert(' - RULE -\n1. You will lose current points when you got "1" of dice.\n' +
    '2. You can add current points to your score when you push HOLD button. But your turn will be end at that time.\n' +
    '3. Who reached to 50 points will win.');

var scores, roundScore, activePlayer, game;
var diceDOM = document.querySelector('.dice');

init();


// throw a dice when users click a button 'roll dice'
document.querySelector('.btn-roll').addEventListener('click', function (){
    if(game){
        var dice = Math.floor(Math.random()*6) + 1;

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
    }

});

// add current points to score
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(game){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        roundScore = 0;

        if(scores[activePlayer] >= 50){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            game = false;
        }else {
            diceDOM.style.display = 'none';
            nextPlayer();
        }
    }

})

// restart game
document.querySelector('.btn-new').addEventListener('click', init);


// initialize this game
function init() {
    game = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    diceDOM.style.display = 'none';

    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// switch to next player
function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');


}