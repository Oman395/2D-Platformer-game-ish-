import * as index from "./index.js";
import * as terrain from "./terrain.js";
export var sprites = [PIXI.Texture.from('./webpage/images/player-melvin.png'), PIXI.Texture.from('./webpage/images/player-melvin-down.png'), PIXI.Texture.from('./webpage/images/player-melvin-right-f1.png'), PIXI.Texture.from('./webpage/images/player-melvin-left-f1.png'), PIXI.Texture.from('./webpage/images/player-melvin-downr.png'), PIXI.Texture.from('./webpage/images/player-melvin-downl.png'), PIXI.Texture.from('./webpage/images/player-melvin-jump.png'), PIXI.Texture.from('./webpage/images/player-melvin-downr.png'), PIXI.Texture.from('./webpage/images/player-melvin-downl.png'), PIXI.Texture.from('./webpage/images/player-melvin-right-f2.png'), PIXI.Texture.from('./webpage/images/player-melvin-left-f2.png')];
export var player = PIXI.Sprite.from(sprites[0]);
export var vely = 0;
export var Collided = false;
export var currentLeft = sprites[2];
export var currentRight = sprites[3];
var velyChange1 = 8;
var velyChange2 = 4;
var curX = Math.round(terrain.terrainCont.x);
var pastX = Math.round(curX);
var fullCol = false;
export function start() {
    player.anchor.set(0.5);
    player.y = -100;
    player.x = 200;
    player.width = 100;
    player.height = 100;
    index.app.stage.addChild(player);
    index.app.ticker.add((delta) => {
        Collided = false;
        var top = false;
        var bottom = false;
        var left = false;
        var right = false;
        if (player.y > 1000) {
            player.y = -100;
        }
        pastX = Math.round(curX);
        curX = Math.round(terrain.terrainCont.x);
        let playerBounds = player.getBounds();
        fullCol = false;
        for (let i = 0; i < terrain.terrainCont.children.length; i++) {
            let terrainBounds = terrain.terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
                Collided = true;
                switch (index.collision(playerBounds, terrainBounds)[1]) {
                    case true: // right
                        var right = true;
                        break;
                    case false: // left
                        var left = true;
                        break;
                }
                switch (index.collision(playerBounds, terrainBounds)[2]) {
                    case true: // bottom
                        var bottom = true;
                        break;
                    case false: // top
                        var top = true;
                        if (player.y < terrain.terrainCont.children[i].y && vely < 0 && playerBounds.y < terrainBounds.y) {
                            player.y = terrain.terrainCont.children[i].y - playerBounds.height * 0.5;
                            vely = 0;
                        }
                        break;
                }
            } else {
            }
        }
        playerBounds = player.getBounds();
        for (let i = 0; i < terrain.terrainCont.children.length; i++) {
            var terrainBounds = terrain.terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
            }
            var adjustedParams = playerBounds;
            adjustedParams.y += 1;
            if (adjustedParams.x + adjustedParams.width > terrainBounds.x
                && adjustedParams.x < terrainBounds.x + terrainBounds.width
                && adjustedParams.y + adjustedParams.height > terrainBounds.y
                && adjustedParams.y < terrainBounds.y + terrainBounds.height,
                adjustedParams.x + adjustedParams.width > terrainBounds.x + terrainBounds.width
                && adjustedParams.x + adjustedParams.width > terrainBounds.x
                && adjustedParams.x < terrainBounds.x + terrainBounds.width
                && adjustedParams.y + adjustedParams.height > terrainBounds.y
                && adjustedParams.y < terrainBounds.y + terrainBounds.height,
                adjustedParams.y + adjustedParams.height > terrainBounds.y + terrainBounds.height
                && adjustedParams.x + adjustedParams.width > terrainBounds.x
                && adjustedParams.x < terrainBounds.x + terrainBounds.width
                && adjustedParams.y + adjustedParams.height > terrainBounds.y
                && adjustedParams.y < terrainBounds.y + terrainBounds.height) {
                fullCol = true;
            }
        }
        if (fullCol != true && Collided != true) {
            vely -= 0.4 * 0.5;
        }
        if (top) {
        }
        if (bottom) {
            if (vely > 0) {
                vely *= -1;
            } else {
                vely -= 0.1;
            }
        }
        if (right) {
        }
        if (left) {
        }
        player.y -= vely * 0.5 * 3;
        //if(player.y < 100) {
        //    terrain.terrainCont.y -= vely * 0.5 * 3;
        //}
    });
}
export function up(delta) {
    if (vely == 0) {
        if (index.app.ticker.FPS / 120 > 0.9) {
            vely = velyChange1;
        } else {
            vely = velyChange2;
        }
    }
}
export function stop() {
    vely = 0;
}