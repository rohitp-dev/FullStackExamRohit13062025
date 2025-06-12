import express from 'express';
import { sqlReports, mongoReports } from '../controllers/ReportController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/sql', sqlReports);
router.get('/mongo', mongoReports);

export default router;
