const Model = exports;

import { string, array, object } from 'joi';

Model.query = {
  url: string().required(),
};

Model.response = {
  schema: object().keys({
    apis: array().items(object().keys({
      path: string().required(),
    })),
    apiVersion: string().required(),
    basePath: string().required(),
  }),
  options: {
    stripUnknown: true,
  },
};
