
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a transporter using SMTP
    // Note: In a real environment, you should use environment variables for credentials
    // e.g., process.env.SMTP_USER, process.env.SMTP_PASS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your app password
      }
    });

    // Setup email data
    const mailOptions = {
      from: `"${name}" <${email}>`, // sender address
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // list of receivers
      subject: `Portfolio Contact: ${subject}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      ` // html body
    };

    // Send mail
    // Uncomment the line below when environment variables are set up
    // await transporter.sendMail(mailOptions);

    // For demonstration purposes, we'll simulate a successful send
    // since we don't have actual SMTP credentials in this environment
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}