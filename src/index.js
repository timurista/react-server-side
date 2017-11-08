import 'babel-polyfill'; // polyfill help function for async await syntax
import express  from 'express';
import { matchRoutes } from 'react-router-config';
import routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';


const app = express();

app.use(express.static('public'));

// * to watch for any route, will just pass to renderer
app.get('*', (req,res) => {
  const store = createStore();

  matchRoutes(routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData() : null;
  });
  res.send(renderer(req, store));
})

app.listen(3000, () => console.log('port on localhost 3000'));