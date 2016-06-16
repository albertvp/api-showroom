const Component = exports;

Component.actions = {
  SEARCH_QUERY: 'SEARCH_QUERY',
  SEARCH_CHANGED: 'SEARCH_CHANGED',
  SERVICE_DATA: 'SERVICE_DATA',
  SERVICE_API_DATA: 'SERVICE_API_DATA',
};

Component.views = {
  SEARCH: 'search',
  SERVICE: 'service',
  MODEL: 'model',
};

Component.validate = {
  url: /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
};

Component.getRoutes = setRoutes => {
  setRoutes([{
    method: 'GET',
    path: '/',
    handler: {
      view: 'index',
    },
  }, {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: 'assets',
      },
    },
  }]);
};
