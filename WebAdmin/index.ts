import { EditorRoutes } from './lib/editor';
import { Wa } from 'mbake/lib/Wa';
import { AdminRoutes } from './lib/admin';
import { AdminRoutesRpc } from './lib/admin-rpc';

const express = require('express');
const appE = express();
const yaml = require('js-yaml');
const fs = require('fs');
let config = yaml.load(fs.readFileSync(__dirname + '/config.yaml'));
console.info(config);
const editorsPort = config.editorAPIport;

/*
* E D I T O R S
*/

//express app for editors
const editorRoutes = new EditorRoutes();
appE.use('/editors', editorRoutes.routes(config));
appE.listen(editorsPort, () => {
   console.info(`appE listening on port ${editorsPort}!`);
});

// html
const wwwPort = config.editorsWwwPort;
const wwwApp = express();
wwwApp.use(express.static('www'));
wwwApp.listen(wwwPort, () => {
   console.info(`wwwApp listening on port ${wwwPort}!`);
});


Wa.watch(config.appMount, config.appPort)

/*
* A D M I N
*/

// api for admin
const adminPort = config.adminAPIport;
const adminApp = express();
const adminRoutes = new AdminRoutes();
adminApp.use('/auth', adminRoutes.routes());
adminApp.listen(adminPort, () => {
   console.log(`wwwAdmin API listening on port ${adminPort}!`);
});

// http-rpc
// const adminPort2 = config.adminAPIportRps;
// const adminRoutesRpc = new AdminRoutesRpc();
// adminApp.use('/auth', adminRoutesRpc.routes());
// adminApp.listen(adminPort2, () => {
//     console.log(`wwwAdmin API RPC listening on port ${adminPort2}!`);
// });

// html
const adminWPort = 8080;
const adminWApp = express();
adminWApp.use(express.static('wwwAdmin'));
adminWApp.listen(adminWPort, () => {
   console.log(`adminWApp listening on port ${adminWPort}!`);
});