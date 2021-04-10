export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite, name) => {

            const bg = scene.add.image(0, 0, sprite).setScale(0.3, 0.3);
            const text = scene.add.text(0, 0, [name]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');

            const card = scene.add.container(x, y, [bg, text]);
            card.setSize(bg.width * .3, bg.height * .3);
            card.setInteractive();
            scene.input.setDraggable(card);

            return card;
        }
    }
}