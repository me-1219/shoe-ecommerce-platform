import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export const FAQPage = () => {
  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the "My Orders" page from your account dashboard. Click on any order to see its current status and tracking information.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unworn shoes in their original packaging. Contact our support team to initiate a return.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
    },
    {
      question: 'How do I know what size to order?',
      answer: 'We provide a detailed size guide for each product. You can find it on the product detail page. If you\'re between sizes, we recommend ordering the larger size.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Telebirr mobile payment and Cash on Delivery for all orders.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order within 24 hours of placing it. After that, please contact our support team for assistance.',
    },
    {
      question: 'Do you offer discounts for bulk orders?',
      answer: 'Yes, we offer special pricing for bulk orders. Please contact our sales team for more information.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">Find answers to common questions about our products and services</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@shoeshub.com" className="text-orange-600 hover:text-orange-700 font-medium">
              Email: support@shoeshub.com
            </a>
            <span className="hidden sm:block text-gray-400">|</span>
            <a href="tel:+251912345678" className="text-orange-600 hover:text-orange-700 font-medium">
              Phone: +251 91 234 5678
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
