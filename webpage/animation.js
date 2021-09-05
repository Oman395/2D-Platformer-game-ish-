import * as player from "./player.js";
import * as index from "./index.js";
import * as terrain from "./terrain.js";
index.currentSprites.L = player.sprites[2];
index.currentSprites.R = player.sprites[3];
while (true) { // Dis boi handles animations!
    if (index.currentSprites.L == player.sprites[2] && index.currentSprites.R == player.sprites[3]) {
        index.currentSprites.L = player.sprites[4];
        index.currentSprites.R = player.sprites[5];
    } else {
        if (player.vely == 0) {
            index.currentSprites.L = player.sprites[2];
            index.currentSprites.R = player.sprites[3];
        }
    }
    if (terrain.currentSprites.L == player.sprites[2] && terrain.currentSprites.R == player.sprites[3]) {
        terrain.currentSprites.L = player.sprites[4];
        terrain.currentSprites.R = player.sprites[5];
    } else {
        terrain.currentSprites.L = player.sprites[2];
        terrain.currentSprites.R = player.sprites[3];
    }
    await new Promise(r => setTimeout(r, 120));
}