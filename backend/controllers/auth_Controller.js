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
        res.cookie('a_x_is', token, {
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
        res.cookie('a_x_is', '', {
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
export const verifyAccountReq = async (req, res)=>{
    try {
        const user = req.user;

        if (user.verified) {
            return res.status(400).json({ success: false, message: "Account is already verified." });
        }

        const email_verification_code = Math.floor(1000 + Math.random() * 9000).toString();
        
        // Save verification code to user
        user.email_verification_code = email_verification_code;
        await user.save();

        // Send email
        const send_email = await sendEmail(user.name, user.email, email_verification_code);
        if (!send_email) {
            return res.status(500).json({ success: false, message: "Failed to send verification email." });
        }

        res.status(200).json({ success: true, message: "Verification email sent successfully." });

    } catch (error) {
        console.error("Error in verifyAccountReq:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}
// -------------------------------------------------------------------------------------------------------------------------
export const verifyAccount = async (req, res)=>{ 
    try {
        const user = req.user;
        const {email, verification_code} = req.body;
        if(!email || !verification_code){
            return res.status(400).json({success:false, message:"Email or Verification code did not fount?"});
        };

        if(email !== user.email){
            return res.status(400).json({success:false, message:"Email did not match?"});
        }

        if(user.verified){
            return res.status(400).json({success:false, message:"Dear user your account is already verified!"})
        }

        if(user.email_verification_code != verification_code){
            return res.status(400).json({ success: false, message: "Invalid verification code." });
        }

        user.verified = true;
        user.email_verification_code = null;
        await user.save();

        res.status(200).json({success:true, message:'🎉 Account Verified Successfully.'})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }

}
// ------------------------------------------------------------------------------------------------------------------------
export const forgetPassword = async (req, res)=>{

}

