import dotenv from 'dotenv';
import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { Routes } from './routes/index.route';
import { connectDB } from './config/db';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

//MongoDB connection
connectDB();
// Middleware
app.use(cors());
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
