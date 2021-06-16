import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as indexRouter from './routes/index';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);

export const ApplicationApp: express.Application = app;

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to port ${process.env.PORT || 3000}`);
});
