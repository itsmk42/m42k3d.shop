// Email service for sending order notifications

import { getOrderEmailTemplate, EmailTemplateData } from './templates';

/**
 * Send order notification email
 * This function calls the API route to send emails
 */
export async function sendOrderNotificationEmail(data: EmailTemplateData): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/emails/send-order-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: 'Failed to send email',
        error: result.error || 'Unknown error',
      };
    }

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error: any) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
}

/**
 * Send email via Resend API
 * This is called from the API route
 */
export async function sendEmailViaResend(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'orders@sparklesphere.shop',
        to,
        subject,
        html,
        text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Failed to send email via Resend',
      };
    }

    return {
      success: true,
      messageId: data.id,
    };
  } catch (error: any) {
    console.error('Resend API error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send email via SendGrid API (alternative)
 * This is called from the API route if Resend is not available
 */
export async function sendEmailViaSendGrid(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Check if SendGrid API key is configured
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    if (!sendGridApiKey) {
      console.warn('SENDGRID_API_KEY not configured. Email not sent.');
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sendGridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject,
          },
        ],
        from: {
          email: 'orders@sparklesphere.shop',
          name: 'SparkleSphere',
        },
        content: [
          {
            type: 'text/html',
            value: html,
          },
          {
            type: 'text/plain',
            value: text,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        success: false,
        error: error || 'Failed to send email via SendGrid',
      };
    }

    return {
      success: true,
      messageId: response.headers.get('x-message-id') || 'unknown',
    };
  } catch (error: any) {
    console.error('SendGrid API error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send email using the best available service
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    return sendEmailViaResend(to, subject, html, text);
  }

  // Fall back to SendGrid
  if (process.env.SENDGRID_API_KEY) {
    return sendEmailViaSendGrid(to, subject, html, text);
  }

  // No email service configured
  console.warn('No email service configured. Email not sent.');
  return {
    success: false,
    error: 'No email service configured. Please set RESEND_API_KEY or SENDGRID_API_KEY.',
  };
}

