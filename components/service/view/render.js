import React from 'react';

export default function render({ state }) {
  let services;
  if (state.api && state.api.apis && state.api.apis.length) {
    services = state.api.apis.map(({ apis }) => {
      let list;
      if (apis && apis.length) {
        list = apis.map((api) => {
          if (!api.operations || !api.operations.length) return '';
          return api.operations.map((op, key) => {
            return (
              <li key={key}>{op.method} {api.path}: {op.summary}<p className="params">{JSON.stringify(op.parameters)}</p></li>
            );
          });
        });
      }
      return (
        <ul>{list}</ul>
      );
    });
    services = <div>{services}</div>;
  }
  return (
    <div className="service">
      {services}
    </div>
  );
}
