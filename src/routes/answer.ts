import { Router as answer } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = answer();

router.post('/', (req, res) => {
  res.status(StatusCodes.OK).end();
});

export default router;
