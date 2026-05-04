import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Add more routes here
// router.use('/users', userRouter);

export default router;
