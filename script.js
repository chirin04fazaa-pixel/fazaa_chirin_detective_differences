// Configuration des niveaux
const gameLevels = {
    facile: {
        totalDifferences: 7,
        maxAttempts: 6,
        images: { left: "14.png", right: "15.png" },
        differences: [
            { id: 1, left: 3, top: 12, size: 30 },
            { id: 2, left: 9.48, top: 69.74, size: 30 },
            { id: 3, left: 83.09, top: 50.51, size: 30 },
            { id: 4, left: 93.17, top: 54.05, size: 30 },
            { id: 5, left: 91.76, top: 66.19, size: 30 },
            { id: 6, left: 33.55, top: 79.61, size: 30 },
            { id: 7, left: 17.27, top: 47.22, size: 30 },
        ]
    },
    moyen: {
        totalDifferences: 7,
        maxAttempts: 4,
        images: { left: "5.jpg", right: "6.jpg" },
        differences: [
            { id: 1, left: 83.26, top: 77.18, size: 41 },
            { id: 2, left: 80, top: 62, size: 41 },
            { id: 3, left: 50, top: 30, size: 41 },
            { id: 4, left: 52, top: 5, size: 41 },
            { id: 5, left: 2, top: 20, size: 41 },
            { id: 6, left: 28.95, top: 80.92, size: 41 },
            { id: 7, left: 15, top: 25, size: 41 },
        ]
    },
    difficile: {
        totalDifferences: 7,
        maxAttempts: 3,
        images: { left: "10.jpg", right: "11.jpg" },
        differences: [
            { id: 1, left: 60, top: 15, size: 30 },
            { id: 2, left: 85, top: 22.87, size: 30 },
            { id: 3, left: 68, top: 49, size: 30 },
            { id: 4, left: 22, top: 52, size: 30 },
            { id: 5, left: 48, top: 86, size: 30 },
            { id: 6, left: 22, top: 22, size: 30 },
            { id: 7, left: 12, top: 18, size: 30 },
        ]
    }
};

// Éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const selectedLevelInput = document.getElementById('selected-level');
const startBtn = document.getElementById('start-btn');
const levelOptions = document.querySelectorAll('.level-option');
const playerDisplay = document.getElementById('player-display');
const backBtn = document.getElementById('back-btn');

// État du jeu (partiel)
let gameState = {
    playerName: "",
    currentLevel: "moyen"
};

// Initialisation
window.addEventListener('load', function() {
    createBubbles();
    document.querySelector('.level-option.medium').classList.add('selected');
    selectedLevelInput.value = "moyen";
});

// Créer les bulles
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        bubblesContainer.appendChild(bubble);
    }
}

// Démarrer le jeu
startBtn.addEventListener('click', function() {
    const name = playerNameInput.value.trim();
    const level = selectedLevelInput.value;
    
    if (!name) {
        alert("Entre ton nom de détective !");
        return;
    }

    if (!level) {
        alert("Choisis un niveau !");
        return;
    }
    
    gameState.playerName = name;
    gameState.currentLevel = level;
    
    playerDisplay.textContent = name;
    
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // Pour l'instant, on initialise le jeu sans les différences
    // initGame(); sera implémenté dans le prochain commit
});

// Retour à l'accueil
backBtn.addEventListener('click', function() {
    gameScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
});

// Sélection des niveaux
levelOptions.forEach(option => {
    option.addEventListener('click', function() {
        levelOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedLevelInput.value = this.getAttribute('data-level');
    });
});