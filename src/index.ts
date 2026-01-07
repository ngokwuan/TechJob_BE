import dotenv from 'dotenv';
import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Routes } from './routes/index.route';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import { startSuggestedJobCron } from './cron/suggestedJob.cron';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

//MongoDB connection
connectDB();

//Redis connection

connectRedis()
  .then(() => console.log('Redis connected successfully'))
  .catch((err) => {
    console.error('Redis connection failed:', err.message);
    console.log(' Server will continue without Redis (blacklist disabled)');
  });

//Start cron for send mail to user every week
startSuggestedJobCron();

// Middleware

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://fe-tech-job-prj.vercel.app',
  'https://techjob-be.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  })
);

app.options(/.*/, cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
Routes(app);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
