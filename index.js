const Hapi = require('hapi');
const Ws = require('ws');

const server = Hapi.server({ port: 8080 });

const start = async () => {

    await server.register(require('nes'));
    await server.start();

    const ws = new Ws('ws://localhost:8080');

    ws.on('open', async () => {

        const then = Date.now();

        ws.onclose = () => console.log(`Time between server stop called and onclose() called = %dms`, Date.now() - then);
        ws.onerror = () => console.log(`Time between server stop called and onerror() called = %dms`, Date.now() - then);

        await server.stop();
    });
};

start();