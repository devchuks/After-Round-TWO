class AfterRoundOneGame {
    constructor() {
        this.players = [];
        this.guesses = {};
        this.activePlayers = [];
        this.eliminatedPlayers = [];
        this.roundNumber = 1;
        this.chantLines = [
            "🎵 After round one...",
            "🎵 original Panadol extra...",
            "🎵 otun gbede...",
            "🎵 Babangida YASO!'"
        ];
    }

    init() {
        document.getElementById('player-count').addEventListener('input', this.updatePlayerNameInputs.bind(this));
        document.getElementById('start-game').addEventListener('click', this.startGame.bind(this));
        document.getElementById('submit-guesses').addEventListener('click', this.submitGuesses.bind(this));
        document.getElementById('randomize-guesses').addEventListener('click', this.randomizeGuesses.bind(this));
        document.getElementById('how-to-play-btn').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('howToPlayModal')).show();
        });
        // Ensure inputs are rendered on first load
        this.updatePlayerNameInputs();
    }

    randomizeGuesses() {
    const inputs = document.querySelectorAll('.player-guess');
    const max = this.players.length * 5;
    const usedNumbers = new Set();
    
    // Generate unique random numbers for each player
    inputs.forEach(input => {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (max + 1)); // 0 to max inclusive
        } while (usedNumbers.has(randomNum));
        
        usedNumbers.add(randomNum);
        input.value = randomNum;
    });
}

    updatePlayerNameInputs() {
        const playerCount = parseInt(document.getElementById('player-count').value) || 2;
        const container = document.getElementById('player-names-container');
        container.innerHTML = '';

        for (let i = 0; i < playerCount; i++) {
            const div = document.createElement('div');
            div.className = 'mb-3';
            
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = `Player ${i + 1} Name:`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control player-name';
            input.required = true;
            input.placeholder = `Player ${i + 1}`;
            
            div.appendChild(label);
            div.appendChild(input);
            container.appendChild(div);
        }
    }

    startGame() {
        const playerCount = parseInt(document.getElementById('player-count').value);
        if (playerCount < 2) {
            alert('You need at least 2 players');
            return;
        }

        const nameInputs = document.querySelectorAll('#player-names-container input.player-name');
        this.players = Array.from(nameInputs).map(input => input.value || input.placeholder);

        if (new Set(this.players).size !== this.players.length) {
            alert('All player names must be unique');
            return;
        }

        this.showGuessScreen();
    }

    showGuessScreen() {
        document.getElementById('setup-screen').classList.add('d-none');
        document.getElementById('guess-screen').classList.remove('d-none');

        const min = 0;
        const max = this.players.length * 5;
        document.getElementById('guess-instructions').textContent = 
            `Each player must select a number of fingers that hasn't already been chosen by someone else from ${min} and ${max}`;

        const container = document.getElementById('guess-inputs');
        container.innerHTML = '';

        this.players.forEach(player => {
            const div = document.createElement('div');
            div.className = 'mb-3';
            
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = `${player}'s guess:`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'form-control player-guess';
            input.dataset.player = player;
            input.min = min;
            input.max = max;
            input.required = true;
            
            div.appendChild(label);
            div.appendChild(input);
            container.appendChild(div);
        });
    }

    submitGuesses() {
        const guessInputs = document.querySelectorAll('.player-guess');
        const guesses = {};
        const values = new Set();

        for (const input of guessInputs) {
            const player = input.dataset.player;
            const value = parseInt(input.value);

            if (isNaN(value)) {
                alert(`Please enter a valid number for ${player}`);
                return;
            }

            if (value < 0 || value > this.players.length * 5) {
                alert(`Guess must be between 0 and ${this.players.length * 5} for ${player}`);
                return;
            }

            if (values.has(value)) {
                alert(`Number ${value} has already been taken by another player`);
                return;
            }

            guesses[player] = value;
            values.add(value);
        }

        this.guesses = guesses;
        this.activePlayers = [...this.players];
        this.eliminatedPlayers = [];
        this.roundNumber = 1;
        this.playRound();
    }

    playRound() {
        document.getElementById('guess-screen').classList.add('d-none');
        document.getElementById('game-screen').classList.remove('d-none');

        this.updatePlayersList();
        document.getElementById('round-title').textContent = 
            this.roundNumber === 1 ? "FIRST ROUND" : `ROUND ${this.roundNumber}`;

        if (this.roundNumber === 1) {
            this.playChant();
        } else {
            this.sayYaso();
        }
    }

    playChant() {
        const container = document.getElementById('chant-container');
        container.innerHTML = '';

        this.chantLines.forEach((line, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'chant-line';
                div.textContent = line;
                container.appendChild(div);
            }, index * 1000);
        });

        setTimeout(() => {
            this.showFingers();
        }, this.chantLines.length * 1000);
    }

    // sayYaso() {
    //     const container = document.getElementById('chant-container');
    //     container.innerHTML = '<div class="chant-line">🗣️ YASO!</div>';

    //     document.getElementById('fingers-container').innerHTML = '';
    //     document.getElementById('game-status').innerHTML = '';
    //     // renove alert info

    //     setTimeout(() => {
    //         this.showFingers();
    //     }, 750);
    // }

    sayYaso() {
    const container = document.getElementById('chant-container');
    container.innerHTML = '';
    
    const yasoDiv = document.createElement('div');
    yasoDiv.className = 'chant-line yaso-animation'; // Added yaso-animation class
    
    // Create animated spans for each character
    const yasoText = "🗣️ YASO! 🗣️" ;
    yasoDiv.innerHTML = [...yasoText].map(char => 
        `<span style="display:inline-block; font-size: 2rem;">${char}</span>`
    ).join('');
    
    container.appendChild(yasoDiv);

    document.getElementById('fingers-container').innerHTML = '';
    document.getElementById('game-status').innerHTML = '';
    // Add slight delay before showing fingers
    setTimeout(() => {
        this.showFingers();
    }, 650); // Increased from 1000ms to account for animation
}

    showFingers() {
        const fingerShows = {};
        this.activePlayers.forEach(player => {
            fingerShows[player] = Math.floor(Math.random() * 6); // 0-5 fingers
        });

        const total = Object.values(fingerShows).reduce((sum, val) => sum + val, 0);

        const container = document.getElementById('fingers-container');
        container.innerHTML = '<h5 class="text-center">Fingers Shown:</h5>';
        
        const playersContainer = document.createElement('div');
        playersContainer.className = `players-container ${this.getPlayerCountClass()}`;
        
        this.activePlayers.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-container';
            playerDiv.innerHTML = `
                <div class="player-name">${player}</div>
                <div class="hand-display">
                    <img src="assets/hands/${fingerShows[player]}.svg" alt="${fingerShows[player]} fingers" class="hand-svg">
                </div>
                <div class="finger-count">${fingerShows[player]} finger${fingerShows[player] !== 1 ? 's' : ''}</div>
            `;
            playersContainer.appendChild(playerDiv);
        });
        
        container.appendChild(playersContainer);
        
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-fingers';
        totalDiv.innerHTML = `Total fingers: ${total}`;
        container.appendChild(totalDiv);

        this.checkMatches(total);
    }

    getPlayerCountClass() {
        const count = this.activePlayers.length;
        if (count === 2) return 'two-players';
        if (count === 3) return 'three-players';
        if (count === 4) return 'four-players';
        return 'many-players';
    }

    checkMatches(total) {
        const statusContainer = document.getElementById('game-status');
        const nextRoundContainer = document.getElementById('next-round-container');
        nextRoundContainer.innerHTML = '';

        let eliminated = null;
        for (const player of this.activePlayers) {
            if (this.guesses[player] === total) {
                eliminated = player;
                break;
            }
        }

        if (eliminated) {
            statusContainer.innerHTML = 
                `<div class="alert alert-primary">🎉 ${eliminated}'s number (${this.guesses[eliminated]}) was matched! E don go</div>`;
            
            this.activePlayers = this.activePlayers.filter(p => p !== eliminated);
            this.eliminatedPlayers.push({
                name: eliminated,
                guess: this.guesses[eliminated]
            });
            this.updatePlayersList();

            if (this.activePlayers.length === 1) {
                const loser = this.activePlayers[0];
                setTimeout(() => {
                    this.showFinalResults(loser);
                }, 1000);
                return;
            }

            if (this.checkForInvalidGuesses()) {
                setTimeout(() => {
                    this.showAdjustmentUI();
                }, 1000);
                return;
            }

            setTimeout(() => {
                this.roundNumber++;
                this.prepareNextRound();
            }, 1000);
        } else {
            statusContainer.innerHTML = '<div class="alert alert-info">No match this round. Game continues</div>';
            setTimeout(() => {
                this.roundNumber++;
                this.prepareNextRound();
            }, 1000);
        }
    }

    checkForInvalidGuesses() {
        const newMax = this.activePlayers.length * 5;
        this.playersNeedingAdjustment = [];

        for (const player of this.activePlayers) {
            if (this.guesses[player] > newMax) {
                this.playersNeedingAdjustment.push(player);
            }
        }

        return this.playersNeedingAdjustment.length > 0;
    }

    showAdjustmentUI() {
        const newMax = this.activePlayers.length * 5;
        const adjustmentContainer = document.createElement('div');
        adjustmentContainer.className = 'adjustment-container mt-4 p-3 bg-light rounded';
        
        const heading = document.createElement('h5');
        heading.textContent = '⚠️ You need to adjust some guesses now';
        adjustmentContainer.appendChild(heading);

        const explanation = document.createElement('p');
        explanation.textContent = `Maximum possible total of fingers is now ${newMax}. Update these guesses:`;
        adjustmentContainer.appendChild(explanation);

        const adjustmentList = document.createElement('div');
        adjustmentList.className = 'mb-3';

        this.playersNeedingAdjustment.forEach(player => {
            const div = document.createElement('div');
            div.className = 'mb-2';
            
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = `${player}'s new guess (0-${newMax}):`;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'form-control adjustment-input';
            input.dataset.player = player;
            input.min = 0;
            input.max = newMax;
            input.value = '';
            input.required = true;
            
            div.appendChild(label);
            div.appendChild(input);
            adjustmentList.appendChild(div);
        });

        adjustmentContainer.appendChild(adjustmentList);

        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = 'Update Guesses';
        button.addEventListener('click', () => this.processAdjustments(newMax));

        adjustmentContainer.appendChild(button);
        document.getElementById('game-status').appendChild(adjustmentContainer);
    }

    processAdjustments(newMax) {
    const adjustmentInputs = document.querySelectorAll('.adjustment-input');
    const currentGuesses = new Set(
        this.activePlayers
            .filter(p => !this.playersNeedingAdjustment.includes(p))
            .map(p => this.guesses[p])
    );

    // Validate inputs
    for (const input of adjustmentInputs) {
        const player = input.dataset.player;
        const value = parseInt(input.value);

        if (isNaN(value)) {
            alert(`Please enter a valid number for ${player}`);
            return;
        }

        if (value < 0 || value > newMax) {
            alert(`Guess must be between 0 and ${newMax} for ${player}`);
            return;
        }

        if (currentGuesses.has(value)) {
            alert(`Number ${value} has already been taken by another player`);
            return;
        }
    }

    // Apply changes
    for (const input of adjustmentInputs) {
        const player = input.dataset.player;
        const value = parseInt(input.value);
        this.guesses[player] = value;
    }

    // Update UI
    this.updatePlayersList();
    document.querySelector('.adjustment-container').remove();

    // Automatically proceed to next round after 1 second
    setTimeout(() => {
        this.roundNumber++;
        this.playRound(); 
    }, 1000);
}

    prepareNextRound() {
        const nextRoundContainer = document.getElementById('next-round-container');
        nextRoundContainer.innerHTML = '';

        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = this.activePlayers.length > 2 ? 'Next Round' : 'Next Round';
        button.addEventListener('click', () => this.playRound());
        nextRoundContainer.appendChild(button);
    }

    showFinalResults(loser) {
        const statusContainer = document.getElementById('game-status');
        const nextRoundContainer = document.getElementById('next-round-container');
        nextRoundContainer.innerHTML = '';

        const winnersDiv = document.createElement('div');
        winnersDiv.className = 'winners-container';
        
        if (this.eliminatedPlayers.length === 1) {
            winnersDiv.innerHTML = `
                <div class="winner-banner">
                    <h4>🏆 ${this.eliminatedPlayers[0].name} WINS! 🎉</h4>
                    <p class="mb-0">Correct guess: ${this.eliminatedPlayers[0].guess}</p>
                </div>
            `;
        } else {
            let winnersHTML = `<div class="winner-banner"><h4>🏆 WINNERS: 🎉</h4><ul class="mb-0">`;
            this.eliminatedPlayers.forEach(winner => {
                winnersHTML += `<li>${winner.name} (guess: ${winner.guess})</li>`;
            });
            winnersHTML += `</ul></div>`;
            winnersDiv.innerHTML = winnersHTML;
        }
        statusContainer.appendChild(winnersDiv);

        const loserDiv = document.createElement('div');
        loserDiv.className = 'loser-container mb-4';
        loserDiv.innerHTML = `
            <div class="alert alert-danger">
                <h4>😬 ${loser} LOSES!</h4>
                <p class="mb-0">Never guessed ${this.guesses[loser]}... SLAP HIN JOOR! 👋</p>
            </div>
        `;
        statusContainer.appendChild(loserDiv);

        if (this.eliminatedPlayers.length > 1) {
            const slapDiv = document.createElement('div');
            slapDiv.className = 'slap-message p-3 bg-warning rounded mb-4';
            slapDiv.innerHTML = `
                <h5>👋 Slap am!</h5>
                <p class="mb-0">All winners must join together to slap ${loser}'s hand</p>
            `;
            statusContainer.appendChild(slapDiv);
        }

        const playAgainBtn = document.createElement('button');
        playAgainBtn.className = 'btn btn-primary w-100';
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.addEventListener('click', () => this.resetGame());
        nextRoundContainer.appendChild(playAgainBtn);
    }

    // Add this to your class properties
    loserEmojis = ["😭", "💀", "👎", "🙈", "🤦", "☠"];


    updatePlayersList() {
        const container = document.getElementById('players-list');
        container.innerHTML = '';

        const loser = this.activePlayers.length === 1 ? this.activePlayers[0] : null;

        //active players
        this.activePlayers.forEach(player => {
            const li = document.createElement('li');
            li.className = 'list-group-item player-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = player;
            
            if (player === loser) {
            nameSpan.classList.add('loser-name');
            nameSpan.innerHTML += `<span class="loser-emoji"> ${
            this.loserEmojis[Math.floor(Math.random() * this.loserEmojis.length)]
                }</span>`;
            }
            
            const guessSpan = document.createElement('span');
            guessSpan.className = player === loser 
                ? 'badge bg-danger rounded-pill loser-badge'
                : 'badge bg-primary rounded-pill';
            guessSpan.textContent = this.guesses[player];
            
            li.appendChild(nameSpan);
            li.appendChild(guessSpan);
            container.appendChild(li);
        });

        //eliminated players
        this.eliminatedPlayers.forEach(player => {
            const li = document.createElement('li');
            li.className = 'list-group-item player-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.innerHTML = `<span>${player.name}</span><span class="trophy"> 🏆</span>`;
            nameSpan.className = 'eliminated';
            
            const guessSpan = document.createElement('span');
            guessSpan.className = 'badge bg-success rounded-pill';
            guessSpan.textContent = player.guess;
            
            li.appendChild(nameSpan);
            li.appendChild(guessSpan);
            container.appendChild(li);
        });
    }

    resetGame() {
        document.getElementById('game-screen').classList.add('d-none');
        document.getElementById('setup-screen').classList.remove('d-none');
        document.getElementById('game-status').innerHTML = '';
        document.getElementById('next-round-container').innerHTML = '';
        document.getElementById('fingers-container').innerHTML = '';

         // Reset player inputs
    document.getElementById('player-names-container').innerHTML = '';
    this.updatePlayerNameInputs();
        
        this.players = [];
        this.guesses = {};
        this.activePlayers = [];
        this.eliminatedPlayers = [];
        this.roundNumber = 1;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new AfterRoundOneGame();
    game.init();
});