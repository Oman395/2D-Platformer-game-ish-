import * as player from "./player.js";
import * as terrain from "./terrain.js";
import * as ticker from "./ticker.js";
import * as menu from "./menu.js";
export var app = new PIXI.Application({ resizeTo: document.getElementById("PIXI"), backgroundColor: 0xafafaf, antialiasing: true, view: document.getElementById("PIXI") });
document.body.appendChild(app.view);
app.ticker.maxFPS = 0;
var prevVelY = 0;
export function start(map, px, py, vy, fs) { // Gets all the sprites ready for action
    app.stage.interactive = true;
    if (fs) {
        (player.start(vy), terrain.start(map, px, py, true), ticker.start(), () => {
            player.stopped.stopped = false;
            terrain.stopped.stopped = false;
        })();
    } else {
        (player.start(vy), terrain.start(map, px, py, false), () => {
            player.stopped.stopped = false;
            terrain.stopped.stopped = false;
        })();
    }
}
export function stop() {
    (player.stop(), terrain.stop(), () => {
        player.stopped.stopped = true;
        terrain.stopped.stopped = true;
    })();
}
export function softStop() { // Pau-
    player.stopped.stopped = true;
    terrain.stopped.stopped = true;
}
export function softStart() { // Unpause
    player.stopped.stopped = false;
    terrain.stopped.stopped = false;
}
// I'm hilarious
export var currentSprites = { "R": player.sprites[3], "L": player.sprites[2] };
export function collide(ab, bb) { // Collision logic, middle one I dont know what it does but im too lazy to update the references to the last return value so here it stays
    return [ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.x + ab.width > bb.x + bb.width && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.y + ab.height > bb.y + bb.height && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height];
}
export function tick() {
    if (!player.falling) {
        var xErr = Math.round((window.innerWidth / 2 - player.player.x) / 10) * 10;
        var yErr = Math.round((window.innerHeight / 2 - player.player.y) / 10) * 10;
        player.player.x += xErr;
        player.player.y += yErr;
        terrain.terrainCont.x += xErr;
        terrain.terrainCont.y += yErr;
    }
    if (!terrain.stopped.stopped) { // Makes sure not paused
        switch (player.vely == 0 && player.vely == prevVelY) { // All of this figures out exactly what the player movement is, and sets sprite accordingly. Also sets left&right sprite to its current animation fram instead of just a static image :D
            case true: // y not moving
                switch (terrain.velx == 0) {
                    case true: // still
                        if (player.vely == prevVelY) {
                            player.player.texture = player.sprites[0];

                        }
                        break;
                    case false: // x only
                        switch (terrain.velx > 0) {
                            case true: // right
                                player.player.texture = currentSprites.R;
                                break;
                            case false: // left
                                player.player.texture = currentSprites.L;
                                break;
                        }
                        break;
                }
                break;
            case false: // y moving
                switch (player.vely > 0) {
                    case true: // y going up
                        switch (terrain.velx == 0) {
                            case true: // up
                                if (terrain.countOfX0 > 2) {
                                    player.player.texture = player.sprites[6];
                                }
                                break;
                            case false: // y and x
                                switch (terrain.velx > 0) {
                                    case true: // up right
                                        player.player.texture = player.sprites[5];
                                        break;
                                    case false: // up left
                                        player.player.texture = player.sprites[4];
                                        break;
                                }
                                break;
                        }
                        break;
                    case false: // y going down
                        switch (terrain.velx == 0) {
                            case true: // down
                                player.player.texture = player.sprites[1];
                                break;
                            case false: // y and x
                                switch (terrain.velx > 0) {
                                    case true: // down right
                                        player.player.texture = player.sprites[5];
                                        break;
                                    case false: // down left
                                        player.player.texture = player.sprites[4];
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
        }
        prevVelY = player.vely;
    }
}
app.ticker.maxFPS = 0;
menu.start(true);
menu.startUp(true);