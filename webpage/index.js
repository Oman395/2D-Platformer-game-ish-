import * as player from "./player.js";
import * as terrain from "./terrain.js";
var ArrowUp = false;
var ArrowLeft = false;
var ArrowRight = false;
export var app = new PIXI.Application({ resizeTo: document.getElementById("PIXI"), backgroundColor: 0xafafaf, antialiasing: true, view: document.getElementById("PIXI") });
document.body.appendChild(app.view);
app.stage.interactive = true;
(player.start(), terrain.start(), () => {
})();
var curX = Math.round(terrain.terrainCont.x);
var pastX;
var curY = Math.round(player.player.y);
var pastY;
var stopped = false;
var prevStopped;
var count;
var score = 0;
export var ticker = PIXI.Ticker.shared;
export function collision(ab, bb) {
    return [ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.x + ab.width > bb.x + bb.width && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.y + ab.height > bb.y + bb.height && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height];
}
app.ticker.maxFPS = 0;
app.ticker.speed = 1;
app.ticker.add((delta) => {
    if (terrain.terrainCont.x < score * -1 * 100) {
        score = terrain.terrainCont.x * -1 * 0.01;
    }
    console.log(delta * 2);
    count++;
    pastX = Math.round(curX);
    curX = Math.round(terrain.terrainCont.x);
    pastY = Math.round(curY);
    curY = Math.round(player.player.y);
    prevStopped = stopped;
    if (curY == pastY && curX == pastX) {
        stopped = true;
        if (stopped == prevStopped) {
            if (player.canMove) {
                player.player.texture = player.sprites[0];
            }
        }
    } else {
        stopped = false;
        switch (curY == pastY) {
            case true:
                switch (curX - pastX < 0) {
                    case true: // right
                        if (player.canMove) {
                            player.player.texture = player.currentLeft;
                        }
                        break;
                    case false: // left
                        if (player.canMove) {
                            player.player.texture = player.currentRight;
                        }
                        break;
                }
                break;
            case false:
                switch (curX == pastX) {
                    case true:
                        switch (curY - pastY < 0) {
                            case true: // up
                                player.player.texture = player.sprites[6];
                                break;
                            case false: // down
                                player.player.texture = player.sprites[1];
                                break;
                        }
                        break;
                    case false:
                        switch (curY - pastY < 0) {
                            case true: // up
                                switch (curX - pastX < 0) {
                                    case true: // up right
                                        player.player.texture = player.sprites[7];
                                        break;
                                    case false: // up left
                                        player.player.texture = player.sprites[8]
                                        break;
                                }
                                break;
                            case false: // down
                                switch (curX - pastX < 0) {
                                    case true: // down right
                                        player.player.texture = player.sprites[7];
                                        break;
                                    case false: // down left
                                        player.player.texture = player.sprites[8]
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
        }
    }
    if (ArrowUp) {
        player.up(delta);
    }
    if (ArrowLeft) {
        terrain.lefty(delta);
    }
    if (ArrowRight) {
        terrain.righty(delta);
    }

});
document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'ArrowUp':
            ArrowUp = true;
            break;
        case 'ArrowLeft':
            ArrowLeft = true;
            break;
        case 'ArrowRight':
            ArrowRight = true;
            break;
    }
});
document.addEventListener('keyup', function (event) {
    switch (event.code) {
        case 'ArrowUp':
            ArrowUp = false;
            break;
        case 'ArrowLeft':
            ArrowLeft = false;
            break;
        case 'ArrowRight':
            ArrowRight = false;
            break;
    }
});