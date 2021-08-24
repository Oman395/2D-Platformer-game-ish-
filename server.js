var liveServer = require("live-server");
var params = {
    file: "./webpage/index.html",
    wait: 1000,
    mount: ['./webpage'],
    root: './',
    logLevel: 0,
    middleware: [function(req, res, next) { next(); }],
    root: './'
};
liveServer.start(params);