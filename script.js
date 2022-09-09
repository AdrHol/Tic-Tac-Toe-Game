
const game = (function(){               //iife containing game interface controls;
    
    const startButton = document.querySelector('#start');
    const gameModeModal = document.querySelector('#gamemode-modal');
    const firstPlayerModal = document.querySelector('#firstPlayer-modal');
    const secondPlayerModal = document.querySelector('#secondPlayer-modal');
    const firstPlayerButton = document.querySelector('#firstPlayer-button');
    const secondPlayerButton = document.querySelector('#secondPlayer-button');
    const dashboard = document.querySelector('.dashboard');
    const modalDisplayContainer = document.querySelector('.modal-background');
    const singlePlayer = document.getElementById('singleplayer');
    const difficultyModal = document.querySelector('#difficulty-modal');


    startButton.addEventListener('click', function(){
        const startModal = document.querySelector('#start-modal');
        startModal.style.transform = 'translateX(-100vw)';
        gameModeModal.style.transform = 'translateX(0%)';
    });

    const multiplayerButton = document.querySelector('#multiplayer');

    multiplayerButton.addEventListener('click', function(){
        gameModeModal.style.transform = 'translateX(-100vw)';
        firstPlayerModal.style.transform = 'translateX(0%)';
    });

    firstPlayerButton.addEventListener('click', function(){
        const input = document.querySelector('#player-one')
        playerOne = playerCreator(input.value, 'O', 'one');
        firstPlayerModal.style.transform = 'translateX(-100vw)';
        secondPlayerModal.style.transform = 'translateX(0%)';
    });

    secondPlayerButton.addEventListener('click', function(){
        const input = document.querySelector('#player-two')
        playerTwo = playerCreator(input.value, 'X', 'two');
        secondPlayerModal.style.transform = 'translateX(-100vw)';
        dashboard.style.transform = 'translateX(0)';
        modalDisplayContainer.style.display = 'none';
        gameplay();
    });


    singlePlayer.addEventListener('click', function(){
        gameModeModal.style.transform = 'translateX(-100vw)';
        difficultyModal.style.transform = 'translateX(0%)';
    });


    const begginerModeStart = document.querySelector('#begginer');

    begginerModeStart.addEventListener('click', function(){
        const human = document.querySelector('#human-name');
        playerOne = playerCreator(human.value, 'O', 'one');
        difficultyModal.style.transform = 'translateX(-100vw)';
        dashboard.style.transform = 'translateX(0)';
        modalDisplayContainer.style.display = 'none';
        crazyFrogMode();
    });

    const proModeStart = document.querySelector('#pro');

    proModeStart.addEventListener('click', function(){
        const human = document.querySelector('#human-name');
        playerOne = playerCreator(human.value, 'O', 'one');
        difficultyModal.style.transform = 'translateX(-100vw)';
        dashboard.style.transform = 'translateX(0)';
        modalDisplayContainer.style.display = 'none';
        skyNetMode();
    })
    })();


const playerCreator = function (name, mark, player) {                       //player creation factory function
    let nickname = name;
    let score = 0; 
    const nameDOM = document.querySelector(`#player-${player}-name`);
    const scoreDOM = document.querySelector(`#player-${player}-score`);

    let printing = function(){                                              // method responsible for displaying result
        nameDOM.textContent = nickname;
        scoreDOM.textContent = score;
    };

    let win = function(){                                                   // method responsible for assigning points after win
        score++;
        gameboard.changeStatus = 'inactive';
        const gameStatus = document.querySelector('.game-status');
        const gameResult = document.querySelector('#game-result');

        gameStatus.style.display = 'flex';  
        gameResult.textContent = `${nickname} has won this round!`
        
        const endGame = document.getElementById('end');                     //after win, creating request menu for player to decide about next step.

        endGame.addEventListener('click', function(){                       //reloading page on players request 
            window.location.reload();
        })

        const nextRound = document.getElementById('next-round'); 
        nextRound.addEventListener('click', function(){ // if next round is requested 
            gameStatus.style.display = 'none';          // hiding modal
            gameboard.reset();                          // reseting gameboard stats
            gameboard.display();                        // updating gameborad dispaly
        })
    };

    let draw = function(){                              //draw assigning method
        gameboard.changeStatus = 'inactive';                    
        const gameStatus = document.querySelector('.game-status');
        const gameResult = document.querySelector('#game-result');

        gameStatus.style.display = 'flex';              //modal manipulation
        gameResult.textContent = `It's a draw !`

        const endGame = document.getElementById('end'); 

        endGame.addEventListener('click', function(){   //restarting page on request
            window.location.reload();
        })

        const nextRound = document.getElementById('next-round');    //engaging next round on request
        nextRound.addEventListener('click', function(){
            gameStatus.style.display = 'none';                      //hiding modal
            gameboard.reset();                                      // reseting gameboard
            gameboard.display();                                    // displaying gameboard
        })
    };

    let turnIndicator = function(){                             //turn manipulation
        if (nameDOM.classList.contains('active-player')){
            nameDOM.removeAttribute('class');
            scoreDOM.removeAttribute('class');
        } else {
            nameDOM.setAttribute('class', 'active-player');
            scoreDOM.setAttribute('class', 'active-player');
        }
    };


    let playerMove = function(cords) {                                  //player move mechanics
        let y = `y${cords[2]}`;                                         
                gameboard[`${y}`][Number(cords[0])] = this.mark;        
                gameboard.display();
                gameboard.winRecognition();                             // method which recognites if winning condition is achieved
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

const gameboard = {                                 // gamebord object
    y1: ['','','',],                                //memory values of gameboard fields
    y2: ['','','',],
    y3: ['','','',],

    gameStatus: 'active',

    get showStatus() {
        return this.gameStatus;
    },
    
    set changeStatus(value){
        this.gameStatus = value;
    },

    reset: function() {                             //clearing gameboard memory
        this.y1[0] = '';
        this.y2[0] = '';
        this.y3[0] = '';
        this.y1[1] = '';
        this.y2[1] = '';
        this.y3[1] = '';
        this.y1[2] = '';
        this.y2[2] = '';
        this.y3[2] = '';
        this.gameStatus = 'active';
    },

    get empty(){                                                //getter for remaining empty fields on gameboard
        const test = (element) => element == '';

        if (this.y1.includes('')){
            let result;
            result = `${this.y1.findIndex(test)},1`;
            return result;
        } else if (this.y2.includes('')){
            let result;
            result = `${this.y2.findIndex(test)},2`;
            return result; 
        } else if (this.y3.includes('')){
            let result;
            result = `${this.y3.findIndex(test)},3`;
            return result;
        }
    },

    winRecognition: function(){             //winning pattern recognition
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
    
    display: function() {                                           // displaying memory value of each field on gameboard
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


const gameplay = (function(){               // gameplay object - multiplayer mode

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
 

const crazyFrogMode = (function(){                              // gameplay object - easy AI mode
    playerTwo = playerCreator('Crazy Frog', 'X', 'two');
        playerOne.print();
        playerTwo.print();
    let currentPlayerMove = 'p1';
    
        function aiDecision() {                                 // AI decision making process
            let cordsY = ['1','2','3'];
            let cordsX = ['0','1','2'];
                let x = cordsX[Math.floor(Math.random()*3)];
                let y = cordsY[Math.floor(Math.random()*3)];
            let result = `${x},${y}`;
            
                if (gameboard[`y${y}`][x] == '') {
                    return result;
                } else {
                    return aiDecision();
                }
        }

        function aiMove(){                                      // calling AI decision
            playerTwo.playerMove(aiDecision());  
                currentPlayerMove = 'p1';
                    playerTwo.indicator();
                    playerOne.indicator();
        }
        
        function playRound() {
            playerOne.indicator();
                const nextRound = document.getElementById('next-round')
                nextRound.addEventListener('click',function(e){
                    if(currentPlayerMove === 'p2'){
                        setTimeout(aiMove, 2000);
                    }
                })    
                window.addEventListener('click', function(e){
                    if (e.target.classList.contains('field') && currentPlayerMove === 'p1'){
                        if (e.target.textContent == ''){
                            playerOne.playerMove(e.target.id);
                            currentPlayerMove = 'p2';
                            playerOne.indicator();
                            playerTwo.indicator();
                            if (gameboard.showStatus == 'active'){
                            setTimeout(aiMove, 2000);
                        }
                        }    
                    }
                })
        }
        playRound();
    
        });



        const skyNetCore = {                        // hard AI decision making core
            winnigConfigurations: [
                ['0,1','1,1','2,1'],['0,2','1,2','2,2'],['0,3','1,3','2,3'],
                ['0,1','0,2','0,3'],['1,1','1,2','1,3'],['2,1','2,2','2,3'],
                ['0,1','1,2','2,3'],['0,3','1,2','2,1'],
            ],
            decisiveDatabase: '',                   // database of configuration to consider during making move
            preventedWinningConfiguration: [],      // database of configutrations which are no longer threat
            playerChoice: '',                       // latest player choice
            playerHistory: [],                      // history of player choices
            possibleWinConfigurations: [],          // configurations which can lead to win 

            set playerMove(move){                       
                if (this.playerChoice !== ''){
                    this.playerHistory.push(this.playerChoice);
                    this.playerChoice = move;
                } else{
                    this.playerChoice = move;
                };
                
            },

            dataFiltering: function(){                  // filtering every winning configuration for searching most possible choices

                if (this.decisiveDatabase == ''){
                    this.decisiveDatabase = this.winnigConfigurations.filter(element => element.includes(this.playerChoice)); 
                } else {
                    this.decisiveDatabase = this.decisiveDatabase.filter(element => element.includes(this.playerChoice));
                }
            },

            preventedFilter: function(res){             // filtering database for outcluding prevented threats
                for (let element of this.winnigConfigurations) {
                    if (element.includes(res)){
                        this.preventedWinningConfiguration.push(element);
                    }
                }
                this.decisiveDatabase = this.decisiveDatabase.filter(element => !(this.preventedWinningConfiguration.includes(element)))
            },

            possibleWinCheck: function(){               // searching for possibly winning configurations
                this.preventedWinningConfiguration.forEach(element => {
                    searching: for (let [index, value] of element.entries()) {
                        if (this.playerHistory.includes(value)){
                            break searching;
                        } else if (!(this.playerHistory.includes(value)) && index == 2){
                            this.possibleWinConfigurations = [];
                            this.possibleWinConfigurations.push(element);
                        }
                    }
                })

            },

            winConfirmation: function(){               //testing possible win configurattions
                let combination = this.possibleWinConfigurations[0];
                let filteredCombination;

                if (combination == undefined){
                    return false;
                } else {
                    filteredCombination = combination.filter(element => gameboard[`y${element[2]}`][element[0]] == 'X')
                }

                if (filteredCombination.length === 2){
                    this.decisiveDatabase[0] = combination;
                }

                },
            
            loseRecognition: function(){            // searching for major threats
                iteration: for (let element in this.decisiveDatabase){
                    let combination = this.decisiveDatabase[element];
                    let filteredCombination;
                        if (combination == undefined){
                            return false;
                        } else {
                            filteredCombination = combination.filter(element => gameboard[`y${element[2]}`][element[0]] == 'O')
                        }
                        if (filteredCombination.length === 2){
                            this.decisiveDatabase[0] = combination;
                            break iteration;
                        } 
                }
            },
            
            clear: function () {                        //clearing data
                this.decisiveDatabase = '';
                this.preventedWinningConfiguration = [];
                this.playerChoice = '';
                this.playerHistory = [];
                this.possibleWinConfigurations = [];
            },
            get aiChoice() {                            // AI deiciosn making process
                this.dataFiltering();
                    if (this.decisiveDatabase == ''){
                        this.dataFiltering();
                    }
                
                let result;                             // if player made move and center of board is empty - consider this field as priority
                    if (gameboard.y2[1] === ''){
                        result = '1,2';
                        this.preventedFilter(result);

                    } else {                            
                        this.winConfirmation();                         //check possible win configurations
                        processedArray = this.decisiveDatabase[0];
                        check: for (let element of processedArray){
                                    if (element !== this.playerChoice && !(this.playerHistory.includes(element)) && gameboard[`y${element[2]}`][element[0]] == '') {
                                        result = element;
                                        this.preventedFilter(result);
                                        break check;
                                    } else {
                                        this.decisiveDatabase = '';
                                        this.dataFiltering();
                                        this.loseRecognition();

                                        let decisiveData = this.decisiveDatabase;
                                        let databaseLength = decisiveData.length;
                                        
                                        iteration: for (let i = 0; i < databaseLength; i++){
                                            for (let element of decisiveData[i]){
                                                if (element !== this.playerChoice && !(this.playerHistory.includes(element)) && gameboard[`y${element[2]}`][element[0]] == ''){
                                                    result = element;
                                                    this.preventedFilter(result);
                                                    break iteration;
                                                }
                                            }
                                        }

                                        if (result === undefined){
                                            result = gameboard.empty;
                                        }
                                    }
                                } 
                    }
                        return result;
            }

        }
        
        const skyNetMode = (function(){         //gameplay object - AI hard mode
            playerTwo = playerCreator('T-1000', 'X', 'two');
                playerOne.print();
                playerTwo.print();
            let currentPlayerMove = 'p1';
            
        
                function aiMove(){
                    playerTwo.playerMove(skyNetCore.aiChoice);
                    skyNetCore.possibleWinCheck();
                        currentPlayerMove = 'p1';
                            playerTwo.indicator();
                            playerOne.indicator();
                }
                
                function playRound() {
                    playerOne.indicator();
                        const nextRound = document.getElementById('next-round')
                        nextRound.addEventListener('click',function(e){
                            skyNetCore.clear();
                            if(currentPlayerMove === 'p2'){
                                setTimeout(aiMove, 2000);
                            }
                        }); 
                        window.addEventListener('click', function(e){
                            if (e.target.classList.contains('field') && currentPlayerMove === 'p1'){
                                if (e.target.textContent == ''){
                                    playerOne.playerMove(e.target.id);
                                    skyNetCore.playerMove = e.target.id;
                                    currentPlayerMove = 'p2';
                                    playerOne.indicator();
                                    playerTwo.indicator();
                                    if (gameboard.showStatus == 'active'){
                                    setTimeout(aiMove, 2000);
                                }
                                }    
                            }
                        })
                }
                playRound();
            
                });
                
             
