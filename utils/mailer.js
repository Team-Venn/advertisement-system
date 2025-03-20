import nodemailer from "nodemailer";

// create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (to, verificationCode, username) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Email Verification",
    text: `Your verification code is ${verificationCode}`,
    html: `<!DOCTYPE html>
         <html lang="en">
          <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - Vennace</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9; /* Light background */
            color: #333; /* Default text color */
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #fff; /* White background for the container */
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color:rgb(255, 255, 255); /* Green for the heading */
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #333; /* Text color for paragraphs */
        }
        .verification-code {
            font-weight: bold;
            font-size: 24px;
            color: #222; /* Dark gray for emphasis */
            background-color: #d7d7d7; /* Ash background for the code */
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0; /* Margins around the verification code */
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888; /* Gray color for footer text */
        }
        .header {
            text-align: center;
            padding: 10px;
            background-color:rgb(6, 102, 9); /* Green background for header */
            color: white; /* White text in header */
            border-radius: 5px 5px 0 0; /* Rounded corners on the top */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Vennace!</h1>
        </div>
        <p>Hi ${username},</p>
        <p>Thank you for joining the Vennace family! We're thrilled to have you onboard.</p>
        <p>To get started, please verify your email address by entering the following verification code:</p>
        <p class="verification-code">${verificationCode}</p>
        <p>If you did not request this email, please feel free to ignore it.</p>
        <p>We can't wait to see the amazing offerings you're going to bring to our platform!</p>
        <div class="footer">
            <p>Best regards,<br>The Vennace Team</p>
        </div>
    </div>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", to);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
};
