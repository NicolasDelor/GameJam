export default class BriserSesFers {
    constructor(scene) {

        let name = "Briser ses fers";
        const id = 23;
        const speed = 0;
        let description = "Si vous gagnez strictement un lancer de d6 contre votre adversaire, passez tous les deux en Stance Debout.";
        let descriptionBAX = "Vous et votre adversaire passez en Stance Debout. Infligez 9 points de dégâts.";
        const mindSetUser=[];
        const stanceUser = [];
        const mindSetOpponent = [];
        const stanceOpponent = [];
        const hpUser = 0;
        const staminaUser = -10;
        const hpOpponent = 0;
        const staminaOpponent = 0;
        let animationUser = 'briserSesFersUser';
        let animationOpponent = 'briserSesFersOpponent';
        let son = "attente";


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
        this.staminaUser = staminaUser;
        this.hpOpponent = hpOpponent;
        this.staminaOpponent = staminaOpponent;
        this.animationUser = animationUser;
        this.animationOpponent = animationOpponent;
        this.son = son;

        this.render = (x, y ,sprite) => {

            const bg = scene.add.image(0, 0, sprite).setScale(0.65, 0.65);
            const text = scene.add.text(-150, -200, name).setFontSize(40).setFontFamily('TrebuchetMS').setColor('#0000ff');
            const desc = scene.add.text(-150, 50, description).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const stau= scene.add.text(-150, -100, "STA : " + staminaUser).setFontSize(25).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const vit = scene.add.text(80, -100, "VIT : " + speed).setFontSize(25).setFontFamily('Trebuchet MS').setColor('#00ffff');

            const card = scene.add.container(x, y, [bg, text,desc,stau,vit]);
            card.setData ({name : this.name , id : this.id , speed : this.speed, description : this.description, descriptionBAX : this.descriptionBAX, mindSetUser : this.mindSetUser , stanceUser : this.stanceUser, mindSetOpponent : this.mindSetOpponent, stanceOpponent : this.mindSetOpponent , hpUser : this.hpUser, staminaUser : this.staminaUser, hpOpponent : this.hpOpponent, staminaOpponent : this.staminaOpponent , animationUser : this.animationUser, animationOpponent : this.animationOpponent, son : this.son});

            card.setSize(bg.width*0.65, bg.height*0.65);

            card.setInteractive();

            scene.input.setDraggable(card);
            return (card);
        }
    }
}