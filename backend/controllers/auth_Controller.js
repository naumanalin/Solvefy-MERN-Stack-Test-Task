import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import sendEmail from '../utils/send_Email.js';

// ------------------------------------------------------------------------------------------------------------------------
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for registration."
            });
        }

        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(409).json({  success: false, message: "User already exists. Please sign in." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        

        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "🎉 Your account successfully registered!"
        });

    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

// ------------------------------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        const d = rememberMe ? 30 : 7;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email or password is empty" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Email is not registered" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: `${d}d` });

        // Set cookie properly
        res.cookie('token', token, {
           // httpOnly: true,
            secure: false,
            maxAge: d * 24 * 60 * 60 * 1000, 
            path: '/',
            sameSite: "lax",
        });

        // Send token in response (optional for frontend)
        res.status(200).json({ success: true, message: "Login successful", token, user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ------------------------------------------------------------------------------------------------------------------------
export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            secure: false,
            expires: new Date(0),
            path: '/',
            sameSite: "lax",
        });

        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ------------------------------------------------------------------------------------------------------------------------
export const user = async (req, res)=>{
    const user = req.user;
    res.status(200).json({success:true, user})
}
// ------------------------------------------------------------------------------------------------------------------------
export const changePassword = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized access." });
        }

        const { password, newPassword, confPassword } = req.body;
        const userId = req.user._id;

        if (!password || !newPassword || !confPassword) {
            return res.status(400).json({ success: false, message: "All fields are required to update your password." });
        }

        if (newPassword !== confPassword) {
            return res.status(400).json({ success: false, message: "Confirm password did not match!" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid current password." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in changing password:", error);
        res.status(500).json({ success: false, message: "Internal server error.", error });
    }
};


// -------------------------------------------------------------------------------------------------------------------------
export const uploadProfilePicture = async (req, res) => {
    try {
        const user = req.user;
        
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded" 
            });
        }

        // Delete old picture if exists
        if (user.picture) {
            const oldPath = path.join('public', user.picture);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Update with correct path
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { picture: `/uploads/${req.file.filename}` },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile picture updated",
            user: updatedUser
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile picture"
        });
    }
};

// ------------------------------------------------------------------------------------------------------------------------
export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and email are required." });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists._id.toString() !== user._id.toString()) {
            return res.status(409).json({ success: false, message: "Email is already in use by another account." });
        }

        await User.findByIdAndUpdate(user._id, { name, email });
        res.status(200).json({ success: true, message: "Profile updated successfully." });
    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

