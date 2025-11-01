// Email templates for order notifications

export interface EmailTemplateData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderTotal: number;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  orderStatus: string;
  paymentMethod?: string;
  trackingNumber?: string;
  orderDate: string;
}

export function getOrderEmailTemplate(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  const { orderId, customerName, orderTotal, orderStatus, trackingNumber, orderDate } = data;

  let subject = '';
  let statusMessage = '';
  let statusColor = '';

  switch (orderStatus) {
    case 'pending':
    case 'cod-pending':
    case 'upi-pending':
      subject = `Order Confirmed - #${orderId.slice(0, 8).toUpperCase()}`;
      statusMessage = 'Your order has been received and is being processed.';
      statusColor = '#FFA500';
      break;
    case 'processing':
      subject = `Order Processing - #${orderId.slice(0, 8).toUpperCase()}`;
      statusMessage = 'Your order is being prepared for shipment.';
      statusColor = '#3B82F6';
      break;
    case 'shipped':
      subject = `Order Shipped - #${orderId.slice(0, 8).toUpperCase()}`;
      statusMessage = 'Your order is on its way!';
      statusColor = '#8B5CF6';
      break;
    case 'delivered':
      subject = `Order Delivered - #${orderId.slice(0, 8).toUpperCase()}`;
      statusMessage = 'Your order has been delivered. Thank you for your purchase!';
      statusColor = '#10B981';
      break;
    default:
      subject = `Order Update - #${orderId.slice(0, 8).toUpperCase()}`;
      statusMessage = `Your order status has been updated to: ${orderStatus}`;
      statusColor = '#6B7280';
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9fafb;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 30px 20px;
          }
          .status-box {
            background-color: ${statusColor}20;
            border-left: 4px solid ${statusColor};
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .status-box p {
            margin: 0;
            color: ${statusColor};
            font-weight: 600;
          }
          .order-details {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .order-details p {
            margin: 8px 0;
            font-size: 14px;
          }
          .order-details strong {
            color: #1f2937;
          }
          .tracking-info {
            background-color: #f0f9ff;
            border: 1px solid #bfdbfe;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .tracking-info p {
            margin: 0;
            font-size: 14px;
          }
          .tracking-number {
            font-family: 'Courier New', monospace;
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            margin-top: 8px;
          }
          .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          .button {
            display: inline-block;
            background-color: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: 600;
          }
          .button:hover {
            background-color: #5568d3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ SparkleSphere</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Order Update</p>
          </div>

          <div class="content">
            <p>Hi ${customerName},</p>

            <div class="status-box">
              <p>${statusMessage}</p>
            </div>

            <div class="order-details">
              <p><strong>Order ID:</strong> #${orderId.slice(0, 8).toUpperCase()}</p>
              <p><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Order Total:</strong> ₹${orderTotal.toFixed(2)}</p>
              <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: 600; text-transform: capitalize;">${orderStatus.replace('-', ' ')}</span></p>
            </div>

            ${trackingNumber ? `
              <div class="tracking-info">
                <p><strong>📦 Tracking Information</strong></p>
                <p>Your package is on its way! Track your shipment using the tracking number below:</p>
                <div class="tracking-number">${trackingNumber}</div>
              </div>
            ` : ''}

            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>

            <p style="margin-top: 20px;">
              Best regards,<br>
              <strong>The SparkleSphere Team</strong>
            </p>
          </div>

          <div class="footer">
            <p>© 2025 SparkleSphere. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
SparkleSphere - Order Update

Hi ${customerName},

${statusMessage}

Order Details:
- Order ID: #${orderId.slice(0, 8).toUpperCase()}
- Order Date: ${new Date(orderDate).toLocaleDateString('en-IN')}
- Order Total: ₹${orderTotal.toFixed(2)}
- Status: ${orderStatus.replace('-', ' ').toUpperCase()}

${trackingNumber ? `Tracking Number: ${trackingNumber}` : ''}

If you have any questions about your order, please contact us.

Best regards,
The SparkleSphere Team

© 2025 SparkleSphere. All rights reserved.
  `;

  return { subject, html, text };
}

