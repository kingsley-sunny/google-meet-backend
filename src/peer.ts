import * as express from 'express';
const peer = require('peer');

const app = express();

const server = app.listen(5000);

const ExpressPeerServer = peer.ExpressPeerServer(server, {
  corsOptions: { origin: '*' },
});

app.use('/signal-peer', ExpressPeerServer);

ExpressPeerServer.on('connection', (data) => {
  console.log('🚀 ~~ Server ~~ ExpressPeerServer.on ~~ data:', data.id);
});
