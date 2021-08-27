import * as index from './index.js'
import * as player from './player.js'
import * as map from "./map.js";
export var terrainCont;
var left = false;
var right = false;
var blocks = {};
export var maxFall;
export var velx = 0;
export function start(mapName, tx, ty, vx) {
    maxFall = 100 * map.map[mapName].length + 400;
    terrainCont = new PIXI.Container();
    index.app.stage.addChild(terrainCont);
    for (let i = 0; i < map.map[mapName].length; i++) {
        var currentPath = map.map[mapName][i];
        for (let e = 0; e < currentPath.length; e++) {
            switch (map.map[mapName][i][e]) {
                case 'G':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-nograss.png', 0, false);
                    break;
                case 'T':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain.png', 0, true);
                    break;
                case 'L':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain.png', 270, false);
                    break;
                case 'R':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain.png', 90, false);
                    break;
                case 'B':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain.png', 180, false);
                    break;
                case '(':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 0, true);
                    break;
                case ')':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 90, true);
                    break;
                case '{':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 270, false);
                    break;
                case '}':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 180, false);
                    break;
                case ']':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner.png', 90, false);
                    break;
                case '[':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner.png', false);
                    break;
                case ':':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner.png', 270, false);
                    break;
                case ';':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner.png', 180, false);
                    break;
            }
        }
    }
    terrainCont.y = ty;
    terrainCont.x = tx;
    if (ty == 0) {
        terrainCont.y = maxFall;
    }
    velx = vx;
}
export function stop() {
    terrainCont.visible = false;
}
var canMoveL = true;
var canMoveR = true;
export function tick() {
    if (left) {
        var playerBounds = player.player.getBounds();
        var movement = true;
        for (let i = 0; i < terrainCont.children.length; i++) {
            var terrainBounds = terrainCont.children[i].getBounds();
            playerBounds.x -= 1;
            if (index.collide(playerBounds, terrainBounds)[0]) {
                if (index.collide(playerBounds, terrainBounds)[2]) {
                    movement = false;
                }
            }
        }
        if (movement) {
            velx = 8;
            document.addEventListener("keyup", function (event) {
                switch (event.key) {
                    case "a":
                        if (velx == 8) {
                            velx = 0;
                        } break;
                }
            });
        }
    }
    if (right) {
        var playerBounds = player.player.getBounds();
        var movement = true;
        for (let i = 0; i < terrainCont.children.length; i++) {
            var terrainBounds = terrainCont.children[i].getBounds();
            playerBounds.x += 1;
            if (index.collide(playerBounds, terrainBounds)[0]) {
                if (index.collide(playerBounds, terrainBounds)[2]) {
                    velx = 0;
                    if (playerBounds.x + playerBounds.width - 10 <= terrainBounds.x + terrainBounds.width) {
                        movement = false;
                    }
                }
            }
        }
        if (movement) {
            velx = -8;
        }
    }
    if (terrainCont.y < -1 * maxFall) {
        terrainCont.y = maxFall + 200;
    }
    terrainCont.y += player.vely;
    terrainCont.x += velx;
    var playerBounds = player.player.getBounds();
    for (let i = 0; i < terrainCont.children.length; i++) {
        var terrainBounds = terrainCont.children[i].getBounds();
        if (index.collide(playerBounds, terrainBounds)[0]) {
            if (index.collide(playerBounds, terrainBounds)[2]) {
                velx = 0;
                if (playerBounds.x + playerBounds.width / 2 < terrainBounds.x + terrainBounds.width / 2) {
                    playerBounds.x += 0.01;
                    var deltaX = (playerBounds.x + playerBounds.width) - (terrainBounds.x);
                    terrainCont.x += deltaX;
                } else {
                    playerBounds.x -= 0.01;
                    var deltaX = (playerBounds.x) - (terrainBounds.x + terrainBounds.width);
                    terrainCont.x += deltaX;
                }
            }
        }
    }
}
function addBlock(name, x, y, image, angle, top) {
    blocks[name] = new PIXI.Sprite.from(image);
    blocks[name].y = y;
    blocks[name].x = x;
    blocks[name].width = 100;
    blocks[name].height = 100;
    blocks[name].top = top;
    if (angle) {
        switch (angle) {
            case 90:
                blocks[name].angle = 90;
                blocks[name].x += 100;
                break;
            case 180:
                blocks[name].angle = 180;
                blocks[name].x += 100;
                blocks[name].y += 100;
                break;
            case 270:
                blocks[name].angle = 270;
                blocks[name].y += 100;
                break;
        }
    }
    terrainCont.addChild(blocks[name]);
}
document.addEventListener("keypress", function (event) {
    switch (event.key) {
        case "a":
            left = true;
            document.addEventListener("keyup", function (event) {
                switch (event.key) {
                    case "a":
                        if (!right) {
                            velx = 0;
                        }
                        left = false;
                        break;
                }
            });
            break;
        case "d":
            right = true;
            document.addEventListener("keyup", function (event) {
                switch (event.key) {
                    case "d":
                        if (!left) {
                            velx = 0;
                        }
                        right = false;
                        break;
                }
            });
            break;
    }
});