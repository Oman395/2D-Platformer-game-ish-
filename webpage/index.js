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
var count = 0;
var stopped;
export var ticker = PIXI.Ticker.shared;
export function collision(ab, bb) {
    return [ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.x + ab.width > bb.x + bb.width && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
    ab.y + ab.height > bb.y + bb.height && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height];
}
app.ticker.maxFPS = 0;
app.ticker.speed = 1;
var currentSpriteL;
var currentSpriteR;
app.ticker.add((delta) => {
    count++;
    if (count > 10) {
        count = 0;
        if (currentSpriteL == player.sprites[2] && currentSpriteR == player.sprites[3]) {
            currentSpriteL = player.sprites[4];
            currentSpriteR = player.sprites[5];
        } else {
            currentSpriteL = player.sprites[2];
            currentSpriteR = player.sprites[3];
        }
    }
    pastX = Math.round(curX);
    curX = Math.round(terrain.terrainCont.x);
    pastY = Math.round(curY);
    curY = Math.round(player.player.y);
    if (curY != pastY && curX != pastX) { // moving y and x
        stopped = false;
        if (curY - pastY > 0) {
            if (curX - pastX > 0) {
                player.player.texture = player.sprites[5];
            } else {
                player.player.texture = player.sprites[4];
            }
        } else {
            if (curX - pastX > 0) {
                player.player.texture = player.sprites[5];
            } else {
                player.player.texture = player.sprites[4];
            }
        }
    } else if (curY == pastY && curX != pastX) { // moving x
        stopped = false;
        if (player.canMove) {
            if (curX - pastX > 0) {
                if (player.player.texture != currentSpriteR) {
                    player.player.texture = currentSpriteR;
                }
            } else {
                if (player.player.texture != currentSpriteL) {
                    player.player.texture = currentSpriteL;
                }
            }
        }
    } else if (curY != pastY && curX == pastX) { // moving y
        stopped = false;
        if (curY - pastY > 0) {
            player.player.texture = player.sprites[1];
        } else {
            player.player.texture = player.sprites[6];
        }
    } else {
        if (stopped == true && player.vely == 0) {
            stopped = false;
            player.player.texture = player.sprites[0];
        } else {
            stopped = true;
        }
    }
    console.log(player.canMove);
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