import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import connectMongodbWithRetry from './db.js';
import { userRouter } from './routes/userRoute.js';
import { expenseRouter } from './routes/expenseRoute.js';

dotenv.config();
const PORT = process.env.BACKEND_PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 1000,
    limit: 5,
  })
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/expense', expenseRouter);

connectMongodbWithRetry()
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB. Exiting.', err);
    process.exit(1);
  });

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
