#!/usr/bin/env node

const http = require("http");
const Engine = require("./engine");
const settingsLoader = require("./settings-loader");

const settings = settingsLoader();

const server = http.createServer((req, res) => {
    console.log(`Incomming request: ${req.method.toUpperCase()} => ${req.url}`);

    try {
        const config = settings.loadConfig();
        const engine = new Engine(config)

        engine.handle(req, res);
    } catch(err) {
        const message = err.toString();
        console.log("ERROR!: " + message);

        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(message);
        res.end();
    }
});

const port = settings.port;

server.listen(port, () => {
    console.log('Welcome to...');
                                                   
    console.log("                           __                            ");
    console.log("    ___     __      ___   /\\_\\    ____    ___     ___    ");
    console.log("   /'___\\ /'__`\\  /' _ `\\ \\/\\ \\  /',__\\  / __`\\ /' _ `\\  ");
    console.log("  /\\ \\__//\\ \\L\\.\\_/\\ \\/\\ \\ \\ \\ \\/\\__, `\\/\\ \\L\\ \\/\\ \\/\\ \\ ");
    console.log("  \\ \\____\\ \\__/.\\_\\ \\_\\ \\_\\_\\ \\ \\/\\____/\\ \\____/\\ \\_\\ \\_\\");
    console.log("   \\/____/\\/__/\\/_/\\/_/\\/_/\\ \\_\\ \\/___/  \\/___/  \\/_/\\/_/");
    console.log("                          \\ \\____/                       ");
    console.log("                           \\/___/                                                                               ");

    console.log("");
    console.log("...listening on port " + port);
});