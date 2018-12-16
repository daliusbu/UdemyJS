/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, diceLast, maxScore;
maxScore = 50;

function reset(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-1-panel').classList.remove('active', 'winner');
    document.querySelector('.player-0-panel').classList.remove('active','winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    gamePlaying = true;
    diceLast = 0;
}

reset();

document.querySelector('.btn-newMaxScore').addEventListener('click', function(){
   maxScore = window.prompt('please enter new max score:');
});

document.querySelector('.btn-roll').addEventListener('click', function(){

    if (gamePlaying){
        var dice = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        if (dice !== 1 && dice2!== 1 ){
            if (diceLast === 6 && dice === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer ).textContent = '0';
                diceLast = 0;
                nextPlayer();
            }else{
                roundScore += (dice + dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                diceLast = dice;
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        diceLast = 0;
        var input = document.querySelector('.input-box').value;
         if (input && !isNaN(input)){
            maxScore = input;
        }else{
             maxScore = 50;
         }

        console.log('Max score is: ' + maxScore);

        if (scores[activePlayer] >= maxScore){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        nextPlayer();
    }
});


function nextPlayer(){
        document.getElementById('current-'+ activePlayer).textContent = '0';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
    }


document.querySelector('.btn-new').addEventListener('click', reset);

