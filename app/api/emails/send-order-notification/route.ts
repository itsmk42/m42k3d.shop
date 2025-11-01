import { NextRequest, NextResponse } from 'next/server';
import { getOrderEmailTemplate, EmailTemplateData } from '@/lib/email/templates';
import { sendEmail } from '@/lib/email/service';

/**
 * POST /api/emails/send-order-notification
 * Send order notification email to customer
 */
export async function POST(request: NextRequest) {
  try {
    const data: EmailTemplateData = await request.json();

    // Validate required fields
    if (!data.customerEmail || !data.orderId || !data.customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, orderId, customerName' },
        { status: 400 }
      );
    }

    // Generate email template
    const { subject, html, text } = getOrderEmailTemplate(data);

    // Send email
    const result = await sendEmail(
      data.customerEmail,
      subject,
      html,
      text
    );

    if (!result.success) {
      console.error('Failed to send email:', result.error);
      return NextResponse.json(
        { 
          error: result.error || 'Failed to send email',
          warning: 'Email service may not be configured. Check RESEND_API_KEY or SENDGRID_API_KEY.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

