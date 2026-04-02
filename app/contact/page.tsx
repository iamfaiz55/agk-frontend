import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | AGK Infrastructures',
  description: 'Get in touch with AGK Infrastructures. Visit our office in Mitmita, Chhatrapati Sambhajinagar, or contact us for premium real estate inquiries.',
};

export default function ContactPage() {
  return <ContactClient />;
}
