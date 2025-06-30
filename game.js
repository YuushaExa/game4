const enemies = {
       mob: {
        name: "mob",
        image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
        stats: {
            strength: 3,
            intelligence: 8,
            agility: 6,
            stamina: 7
        },
        skills: ["Attack"],
        bio: "Mob"
    },
}

const heroes = {
    rita: {
        name: "Rita",
        image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
        stats: {
            strength: 5,
            intelligence: 8,
            agility: 6,
            stamina: 7
        },
        skills: ["Healing", "Persuasion", "First Aid"],
        bio: "A compassionate medic who always puts others before herself.",
        owned: 0,
        lvl: 1,
        rank: 0  
    },
    kong: {
        name: "Kong",
        image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
        stats: {
            strength: 9,
            intelligence: 4,
            agility: 7,
            stamina: 5
        },
        skills: ["Combat", "Intimidation", "Survival"],
        bio: "A tough warrior with a heart of gold beneath his rough exterior.",
              owned: 0,
        lvl: 1,
        rank: 0  
    }
};

const gameState = {
    globalCount: 0,
    previousScene: null,
    selectedHero: null,  
    party: []
};

const gameData = {
    scenes: {
        start_screen: {
              background: "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg",
            html: `
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                background: linear-gradient(135deg, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);
                                color: white;
                                font-family: Arial, sans-serif;
                                text-align: center;
                                position: relative;
                            }
                            .title {
                                font-size: 3em;
                                margin-bottom: 20px;
                                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                            }
                            .start-btn {
                                padding: 15px 30px;
                                background-color: #ff6b6b;
                                color: white;
                                border: none;
                                border-radius: 5px;
                                font-size: 1.2em;
                                cursor: pointer;
                                transition: all 0.3s;
                            }
                            .start-btn:hover {
                                background-color: #ff8e8e;
                                transform: scale(1.05);
                            }
                        </style>
                        <div>
                            <div class="title">Visual Novel</div>
                            <button class="start-btn" next_scene="block_1">Start Game</button>
                         <button class="start-btn" next_scene="block_2">Start 2</button>
                    <div class="count-display">Current count: ${gameState.globalCount}</div>
                    <button class="options-btn" next_scene="options">Options</button>
                        <button class="start-btn" next_scene="hero_list">Available Hero</button>     
                        <button class="start-btn" next_scene="party">Manage Party</button>
                                                <button class="start-btn" next_scene="stage1">stage 1</button>
         <button class="start-btn" next_scene="block_14">stage 14</button>
             ${gameState.globalCount = 10 ? '<button class="start-btn" next_scene="block_map">MAP</button>' : ''}
                        </div>
            `,
    buttons: [
        {
            type: "image",
            position: "50px 100px auto auto",
            image: "https://img.bunnyccdn.co/_r/300x400/100/7e/c8/7ec8bff42801bd63cd0b88b43d7a53d0/7ec8bff42801bd63cd0b88b43d7a53d0.jpg",
            alt: "Button Image",
            next_scene: "block_3",
            width: "150px"
        },
        {
            type: "text",
            position: "150px 200px auto auto",
            text: "Continue",
            color: "#FFFFFF",
            background: "#FF5733",
            class: "special-button"
        }
    ],
            onRender: function() {
                // Refresh the count display when returning to this scene
                document.querySelector('.count-display').textContent = `Current count: ${gameState.globalCount}`;


            },
            next_scene: "block_1"
        },
            block_map: {
"map": {
    "tiles": 20,
    "tileSize": 64
          }
            },
          block_12: {
 dialog: [
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the third dialogue.",
                }
     ]
          },
        block_1: {
            background: "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg",
            color: "#bbbbbb",
                buttons: [
        {
            type: "image",
            position: "50px 100px auto auto",
            image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/assets_task_01jwk89ve6fzxsq6q3fppt7eaa_1748697957_img_0.webp",
            alt: "Button Image",
            width: "150px"
        }
    ],
             dialog: [
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "https://raw.githubusercontent.com/YuushaExa/game4/refs/heads/main/assets/Snowempre.jpg",
                    text: "This is the third dialogue.",
 choices: [
                {
                    text: "Go to the park",
                    next_scene: "block_3"
                },
                {
                    text: "Stay here",
                    next_scene: "block_3"
                },
                {
                    text: "Ask for more information",
                    next_scene: "start_screen"
                }
            ]
        }
            ],
            scene: {
                time: "25", // in seconds
                next_scene: "block_2" // scene to transition to after 5 seconds
            },
        },

   block_14: {
 html: `
 <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #70c5ce;
            font-family: Arial, sans-serif;
        }
        
        #game-container {
            position: relative;
            width: 400px;
            height: 600px;
            overflow: hidden;
            background-color: #70c5ce;
            border: 2px solid #000;
        }
        
        #bird {
            position: absolute;
            width: 40px;
            height: 30px;
            background-color: #ff0;
            border-radius: 50%;
            left: 50px;
        }
        
        .pipe {
            position: absolute;
            width: 60px;
            background-color: #0a0;
            border: 2px solid #000;
            box-sizing: border-box;
        }
        
        #score {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 24px;
            color: #fff;
            text-shadow: 2px 2px 4px #000;
            z-index: 10;
        }
        
        #game-over {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            display: none;
            z-index: 100;
        }
        
        #restart-btn {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff0;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
     <div id="game-container">
        <div id="bird"></div>
        <div id="score">0</div>
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>Your score: <span id="final-score">0</span></p>
            <button id="restart-btn">Play Again</button>
        </div>
    </div>
`,
   onRender: function() {
          const bird = document.getElementById('bird');
        const gameContainer = document.getElementById('game-container');
        const scoreElement = document.getElementById('score');
        const gameOverElement = document.getElementById('game-over');
        const finalScoreElement = document.getElementById('final-score');
        const restartBtn = document.getElementById('restart-btn');
        
        let birdPosition = 300;
        let birdVelocity = 0;
        let gravity = 0.5;
        let jumpForce = -10;
        let gameRunning = true;
        let score = 0;
        let pipes = [];
        let pipeGap = 150;
        let pipeFrequency = 1500; // milliseconds
        let lastPipeTime = 0;
        
        // Set initial bird position
        bird.style.top = birdPosition + 'px';
        
        // Event listeners
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' && gameRunning) {
                birdVelocity = jumpForce;
            }
            
            if (e.code === 'Space' && !gameRunning) {
                restartGame();
            }
        });
        
        gameContainer.addEventListener('click', function() {
            if (gameRunning) {
                birdVelocity = jumpForce;
            } else {
                restartGame();
            }
        });
        
        restartBtn.addEventListener('click', restartGame);
        
        // Game loop
        function gameLoop(timestamp) {
            if (!gameRunning) return;
            
            // Update bird position
            birdVelocity += gravity;
            birdPosition += birdVelocity;
            bird.style.top = birdPosition + 'px';
            
            // Check for collisions with ground or ceiling
            if (birdPosition <= 0 || birdPosition >= gameContainer.offsetHeight - bird.offsetHeight) {
                endGame();
                return;
            }
            
            // Generate new pipes
            if (timestamp - lastPipeTime > pipeFrequency) {
                createPipe();
                lastPipeTime = timestamp;
            }
            
            // Move pipes and check for collisions
            for (let i = pipes.length - 1; i >= 0; i--) {
                const pipe = pipes[i];
                const pipeX = parseInt(pipe.style.left);
                
                // Move pipe
                pipe.style.left = (pipeX - 2) + 'px';
                
                // Check if pipe is off screen
                if (pipeX < -60) {
                    gameContainer.removeChild(pipe);
                    pipes.splice(i, 1);
                    continue;
                }
                
                // Check for score (when bird passes a pipe)
                if (pipe.dataset.passed === 'false' && pipeX + 60 < 50) {
                    pipe.dataset.passed = 'true';
                    score++;
                    scoreElement.textContent = score;
                }
                
                // Check for collision with bird
                if (
                    50 < pipeX + 60 && 
                    50 + 40 > pipeX && 
                    (birdPosition < pipe.dataset.topHeight || 
                     birdPosition + 30 > pipe.dataset.topHeight + pipeGap)
                ) {
                    endGame();
                    return;
                }
            }
            
            requestAnimationFrame(gameLoop);
        }
        
        // Create a new pipe
        function createPipe() {
            const topHeight = Math.floor(Math.random() * (gameContainer.offsetHeight - pipeGap - 100)) + 50;
            
            // Top pipe
            const topPipe = document.createElement('div');
            topPipe.className = 'pipe';
            topPipe.style.left = gameContainer.offsetWidth + 'px';
            topPipe.style.top = '0';
            topPipe.style.height = topHeight + 'px';
            topPipe.dataset.topHeight = topHeight;
            topPipe.dataset.passed = 'false';
            
            // Bottom pipe
            const bottomPipe = document.createElement('div');
            bottomPipe.className = 'pipe';
            bottomPipe.style.left = gameContainer.offsetWidth + 'px';
            bottomPipe.style.top = (topHeight + pipeGap) + 'px';
            bottomPipe.style.height = (gameContainer.offsetHeight - topHeight - pipeGap) + 'px';
            bottomPipe.dataset.topHeight = topHeight;
            bottomPipe.dataset.passed = 'false';
            
            gameContainer.appendChild(topPipe);
            gameContainer.appendChild(bottomPipe);
            
            pipes.push(topPipe);
            pipes.push(bottomPipe);
        }
        
        // End the game
        function endGame() {
            gameRunning = false;
            finalScoreElement.textContent = score;
            gameOverElement.style.display = 'block';
        }
        
        // Restart the game
        function restartGame() {
            // Remove all pipes
            pipes.forEach(pipe => gameContainer.removeChild(pipe));
            pipes = [];
            
            // Reset game state
            birdPosition = 300;
            birdVelocity = 0;
            bird.style.top = birdPosition + 'px';
            score = 0;
            scoreElement.textContent = score;
            gameOverElement.style.display = 'none';
            lastPipeTime = 0;
            
            // Start game
            gameRunning = true;
            requestAnimationFrame(gameLoop);
        }
        
        // Start the game
        requestAnimationFrame(gameLoop);
   }
 },

 block_2: {
            background: {
                type: "color",
                source: "#f0f0f0"
            },
        html: `
          <style>
                    div#counter {
                        background: #fff;
                        }
                        </style>
        <div id="counter">${gameState.globalCount}</div>
                  <button id="incrementBtn">Click to +1</button>
                  <button class="start-btn" next_scene="start_screen">Return to Home</button>`,
   onRender: function() {
        const counterElement = document.getElementById('counter');
        const incrementBtn = document.getElementById('incrementBtn');

        // Set initial value
        counterElement.textContent = gameState.globalCount;
        
        // Manual increment button
        incrementBtn.addEventListener('click', function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        });
        
        // Start new auto-increment
        gameState.autoIncrement = setInterval(function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        }, 1000);
},
               onLeave: function() {
        // Clear the interval when leaving the scene
        if (gameState.autoIncrement) {
            clearInterval(gameState.autoIncrement);
            gameState.autoIncrement = null;
        }
    },
                      next_scene: "block_1"
        },
 block_3: {
  "parallax": {
    "layers": [
      {
        "class": "layer layer-back",
        "auto-speed": 0.5,
        "image": "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg"
      },
      {
        "class": "layer layer-middle",
        "auto-speed": 0.3,
        "image": "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg"
      },
      {
        "class": "layer layer-front",
        "auto-speed": 0.1,
        "image": "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg"
      }
    ]
  }
 },
      options: {
            html: `
                <style>
                    .options-menu {
                        background: #3f51b5;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: auto;
                    }
                    .back-btn {
                        padding: 10px 20px;
                        background-color: #ff6b6b;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                </style>
                <div class="options-menu">
                    <h2>Options</h2>
                    <div id="language-switcher">
                        <button data-lang="en">English</button>
                        <button data-lang="ru">Русский</button>
                    </div>
                    <div>Volume controls would go here</div>
        <button class="btn btn-primary" next_scene="start_screen">Back</button>
                </div>
            `,
        },

    hero_list:  {
    ui: "hero_list"
        },
 party: {
            ui: "party"
        },
   stage1:  {
    ui: "battle",
   "enemies": {
            "mob": 5
        }
          
        },
           
    }
};
