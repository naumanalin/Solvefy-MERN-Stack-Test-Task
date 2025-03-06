import nodemailer from 'nodemailer';

const sendEmail = async (name, email, verification_code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: `Hi 👋 ${name}, Verify Your Account`,
            html: `
                <h2>Hello ${name},</h2>
                <p>Use the verification code below to verify your account:</p>
                <h3 style="color: blue;">${verification_code}</h3>
                <p>If you didn't request this, please ignore this email.</p>
                <br/>
                <p>Best Regards,</p>
                <p>Team - Budget Tracker</p>
            `,
        });

        console.log("Verification email sent successfully!");
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export default sendEmail;
