import * as index from './index.js'
import * as player from './player.js'
import * as terrain from './terrain.js'
export var terrainCont = new PIXI.Container();
var canMoveL = true;
var canMoveR = true;
var map = [
    '-----------------------------------------------------------------------',
    '-----------------------------------------------------------------------',
    '----------------------------------WWW----------------------------------',
    '---------------------------------B-------------------------------------',
    '-------WWW----BBB----WWW----BWWWB--------BBB----WWW----BBB----WWW----BBB',
    'BBB--------------------------------------------------------------------'

]
var blocks = {};
export function start() {
    index.app.stage.addChild(terrainCont);
    for (let i = 0; i < map.length; i++) {
        var currentPath = map[i];
        for (let e = 0; e < currentPath.length; e++) {
            switch (map[i][e]) {
                case 'B':
                    addBlock(`terrain${i}`, e * 150, 150 * i, './webpage/terrain.png');
                    break;
                case 'W':
                    addBlock(`terrain${i}`, e * 150, 150 * i, './webpage/player.png');
                    break;
            }
        }
    }
    index.app.ticker.add((delta) => {
        var top = false;
        var bottom = false;
        var left = false;
        var right = false;
        let playerBounds = player.player.getBounds();
        for (let i = 0; i < terrainCont.children.length; i++) {
            var terrainBounds = terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
                if (terrainBounds.x < playerBounds.x + playerBounds.width && terrainBounds.y < playerBounds.y && terrainBounds.x > playerBounds.x) {
                    console.log("if");
                    var deltaX = playerBounds.x + playerBounds.width - terrainBounds.x;
                    terrainCont.x += deltaX;
                } else if (terrainBounds.x + terrainBounds.width > playerBounds.x && terrainBounds.y < playerBounds.y) {
                    console.log("elif");
                    var deltaX = terrainBounds.x + terrainBounds.width - playerBounds.x;
                    terrainCont.x -= deltaX;
                }
                switch (index.collision(playerBounds, terrainBounds)[1]) {
                    case true: // left
                        var left = true;
                        break;
                    case false: // right
                        var right = true;
                        break;
                }
                switch (index.collision(playerBounds, terrainBounds)[2]) {
                    case true: // bottom
                        var bottom = true;
                        break;
                    case false: // top
                        var top = true;
                        break;
                }
            }
        }
        if (top) {
        }
        if (bottom) {
        }
        if (right) {
            canMoveR = false;
        } else {
            canMoveR = true;
        }
        if (left) {
            canMoveL = false;
        } else {
            canMoveL = true;
        }
    });
}
export function left() {
    if (canMoveL) {
        terrainCont.x += 10;
    }
}
export function right() {
    if (canMoveR) {
        terrainCont.x -= 10;
    }
}
function addBlock(name, x, y, image) {
    blocks[name] = new PIXI.Sprite.from(image);
    blocks[name].y = y;
    blocks[name].x = x;
    blocks[name].width = 150;
    blocks[name].height = 150;
    terrainCont.addChild(blocks[name]);
}