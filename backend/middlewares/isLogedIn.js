import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isLogedin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies?.a_x_is || (authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : null);

        if (!token) {
            return res.status(401).json({ success: false, message: "unauthorized access, plz login to use this service" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const findUser = await User.findOne({ email: decode.email }).select("-password");

        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // If user founded
        req.user = findUser;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
