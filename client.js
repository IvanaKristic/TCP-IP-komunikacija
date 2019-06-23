const net = require("net");
const client = new net.Socket();

const host = "localhost";
const port = 1999;

client.on("end", () => {
    console.log("~Završio sam");
});

client.connect(port, host, onConnect);

function onConnect() {
    var standard_input = process.stdin;

    standard_input.setEncoding('utf-8');

    console.log("Please input text in command line.");

    standard_input.on('data', function (data) {
        if (data == 'exit\r\n') {
            console.log("User input complete, program exit.");
            client.end();
        } else {
            client.write(data);
        }
    });
}

client.on("data", data => {
    console.log("\n");
    console.log(data.toString());
    console.log("\n");
})