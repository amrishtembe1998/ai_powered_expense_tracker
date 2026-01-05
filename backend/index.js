import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import mongodbConnect from './db.js';
import { userRouter } from './routes/userRoute.js';

dotenv.config();
const PORT = process.env.BACKEND_PORT;
const app = express();
mongodbConnect();
app.use(express.json());
app.use(cors());
app.use(
  rateLimiter({
    windowMs: 1000,
    limit: 1,
  })
);

app.use('/api/v1/user', userRouter);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
