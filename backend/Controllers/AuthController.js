
const bcrypt = require('bcrypt');
const UserModel = require('../Models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        success: false
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new UserModel({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({
      message: 'User created successfully',
      success: true
    });

  } catch (error) {
    console.error('Signup error:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
      success: false
    });
  }
};

const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const existingUser = await UserModel.findOne({
            $or: [{ username: login }, { email: login }]
        });
        if (!existingUser) {
            return res.status(401).json({ 
                error: `Invalid ${login.includes("@") ? "Email" : "Username"}`, 
                success: false 
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ 
                error: 'Invalid password', 
                success: false 
            });
        }
        const token = jwt.sign({userId: existingUser._id, email: existingUser.email}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )

        res.status(200).json({ 
            message: 'Login successful', 
            success: true,
            token,
            email: User.email,
            username: User.username

        });
    } catch (error) {
         console.error('Error occurred during login:', error);

        return res.status(500).json({
         error: 'Internal Server Error',
         success: false
         });
        }
}
const logout = async (req, res) => {
    try {
    } catch (error) {
        console.error('Error occurred during logout:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    signup,
    login,
    logout
}