import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import aiRoutes from './routes/ai.routes.js';

const app = express();


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/property', propertyRoutes);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BetConnect API',
      version: '1.0.0',
      description: 'API documentation for BetConnect backend',
    },
    servers: [{ url: '/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check

app.use (errorHandler);
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Server is healthy' });
});

// Error handler
app.use(errorHandler);

export default app;