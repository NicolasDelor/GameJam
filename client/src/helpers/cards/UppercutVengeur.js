export default class UppercutVengeur {
    constructor(scene) {

        let name = "Uppercut vengeur";
        const id = 6;
        const speed = 0;
        let description = "bla bla";
        let descriptionBAX = "bla bla bla";

        const hpUser = 0;
        const staminaUser = -6;
        const mindSetUser = [];
        const stanceUser = [];

        const damageOpponent = 13;
        const damamgeStaminaOpponent = 0;
        const forceStanceOpponent = [];
        const mindSetOpponent = [];


        this.name = name;
        this.id = id;
        this.speed = speed;
        this.description = description;
        this.descriptionBAX = descriptionBAX;

        this.hpUser = hpUser;
        this.staminaUser = staminaUser;
        this.mindSetUser = mindSetUser;
        this.stanceUser = stanceUser;

        this.hpOpponent = damageOpponent;
        this.staminaOpponent = damamgeStaminaOpponent;
        this.stanceOpponent = forceStanceOpponent;
        this.mindSetOpponent = mindSetOpponent;

        this.render = (x, y ,sprite) => {

            const bg = scene.add.image(0, 0, sprite).setScale(0.3, 0.3);
            const text = scene.add.text(0, 0, name).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const desc = scene.add.text(10, 10, description).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const stau= scene.add.text(20, 30, staminaUser).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');


            const card = scene.add.container(x, y, [bg, text,desc,stau]);


            card.setSize(bg.width*0.3, bg.height*0.3);

            card.setInteractive();

            scene.input.setDraggable(card);
        }
    }
}