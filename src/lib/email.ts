import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(to: string, referralCode: string): Promise<void> {
  const referralLink = `https://www.repowise.ai?ref=${referralCode}`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <!-- Header with logo -->
          <tr>
            <td style="padding: 0; text-align: center;">
              <img src="https://www.repowise.ai/images/logo-email.jpg" alt="RepoWise" width="100%" style="max-width: 600px; display: block;">
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Hi there,</h1>
              
              <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thanks for joining the RepoWise waitlist!
              </p>
              
              <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                You're now in line to get early access to RepoWise: the missing context layer between your codebase and AI.
              </p>
              
              <h2 style="margin: 30px 0 15px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">What happens next:</h2>
              <p style="margin: 0 0 30px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                We'll notify you as soon as early access opens. Early waitlist members get priority access.
              </p>
              
              <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Welcome aboard,<br>
                <strong>The RepoWise Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Referral section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 15px 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                <strong>P.S.</strong> Know someone who'd love this? Share your personal link and we'll bump you up the list for referrals:
              </p>
              <p style="margin: 0;">
                <a href="${referralLink}" style="color: #3b82f6; font-size: 14px; word-break: break-all;">${referralLink}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `Hi there,

Thanks for joining the RepoWise waitlist!

You're now in line to get early access to RepoWise: the missing context layer between your codebase and AI.

What happens next:
We'll notify you as soon as early access opens. Early waitlist members get priority access.

Welcome aboard,
The RepoWise Team

P.S. Know someone who'd love this? Share your personal link and we'll bump you up the list for referrals: ${referralLink}`;

  await transporter.sendMail({
    from: '"RepoWise" <team@repowise.ai>',
    to,
    subject: "You're on the RepoWise waitlist 🎉",
    text,
    html,
  });
}
