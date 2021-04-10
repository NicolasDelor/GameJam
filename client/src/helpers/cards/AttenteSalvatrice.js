export default class AttenteSalvatrice {
    constructor(scene) {

        let name = "Attente salvatrice";
        const id = 0;
        const speed = 0;
        let description = "bla bla";
        let descriptionBAX = "bla bla bla";
        const mindSetUser=[];
        const stanceUser = [];
        const mindSetOpponent = [];
        const stanceOpponent = [];
        const hpUser = 0;
        const staminaUser = 6;
        const hpOpponent = 0;
        const staminaOpponent = 0;

        this.name = name;
        this.id = id;
        this.speed = speed ;
        this.description = description;
        this.descriptionBAX = descriptionBAX;
        this.hpUser = hpUser ;
        this.mindSetUser = mindSetUser;
        this.stanceUser = stanceUser ;
        this.mindSetOpponent = mindSetOpponent;
        this.stanceOpponent = stanceOpponent;
        this.hpUser = hpUser;
        this.staminaUser = staminaUser;
        this.hpOpponent = hpOpponent;
        this.staminaOpponent = staminaOpponent;

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