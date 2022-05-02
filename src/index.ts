import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { StatusCodes } from 'http-status-codes';

const PORT = process.env.SRV_PORT || '5000';

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use((cors as (opt: CorsOptions) => RequestHandler)(options));

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('X-powered-by', 'Blood, sweat, and tears.');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('GRX Back-end Challenge');
});

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
