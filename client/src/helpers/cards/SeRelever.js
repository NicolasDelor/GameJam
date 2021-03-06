export default class SeRelever {
    constructor(scene) {

        let name = "Se relever";
        const id = 3;
        const speed = -1;
        let description = "Passe immédiatement A genoux. Si vous étiez Maintenu au Sol, n’effectuez cette action que si vous battez votre adversaire à un jeté de d6 (le plus haut l’emporte). Il passe alors en Stance Debout.";
        let descriptionBAX = "Passe immédiatement en Stance Debout. Si vous étiez Maintenu au Sol passez en Stance à Genoux à la place. Votre adversaire passe en Stance Debout.";

        const hpUser = 0;
        const staminaUser = -3;
        const mindSetUser = [];
        const stanceUser = [0,1,0,0,0,0,0,0,0];

        const hpOpponent = 0;
        const staminaOpponent = 0;
        const stanceOpponent = [1,0,0,0,0,0,0,0,0];
        const mindSetOpponent = [];
        let animationUser = 'attenteSalvatriceUser';
        let animationOpponent = 'attenteSalvatriceOpponent';
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
            const text = scene.add.text(-150, -200, this.name).setFontSize(40).setFontFamily('TrebuchetMS').setColor('#0000ff');
            const desc = scene.add.text(-150, 50, this.description).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const stau= scene.add.text(-150, -100, "STA : " + this.staminaUser).setFontSize(25).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const vit = scene.add.text(80, -100, "VIT : " + this.speed).setFontSize(25).setFontFamily('Trebuchet MS').setColor('#00ffff');

            const card = scene.add.container(x, y, [bg, text,desc,stau,vit]);
            card.setData ({name : this.name , id : this.id , speed : this.speed, description : this.description, descriptionBAX : this.descriptionBAX, mindSetUser : this.mindSetUser , stanceUser : this.stanceUser, mindSetOpponent : this.mindSetOpponent, stanceOpponent : this.mindSetOpponent , hpUser : this.hpUser, staminaUser : this.staminaUser, hpOpponent : this.hpOpponent, staminaOpponent : this.staminaOpponent , animationUser : this.animationUser, animationOpponent : this.animationOpponent, son : this.son});

            card.setSize(bg.width*0.65, bg.height*0.65);

            card.setInteractive();

            scene.input.setDraggable(card);
            return (card);
        }
    }
}