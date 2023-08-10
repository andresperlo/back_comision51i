require('dotenv').config()
require('./database/config')
const Server = require('./server/server')
const server = new Server();

server.listen()
