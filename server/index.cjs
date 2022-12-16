const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname + '/db.json'));
const middlewares = jsonServer.defaults({
  static: path.resolve(__dirname + '/../build/'),
});

server.db = router.db;
const port = process.env.PORT || 8000;

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use(auth);
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});
