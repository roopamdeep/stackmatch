import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendApplicationEmail(
  to: string,
  developerName: string,
  jobTitle: string,
  companyName: string,
) {
  await resend.emails.send({
    from: "StackMatch <onboarding@resend.dev>",
    to,
    subject: `Application received for ${jobTitle}`,
    html: `
      <h2>Hi ${developerName},</h2>
      <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been received.</p>
      <p>We will review your application and get back to you soon.</p>
      <br/>
      <p>Best regards,</p>
      <p>StackMatch Team</p>
    `,
  });
}

export async function sendStatusUpdateEmail(
  to: string,
  developerName: string,
  jobTitle: string,
  status: string,
) {
  await resend.emails.send({
    from: "StackMatch <onboarding@resend.dev>",
    to,
    subject: `Application status update - ${jobTitle}`,
    html: `
      <h2>Hi ${developerName},</h2>
      <p>Your application for <strong>${jobTitle}</strong> has been updated.</p>
      <p>New status: <strong>${status}</strong></p>
      <br/>
      <p>Best regards,</p>
      <p>StackMatch Team</p>
    `,
  });
}
