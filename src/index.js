const http = require("http");
const Engine = require("./engine");

const config = require("./../test_config.json");
const engine = new Engine(config)

const server = http.createServer((req, res) => {
    console.log(`Incomming request: ${req.method.toUpperCase()} => ${req.url}`);
    engine.handle(req, res);
});

const port = process.env.PORT || 5005;

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