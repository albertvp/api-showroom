import Joi from 'joi';

const host = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 8000;

const Variables = {
  values: {
    API_URL: process.env.API_URL || `${host}:${port}`,
  },
  schemas: {
    API_URL: Joi.required(),
  },
};

Joi.validate(Variables.values, Variables.schemas, err => {
  if (err) throw new Error(err);
});

export function getServerConnection() {
  return { port, host };
}
