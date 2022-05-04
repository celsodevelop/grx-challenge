import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import startServer from './bin';
import routes from './routes';
import errorMiddleware from './errors/errorMiddleware';

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

  res.header('X-powered-by', 'Sweat, and tears.');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES

app.use('/answer', routes.answer);

// ERROR MIDDLEWARE

app.use(errorMiddleware);

// START LISTEN SERVER

startServer(app);
