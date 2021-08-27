import * as index from "./index.js"
import * as terrain from "./terrain.js"
import * as player from "./player.js"
var menu;
var start;
var about;
var x = 0;
var y = 0;
var velx = 0;
var vely = 0;
var menuOn = false;
var sprites = [PIXI.Sprite.from("./images/menu.png"),
PIXI.Sprite.from("./images/start.png"),
PIXI.Sprite.from("./images/about.png")]
export function startUp(px, py) {
    if (!menuOn) {
        console.log(py);
        menuOn = true;
        for (let i = 0; i < sprites.length; i++) {
            console.log(i);
            sprites[i].buttonMode = true;
            sprites[i].interactive = true;
            sprites[i] = addMenuOption(window.innerWidth / 2, 150 * i + 150, 300, sprites[i]);
            index.app.stage.addChild(sprites[i]);
        }
        sprites[2].on('pointerdown', () => {
            index.start(1, px, py, velx, vely);
            for (let i = 0; i < sprites.length; i++) {
                sprites[i].visible = false;
            }
            menuOn = false;
        });
    }
}
document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        x = terrain.terrainCont.x;
        y = terrain.terrainCont.y;
        velx = terrain.velx;
        vely = player.vely;
        index.stop();
        startUp(x, y);
    }
});
function addMenuOption(x, y, width, sprite) {
    sprite.anchor.set(0.5);
    sprite.y = y;
    sprite.x = x;
    sprite.width = width;
    sprite.height = 100;
    return (sprite);
}