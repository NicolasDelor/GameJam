import Phaser from "phaser";
import Game from "./scenes/game"

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    renderer: Phaser.AUTO,
    width: 1920,
    height: 3080,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);