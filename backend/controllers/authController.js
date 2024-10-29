import User from "../models/User.js";
import passport from 'passport';

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const user = new User({ username, email, role})
        await User.register(user, password);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({error: `Error creating user: ${error.message}`});
    }
}

export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ error: 'Error logging in' });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        req.login(user, (loginErr) => {
            if (loginErr) return res.status(500).json({ error: 'Login failed' });
            res.json({ message: 'Login successful', user: { id: user._id, role: user.role } });
        });
    })(req, res, next);
}

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
}

export const currentUser = (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not logged in' });
    res.json({ user: { id: req.user._id, role: req.user.role } });
}