import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobsRoutes from './routes/jobsRoutes.js';
import profilesRoutes from './routes/profilesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import sessionsRoutes from './routes/sessionsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// RESTful Routes
app.use('/api/jobs', jobsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MyJobTrend API (RESTful)' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
