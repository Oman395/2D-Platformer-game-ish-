import * as index from './index.js'
import * as player from './player.js'
import * as map from "./map.js";
export var terrainCont;
var left = false;
var right = false;
var blocks = {};
export var maxFall;
export var velx = 0;
export var stopped = { stopped: false };
export function start(mapName, tx, ty, isStart) {
    maxFall = 100 * map.map[mapName].length + 400; // Sets the borders of the world, could probably use PIXI.app.getBounds() but eh, this works better IMO.
    if (ty == 0) { // If ty is set to default value, ty is set to max height then you fall into place. I have 0 as the ty default, just cause It's impossible to pause on y of 0... right?
        ty = maxFall;
    }
    terrainCont = new PIXI.Container();
    index.app.stage.addChild(terrainCont);
    for (let i = 0; i < map.map[mapName].length; i++) { // For each line of map, sets y pos
        var currentPath = map.map[mapName][i];
        for (let e = 0; e < currentPath.length; e++) { // For each char in line, sets x pos
            switch (map.map[mapName][i][e]) { // Figures out exactly what each block is
                case 'G':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-nograss.png', 0, false);
                    break;
                case 'T':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain.png', 0, false);
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
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 0, false);
                    break;
                case ')':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-corner.png', 90, false);
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
                case 'X':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner.png', 180, true, true);
                    break;
                case '$':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner-double.png', 0, false);
                    break;
                case '%':
                    addBlock(`terrain${i}`, e * 100 - 100, 100 * i, './images/terrain-insidecorner-double.png', 90, false);
                    break;
                case 'S': // TODO: start sprite with no colliders
                    if (isStart) {
                        tx = window.innerWidth / 2 + 50 - 1 * e * 100;
                        ty = window.innerHeight / 2 - 50 - 100 * i;
                    }
            }
        }
    }
    terrainCont.y = ty;
    terrainCont.x = tx;
}
export function stop() { // I think this is legacy, but when I remove it everything breaks, so here it stays :D
    terrainCont.visible = false;
}
export function tick() {
    for (let i = 0; i < terrainCont.children.length; i++) {
        var playerBounds = player.player.getBounds(); // Having playerbounds declared outside the for loop fucked everything cause I mess with the actual variable on line 145 & 149, so here it is inside :D
        var terrainBounds = terrainCont.children[i].getBounds();
        if (Math.abs(Math.abs(terrainBounds.x) - Math.abs(playerBounds.x)) > window.innerWidth || Math.abs(Math.abs(terrainBounds.y) - Math.abs(playerBounds.y)) > window.innerHeight) {
            terrainCont.children[i].renderable = false;
            terrainCont.children[i].collide = false;
        } else {
            terrainCont.children[i].renderable = true;
            terrainCont.children[i].collide = true;
        }
    }
    terrainCont.x = Math.round(terrainCont.x); // Rounds the x pos, I find it helps the collision detection not be insane (block width is 100, move speed is 10/tick, if x pos desyncs from base 10 bad things happen)
    if (left && !stopped.stopped) {
        var movement = true;
        for (let i = 0; i < terrainCont.children.length; i++) { // For each terrain block
            if (terrainCont.children[i].collide) {
                var playerBounds = player.player.getBounds();
                var terrainBounds = terrainCont.children[i].getBounds();
                playerBounds.x -= 1;
                var colData = index.collide(playerBounds, terrainBounds); // Gets collision data
                if (colData[0]) {
                    if (colData[2] || playerBounds.y > terrainBounds.y - 75) { // Checks for wall, makes sure player is above the terrain-- might cause some issues later but eh
                        velx = 0;
                        if (playerBounds.x >= terrainBounds.x) { // makes sure that it can or can't move from the wall
                            movement = false;
                        }
                    }
                }
            }
            if (movement && !right) { // If it can move, and the right key isnt pressed, start goin!
                velx = 10;
            } else if (right) {
                velx = 0;
            }
        }
    }
    if (right && !stopped.stopped) { // Same as left but inverse kekw
        var movement = true;
        for (let i = 0; i < terrainCont.children.length; i++) { // Counterintuitively, having multiple for loops is _far_ better, as it means I don't need to worry abt movement being triggered for each block
            if (terrainCont.children[i].collide) {
                var playerBounds = player.player.getBounds();
                var terrainBounds = terrainCont.children[i].getBounds();
                playerBounds.x += 1;
                var colData = index.collide(playerBounds, terrainBounds);
                if (colData[0]) {
                    if (colData[2] || playerBounds.y > terrainBounds.y - 75) {
                        velx = 0;
                        if (playerBounds.x + playerBounds.width <= terrainBounds.x + terrainBounds.width) {
                            movement = false;
                        }
                    }
                }
                if (movement && !left) {
                    velx = -10;
                } else if (left) {
                    velx = 0;
                }
            }
        }
    }
    if (!player.stopped.stopped) { // makes sure that game isnt paused before adjusting pos by vely, vely is handled by player to hopefully be more effecient code
        terrainCont.y += player.vely;
    }
    if (!stopped.stopped) { // DK why i use player.stopped.stopped for one and stopped.stopped for the other tbh
        terrainCont.x += velx;
    }
    for (let i = 0; i < terrainCont.children.length; i++) {
        var playerBounds = player.player.getBounds(); // Having playerbounds declared outside the for loop fucked everything cause I mess with the actual variable on line 145 & 149, so here it is inside :D
        var terrainBounds = terrainCont.children[i].getBounds();
        if (terrainCont.children[i].collide) {
            var colData = index.collide(playerBounds, terrainBounds);
            if (colData[0]) { // If colliding
                if (colData[2] && playerBounds.y <= terrainBounds.y + terrainBounds.height / 2) { // If player is to the side of a block, and isnt abt to jump up
                    velx = 0;
                    if (playerBounds.x + playerBounds.width / 2 < terrainBounds.x + terrainBounds.width / 2) { // Figures out what side of block it's on
                        playerBounds.x += 0.001;
                        var deltaX = (playerBounds.x + playerBounds.width) - (terrainBounds.x);
                        terrainCont.x += deltaX;
                    } else {
                        playerBounds.x -= 0.001;
                        var deltaX = (playerBounds.x) - (terrainBounds.x + terrainBounds.width);
                        terrainCont.x += deltaX;
                    }
                }
            }
        }
    }
}
function addBlock(name, x, y, image, angle, boundary, display) { // See function name lol
    blocks[name] = new PIXI.Sprite.from(image);
    blocks[name].y = y;
    blocks[name].x = x;
    blocks[name].width = 100;
    blocks[name].height = 100;
    blocks[name].boundary = boundary;
    if (display) {
        blocks[name].visible = false;
    }
    if (angle) { // position correction, changing the anchor fucks everything so I just correct for x and y pos
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
document.addEventListener("keypress", function (event) { // I have a variable for left and right, because otherwise I only get one event listener and it messes with everything
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