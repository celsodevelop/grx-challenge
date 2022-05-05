import { Router } from 'express';
import createAnswerCtrl from '../controllers/answer';

const router = Router();

router.post('/', createAnswerCtrl);

export default router;
