require('dotenv').config();
const port = process.env.PORT || 3000;

const configure = require('./config');
const { createServer } = require('http');
const express = require('express');

const app = express();

// App Start Cycle
app.start = async () => {
    console.info('Starting app...');

    configure(app);

    const server = createServer(app);

    // tslint:disable-next-line
    server.on('error', (error: any) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
    });

    server.on('listening', () => {
        const address = server.address();
        console.info(
      `\nListening for bot events at ${address.address}:${address.port}\n`
    );
    });

    server.listen(port);
};

// tslint:disable-next-line
app.start().catch((err: any) => {
    console.error(err);
});
