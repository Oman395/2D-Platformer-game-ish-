import * as index from "./index.js"
import * as player from "./player.js"
import * as terrain from "./terrain.js"
while(true) {
    index.tick();
    player.tick();
    terrain.tick();
    await new Promise(r => setTimeout(r, 1000/120));
}