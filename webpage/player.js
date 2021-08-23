import * as index from "./index.js";
import * as terrain from "./terrain.js";
export var sprites = [PIXI.Texture.from('./webpage/images/player-melvin.png'), PIXI.Texture.from('./webpage/images/player-melvin-down.png'), PIXI.Texture.from('./webpage/images/player-melvin-right-f1.png'), PIXI.Texture.from('./webpage/images/player-melvin-left-f1.png'), PIXI.Texture.from('./webpage/images/player-melvin-downr.png'), PIXI.Texture.from('./webpage/images/player-melvin-downl.png'), PIXI.Texture.from('./webpage/images/player-melvin-jump.png'), PIXI.Texture.from('./webpage/images/player-melvin-downr.png'), PIXI.Texture.from('./webpage/images/player-melvin-downl.png')];
export var player = PIXI.Sprite.from(sprites[0]);
export var vely = 0;
export var Collided = false;
export var prevCollided = false;
export var canMove = false;
export function start() {
    player.anchor.set(0.5);
    player.y = 80;
    player.x = 200;
    player.width = 100;
    player.height = 100;
    index.app.stage.addChild(player);
    index.app.ticker.add((delta) => {
        var top = false;
        var bottom = false;
        var left = false;
        var right = false;
        if (player.y > 1000) {
            player.y = 80;
        }
        vely -= 0.4 * delta;
        var deltaY;
        let playerBounds = player.getBounds();
        prevCollided = Collided;
        Collided = true;
        for (let i = 0; i < terrain.terrainCont.children.length; i++) {
            let terrainBounds = terrain.terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
                Collided = false;
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
        player.y -= vely * delta * 3;
        if(Collided != prevCollided) {
            canMove = true;
        } else if(Collided = true) {
            canMove = false;
        }
    });
}
export function up(delta) {
    if (vely == 0) {
        vely = 8;
        player.y -= 10.5 * delta;
    }
}
export function stop() {
    vely = 0;
}