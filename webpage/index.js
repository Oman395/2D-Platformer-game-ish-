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
export function collision(ab, bb) {
    return [ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
        ab.x + ab.width > bb.x + bb.width && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height,
        ab.y + ab.height > bb.y + bb.height && ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height];
}
app.ticker.add((delta) => {
    if (ArrowUp) {
        player.up();
    }
    if (ArrowLeft) {
        terrain.left();
    }
    if (ArrowRight) {
        terrain.right();
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