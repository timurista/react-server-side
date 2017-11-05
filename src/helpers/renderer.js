import React from 'react'; // will pull everthing for webpack
import { renderToString } from 'react-dom/server';
import Home from './client/components/Home';

export default () => {
  const content = renderToString(<Home />);
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