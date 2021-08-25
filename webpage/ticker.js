import * as index from "./index.js"
import * as player from "./player.js"
import * as terrain from "./terrain.js"
export var ticking = { "ticking": true };
export function start() {
    (async () => {
        while (true) {
            if (ticking.ticking) {
                index.tick();
                player.tick();
                terrain.tick();
                await new Promise(r => setTimeout(r, 1000 / 120));
            }
        }
    })();
}