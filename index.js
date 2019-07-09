import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import sslRedirect from 'heroku-ssl-redirect';
import helmet from 'helmet';
import cors from 'cors';

import tweetRoutes from './routes/tweetRoutes';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
app.use(sslRedirect());
app.use(helmet());
app.use(bodyParser.json());

tweetRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
