import io from 'socket.io-client';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import Round from "../helpers/round";
import Player from "../helpers/player";
import AttenteSalvatrice from '../helpers/cards/AttenteSalvatrice'
import UppercutVengeur from '../helpers/cards/UppercutVengeur';
import BriserLIntimité from "../helpers/cards/BriserLIntimité";
import Crachat from "../helpers/cards/Crachat";
import DécollageImminent from "../helpers/cards/DécollageImminent";
import Engagement from "../helpers/cards/Engagement";
import FeindrePourRenverser from "../helpers/cards/FeindrePourRenverser";
import FrappeBasique from "../helpers/cards/FrappeBasique";
import FrapperPourTuer from "../helpers/cards/FrapperPourTuer";
import FuiteTactique from "../helpers/cards/FuiteTactique";


let hpA;
let hpAText;
let staminaA;
let staminaAText;
let hpB;
let hpBText;
let staminaB;
let staminaBText;


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }


    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');
        this.load.image('fond', 'src/assets/Fond.jpg');
        this.load.image('bleu', 'src/assets/tete_bleu.png');
        this.load.image('vert', 'src/assets/tete_verte.png');
        this.load.image('front', 'src/assets/carte_front.png');
        this.load.audio('poupoule', 'src/assets/Poupoule.wav');
        this.load.audio('loop', 'src/assets/Poupoule loop.wav');
    }

    create() {


        this.isPlayerA = false;
        this.opponentCards = [];

        const bg = this.add.image(960, 540, 'fond').disableInteractive();
        const tb = this.add.image(350, 300, 'vert').disableInteractive().setScale(0.2, 0.2);
        const tv = this.add.image(1500, 300, 'bleu').disableInteractive().setScale(0.2, 0.2);


        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);
        this.round = new Round(this);


        let playerA = new Player(this);
        let playerB = new Player(this);

        hpA = playerA.hp;
        hpAText = this.add.text(20, 20, "HP : " + playerA.hp).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00a550');

        staminaA = playerA.stamina;
        staminaAText = this.add.text(20, 40, "Stamina : " + playerA.stamina).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00a550');

        hpB = playerB.hp;
        hpBText = this.add.text(1200, 20, "HP : " + playerB.hp).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00a550');

        staminaB = playerB.stamina;
        staminaBText = this.add.text(1200, 40, "Stamina : " + playerB.stamina).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00a550');

        let self = this;

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
        })

        var poupoule = this.sound.add('poupoule');
        var poupouleLoop = this.sound.add('loop');

        poupoule.on('complete', function () {
            poupouleLoop.play();
            poupouleLoop.add('loop');
        })
        
        poupoule.play();

        this.socket.on('startGame', function () {

            let playerSprite;
            let opponentSprite;
            if (this.isPlayerA) {
                playerSprite = 'front';
                opponentSprite = 'magentaCardBack';
            } else {
                playerSprite = 'front';
                opponentSprite = 'cyanCardBack';
            }

            let deck = [];
            var ix = 0;
            var iy = 0;

            let card1 = new AttenteSalvatrice(self);
            card1.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card2 = new UppercutVengeur(self);
            card2.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card3 = new BriserLIntimité(self);
            card3.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card4 = new Crachat(self);
            card4.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card5 = new DécollageImminent(self);
            card5.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix = 0;

            iy++;
            let card6 = new Engagement(self);
            card6.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card7 = new FeindrePourRenverser(self);
            card7.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card8 = new FrappeBasique(self);
            card8.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card9 = new FrapperPourTuer(self);
            card9.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix++;
            let card10 = new FuiteTactique(self);
            card10.render(200 + (ix * 375), 850 + (iy * 900), playerSprite);
            ix = 0;


            self.dealText.disableInteractive();
        })

        let opponentCard;
        let usedCard;
        this.socket.on('cardPlayed', function (
            {
                name,
                id,
                speed,
                description,
                descriptionBAX,
                hpUser,
                mindSetUser,
                stanceUser,
                mindSetOpponent,
                stanceOpponent,
                staminaUser,
                hpOpponent,
                staminaOpponent,
                animationUser,
                animationOpponent,
                son
            }, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                console.log("Save des données Opponent");

                opponentCard = {
                    name,
                    id,
                    speed,
                    description,
                    descriptionBAX,
                    hpUser,
                    mindSetUser,
                    stanceUser,
                    mindSetOpponent,
                    stanceOpponent,
                    staminaUser,
                    hpOpponent,
                    staminaOpponent,
                    animationUser,
                    animationOpponent,
                    son
                }
            } else {
                console.log("Save des données User");
                usedCard = {
                    name,
                    id,
                    speed,
                    description,
                    descriptionBAX,
                    hpUser,
                    mindSetUser,
                    stanceUser,
                    mindSetOpponent,
                    stanceOpponent,
                    staminaUser,
                    hpOpponent,
                    staminaOpponent,
                    animationUser,
                    animationOpponent,
                    son
                }
            }

            console.log("name : " + name);
            console.log("speed : " + speed);
            console.log("hpUser : " + hpUser);
            console.log("staminaUser : " + staminaUser);
            console.log("hpOpponent : " + hpOpponent);
            console.log("staminaOpponent : " + staminaOpponent);

            if (opponentCard != null && usedCard != null) {
                if (usedCard.speed > opponentCard.speed) {

                    // JA joue

                    let stockStaminaA = staminaA;
                    staminaA = staminaA + usedCard.staminaUser; // User use Stamina
                    if (staminaA > 20) {
                        staminaA = 20
                    }
                    if (staminaA < 0) {  // User n'a plus de Stamina. Il passe son tour
                        staminaA = stockStaminaA;
                        staminaAText.setText("Stamina : " + staminaA);

                        console.log("User n'a plus de Stamina. Il passe son tour et récupère son ancienne value")
                    } else { // Si User a de la Stamina : Les effets sont déclenchés
                        staminaAText.setText("Stamina : " + staminaA);

                        hpA = hpA + usedCard.hpUser; // User se soigne/S'inflige des dégats
                        if (hpA > 60) {
                            hpA = 60
                        }
                        hpAText.setText("HP : " + hpA);

                        hpB = hpB + usedCard.hpOpponent; // User Tape Opponent
                        if (hpB > 60) {
                            hpB = 60
                        }
                        hpBText.setText("HP : " + hpB);

                        staminaB = staminaB + usedCard.staminaOpponent; // Opponent Tape la Stamina User
                        if (staminaB > 20) {
                            staminaB = 20
                        }
                        staminaBText.setText("Stamina : " + staminaB);
                    }
                    // JB
                    let stockStaminaB = staminaB;
                    staminaB = staminaB + opponentCard.staminaUser; // User use Stamina
                    if (staminaB > 20) {
                        staminaB = 20
                    }
                    if (staminaB < 0) {  // Opponent n'a plus de Stamina. Il passe son tour
                        staminaB = stockStaminaB;
                        staminaBText.setText("Stamina : " + staminaB);
                        console.log("Opponent n'a plus de Stamina. Il passe son tour et récupère son ancienne value")
                    } else { // Si Opponent a de la Stamina : Les effets sont déclenchés
                        staminaBText.setText("Stamina : " + staminaB);

                        hpB = hpB + opponentCard.hpUser; // User se soigne/S'inflige des dégats
                        if (hpB > 60) {
                            hpB = 60
                        }
                        hpBText.setText("HP : " + hpB);

                        hpA = hpA + opponentCard.hpOpponent; // Opponent Tape User
                        if (hpA > 60) {
                            hpA = 60
                        }
                        hpAText.setText("HP : " + hpA);

                        staminaA = staminaA + opponentCard.staminaOpponent; // Opponent Tape la Stamina User
                        if (staminaA > 20) {
                            staminaA = 20
                        }
                        staminaAText.setText("Stamina : " + staminaA);
                    }
                } else {
                    // JB
                    let stockStaminaB = staminaB;
                    staminaB = staminaB + opponentCard.staminaUser; // User use Stamina
                    if (staminaB > 20) {
                        staminaB = 20
                    }
                    if (staminaB < 0) {  // Opponent n'a plus de Stamina. Il passe son tour
                        staminaB = stockStaminaB;
                        staminaBText.setText("Stamina : " + staminaB);
                        console.log("Opponent n'a plus de Stamina. Il passe son tour et récupère son ancienne value")
                    } else { // Si Opponent a de la Stamina : Les effets sont déclenchés
                        staminaBText.setText("Stamina : " + staminaB);

                        hpB = hpB + opponentCard.hpUser; // User se soigne/S'inflige des dégats
                        if (hpB > 60) {
                            hpB = 60
                        }
                        hpBText.setText("HP : " + hpB);

                        hpA = hpA + opponentCard.hpOpponent; // Opponent Tape User
                        if (hpA > 60) {
                            hpA = 60
                        }
                        hpAText.setText("HP : " + hpA);

                        staminaA = staminaA + opponentCard.staminaOpponent; // Opponent Tape la Stamina User
                        if (staminaA > 20) {
                            staminaA = 20
                        }
                        staminaAText.setText("Stamina : " + staminaA);

                        // JA joue

                        let stockStaminaA = staminaA;
                        staminaA = staminaA + usedCard.staminaUser; // User use Stamina
                        if (staminaA > 20) {
                            staminaA = 20
                        }
                        if (staminaA < 0) {  // User n'a plus de Stamina. Il passe son tour
                            staminaA = stockStaminaA;
                            staminaAText.setText("Stamina : " + staminaA);

                            console.log("User n'a plus de Stamina. Il passe son tour et récupère son ancienne value")
                        } else { // Si User a de la Stamina : Les effets sont déclenchés
                            staminaAText.setText("Stamina : " + staminaA);

                            hpA = hpA + usedCard.hpUser; // User se soigne/S'inflige des dégats
                            if (hpA > 60) {
                                hpA = 60
                            }
                            hpAText.setText("HP : " + hpA);

                            hpB = hpB + usedCard.hpOpponent; // User Tape Opponent
                            if (hpB > 60) {
                                hpB = 60
                            }
                            hpBText.setText("HP : " + hpB);

                            staminaB = staminaB + usedCard.staminaOpponent; // Opponent Tape la Stamina User
                            if (staminaB > 20) {
                                staminaB = 20
                            }
                            staminaBText.setText("Stamina : " + staminaB);
                        }
                    }

                }

                opponentCard = null;
                usedCard = null;
                self.socket.emit("startGame");
                console.log("dataplayer " + usedCard);
                self.dropZone.setInteractive();
            }
        })


        var dataPlayer = null;

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            dataPlayer = (gameObject.data.values)
            const dataPlayerSend = {
                name: dataPlayer.name,
                id: dataPlayer.id,
                speed: dataPlayer.speed,
                description: dataPlayer.description,
                descriptionBAX: dataPlayer.descriptionBAX,
                hpUser: dataPlayer.hpUser,
                mindSetUser: dataPlayer.mindSetUser,
                stanceUser: dataPlayer.stanceUser,
                mindSetOpponent: dataPlayer.mindSetOpponent,
                stanceOpponent: dataPlayer.stanceOpponent,
                staminaUser: dataPlayer.staminaUser,
                hpOpponent: dataPlayer.hpOpponent,
                staminaOpponent: dataPlayer.staminaOpponent,
                animationUser: dataPlayer.animationUser,
                animationOpponent: dataPlayer.animationOpponent,
                son: dataPlayer.son,
            }


            self.socket.emit('cardPlayed', dataPlayerSend, self.isPlayerA);

            if (dropZone.data.values.cards > 0 && self.isPlayerA) {
                self.dropZone.disableInteractive();

            }
            if (dropZone.data.values.cards > 0 && !self.isPlayerA) {
                self.dropZone.disableInteractive();
            }
            if (dropZone.data.values.cards === 2) {

            }
        })


        this.dealText = this.add.text(920, 240, ['Join Game']).setFontSize(50).setFontFamily('bold Alfa Slab One Regular').setColor('#00ffff').setInteractive();

        this.dealText.on('pointerdown', function () {
            self.socket.emit("startGame");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

    }

    update() {


    }
}