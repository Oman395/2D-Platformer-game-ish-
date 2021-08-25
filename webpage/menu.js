import * as index from "./index.js"
import * as terrain from "./terrain.js"
var menu;
var start;
var about;
var x = 0;
var y = 0;
var menuOn = false;
export function startUp(px, py) {
    if (!menuOn) {
        console.log(py);
        menuOn = true;
        menu = PIXI.Sprite.from("./images/menu.png");
        start = PIXI.Sprite.from("./images/start.png");
        about = PIXI.Sprite.from("./images/about.png");
        menu = addMenuOption(window.innerWidth / 2, 150, 266, menu);
        start = addMenuOption(window.innerWidth / 2, 300, 333, start);
        about = addMenuOption(window.innerWidth / 2, 450, 322, about);
        menu.buttonMode = true;
        start.buttonMode = true;
        about.buttonMode = true;
        menu.interactive = true;
        start.interactive = true;
        about.interactive = true;
        index.app.stage.addChild(menu);
        index.app.stage.addChild(start);
        index.app.stage.addChild(about);
        start.on('pointerdown', () => {
            index.start(1, px, py);
            menu.visible = false;
            start.visible = false;
            about.visible = false;
            menuOn = false;
        });
    }
}
document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        x = terrain.terrainCont.x;
        y = terrain.terrainCont.y;
        console.log(x, y);
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