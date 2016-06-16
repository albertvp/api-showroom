import { string, object } from 'joi';

export const query = {
  url: string().required(),
};

export const response = {
  schema: object().required(),
};
