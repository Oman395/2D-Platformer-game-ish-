import * as index from "./index.js"
console.log(data);
var x = 0;
var y = 0;
var velx = 0;
var vely = 0;
var menuOn = false;
var sprites = [PIXI.Sprite.from("./images/menu.png"), // Main menu buttons
PIXI.Sprite.from("./images/start.png"),
PIXI.Sprite.from("./images/about.png"),
PIXI.Sprite.from("./images/resume.png")]
var data = { currentMap: 0, };
var worlds = [ // World selector buttons
    PIXI.Sprite.from("./images/one.png"),
    PIXI.Sprite.from("./images/two.png"),
    PIXI.Sprite.from("./images/three.png"),
    PIXI.Sprite.from("./images/four.png"),
    PIXI.Sprite.from("./images/five.png"),
    PIXI.Sprite.from("./images/six.png"),
    PIXI.Sprite.from("./images/seven.png"),
    PIXI.Sprite.from("./images/eight.png"),
    PIXI.Sprite.from("./images/nine.png"),
];
var firsty;
export function startUp(first) { // startUp("obviously")
    firsty = first;
    if (!menuOn) { // If menu isn't on
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
        menuOn = true; // Marks menu as on
    }
}
export function start() { // get everything ready
    for (let i = 0; i < sprites.length; i++) { // Configures main menu buttons
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
    for (let i = 0; i < worlds.length; i++) { // Configures world buttons
        worlds[i].buttonMode = true;
        worlds[i].interactive = true;
        if (i < 3) {
            worlds[i] = addMenuOption((window.innerWidth / 2 - 150) + 150 * i, 300, 100, worlds[i]);
        } else if (i < 6) {
            worlds[i] = addMenuOption((window.innerWidth / 2 - 150) + 150 * i - 450, 450, 100, worlds[i]);
        } else {
            worlds[i] = addMenuOption((window.innerWidth / 2 - 150) + 150 * i - 900, 600, 100, worlds[i]);
        }
        worlds[i].visible = false;
        index.app.stage.addChild(worlds[i]);
    }
    for (let i = 0; i < worlds.length; i++) { // Sets pointerdown for each world button
        worlds[i].on('pointerdown', () => {
            data.currentMap = i;
            index.start(i, x, y, vely, firsty);
            for (let i = 0; i < sprites.length; i++) {
                sprites[i].visible = false;
            }
            for (let i = 0; i < worlds.length; i++) {
                worlds[i].visible = false;
            }
            menuOn = false;
        });
    }
    sprites[1].on('pointerdown', () => { // rest of these are just defining the buttons
        if (menuOn) {
            if (firsty) {
                index.start(data.currentMap, x, y, vely, firsty);
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
        } else if (menuOn && firsty) {
            for (let i = 0; i < sprites.length; i++) {
                sprites[i].visible = false;
            }
            sprites[0].visible = true;
            for (let i = 0; i < worlds.length; i++) {
                worlds[i].visible = true;
            }
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
document.addEventListener("keydown", function (event) { // See terrain&player keys, although this one does have logic for pause vs unpause
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
function addMenuOption(x, y, width, sprite) { // addMenuOption("This joke is funny...?")
    sprite.anchor.set(0.5);
    sprite.y = y;
    sprite.x = x;
    sprite.width = width;
    sprite.height = 100;
    sprite.visible = true;
    return (sprite);
}