export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite,name,description,staminaUser,speed,stanceUser,mindsetUser) => {


            const bg = scene.add.image(0, 0, sprite).setScale(0.75, 0.75);
            const text = scene.add.text(0, 0, [name]).setFontSize(9).setFontFamily('Alfa Slab One Regular').setColor('#00ffff');

            const card = scene.add.container(x, y, [bg, text]);
            card.setSize(bg.width * 0.75, bg.height * 0.75);
            card.setInteractive();
            scene.input.setDraggable(card);

            return card;
        }
    }
}