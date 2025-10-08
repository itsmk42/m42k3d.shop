import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - SparkleSphere.store',
  description: 'Get in touch with SparkleSphere.store. Contact us for inquiries, support, or custom orders. We\'re here to help!',
  keywords: ['contact', 'customer support', 'SparkleSphere', 'get in touch', 'help'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

