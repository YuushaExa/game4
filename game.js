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
            next_scene: "options",
            class: "special-button"
        }
    ],
            onRender: function() {
                // Refresh the count display when returning to this scene
                document.querySelector('.count-display').textContent = `Current count: ${gameState.globalCount}`;


            },
            next_scene: "block_1"
        },
          block_12: {
 dialog: [
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "avatar2.jpg",
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
                    image: "avatar.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "avatar2.jpg",
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
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        h1 {
            color: green;
            margin-bottom: 20px;
        }
        .map-container {
            display: grid;
            grid-template-columns: repeat(10, 50px);
            grid-template-rows: repeat(10, 50px);
            gap: 2px;
        }
        .cell {
            width: 50px;
            height: 50px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            color: green;
        }
        .controls {
            margin-top: 20px;
        }
        button {
            padding: 8px 16px;
            background-color: green;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
 <h1>Top-Down Map (10x10)</h1>
    <div class="map-container" id="map"></div>
    <div class="controls">
        <button id="resetBtn">Reset Map</button>
    </div>
`,
   onRender: function() {
 const mapContainer = document.getElementById('map');
            const resetBtn = document.getElementById('resetBtn');
            
            // Create 10x10 map
            function createMap() {
                mapContainer.innerHTML = '';
                for (let row = 0; row < 10; row++) {
                    for (let col = 0; col < 10; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.textContent = `${String.fromCharCode(65 + row)}${col + 1}`;
                        cell.id = `cell-${row}-${col}`;
                        mapContainer.appendChild(cell);
                    }
                }
            }
            
            // Initialize map
            createMap();
            
            // Reset button functionality
            resetBtn.addEventListener('click', createMap);
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
