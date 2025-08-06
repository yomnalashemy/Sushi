# Email Subscription Setup Guide

## Overview
The Sushiman website now includes a fully functional email subscription system that:
- Validates email addresses
- Sends beautiful welcome emails
- Handles errors gracefully
- Stores subscribers locally

## Features

### Email Validation
- Checks for empty email fields
- Validates email format using regex
- Prevents duplicate subscriptions
- Shows appropriate error messages

### Welcome Email
- Beautiful HTML email template
- Includes welcome message in Japanese
- Offers 10% discount code (WELCOME10)
- Lists upcoming features and benefits

### Error Handling
- Network error handling
- Invalid email format detection
- Duplicate subscription prevention
- Graceful fallback for demo purposes

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings (Optional)
To enable actual email sending, set up environment variables:

```bash
# Create a .env file in the root directory
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note:** For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password instead of your regular password

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

## How It Works

### Frontend (JavaScript)
- `handleSubscribe()`: Main subscription handler
- `sendWelcomeEmail()`: Sends email via API
- `showMessage()`: Displays success/error messages
- Enhanced validation and user feedback

### Backend (Node.js/Express)
- `/api/subscribe` endpoint
- Email validation
- Nodemailer integration
- Beautiful HTML email template

### Styling (CSS)
- Responsive design
- Animated message displays
- Consistent with Sushiman branding
- Mobile-friendly layout

## Email Template Features
- 🍣 Japanese sushi emojis
- Welcome message in English and Japanese
- Special discount offer
- List of upcoming features
- Professional styling

## Testing
1. Enter a valid email address
2. Click "Get Started"
3. Check your email for the welcome message
4. Try entering an invalid email to see error handling
5. Try subscribing with the same email twice

## Fallback Mode
If email configuration is not set up, the system will:
- Still validate emails
- Show success messages
- Log email attempts to console
- Store subscribers locally

## Customization
You can customize:
- Email template in `server.js`
- Validation rules in `js/script.js`
- Styling in `css/sections/subscribe.css`
- Server configuration in `server.js`

## Security Notes
- Email credentials should be stored in environment variables
- Consider rate limiting for production use
- Implement proper email verification for production
- Use HTTPS in production environments 