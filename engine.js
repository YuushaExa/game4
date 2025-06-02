class VisualNovelEngine {
    constructor() {
        this.currentScene = null;
        this.scenesData = {};
        this.handlers = {};
        this.mainDiv = document.getElementById('main');
        
        // Set up event delegation once during initialization
        this.setupEventDelegation();
    }

    // Initialize the engine with game data
    init(gameData) {
        this.scenesData = gameData.scenes;
        this.triggerEvent('dataLoaded');
        this.startVisualNovel();
    }

    // Set up event delegation for scene transitions
setupEventDelegation() {
    this.mainDiv.addEventListener('click', (e) => {
        const targetScene = e.target.closest('[next_scene]')?.getAttribute('next_scene');
        if (targetScene) this.renderScene(targetScene);
    });
}

    // Start the visual novel
startVisualNovel() {
    const startingScene = this.scenesData['start_screen'] ? 'start_screen' : 'block_1';
    if (this.scenesData[startingScene]) {
        this.renderScene(startingScene);
    } else {
        console.error('No starting scene found');
    }
}

    // Render a scene
    renderScene(sceneId) {
         if (this.currentScene && this.scenesData[this.currentScene]?.onLeave) {
        this.scenesData[this.currentScene].onLeave();
    }
   
        const scene = this.scenesData[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }

  this.mainDiv.style.backgroundImage = 'none';
    this.mainDiv.style.backgroundColor = 'transparent';

        
       if (scene.background) {
            this.setBackground(scene.background);
        }
           if (scene.color) {
            this.setColor(scene.color);
        }
        
        this.currentScene = sceneId;
        this.mainDiv.innerHTML = scene.html || '';

  if (scene.dialog) {
        renderDialogSystem(scene.dialog);
    }

          if (scene.buttons) {
        renderButtons(scene.buttons);
    }
        
  if (scene.choices) {
        renderChoices(scene.choices);
    }
        
        if (scene.onRender) {
            scene.onRender();
        }

        this.triggerEvent('sceneChanged', { sceneId });
    }

    setBackground(backgroundUrl) {
           this.mainDiv.style.backgroundImage = `url('${backgroundUrl}')`;
    }
       setColor(color) {
          this.mainDiv.style.backgroundColor = color;
    }

    
    // Event handling system
    on(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler);
    }

    triggerEvent(event, data = {}) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(handler => handler(data));
        }
    }
}

// something

  renderButtons(buttonsData) {
        buttonsData.forEach(button => {
            const link = document.createElement('a');
            link.href = button.url || 'javascript:void(0)';
            
            // Handle scene transitions if next_scene is specified
            if (button.next_scene) {
                link.setAttribute('next_scene', button.next_scene);
            }
            
            // Set button position
            link.style.position = 'absolute';
            const [top, left, bottom, right] = button.position.split(' ');
            link.style.top = top;
            link.style.left = left;
            link.style.bottom = bottom;
            link.style.right = right;

            // Create image or text content
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

            // Add custom classes if specified
            if (button.class) {
                link.className = button.class;
            }

            // Add to main container
            this.mainDiv.appendChild(link);
        });
    }


// Initialize the engine when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.vnEngine = new VisualNovelEngine();
    
    // Check if gameData is available
    if (typeof gameData !== 'undefined') {
        vnEngine.init(gameData);
    } else {
        console.error('gameData is not defined. Make sure game.js is loaded.');
    }
});
