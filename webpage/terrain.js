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
    '[', ']': Interior corner bottom, left and right*/
    '----------------------------------------------------------------------------',
    '--------------------------------------------------------------------------()',
    '-----------------------------------------------------------------()-------{}', // Don't put objects players can walk on here, it completely screws with the hitboxes
    '--------------------------------------------------------()-------{}',
    '-------------------------------------=---------()-------{}',
    '--------------------------------------()-------{}',
    '-----------------------------()-------{}',
    '--------------------()-------{}',
    '-----------()-------{}',
    '--()-------{}',
    '--{}' // mostly not visible, but used as base
]
var notInContact = true;
var prevContact;
var blocks = {};
var left;
var right;
var collided;
export function start() {
    index.app.stage.addChild(terrainCont);
    console.log(100 * 0 - 80);
    for (let i = 0; i < map.length; i++) {
        var currentPath = map[i];
        for (let e = 0; e < currentPath.length; e++) {
            switch (map[i][e]) {
                case 'G':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-nograss.png');
                    break;
                case 'T':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain.png');
                    break;
                case 'L':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain.png', 270);
                    break;
                case 'R':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain.png', 90);
                    break;
                case 'B':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain.png', 180);
                    break;
                case '(':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-corner.png');
                    break;
                case ')':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-corner.png', 90);
                    break;
                case '{':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-corner.png', 270);
                    break;
                case '}':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-corner.png', 180);
                    break;
                case ']':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-insidecorner.png', 90);
                    break;
                case '[':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-insidecorner.png');
                    break;
                case ':':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-insidecorner.png', 270);
                    break;
                case ';':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i - 80, './webpage/images/terrain-insidecorner.png', 180);
                    break;
            }
        }
    }
    index.app.ticker.add(() => {
        var left = false;
        var right = false;
        let playerBounds = player.player.getBounds();
        prevContact = notInContact;
        notInContact = true;
        for (let i = 0; i < terrainCont.children.length; i++) {
            var terrainBounds = terrainCont.children[i].getBounds();
            if (index.collision(terrainBounds, playerBounds)[0]) {
                notInContact = false;
                switch (index.collision(playerBounds, terrainBounds)[1]) {
                    case true: // left
                        left = true;
                        break;
                    case false: // right
                        right = true;
                        break;
                }
                if (playerBounds.y + playerBounds.height > terrainBounds.y + terrainBounds.height) {
                    var cont = true;
                    if (left) {
                        terrainCont.x--;
                    } else if (right) {
                        terrainCont.x++;
                    }
                }
            }
        }
    });
}
export function lefty() {
    var left = false;
    let playerBounds = player.player.getBounds();
    for (let i = 0; i < terrainCont.children.length; i++) {
        var terrainBounds = terrainCont.children[i].getBounds();
        if (index.collision(terrainBounds, playerBounds)[0]) {
            switch (index.collision(playerBounds, terrainBounds)[1]) {
                case true: // left
                    var left = true;
                    break;
            }
        }
        var adjustedParams = playerBounds;
        adjustedParams.x -= 0.1;
        if (index.collision(terrainBounds, adjustedParams)[0]) {
            left = true;
        }
    }
    if (!left) {
        if (index.app.ticker.FPS / 120 > 0.9) {
            if (notInContact == prevContact) {
                terrainCont.x += 10;
            } else {
                terrainCont.x += 20;
            }
        } else {
            if (notInContact == prevContact) {
                terrainCont.x += 10;
            } else {
                terrainCont.x += 20;
            }
        }
    }
}
export function righty() {
    var right = false;
    let playerBounds = player.player.getBounds();
    for (let i = 0; i < terrainCont.children.length; i++) {
        var terrainBounds = terrainCont.children[i].getBounds();
        if (index.collision(terrainBounds, playerBounds)[0]) {
            switch (index.collision(playerBounds, terrainBounds)[1]) {
                case true: // left
                    var right = true;
                    break;
            }
        }
        var adjustedParams = playerBounds;
        adjustedParams.x += 0.1;
        if (index.collision(terrainBounds, adjustedParams)[0]) {
            right = true;
        }
    }
    if (!right) {
        if (index.app.ticker.FPS / 120 > 0.9) {
            if (notInContact == prevContact) {
                terrainCont.x -= 10;
            } else {
                terrainCont.x -= 20;
            }
        } else {
            if (notInContact == prevContact) {
                terrainCont.x -= 10;
            } else {
                terrainCont.x -= 20;
            }
        }
    }
}
function addBlock(name, x, y, image, angle) {
    blocks[name] = new PIXI.Sprite.from(image);
    blocks[name].y = y;
    blocks[name].x = x;
    blocks[name].width = 100;
    blocks[name].height = 100;
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