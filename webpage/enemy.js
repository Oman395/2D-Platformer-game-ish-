export function enemyType(data) {
    this.data = data;
    this.default = {
        health: 2,
        defense: 1,
        speed: 10,
        jump: false,
        models: {
            model: new PIXI.Texture.from("./images/player-melvin.png"),
            modelL: new PIXI.Texture.from("./images/player-melvin-left-f1.png"),
            modelR: new PIXI.Texture.from("./images/player-melvin-right-f1.png"),
        },
    }
    if (!this.data) {
        this.data = this.default;
    }
    for (let i = 0; i < this.default.length; i++) {
        if (!this.data[Object.keys(this.default)[i]]) {
            this.data[Object.keys(this.default)[i]] = this.default[Object.keys(this.default)[i]];
        }
    }
    this.enemyCont = new PIXI.Container();
    this.newEnemy = function (posx, posy, width, height) {
        var enemy = new PIXI.Sprite.from(this.data.models.model);
        enemy.x = posx;
        enemy.y = posy;
        enemy.width = width;
        enemy.height = height;
        enemy.visible = true;
        enemy.velx = 5;
        this.enemyCont.addChild(enemy);
    }
}