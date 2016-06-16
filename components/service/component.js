const Component = exports;

import * as API from './api';
import render from './view/render';
import { actions } from '../app/component';
import { createComponent } from '../../app/factory';

Component.loadServices = ({ basePath, apis }) => {
  if (apis && apis.length && !apis[0].description) {
    apis.map((api, index) => API.request({ url: basePath + api.path }, actions.SERVICE_API_DATA, index));
  }
};

Component.onReceiveApi = (err, api) => {
  Component.loadServices(api);
  Component.setState(err ? { api: { basePath: 'error' } } : { api });
};

Component.onReceiveService = (err, service, index) => {
  const { api } = Component.getState();
  api.apis[index] = service;
  Component.setState({ api });
};

Component.events = {
  SERVICE_DATA: Component.onReceiveApi,
  SERVICE_API_DATA: Component.onReceiveService,
};

Component.Service = createComponent({ Component, render });

Component.getRoutes = setRoutes => {
  setRoutes([{
    method: 'GET',
    path: '/service',
    config: {
      description: 'Call a service endpoint',
      tags: ['api', 'service', 'endpoint'],
    },
  }]);
};
