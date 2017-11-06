import express  from 'express';
import renderer from './helpers/renderer';
const app = express();

app.use(express.static('public'));

// * to watch for any route, will just pass to renderer
app.get('*', (req,res) => {
  res.send(renderer(req));
})

app.listen(3000, () => console.log('port on localhost 3000'));