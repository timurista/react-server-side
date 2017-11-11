import 'babel-polyfill'; // polyfill help function for async await syntax
import express  from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000'; // oauth google process
    return opts;
  }
}))

app.use(express.static('public'));

// * to watch for any route, will just pass to renderer
app.get('*', (req,res) => {
  const store = createStore(req);

  // make request, wait for it
  // then do something with data
  const promises = matchRoutes(routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null;
  }).map( promise => {
    if (promise) {
      // makes an always resolve promise
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      })
    }
  });

  // to handle errors we really should try to give user option to fix
  // dont use catch and abandon rendering attempt
  // we need to allow other requests to be completed
  Promise.all(promises).then(() => {
    const context = {}; // so we can handle 404 errors
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
})

app.listen(3000, () => console.log('port on localhost 3000'));