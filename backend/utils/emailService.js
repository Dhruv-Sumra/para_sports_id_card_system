import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

// Create transporter
const createTransporter = () => {
  // Debug: Log all environment variables
  console.log('=== Email Service Debug ===');
  console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL);   
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
  console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
  
  // Temporary hardcoded values for testing
  const emailUser = process.env.SENDER_EMAIL || 'dhruvsumra13@gmail.com';
  const emailPassword = process.env.EMAIL_PASSWORD || 'rwrzljvqtmjgbaxq';
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  
  console.log('Using email config:', { emailUser, emailService });
  
  // Check if email configuration is available
  if (!emailUser || !emailPassword) {
    console.warn('Email configuration not found. Email functionality will be disabled.');
    console.warn('Required: SENDER_EMAIL and EMAIL_PASSWORD environment variables');
    return null;
  }

  return nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPassword 
    }
  });
};

export const sendIdCardEmail = async (player, idCardPath) => {
  try {
    const transporter = createTransporter();
    
    // If no transporter (email not configured), just log and return
    if (!transporter) {
      console.log(`Email not sent to ${player.email} - email service not configured`);
      return { messageId: 'email-not-configured' };
    }
    
    // Full path to ID card
    const fullIdCardPath = path.join(__dirname, '..', idCardPath);
    
    // Check if ID card file exists
    if (!fs.existsSync(fullIdCardPath)) {
      throw new Error('ID card file not found');
    }
    
    // Get email configuration
    const emailUser = process.env.SENDER_EMAIL || 'gujaratparasports@gmail.com';
    
    const mailOptions = {
      from: emailUser,
      to: player.email,
      subject: 'Your Para Sports ID Card',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Para Sports ID Card</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Official Player Identification</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3c72; margin-top: 0;">Hello ${player.firstName}!</h2>
            
            <p style="color: #333; line-height: 1.6;">
              Thank you for registering with Para Sports! Your official ID card has been generated and is attached to this email.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3c72;">
              <h3 style="color: #1e3c72; margin-top: 0;">Your Player Information:</h3>
              <ul style="color: #333; line-height: 1.8;">
                <li><strong>Player ID:</strong> ${player.playerId}</li>
                <li><strong>Name:</strong> ${player.firstName} ${player.lastName}</li>
                <li><strong>Primary Sport:</strong> ${player.primarySport}</li>
                <li><strong>Experience Level:</strong> ${player.experienceLevel}</li>
                <li><strong>Registration Date:</strong> ${new Date(player.registrationDate).toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              <strong>Important Notes:</strong>
            </p>
            <ul style="color: #333; line-height: 1.6;">
              <li>Your ID card is in high-quality PDF format for better printing</li>
              <li>Please keep this ID card safe and carry it with you during events</li>
              <li>The QR code on the card contains your complete player information</li>
              <li>This card is valid for official Para Sports events and competitions</li>
              <li>Contact us if you need to update any information</li>
            </ul>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px;">
                If you have any questions, please contact us at:<br>
                <a href="mailto:support@parasports.org" style="color: #1e3c72;">support@parasports.org</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Para Sports Organization. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Para_Sports_ID_Card_${player.playerId}.pdf`,
          path: fullIdCardPath,
          cid: 'idcard'
        }
      ]
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
    
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error, just log it so registration doesn't fail
    return { error: 'Failed to send email', details: error.message };
  }
};

export const sendWelcomeEmail = async (player) => {
  try {
    const transporter = createTransporter();
    
    // If no transporter (email not configured), just log and return
    if (!transporter) {
      console.log(`Welcome email not sent to ${player.email} - email service not configured`);
      return { messageId: 'email-not-configured' };
    }
    
    // Get email configuration
    const emailUser = process.env.SENDER_EMAIL || 'dhruvsumra13@gmail.com';
    
    const mailOptions = {
      from: emailUser,
      to: player.email,
      subject: 'Welcome to Para Sports!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Para Sports!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your registration is being processed</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1e3c72; margin-top: 0;">Hello ${player.firstName}!</h2>
            
            <p style="color: #333; line-height: 1.6;">
              Thank you for registering with Para Sports! We're excited to have you as part of our community.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3c72;">
              <h3 style="color: #1e3c72; margin-top: 0;">What's Next?</h3>
              <ul style="color: #333; line-height: 1.8;">
                <li>Your ID card is being generated</li>
                <li>You'll receive your ID card via email within 24 hours</li>
                <li>Keep an eye on your email for updates about events</li>
                <li>Join our community forums to connect with other athletes</li>
              </ul>
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              <strong>Your Player ID:</strong> ${player.playerId}
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px;">
                If you have any questions, please contact us at:<br>
                <a href="mailto:support@parasports.org" style="color: #1e3c72;">support@parasports.org</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Para Sports Organization. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);
    return info;
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error, just log it so registration doesn't fail
    return { error: 'Failed to send welcome email', details: error.message };
  }
}; 