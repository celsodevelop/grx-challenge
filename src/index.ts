import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(express.json());

const PORT = process.env.SRV_PORT || 5000;

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('GRX Back-end Challenge');
});

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
