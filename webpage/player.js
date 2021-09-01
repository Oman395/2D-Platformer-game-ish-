import * as terrain from "./terrain.js";
import * as index from "./index.js";
import * as menu from "./menu.js";
export var sprites = [PIXI.Texture.from('./images/player-melvin.png'), PIXI.Texture.from('./images/player-melvin-down.png'), PIXI.Texture.from('./images/player-melvin-right-f1.png'), PIXI.Texture.from('./images/player-melvin-left-f1.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png'), PIXI.Texture.from('./images/player-melvin-jump.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png')];
export var player;
export var vely = -1;
export var Collided = false;
export var currentLeft = sprites[2];
export var currentRight = sprites[3];
export var up = false;
export var stopped = { stopped: false };
export function start(vy, x, y) {
    player = PIXI.Sprite.from(sprites[0]);
    player.anchor.set(0.5);
    player.y = 600;
    player.x = 200;
    player.width = 100;
    player.height = 100;
    vely = vy;
    index.app.stage.addChild(player);
}
export function stop() {
    player.visible = false;
}
export function tick() {
    if (up && !stopped.stopped) {
        if (vely == 0) {
            terrain.terrainCont.y += 0.2;
            vely = 8;
        }
    }
    if (vely < -50) {
        vely = -50;
    }
    var collided = false;
    for (let i = 0; i < terrain.terrainCont.children.length; i++) {
        var playerBounds = player.getBounds();
        var terrainBounds = terrain.terrainCont.children[i].getBounds();
        var colData = index.collide(playerBounds, terrainBounds);
        if (colData[0] && terrain.terrainCont.children[i].boundary) {
            terrain.terrainCont.y = -1 * terrain.maxFall;
        }
        if (colData[0] && playerBounds.y < terrainBounds.y && playerBounds.y + playerBounds.height < terrainBounds.y + playerBounds.height - 75) {
            collided = true;
            if (vely < 0) {
                vely = 0;
            }
            var deltaY = playerBounds.y - terrainBounds.y + terrainBounds.height;
            terrain.terrainCont.y += deltaY - 0.1;
        } else if (colData[0] && playerBounds.y > terrainBounds.y) {
            collided = true;
            vely *= -0.7;
            terrain.terrainCont.y -= 10;
        }
    }
    if (vely != 0 || !collided) {
        if (!stopped.stopped) {
            vely -= 0.14;
        }
    }
    if (terrain.terrainCont.y < -1 * terrain.maxFall) {
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