import { resolve } from 'path';
import { access, readdirSync, R_OK } from 'fs';

const dir = 'components';
const components = readdirSync(dir).filter(name => name[0] !== '.');

export function build(component, handler, { query, response }) {
  component.config.handler = handler;
  component.config.validate = { query };
  component.config.response = response;
  return component;
}

export function loadModule(component, file, loaded) {
  const path = resolve(__dirname, `../${dir}/${component}/${file}.js`);
  access(path, R_OK, (err) => {
    loaded(err ? null : require(path));
  });
}

export function loadComponent(component, loaded) {
  loadModule(component, 'api', api => {
    loadModule(component, 'model', model => {
      loadModule(component, 'component', comp => {
        if (comp && comp.getRoutes) comp.getRoutes(routes => loaded(api, model, routes));
        else loaded(api, model);
      });
    });
  });
}

function pushApis(apis, pushed) {
  return (api = {}, model = {}, routes = []) => {
    routes.forEach(route => apis.push(
      route.handler ?
        route :
        build(route, api.respond, model)
    ));
    pushed(apis);
  };
}

export function initRoutes(done) {
  const apis = [];
  let total = components.length;
  components.forEach(comp => {
    loadComponent(comp, pushApis(apis, --total ? () => {} : done));
  });
}
