import Card from './card'
import AttenteSalvatrice from './cards/AttenteSalvatrice';
import UppercutVengeur from './cards/UppercutVengeur';


export default class Dealer extends Card {
    constructor(scene) {
        super(scene)
        this.startGame = () => {
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'cyanCardFront';
                opponentSprite = 'magentaCardBack';
            } else {
                playerSprite = 'magentaCardFront';
                opponentSprite = 'cyanCardBack';
            }

            let deck = [];

            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + (i * 100), 650, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, opponentSprite).disableInteractive());
            }
            let iPos = 0;

            let playerCardTest = new AttenteSalvatrice(scene);
            playerCardTest.render(475 + (iPos * 100), 650, playerSprite);
            deck.push(playerCardTest);
            console.log(playerCardTest.descriptionBAX, playerCardTest.staminaUser);

            iPos++;

            let playerCardTest2 = new UppercutVengeur(scene);
            playerCardTest2.render(475 + (iPos * 100), 650, playerSprite);
            deck.push(playerCardTest);
            console.log(playerCardTest.descriptionBAX, playerCardTest.hpOpponent);

        }
    }
}