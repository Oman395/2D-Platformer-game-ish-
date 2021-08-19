export const app = new PIXI.Application({ resizeTo: window, backgroundColor: 0xafafaf });
document.body.appendChild(app.view);
console.log(app);
var updateCount = 0;
let elapsed = 0.0;
app.stage.interactive = true;
app.ticker.add((delta) => {
});
export function collision(a, b) {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}
export function update() {
    console.log(updateCount);
    updateCount++;
}