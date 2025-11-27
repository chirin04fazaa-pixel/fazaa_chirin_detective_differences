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

// Éléments DOM supplémentaires
const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const leftImg = document.getElementById('left-img');
const rightImg = document.getElementById('right-img');
const countElement = document.getElementById('count');
const totalCountElement = document.getElementById('total-count');
const totalDifferencesElement = document.getElementById('total-differences');
const levelIndicator = document.getElementById('level-indicator');

// Initialisation du jeu
function initGame() {
    const levelConfig = gameLevels[gameState.currentLevel];
    
    // Réinitialiser l'état du jeu
    gameState.foundDifferences = [];
    gameState.seconds = 0;
    gameState.startTime = null;
    gameState.attempts = levelConfig.maxAttempts;
    gameState.gameActive = true;
    
    totalCountElement.textContent = levelConfig.totalDifferences;
    totalDifferencesElement.textContent = levelConfig.totalDifferences;
    // attemptsElement n'est pas encore géré, sera dans le prochain commit
    // finalTotalElement non plus
    
    levelIndicator.textContent = "Niveau: " + 
        (gameState.currentLevel === "facile" ? "Facile" : 
         gameState.currentLevel === "moyen" ? "Moyen" : "Difficile");
    levelIndicator.className = "level-indicator " + gameState.currentLevel;
    
    countElement.textContent = '0';
    // timeElement non géré pour l'instant
    // winMessage et loseMessage non gérés pour l'instant
    
    // Utilisation d'images de placeholder - à remplacer par vos vraies images
    leftImg.src = levelConfig.images.left;
    rightImg.src = levelConfig.images.right;
    
    // Nettoyer les zones de différence existantes
    leftImage.querySelectorAll('.difference-area').forEach(el => el.remove());
    rightImage.querySelectorAll('.difference-area').forEach(el => el.remove());
    
    // Attendre que les images soient chargées avant de créer les zones
    if (leftImg.complete && rightImg.complete) {
        createDifferenceAreas(levelConfig);
    } else {
        leftImg.onload = rightImg.onload = () => createDifferenceAreas(levelConfig);
    }
}

// Créer les zones de différence
function createDifferenceAreas(levelConfig) {
    const imgWidth = leftImg.clientWidth || 500; // Valeur par défaut si non chargé
    const imgHeight = leftImg.clientHeight || 400; // Valeur par défaut si non chargé
    
    levelConfig.differences.forEach(diff => {
        const leftPos = (diff.left / 100) * imgWidth;
        const topPos = (diff.top / 100) * imgHeight;
        const adjustedSize = diff.size;
        
        const leftArea = document.createElement('div');
        leftArea.className = 'difference-area';
        leftArea.style.left = `${leftPos}px`;
        leftArea.style.top = `${topPos}px`;
        leftArea.style.width = `${adjustedSize}px`;
        leftArea.style.height = `${adjustedSize}px`;
        leftArea.dataset.id = diff.id;
        
        const rightArea = document.createElement('div');
        rightArea.className = 'difference-area';
        rightArea.style.left = `${leftPos}px`;
        rightArea.style.top = `${topPos}px`;
        rightArea.style.width = `${adjustedSize}px`;
        rightArea.style.height = `${adjustedSize}px`;
        rightArea.dataset.id = diff.id;
        
        leftArea.addEventListener('click', handleDifferenceClick);
        rightArea.addEventListener('click', handleDifferenceClick);
        
        leftImage.appendChild(leftArea);
        rightImage.appendChild(rightArea);
    });
}

// Clic sur différence
function handleDifferenceClick(event) {
    if (!gameState.gameActive) return;
    
    const differenceId = parseInt(event.target.dataset.id);
    
    if (gameState.foundDifferences.includes(differenceId)) return;
    
    // Démarrer le timer au premier clic (sera implémenté dans le prochain commit)
    // if (!gameState.startTime) startTimer();
    
    gameState.foundDifferences.push(differenceId);
    countElement.textContent = gameState.foundDifferences.length;
    
    document.querySelectorAll(`.difference-area[data-id="${differenceId}"]`).forEach(area => {
        area.classList.add('found');
    });
    
    if (gameState.foundDifferences.length === gameLevels[gameState.currentLevel].totalDifferences) {
        // endGame(true); sera implémenté dans le prochain commit
    }
}

// Modifier la fonction de démarrage pour initialiser le jeu
// Remplacer la partie dans startBtn.addEventListener('click') par:
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
    // winnerName et loserName seront gérés dans le prochain commit
    
    welcomeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    initGame();
});