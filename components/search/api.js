const API = exports;

import { get } from 'superagent';
import { emitter, createHandler } from '../../app/factory';

API.respond = (request = {}, reply) => {
  API.source(request.query, createHandler('search', request, reply));
};

API.source = ({ url } = {}, callback) => {
  get(url)
    .set('Accept', 'application/json')
    .end((err, response = {}) => {
      callback(err, response.body);
    });
};

API.request = ({ url }, action, params) => {
  get(`/search?url=${url}`)
    .set('Accept', 'application/json')
    .end((err, response = {}) => {
      emitter.emit(action, err, response.body, params);
    });
};
