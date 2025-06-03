const heroes = {
    rita: {
        name: "Rita",
        image: "rita.jpg",
        stats: {
            strength: 5,
            intelligence: 8,
            agility: 6,
            charisma: 7
        },
        skills: ["Healing", "Persuasion", "First Aid"],
        bio: "A compassionate medic who always puts others before herself."
    },
    kong: {
        name: "Kong",
        image: "kong.jpg",
        stats: {
            strength: 9,
            intelligence: 4,
            agility: 7,
            charisma: 5
        },
        skills: ["Combat", "Intimidation", "Survival"],
        bio: "A tough warrior with a heart of gold beneath his rough exterior."
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
                        <button class="start-btn" next_scene="hero_selection">Select Hero</button>
                        </div>
            `,
    buttons: [
        {
            type: "image",
            position: "50px 100px auto auto",
            image: "https://img.bunnyccdn.co/_r/300x400/100/7e/c8/7ec8bff42801bd63cd0b88b43d7a53d0/7ec8bff42801bd63cd0b88b43d7a53d0.jpg",
            alt: "Button Image",
            next_scene: "block_12",
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
color: "#bbbbbb",
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
                    <button class="btn btn-primary" next_scene="${gameState.previousScene || 'start_screen'}">Back</button>
                </div>
            `,
          onRender: function() {
                // Store current scene as previous before going to options
                gameState.previousScene = vnEngine.currentScene;
            }
        },

    hero_selection: {
    background: "https://example.com/hero_select_bg.jpg",
    html: `
        <style>
            .hero-container {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                padding: 20px;
            }
            .hero-card {
                width: 200px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                transition: transform 0.3s;
            }
            .hero-card:hover {
                transform: scale(1.05);
            }
            .hero-image {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 5px;
            }
            .hero-name {
                font-size: 1.2em;
                margin: 10px 0;
                text-align: center;
            }
            .hero-stats {
                font-size: 0.9em;
                margin-bottom: 10px;
            }
            .back-btn {
                margin-top: 20px;
                padding: 10px 20px;
                background: #ff6b6b;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
            }
        </style>
        <h1 style="text-align: center; color: white;">Choose Your Hero</h1>
        <div class="hero-container" id="heroContainer"></div>
        <button class="back-btn" next_scene="start_screen">Back</button>
    `,
    onRender: function() {
        const container = document.getElementById('heroContainer');
        container.innerHTML = '';
        
        // Create a card for each hero
        for (const [id, hero] of Object.entries(heroes)) {
            const card = document.createElement('div');
            card.className = 'hero-card';
            card.dataset.heroId = id;
            
            // Display hero info
            card.innerHTML = `
                <img src="${hero.image}" class="hero-image" alt="${hero.name}">
                <div class="hero-name">${hero.name}</div>
                <div class="hero-stats">
                    <div>STR: ${hero.stats.strength}</div>
                    <div>INT: ${hero.stats.intelligence}</div>
                    <div>AGI: ${hero.stats.agility}</div>
                    <div>CHA: ${hero.stats.charisma}</div>
                </div>
                <div>Skills: ${hero.skills.join(', ')}</div>
            `;
            
            // Add click handler
            card.addEventListener('click', () => {
                gameState.selectedHero = id;
                gameState.party = [id]; // Start with just this hero
                vnEngine.renderScene('block_1'); // Or wherever you want to go next
            });
            
            container.appendChild(card);
        }
    }
},
        
    }
};
