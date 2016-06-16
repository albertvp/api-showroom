// Transform all API files with Babel
// https://babeljs.io/docs/usage/require/
require('babel/register')({});

const Hapi = require('hapi');
const server = new Hapi.Server();
const plugins = require('./plugins').plugins;
const initRoutes = require('./loader').initRoutes;
const getServerConnection = require('./env').getServerConnection;

server.connection(getServerConnection());

server.register(plugins, err => {
  if (err) throw new Error(err);

  server.views({
    engines: {
      js: require('hapi-react-views'),
    },
    relativeTo: __dirname,
    path: '../components/app/view',
  });

  initRoutes(routes => {
    server.route(routes);
    server.start(() => {
      server.log(['info'], 'Server started at: ' + server.info.uri);
      server.log(['info'], 'API docs: ' + server.info.uri + '/documentation');
    });
  });
});
