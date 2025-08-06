import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration (only if credentials are provided)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    console.log('✅ Email service configured');
} else {
    console.log('⚠️  Email credentials not configured - running in demo mode');
}

// Email subscription endpoint
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            });
        }
        
        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }
        
        // Check if email transporter is configured
        const hasEmailConfig = transporter !== null;
        
        if (hasEmailConfig && transporter) {
            // Send welcome email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to Sushiman! 🍣',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333; margin-bottom: 10px;">🍣 Welcome to Sushiman! 🍣</h1>
                            <p style="color: #666; font-size: 18px;">Thank you for joining our family of sushi lovers!</p>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                            <h2 style="color: #333; margin-bottom: 15px;">We're excited to share with you:</h2>
                            <ul style="color: #555; line-height: 1.8; font-size: 16px;">
                                <li>🎁 Exclusive offers and discounts</li>
                                <li>🍱 New menu items and seasonal specials</li>
                                <li>🍜 Japanese culinary tips and traditions</li>
                                <li>👨‍🍳 Behind-the-scenes stories from our chefs</li>
                            </ul>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
                            <h3 style="margin-bottom: 10px;">🎉 Special Welcome Offer!</h3>
                            <p style="font-size: 18px; font-weight: bold; margin: 0;">Get 10% off your first order</p>
                            <p style="font-size: 16px; margin: 10px 0 0 0;">Use code: <strong>WELCOME10</strong></p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #666; font-style: italic;">Arigatou gozaimasu! (Thank you very much!)</p>
                            <p style="color: #333; font-weight: bold;">The Sushiman Team</p>
                            <p style="color: #999; font-size: 14px;">🍱 🍣 🍜</p>
                        </div>
                    </div>
                `
            };
            
            await transporter.sendMail(mailOptions);
            console.log(`✅ Welcome email sent to: ${email}`);
        } else {
            // Fallback mode - just log the email
            console.log(`📧 Email subscription received: ${email}`);
            console.log('💡 To enable actual email sending, set EMAIL_USER and EMAIL_PASS environment variables');
        }
        
        res.json({ 
            success: true, 
            message: hasEmailConfig ? 'Welcome email sent successfully!' : 'Subscription successful! Welcome to Sushiman! 🍣'
        });
        
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send welcome email' 
        });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/menu.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/menu.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'));
});

app.get('/checkout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/checkout.html'));
});

app.get('/learn-more.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/learn-more.html'));
});

app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/success.html'));
});

app.get('/test-email.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-email.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Email subscription endpoint: POST /api/subscribe');
}); 