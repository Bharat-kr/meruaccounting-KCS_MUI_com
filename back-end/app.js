import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import authRoutes from './routers/auth.js';
import clientRoutes from './routers/client.js';
import teamRoutes from './routers/team.js';
import projectRoutes from './routers/project.js';
import employeeRoutes from './routers/employee.js';

const app = express();

dotenv.config({ path: './config/config.env' });
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/getMe', (req, res) => {
  res.send('Ok');
});

app.use('/employee', employeeRoutes);
app.use('/', authRoutes);
app.use('/team', teamRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
