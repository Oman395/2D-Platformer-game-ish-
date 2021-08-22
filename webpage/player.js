import * as index from "./index.js";
import * as terrain from "./terrain.js";
let sprites = [PIXI.Texture.from('./webpage/player.png'), PIXI.Texture.from('./webpage/player1.png')]
export var player = PIXI.Sprite.from(sprites[0]);
var vely = 0;
export function start() {
    player.anchor.set(0.5);
    player.y = 500;
    player.x = 100;
    player.width = 150;
    player.height = 100;
    index.app.stage.addChild(player);
    index.app.ticker.add((delta) => {
        var top = false;
        var bottom = false;
        var left = false;
        var right = false;
        if (player.y > 1000) {
            player.y = 0;
        }
        if (vely == 0) {
            player.texture = sprites[0];
        }
        vely -= 0.1;
        var deltaY;
        let playerBounds = player.getBounds();
        for (let i = 0; i < terrain.terrainCont.children.length; i++) {
            let terrainBounds = terrain.terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
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
                        if (player.y < terrain.terrainCont.children[i].y) {
                            player.y = terrain.terrainCont.children[i].y - playerBounds.height * 0.5;
                            vely = 0;
                        }
                        break;
                }
            }
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
        player.y -= vely;
    });
}
export function up() {
    if (vely == 0) {
        vely = 7;
        player.y -= 7;
        player.texture = sprites[1];
    }
}
export function stop() {
    vely = 0;
}