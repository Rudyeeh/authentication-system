
const bcrypt = require('bcrypt');
const UserModel = require('../Models/user');
const jwt = require('jsonwebtoken');


// SIGNUP
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check existing user
        const existingUser = await UserModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });

    } catch (error) {
        console.error('Signup error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Find user by username or email
        const existingUser = await UserModel.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or email'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            jwtToken,
            name: existingUser.username,
            email: existingUser.email
        });

    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


// LOGOUT
const logout = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });

    } catch (error) {
        console.error('Logout error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


module.exports = {
    signup,
    login,
    logout
};
