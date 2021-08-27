import * as terrain from "./terrain.js";
import * as index from "./index.js";
export var sprites = [PIXI.Texture.from('./images/player-melvin.png'), PIXI.Texture.from('./images/player-melvin-down.png'), PIXI.Texture.from('./images/player-melvin-right-f1.png'), PIXI.Texture.from('./images/player-melvin-left-f1.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png'), PIXI.Texture.from('./images/player-melvin-jump.png'), PIXI.Texture.from('./images/player-melvin-downr.png'), PIXI.Texture.from('./images/player-melvin-downl.png')];
export var player;
export var vely = -1;
export var Collided = false;
export var currentLeft = sprites[2];
export var currentRight = sprites[3];
export var up = false;
export function start() {
    player = PIXI.Sprite.from(sprites[0]);
    player.anchor.set(0.5);
    player.y = 600;
    player.x = 200;
    player.width = 100;
    player.height = 100;
    index.app.stage.addChild(player);
}
export function stop() {
    player.visible = false;
}
export function tick() {
    if (up) {
        if (vely == 0) {
            terrain.terrainCont.y += 0.2;
            vely = 8;
        }
    }
    var collided = false;
    var playerBounds = player.getBounds();
    for (let i = 0; i < terrain.terrainCont.children.length; i++) {
        var terrainBounds = terrain.terrainCont.children[i].getBounds();
        if (index.collide(playerBounds, terrainBounds)[0] && playerBounds.y < terrainBounds.y) {
            collided = true;
            if (vely < 0) {
                vely = 0;
            }
            var deltaY = playerBounds.y - terrainBounds.y + terrainBounds.height;
            terrain.terrainCont.y += deltaY - 0.1;
        } else if (index.collide(playerBounds, terrainBounds)[0] && playerBounds.y > terrainBounds.y) {
            collided = true;
            vely *= -1;
            terrain.terrainCont.y -= 10;
        }
    }
    if (vely != 0 || !collided) {
        vely -= 0.13;
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