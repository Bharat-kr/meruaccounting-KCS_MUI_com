import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import teamRoutes from './routes/team.js';
import projectRoutes from './routes/project.js';
import employeeRoutes from './routes/employee.js';
import activityRoutes from './routes/activity.js';
import reportRoutes from './routes/report.js';
import uploadRoutes from './routes/upload.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const swaggerDocs = YAML.load('./api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/employee', employeeRoutes);
app.use('/', authRoutes);
app.use('/team', teamRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/activity', activityRoutes);
app.use('/upload', uploadRoutes);
app.use('/report', reportRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Middleware
app.use(notFound);
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
