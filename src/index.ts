import express, {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';
import startServer from './bin';

const app = express();

// CORS

const allowedOrigins = ['http://localhost:3000']; // endereço do cliente react
const corsOpts: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use((cors as (opt: CorsOptions) => RequestHandler)(corsOpts));

// SETUP

app.use((_req: Request, res: Response, next: NextFunction) => {
  // Evita ataques de enumeração para extrair informações,
  // escondendo 'Express 4.18.1' do header das responses

  res.header('X-powered-by', 'Blood, sweat, and tears.');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('GRX Back-end Challenge');
});

// START LISTEN SERVER

startServer(app);
