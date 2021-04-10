export default class Player {
    constructor(scene) {

        const hp = 60;
        const stamina = 60;
        const mindSet = [1, 0, 0, 0, 0];
        const stance = [1, 0, 0, 0, 0, 0, 0, 0, 0]

        this.hp = hp;
        this.stamina = stamina;
        this.mindSet = mindSet;
        this.stance = stance;

        this.render = (x, y) => {

            const hpPlayer = scene.add.text(0, 0, hp).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const staminaPlayer = scene.add.text(10, 10, stamina).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const mindSetPlayer = scene.add.text(20, 30, mindSet).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
            const stancePlayer = scene.add.text(20, 30, stance).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');


            const player = scene.add.container(x, y, [hpPlayer, staminaPlayer, mindSetPlayer, stancePlayer]);


        }
    }
}