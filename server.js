var liveServer = require("live-server");
var params = {
    port: 8181,
    host: "0.0.0.0",
    file: "./webpage/index.html",
    wait: 1000,
    mount: ['./webpage'],
    root: './',
    logLevel: 0,
    middleware: [function(req, res, next) { next(); }],
    root: 'Webpage',
    watch: 'Webpage'
};
liveServer.start(params);