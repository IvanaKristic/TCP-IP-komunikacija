const net = require("net");
const exec = require("child_process").exec;

const serverSocket = net.createServer(clientConnected);

function clientConnected(client){
    console.log("~Čoek se spojio");
    client.on("data", data => {
        console.log(data.toString());
        exec(data.toString(), (err, stdout) => {
            if (err || data == 'cd\r\n'){
                throw err;
            }
            client.write(stdout);
        })
    })
    client.on("end", () => {
        console.log("~Čoek se odspojio");
    })
}


serverSocket.listen(1999, () => {
    console.log("~Connected to localhost: 1999")
})