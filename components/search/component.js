const Component = exports;

import * as API from './api';
import render from './view/render';
import { createComponent } from '../../app/factory';
import { actions, validate } from '../app/component';

Component.init = { text: '', placeholder: 'http://localhost:8000/docs' };

Component.Search = createComponent({ Component, render });

Component.onChange = ({ target: { value = `${location.href}docs` }}) => {
  if (value.match(validate.url)) {
    Component.setState({ text: value });
    API.request({ url: value }, actions.SERVICE_DATA);
  } else {
    Component.setState({ text: value, data: {} });
  }
};

Component.events = {
  SEARCH_CHANGED: Component.onChange,
};

Component.getRoutes = (setRoutes) => {
  setRoutes([{
    method: 'GET',
    path: '/search',
    config: {
      description: 'Get services from an API documentation',
      tags: ['api', 'docs', 'services'],
    },
  }]);
};
