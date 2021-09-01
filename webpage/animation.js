import * as player from "./player.js";
import * as index from "./index.js";
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
    await new Promise(r => setTimeout(r, 120));
}