var liveServer = require("live-server");
var params = {
    file: "./webpage/index.html",
    wait: 1000,
    mount: ['./webpage'],
    root: './',
    logLevel: 2,
    middleware: [function(req, res, next) { next(); }]
};
liveServer.start(params);