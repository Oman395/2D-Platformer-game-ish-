import * as index from "./index.js"
import * as terrain from "./terrain.js"
import * as player from "./player.js"
var x = 0;
var y = 0;
var velx = 0;
var vely = 0;
var menuOn = false;
var sprites = [PIXI.Sprite.from("./images/menu.png"),
PIXI.Sprite.from("./images/start.png"),
PIXI.Sprite.from("./images/about.png"),
PIXI.Sprite.from("./images/resume.png")]
var firsty;
export function startUp(first) {
    firsty = first;
    if (!menuOn) {
        if (firsty) {
            for (let i = 0; i < sprites.length; i++) {
                if (i != 3) {
                    sprites[i].visible = true;
                } else {
                    sprites[3].visible = false;
                }
            }
        } else {
            for (let i = 0; i < sprites.length - 2; i++) {
                if (i != 1) {
                    sprites[i].visible = true;
                } else {
                    sprites[3].visible = true;
                }
            }
        }
        menuOn = true;
    }
}
export function start() {
    for (let i = 0; i < sprites.length; i++) {
        if (i != 3) {
            sprites[i].buttonMode = true;
            sprites[i].interactive = true;
            sprites[i] = addMenuOption(window.innerWidth / 2, 150 * i + 150, 300, sprites[i]);
            index.app.stage.addChild(sprites[i]);
        } else {
            sprites[3].buttonMode = true;
            sprites[3].interactive = true;
            sprites[3] = addMenuOption(window.innerWidth / 2, 150 * 1 + 150, 300, sprites[3]);
            sprites[3].visible = false;
            index.app.stage.addChild(sprites[3]);
        }
    }
    sprites[1].on('pointerdown', () => {
        if (menuOn) {
            if (firsty) {
                index.start(0, x, y, vely, firsty);
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].visible = false;
                }
                menuOn = false;
            } else {
                index.softStart();
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].visible = false;
                }
                menuOn = false;
            }
        }
    });
    sprites[3].on('pointerdown', () => {
        if (menuOn) {
            if (firsty) {
                index.start(0, x, y, vely, firsty);
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].visible = false;
                }
                menuOn = false;
            } else {
                index.softStart();
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].visible = false;
                }
                menuOn = false;
            }
        }
    });
    sprites[0].on('pointerdown', () => {
        if (!firsty) {
            index.softStart();
            x = 0;
            y = 0;
            velx = 0;
            vely = 0;
            index.stop();
            sprites[2].visible = true;
            sprites[3].visible = false;
            sprites[1].visible = true;
            startUp(true);
        }
    });
}
export function stop() {
    if (!menuOn) {
        x = 0;
        y = 0;
        velx = 0;
        vely = 0;
        index.stop();
        startUp(true);
    }
}
document.addEventListener("keydown", function (event) {
    if (event.key == "Escape") {
        if (!menuOn) {
            index.softStop();
            startUp(false);
        } else if (!firsty) {
            index.softStart();
            for (let i = 0; i < sprites.length; i++) {
                sprites[i].visible = false;
            }
            menuOn = false;
        } else {
            index.start(0, x, y, vely, firsty);
            for (let i = 0; i < sprites.length; i++) {
                sprites[i].visible = false;
            }
            menuOn = false;
        }
    }
});
function addMenuOption(x, y, width, sprite) {
    sprite.anchor.set(0.5);
    sprite.y = y;
    sprite.x = x;
    sprite.width = width;
    sprite.height = 100;
    sprite.visible = true;
    return (sprite);
}