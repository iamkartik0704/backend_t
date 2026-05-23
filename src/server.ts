import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './database/index.js';
import { sessionMiddleware } from './config/session.js';
import passport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

//Middleware parses incoming JSON payloads and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Session & Authentication Middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/admin/auth', authRoutes);

// global rrror handler catches any errors thrown by next(err)
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Application Error:', err);
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong on the server.',
    },
  });
});

async function bootstrap() {
  try {
    // Ensure DB connects before opening it.
    await connectDB();
    
    app.listen(env.PORT, () => {
      console.log(`Server loaded successfully!`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Listening on port: ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to boot server:', error);
    process.exit(1);
  }
}

// ignite the engine
bootstrap();