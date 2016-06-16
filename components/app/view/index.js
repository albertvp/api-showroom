import React, { Component } from 'react';
const [version, description] = ['dev', 'Find the API Showroom docs'];

export default class Index extends Component {
  render() {
    const title = 'API ShowRoom';
    const jsBundlePath = `/assets/js/bundle-${version}.js`;
    const bootstrap = process.env.NODE_ENV ? 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css' : '/assets/vendor/bootstrap.min.css';

    return (
      <html>
      <head>
        <meta
          charSet="utf-8">
        </meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
        </meta>
        <title>
          {title}
        </title>
            <link
              href={bootstrap}
              rel="stylesheet">
            </link>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300"
          rel="stylesheet"
          type="text/css">
        </link>
      </head>
      <body>
        <div className="main">
          <header className="header">
            <img src="/assets/images/logo.png" />
            <br />&nbsp;
            <br />&nbsp;
            {description}
            <component id="search"></component>
          </header>
          <content className="content">
            <component id="content"></component>
          </content>
          <div className="sidebar sidebar-left">&nbsp;</div>
          <div className="sidebar sidebar-right">&nbsp;</div>
        </div>
        <script
          src="http://code.jquery.com/jquery-2.1.3.min.js">
        </script>
        <script
          src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js">
        </script>
        <script
          src={jsBundlePath}>
        </script>
      </body>
      </html>
    );
  }
}
