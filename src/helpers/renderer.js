import React from 'react'; // will pull everthing for webpack
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';

// need to pass empty context to StaticRouter
// handle redirects and error handling
export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <Routes />
    </StaticRouter>
  );
  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
}