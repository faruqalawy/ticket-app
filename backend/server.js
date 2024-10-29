import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from './models/User.js';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();
const app = express();

// Connect to Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error("Error connecting to MongoDB", err));

// Middleware from libraries
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get('/', (req, res) => res.send("Welcome to Home!"));
app.use('/api', authRoutes);
app.use('/api/tickets', ticketRoutes)

// Create server connection on local port
app.listen(process.env.APP_PORT, () => {
    console.log(
        `Server running on http://localhost:${process.env.APP_PORT}`
    )
})
