import * as index from "index.js";
var modules = ["index"];
while (true) {
    (async () => {
        await new Promise(r => setTimeout(r, 1000));
        for (var i = 0; i < modules.length; i++) {
            [modules[i]].update();
        }
    })();
}