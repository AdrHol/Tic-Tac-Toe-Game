// modal animation

const startButton = document.querySelector('#start');
const gameModeModal = document.querySelector('#gamemode-modal');
const firstPlayerModal = document.querySelector('#firstPlayer-modal');
const secondPlayerModal = document.querySelector('#secondPlayer-modal');
const firstPlayerButton = document.querySelector('#firstPlayer-button');
const secondPlayerButton = document.querySelector('#secondPlayer-button');
const dashboard = document.querySelector('.dashboard');
const modalDisplayContainer = document.querySelector('.modal-background');


startButton.addEventListener('click', function(){
    const startModal = document.querySelector('#start-modal');
    startModal.style.transform = 'translateX(-100vw)';
    gameModeModal.style.transform = 'translateX(0%)';
})

const multiplayerButton = document.querySelector('#multiplayer');

multiplayerButton.addEventListener('click', function(){
    gameModeModal.style.transform = 'translateX(-100vw)';
    firstPlayerModal.style.transform = 'translateX(0%)';
})

firstPlayerButton.addEventListener('click', function(){
    const input = document.querySelector('#player-one')
    playerOne = playerCreator(input.value, 'O', 'one');
    firstPlayerModal.style.transform = 'translateX(-100vw)';
    secondPlayerModal.style.transform = 'translateX(0%)';
})

secondPlayerButton.addEventListener('click', function(){
    const input = document.querySelector('#player-two')
    playerTwo = playerCreator(input.value, 'X', 'two');
    secondPlayerModal.style.transform = 'translateX(-100vw)';
    dashboard.style.transform = 'translateX(0)';
    modalDisplayContainer.style.display = 'none';
    gameplay();
})


const playerCreator = function (name, mark, player) {
    let nickname = name;
    let score = 0; 
    const nameDOM = document.querySelector(`#player-${player}-name`);
    const scoreDOM = document.querySelector(`#player-${player}-score`);
    let printing = function(){ 
        nameDOM.textContent = nickname;
        scoreDOM.textContent = score;
    };

    let win = function(){
        score++;

        const gameStatus = document.querySelector('.game-status');
        const gameResult = document.querySelector('#game-result');

        gameStatus.style.display = 'flex';
        gameResult.textContent = `${nickname} has won this round!`

        const endGame = document.getElementById('end');

        endGame.addEventListener('click', function(){
            window.location.reload();
        })

        const nextRound = document.getElementById('next-round');
        nextRound.addEventListener('click', function(){
            gameStatus.style.display = 'none';
            gameboard.reset();
            gameboard.display();
        })
    };
    let draw = function(){
        const gameStatus = document.querySelector('.game-status');
        const gameResult = document.querySelector('#game-result');

        gameStatus.style.display = 'flex';
        gameResult.textContent = `It's a draw !`

        const endGame = document.getElementById('end');

        endGame.addEventListener('click', function(){
            window.location.reload();
        })

        const nextRound = document.getElementById('next-round');
        nextRound.addEventListener('click', function(){
            gameStatus.style.display = 'none';
            gameboard.reset();
            gameboard.display();
        })
    };

    let turnIndicator = function(){
        if (nameDOM.classList.contains('active-player')){
            nameDOM.removeAttribute('class');
            scoreDOM.removeAttribute('class');
        } else {
            nameDOM.setAttribute('class', 'active-player');
            scoreDOM.setAttribute('class', 'active-player');
        }


    };


    let playerMove = function(cords) {
        let y = `y${cords[2]}`;
                gameboard[`${y}`][Number(cords[0])] = this.mark;
                gameboard.display();
                gameboard.winRecognition();
                if (gameboard.winRecognition() === 'win') {
                    win()
                    printing();
                } else if (gameboard.winRecognition() === 'draw') {
                    draw();
                }
    };

    return {
        name: name,
        mark: mark,
        print: printing,
        indicator: turnIndicator,
        playerMove,
    }
};

let playerOne;
let playerTwo;

const gameboard = {
    y1: ['','','',],
    y2: ['','','',],
    y3: ['','','',],
    
    reset: function() {
        this.y1[0] = '';
        this.y2[0] = '';
        this.y3[0] = '';
        this.y1[1] = '';
        this.y2[1] = '';
        this.y3[1] = '';
        this.y1[2] = '';
        this.y2[2] = '';
        this.y3[2] = '';
    },

    winRecognition: function(){
        let winStatus = false;
        
        if ((this.y1[0] != '' && this.y1[0] == this.y1[1] && this.y1[0] == this.y1[2]) || (this.y2[0] != '' && this.y2[0] == this.y2[1] && this.y2[0] == this.y2[2]) || (this.y3[0] != '' && this.y3[0] == this.y3[1] && this.y3[0] == this.y3[2])){
            winStatus = true;
        } else if ((this.y1[0] != '' && this.y1[0] == this.y2[0] && this.y1[0] == this.y3[0]) || (this.y1[1] != '' && this.y1[1] == this.y2[1] && this.y1[1] == this.y3[1] || (this.y1[2] != '' && this.y1[2] == this.y2[2] && this.y1[2] == this.y3[2]))){
            winStatus = true; 
        } else if ((this.y2[1] != '' && this.y2[1] == this.y1[0] && this.y2[1] == this.y3[2]) || (this.y2[1] != '' && this.y2[1] == this.y1[2] && this.y2[1] == this.y3[0])) {
            winStatus = true; 
        }

        if (winStatus === true) {
            return 'win';
        } else if (winStatus === false){
            if((!this.y1.includes('')) && (!this.y2.includes('')) && (!this.y3.includes(''))) {
                return 'draw';
            }
        }

        
    },
    
    display: function() {
        this.y1.forEach(function(value, index) {
           const field = document.getElementById(`${index},1`);
            field.textContent = value;
        });
        this.y2.forEach(function(value, index) {
            const field = document.getElementById(`${index},2`);
             field.textContent = value;
         });
         this.y3.forEach(function(value, index) {
            const field = document.getElementById(`${index},3`);
             field.textContent = value;
         });
    }

}


const gameplay = (function(){
    playerOne.print();
    playerTwo.print();

    let currentPlayerMove = 'p1' ;

    
    function playRound() {

        playerOne.indicator();

        window.addEventListener('click', function(e){
            if (e.target.classList.contains('field') && currentPlayerMove === 'p1'){
                if (e.target.textContent == ''){
                    playerOne.playerMove(e.target.id);
                    currentPlayerMove = 'p2';
                    playerOne.indicator();
                    playerTwo.indicator();
                }

            } else if (e.target.classList.contains('field') && currentPlayerMove === 'p2'){
                if (e.target.textContent == ''){
                    playerTwo.playerMove(e.target.id);  
                    currentPlayerMove = 'p1';
                    playerTwo.indicator();
                    playerOne.indicator();
                }
                
            }
        })


    }

    playRound();

    });
 