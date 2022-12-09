import net from 'net'

function responseData(str) {
    return `HTTP/1.1 200 OK
Connection: keep-alive
Date: ${new Date()}
Content-Length: ${str.length}
Content-Type: text/html

${str}`;
}

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        if (/^GET \/ HTTP/.test(data)) {
            socket.write(responseData('<h1>Hello world</h1>'));
        }
        console.log(`DATA:\n\n${data}`);
    });

    socket.on('close', () => {
        console.log('connection closed, goodbye!\n\n\n');
    });
}).on('error', (err) => {
    // handle errors here
    throw err;
});

server.listen({
    host: '0.0.0.0',
    port: 8080,
}, () => {
    console.log('opened server on', server.address());
});