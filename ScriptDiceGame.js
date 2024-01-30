/* Marine GAREIN */

// Initialisation des 2 joueurs, le joueur 1 commence
var idPlayer = 1

var roundScore = 0;

var globalScore1 = 0;

var globalScore2 = 0;

document.getElementById('current1').textContent = roundScore;
document.getElementById('current2').textContent = roundScore;
document.getElementById('score1').textContent = globalScore1;
document.getElementById('score2').textContent = globalScore2;

// Le joueur 1 commmence: récupération de son ID et changement de la couleur de fond
document.getElementById('player1').style.background = '#e38471';

// Désactivation du bouton Hold pour le premier joueur
document.getElementById("btnHold").disabled = true;

// Désactivation du bouton Hold lorsque le score du tour est à 0
function disableHold() {
    if(roundScore == 0) {
        document.getElementById("btnHold").disabled = true;
    } else {
        document.getElementById("btnHold").disabled = false;
    }
}

// Initialisation de la fonction de lattence entre deux lancés
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Masquage des faces du dé
function hideDots() {
    document.getElementById('dot1').style.visibility='hidden';
    document.getElementById('dot2').style.visibility='hidden';
    document.getElementById('dot3').style.visibility='hidden';
    document.getElementById('dot4').style.visibility='hidden';
    document.getElementById('dot5').style.visibility='hidden';
    document.getElementById('dot6').style.visibility='hidden';
    document.getElementById('dot7').style.visibility='hidden'; 
}

//Affichage de chaque faces du dé
function showFace1() {
    document.getElementById('dot1').style.visibility='visible';
}

function showFace2() {
    document.getElementById('dot3').style.visibility='visible';
    document.getElementById('dot6').style.visibility='visible';
}

function showFace3() {
    document.getElementById('dot1').style.visibility='visible';
    document.getElementById('dot3').style.visibility='visible';
    document.getElementById('dot6').style.visibility='visible';
}

function showFace4() {
    document.getElementById('dot2').style.visibility='visible';
    document.getElementById('dot3').style.visibility='visible';
    document.getElementById('dot6').style.visibility='visible';
    document.getElementById('dot7').style.visibility='visible';
}

function showFace5() {
    document.getElementById('dot1').style.visibility='visible';
    document.getElementById('dot2').style.visibility='visible';
    document.getElementById('dot3').style.visibility='visible';
    document.getElementById('dot6').style.visibility='visible';
    document.getElementById('dot7').style.visibility='visible';
}

function showFace6() {
    document.getElementById('dot2').style.visibility='visible';
    document.getElementById('dot3').style.visibility='visible';
    document.getElementById('dot4').style.visibility='visible';
    document.getElementById('dot5').style.visibility='visible';
    document.getElementById('dot6').style.visibility='visible';
    document.getElementById('dot7').style.visibility='visible';
}

// Fonction du joueur suivant
function nextPlayer() {
    disableHold();

    roundScore = 0;

    // Affichage du score en cours
    document.getElementById('current1').textContent = roundScore;
    document.getElementById('current2').textContent = roundScore;

    // Récupération des ID des 2 joueurs et changement de la couleur de fond
    if(idPlayer == 1) {
        idPlayer = 2;
        document.getElementById('player1').style.backgroundColor='#f5f5f5';
        document.getElementById('player2').style.backgroundColor='#e38471';
    } else {
        idPlayer = 1;
        document.getElementById('player1').style.backgroundColor='#e38471';
        document.getElementById('player2').style.backgroundColor='#f5f5f5';

    }

    
}

// Fonction pour le lancement du dé 
function rollDice() {
    hideDots();

    // desactivation du bouton roll pour eviter un bug d'affichage lors du spam du bouton
    document.getElementById("btnRoll").disabled = true;

    // Utilisation d'une promesse pour délayer l'affichage des points lors du lancement du dé
    sleep(500).then(() => {
        const roll = Math.floor(Math.random() * 6) + 1;

        
    // Utilisation d'un switch pour afficher les faces du dé
    switch(roll) {
        case 1:
            showFace1();
            break;
        case 2:
            showFace2();
            break;
        case 3:
            showFace3();
            break;
        case 4:
            showFace4();
            break;
        case 5:
            showFace5();
            break;
        case 6:
            showFace6();
            break;
      }
    if (roll == 1) {
        // La main passe au joueur suivant si la face est 1
        nextPlayer();
        
    } else {
        // Ajout des points au score du tour
        roundScore += roll;
        if(idPlayer == 1) {
            // Mise à jour de l'interface utilisateur
            document.getElementById('current1').textContent = roundScore;
        } else {
            // Affichage du score en cours
            document.getElementById('current2').textContent = roundScore;
        }
        
    }

    // Reactivation du bouton Roll après le lancement du dé
    document.getElementById("btnRoll").disabled = false;

    disableHold();

    });
 
}

// Fonction pour le score global d'un joueur
function hold() {
    if(idPlayer == 1) {
        // Ajout des points du tour au score global
        globalScore1 += roundScore;
        // Mise à jour de l'interface utilisateur
        document.getElementById('score1').textContent = globalScore1;
    } else {
        // Ajout des points du tour au score global
        globalScore2 += roundScore;
        // Mise à jour de l'interface utilisateur
        document.getElementById('score2').textContent = globalScore2;
    }
    
    // Vérification de la victoire
    if (globalScore1 >= 100) {
        document.getElementById('winner').textContent = 'Le joueur 1 a gagné !';
        document.getElementById('btnHold').disabled = true;
        document.getElementById('btnRoll').disabled = true;
    } else {
        if (globalScore2 >= 100) {
            document.getElementById('winner').textContent = 'Le joueur 2 a gagné !';
            document.getElementById('btnHold').disabled = true;
            document.getElementById('btnRoll').disabled = true;
        } else {
        nextPlayer();
        }
    }

    disableHold();
}

function newGame() {
    
    // Réinitialisation des scores
    roundScore = 0;
    globalScore1 = 0;
    globalScore2 = 0;

    // Réinitialisation du joueur
    idPlayer = 1;

    // Mise à jour de l'interface utilisateur
    document.getElementById('current1').textContent = roundScore;
    document.getElementById('current2').textContent = roundScore;
    document.getElementById('score1').textContent = globalScore1;
    document.getElementById('score2').textContent = globalScore2;
    document.getElementById('player1').style.background = '#e38471';
    document.getElementById('player2').style.background = '#f5f5f5';

    // Activation du bouton Roll pour le premier joueur
    document.getElementById("btnRoll").disabled = false;
    document.getElementById("btnHold").disabled = false;

    // Suppression du message de victoire
    document.getElementById('winner').textContent = '';
    

    // Mise à zéro du dé
    hideDots();

    disableHold();

}


