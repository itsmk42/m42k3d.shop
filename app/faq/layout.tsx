import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - SparkleSphere.store',
  description: 'Find answers to frequently asked questions about SparkleSphere.store. Learn about ordering, shipping, returns, products, and more.',
  keywords: ['FAQ', 'frequently asked questions', 'help', 'support', 'SparkleSphere'],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

