import * as index from './index.js'
import * as player from './player.js'
export var terrainCont = new PIXI.Container();
var map = [
    /*I don't usually put this many comments, but here it is necessary as this is the bit I want to be easy to edit for regular people. Key:
    '(', ')': Top corners, left and right
    '{', '}': Bottom corners, left and right
    'T': Top facing ground
    'B': Bottom facing ground
    'L', 'R': Left and right facing ground
    'G': Ground center, not walkable surface
    ':', ';': Interior corner top, left and right
    '[', ']': Interior corner bottom, left and right
    One character is exactly the same size as the player model
    Add as many lines as you want, the blocks move with the player
    Dashes are spaces
    T and () are the only "top" blocks, if the player stands on anything else it WILL cause issues*/
    '---------------------------()',
    '-----L----------()---------{}',
    '-----L--------()--()',
    '()---L)()---------{}',
    '--(TT----()',
    '--{}-----{}',
    ''
    //Bottom is  mostly not visible, but used as base
]
var blocks = {};
export var velx = 0;
export var maxFall = 100 * map.length + 400;
export function start() {
    index.app.stage.addChild(terrainCont);
    for (let i = 0; i < map.length; i++) {
        var currentPath = map[i];
        for (let e = 0; e < currentPath.length; e++) {
            switch (map[i][e]) {
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
    terrainCont.y = maxFall;
}
var canMoveL = true;
var canMoveR = true;
export function tick() {
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
                if (playerBounds.x + playerBounds.width > terrainBounds.x && !playerBounds.x > terrainBounds.x) {
                    console.log(playerBounds, terrainBounds)
                    var deltaX = playerBounds.x - terrainBounds.x;
                    terrainCont.x -= deltaX;
                    console.log(deltaX);
                } else if (playerBounds.x > terrainBounds.x) {
                    var deltaX = playerBounds.x + playerBounds.width - terrainBounds.x;
                    terrainCont.x += deltaX;
                    console.log("who");
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
            break;
            break;
        case "d":
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
                document.addEventListener("keyup", function (event) {
                    switch (event.key) {
                        case "d":
                            if (velx == -8) {
                                velx = 0;
                            } break;
                    }
                });
            }
            break;
    }
});