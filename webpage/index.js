import * as player from "./player.js";
import * as terrain from "./terrain.js";
import * as ticker from "./ticker.js";
import * as menu from "./menu.js";
export var app = new PIXI.Application({ resizeTo: document.getElementById("PIXI"), backgroundColor: 0xafafaf, antialiasing: true, view: document.getElementById("PIXI") });
document.body.appendChild(app.view);
app.ticker.maxFPS = 0;
var prevVelY = 0;
export function start(map, px, py, vy, fs) {
    app.stage.interactive = true;
    if (fs) {
        (player.start(vy), terrain.start(map, px, py, true), ticker.start(), () => {
        })();
    } else {
        (player.start(vy), terrain.start(map, px, py, false), () => {
        })();
    }
}
export function stop() {
    (player.stop(), terrain.stop(), () => {
    })();
}
export function softStop() {
    player.stopped.stopped = true;
    terrain.stopped.stopped = true;
}
export function softStart() {
    player.stopped.stopped = false;
    terrain.stopped.stopped = false;
}
export var currentSprites = { "R": player.sprites[3], "L": player.sprites[2] };
export function collide(ab, bb) {
    return [ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.x + ab.width > bb.x + bb.width && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.y + ab.height > bb.y + bb.height && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height];
}
export function tick() {
    if (!terrain.stopped.stopped) {
        switch (player.vely == 0) {
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
                                player.player.texture = player.sprites[6];
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
menu.start(true);
menu.startUp(true);