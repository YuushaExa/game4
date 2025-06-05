 this.mainDiv = document.getElementById('main');

// dialog
function renderDialogSystem(dialogArray) {
    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';
    dialogContainer.innerHTML = `
        <div class="dialog-box">
            <div class="character-info">
                <img class="character-avatar" src="">
                <span class="character-name"></span>
            </div>
            <div class="dialog-text"></div>
            <button class="next-dialog">Next</button>
        </div>
    `;
    
    this.mainDiv.appendChild(dialogContainer);
    
    let currentDialogIndex = 0;
    const updateDialog = () => {
        if (currentDialogIndex >= dialogArray.length) {
            dialogContainer.remove();
            return;
        }
        
        const dialog = dialogArray[currentDialogIndex];
        dialogContainer.querySelector('.character-avatar').src = dialog.image;
        dialogContainer.querySelector('.character-name').textContent = dialog.name;
        dialogContainer.querySelector('.dialog-text').textContent = dialog.text;
        
        // Hide next button if there are choices
        const nextBtn = dialogContainer.querySelector('.next-dialog');
        if (dialog.choices) {
            nextBtn.style.display = 'none';
            renderChoices.call(this, dialog.choices); // Bind 'this' properly
        } else {
            nextBtn.style.display = 'block';
        }
    };
    
    updateDialog();
    
    dialogContainer.querySelector('.next-dialog').addEventListener('click', () => {
        currentDialogIndex++;
        updateDialog();
    });
}

function renderChoices(choices) {
    // Clear existing choices
    const existing = document.querySelector('.choices-overlay');
    if (existing) existing.remove();
    
    // Create main overlay container
    const choicesOverlay = document.createElement('div');
    choicesOverlay.className = 'choices-overlay';
    
    // Create centered choices container
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-center-container';
    
    // Create each choice button
    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.className = 'choice-button';
        choiceButton.textContent = choice.text;
        
        choiceButton.addEventListener('click', () => {
            // Remove the choices overlay
            choicesOverlay.remove();
            
            // Load the next scene using the engine's method
            if (choice.next_scene) {
                vnEngine.renderScene(choice.next_scene);
            }
        });
        
        choicesContainer.appendChild(choiceButton);
    });
    
    choicesOverlay.appendChild(choicesContainer);
    this.mainDiv.appendChild(choicesOverlay);
    
    // Add click handler to overlay (optional - close when clicking outside)
    choicesOverlay.addEventListener('click', (e) => {
        if (e.target === choicesOverlay) {
            choicesOverlay.remove();
        }
    });
}


function renderButtons(buttonsData) {
        buttonsData.forEach(button => {
            const link = document.createElement('a');
            link.href = button.url || 'javascript:void(0)';
            
            if (button.next_scene) {
                link.setAttribute('next_scene', button.next_scene);
            }
            
            link.style.position = 'absolute';
            const [top, left, bottom, right] = button.position.split(' ');
            link.style.top = top;
            link.style.left = left;
            link.style.bottom = bottom;
            link.style.right = right;

            if (button.type === "image") {
                const img = document.createElement('img');
                img.src = button.image;
                img.alt = button.alt || "";
                img.style.maxWidth = button.width || "100px";
                link.appendChild(img);
            } else if (button.type === "text") {
                link.textContent = button.text;
                link.style.textDecoration = "none";
                link.style.color = button.color || "#0066cc";
                link.style.fontWeight = "bold";
                link.style.padding = "8px 12px";
                link.style.borderRadius = "4px";
                link.style.background = button.background || "rgba(0,0,0,0.2)";
            }

            if (button.class) {
                link.className = button.class;
            }

            this.mainDiv.appendChild(link);
        });
    }

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

 setupParallax(layers) {
        // Create container
        const parallaxContainer = document.createElement('div');
        parallaxContainer.className = 'parallax-container';
        
        // Add CSS for parallax
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
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    will-change: transform;
                }
                .layer-back {
                    z-index: 1;
                }
                .layer-middle {
                    z-index: 2;
                }
                .layer-front {
                    z-index: 3;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', parallaxCSS);

        // Create layers
        layers.forEach(layer => {
            const layerElement = document.createElement('div');
            layerElement.className = `parallax-layer ${layer.class}`;
            layerElement.style.backgroundImage = `url('${layer.image}')`;
            layerElement.dataset.speed = layer.data-speed;
            parallaxContainer.appendChild(layerElement);
        });

        // Insert before main content
        document.body.insertBefore(parallaxContainer, this.mainDiv);

        // Set up scroll event
        window.addEventListener('scroll', this.handleParallaxScroll);
    }

    handleParallaxScroll() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const layers = document.querySelectorAll('.parallax-layer');
        
        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed);
            const yPos = -(scrollPosition * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
