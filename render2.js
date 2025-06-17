// HERO list

function renderHeroList(heroListData) {
    // Clear the current scene content
    const container = document.getElementById('main');
    
    // Create hero list HTML
    container.innerHTML = `
        <style>
            .hero-list {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
                padding: 20px;
            }
            .hero-card {
                width: 200px;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .hero-card:hover {
                transform: scale(1.05);
            }
            .hero-image {
                width: 100%;
                height: 150px;
                object-fit: cover;
            }
            .hero-info {
                padding: 10px;
                background: #333;
                color: white;
            }
            .back-btn {
                margin: 20px;
                padding: 10px 20px;
                background: #ff6b6b;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        </style>
        <h1>Available Heroes</h1>
        <div class="hero-list">
            ${Object.entries(heroes).map(([id, hero]) => `
                <div class="hero-card" data-hero-id="${id}">
                    <img src="${hero.image}" alt="${hero.name}" class="hero-image">
                    <div class="hero-info">
                        <h3>${hero.name}</h3>
                        <p>${hero.bio.substring(0, 50)}...</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" next_scene="start_screen">Back</button>
    `;

}

// parallax

function setupParallax(layers) {
    // 1. Create containerAdd commentMore actions
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-container';
 document.body.prepend(parallaxContainer);
    // 2. Add CSS (optimized for auto-scrolling)
    const parallaxCSS = `
        <style>
            .parallax-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1;
            }
            .parallax-layer {
                position: relative;


                width: 100%;
                height: 100%;
                background-repeat: repeat-x;
                background-size: auto 100%;
                will-change: transform;
            }
                      .parallax-layer.layer.layer-back {
height:300px;
            }
               .parallax-layer.layer.layer-middle {
height:300px;
            }
               .parallax-layer.layer.layer-front {
height:300px;
            }
            .layer-back { z-index: 1; }
            .layer-middle { z-index: 2; }
            .layer-front { z-index: 3; }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', parallaxCSS);

    // 3. Create layers
    layers.forEach(layer => {
        const layerElement = document.createElement('div');
        layerElement.className = `parallax-layer ${layer.class}`;
        layerElement.style.backgroundImage = `url('${layer.image}')`;
        layerElement.dataset.speed = layer['auto-speed']; // Only auto-speed used
        parallaxContainer.appendChild(layerElement);
    });

    // 4. Auto-scroll animation (smooth & efficient)
    let animationId;
    let scrollPos = 0;
    const animate = () => {
        scrollPos += 0.5; // Base speed (adjust as needed)
        parallaxContainer.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = parseFloat(layer.dataset.speed);
            const xPos = -(scrollPos * speed) % window.innerWidth;
            layer.style.backgroundPosition = `${xPos}px 0`;
        });
        animationId = requestAnimationFrame(animate);
    };
    animate();

}

// Party

function renderPartySystem() {
    const container = document.getElementById('main');
    
    // Create party UI HTML
    container.innerHTML = `
        <style>
            .party-container {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }
            .party-slots {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 40px;
                flex-wrap: wrap;
            }
            .party-slot {
                width: 150px;
                height: 200px;
                border: 2px dashed #666;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: rgba(0,0,0,0.1);
                transition: all 0.2s;
            }
            .party-slot.filled {
                border-color: #4CAF50;
                background-color: rgba(76, 175, 80, 0.1);
            }
            .slot-image {
                width: 100px;
                height: 100px;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            .hero-list {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
            }
            .hero-card {
                width: 120px;
                cursor: pointer;
                transition: transform 0.2s;
                text-align: center;
            }
            .hero-card:hover {
                transform: scale(1.05);
            }
            .hero-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid #333;
            }
            .hero-name {
                margin-top: 5px;
                font-size: 14px;
            }
            .controls {
                margin-top: 30px;
                text-align: center;
            }
            .btn {
                padding: 10px 20px;
                margin: 0 10px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            }
            .btn-save {
                background-color: #4CAF50;
                color: white;
            }
            .btn-clear {
                background-color: #f44336;
                color: white;
            }
            .btn-back {
                background-color: #2196F3;
                color: white;
            }
        </style>
        <div class="party-container">
            <h2>Party Formation</h2>
            <p>Select up to 5 heroes for your party</p>
            
            <div class="party-slots" id="partySlots">
                ${Array(5).fill().map((_, i) => `
                    <div class="party-slot" data-slot-index="${i}">
                        <div class="slot-empty">Empty Slot</div>
                    </div>
                `).join('')}
            </div>
            
            <h3>Available Heroes</h3>
            <div class="hero-list" id="heroList">
                ${Object.entries(heroes).map(([id, hero]) => `
                    <div class="hero-card" data-hero-id="${id}">
                        <img src="${hero.image}" alt="${hero.name}" class="hero-image">
                        <div class="hero-name">${hero.name}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="controls">
                <button class="btn btn-save" id="saveParty">Save Party</button>
                <button class="btn btn-clear" id="clearParty">Clear Party</button>
                <button class="btn btn-back" next_scene="start_screen">Back</button>
            </div>
        </div>
    `;

    // Initialize the party slots with current party data
    updatePartySlots();

    // Add event listeners
    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', function() {
            const heroId = this.getAttribute('data-hero-id');
            addHeroToParty(heroId);
        });
    });

    document.getElementById('saveParty').addEventListener('click', saveParty);
    document.getElementById('clearParty').addEventListener('click', clearParty);
}

function updatePartySlots() {
    const slots = document.querySelectorAll('.party-slot');
    
    // Clear all slots first
    slots.forEach(slot => {
        slot.innerHTML = '<div class="slot-empty">Empty Slot</div>';
        slot.classList.remove('filled');
    });
    
    // Fill slots with current party
    gameState.party.forEach((heroId, index) => {
        if (heroId && heroes[heroId]) {
            const hero = heroes[heroId];
            const slot = slots[index];
            
            slot.innerHTML = `
                <img src="${hero.image}" alt="${hero.name}" class="slot-image">
                <div>${hero.name}</div>
            `;
            slot.classList.add('filled');
        }
    });
}

function addHeroToParty(heroId) {
    // Check if hero is already in party
    if (gameState.party.includes(heroId)) {
        alert('This hero is already in your party!');
        return;
    }
    
    // Find first empty slot
    const emptySlotIndex = gameState.party.findIndex(slot => !slot);
    
    if (emptySlotIndex === -1 && gameState.party.length < 5) {
        // There's space but no empty slots (array not full)
        gameState.party.push(heroId);
    } else if (emptySlotIndex !== -1) {
        // Replace empty slot
        gameState.party[emptySlotIndex] = heroId;
    } else {
        alert('Your party is full! Remove someone first.');
        return;
    }
    
    updatePartySlots();
}

function saveParty() {
    // Filter out any empty slots
    gameState.party = gameState.party.filter(heroId => heroId);
    
    if (gameState.party.length === 0) {
        alert('Your party is empty! Add some heroes first.');
        return;
    }
    
    alert('Party saved successfully!');
    // The party is already saved in gameState.party
    // You can now use gameState.party in other scenes
}

function clearParty() {
    if (confirm('Are you sure you want to clear your party?')) {
        gameState.party = [];
        updatePartySlots();
    }
}
