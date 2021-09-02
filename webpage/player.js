import * as terrain from "./terrain.js";
import * as index from "./index.js";
import * as menu from "./menu.js";
export var sprites = [PIXI.Texture.from('./images/player-melvin.png'), PIXI.Texture.from('./images/player-melvin-down.png'), PIXI.Texture.from('./images/player-melvin-right-f1.png'), PIXI.Texture.from('./images/player-melvin-left-f1.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png'), PIXI.Texture.from('./images/player-melvin-jump.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png')]; // TODO: Do this with a goddamn for loop
export var player;
export var vely = -1;
export var Collided = false;
export var currentLeft = sprites[2];
export var currentRight = sprites[3];
export var up = false;
export var stopped = { stopped: false };
export function start(vy) {
    player = PIXI.Sprite.from(sprites[0]);
    player.anchor.set(0.5);
    player.y = window.innerHeight / 2;
    player.x = Math.round(window.innerWidth / 20) * 10;
    player.width = 100;
    player.height = 100;
    vely = vy;
    index.app.stage.addChild(player);
}
export function stop() {
    player.visible = false;
}
export function tick() {
    if (up && !stopped.stopped) { // Checks if not paused before going up
        if (vely == 0) {
            terrain.terrainCont.y += 0.2;
            vely = 8;
        }
    }
    if (vely < -50) { // Max speed
        vely = -50;
    }
    var collided = false;
    for (let i = 0; i < terrain.terrainCont.children.length; i++) { // For each block in terrain
        if (terrain.terrainCont.children[i].collide) {
            var playerBounds = player.getBounds();
            var terrainBounds = terrain.terrainCont.children[i].getBounds();
            var colData = index.collide(playerBounds, terrainBounds);
            if (colData[0] && terrain.terrainCont.children[i].boundary) { // If colliding with a boundary block, fall out of world
                terrain.terrainCont.y = -1 * terrain.maxFall;
            }
            if (colData[0] && terrain.terrainCont.children[i].length != 0) {
                for (let e = 0; e < terrain.terrainCont.children[i].children.length; e++) {
                    var enemyBounds = terrain.terrainCont.children[i].children[e].getBounds();
                    if (index.collide(playerBounds, enemyBounds)[0] && playerBounds.y + playerBounds.height + 50 > enemyBounds.y + enemyBounds.height) {
                        menu.stop();
                    } else if (index.collide(playerBounds, enemyBounds)[0] && playerBounds.y + playerBounds.height + 50 < enemyBounds.y + enemyBounds.height) {
                        terrain.terrainCont.children[i].children.splice(e, 1);
                        vely *= -1.2;
                    }
                }
            }
            if (colData[0] && playerBounds.y < terrainBounds.y && playerBounds.y + playerBounds.height < terrainBounds.y + playerBounds.height - 75) { // Black magic
                collided = true;
                if (vely < 0) {
                    vely = 0;
                }
                var deltaY = playerBounds.y - terrainBounds.y + terrainBounds.height;
                terrain.terrainCont.y += deltaY - 0.1;
            } else if (colData[0] && playerBounds.y > terrainBounds.y) { // More black magic
                collided = true;
                vely *= -0.7;
                terrain.terrainCont.y -= 10;
            }
        }
    }
    if (vely != 0 || !collided) {
        if (!stopped.stopped) { // This single line of code made me rewrite the entire goddamn collision system cause when I implemented it on the old col system, it fucked everything b/c
            // it was designed around the vely jumping around while stationary, and when I added this fix to solve something else, I realised what I had done...
            vely -= 0.14;
        }
    }
    if (terrain.terrainCont.y < -1 * terrain.maxFall) { // Sexy ass fall out of world, code is kinda bad tho
        (async () => {
            for (let i = 0; player.y < window.innerHeight; player.y += 4) {
                await new Promise(r => setTimeout(r, 1000 / 10));
            }
            menu.stop();
        })();
    }
}
document.addEventListener("keypress", function (event) {
    switch (event.key) {
        case "w":
            up = true;
            document.addEventListener("keyup", function (event) {
                switch (event.key) {
                    case "w":
                        up = false;
                        break;
                }
            });
            break;
    }
});