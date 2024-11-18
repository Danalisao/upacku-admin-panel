import React from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by clicking on the "Orders" section in your dashboard and selecting the specific order you want to track. Each order has a unique tracking ID that provides real-time updates on its status.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For business accounts, we also offer invoice-based payments with net-30 terms.'
  },
  {
    question: 'How can I change my shipping address?',
    answer: 'To change your shipping address, go to your account settings and update your delivery information. If you need to change the address for a specific order, please contact our support team immediately.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to customized items.'
  },
  {
    question: 'How do I contact customer support?',
    answer: "You can reach our customer support team through live chat, email at support@upacku.com, or by phone at +1 (555) 123-4567. We're available 24/7 to assist you."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
          <HelpCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600">Find answers to common questions about our services</p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl overflow-hidden transition-all duration-300 
                       border-2 hover:shadow-lg ${openIndex === index ? 'border-primary-300' : 'border-transparent'}`}
          >
            <button
              className="w-full p-6 text-left flex items-center justify-between group"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className={`font-semibold transition-colors duration-300 
                              ${openIndex === index ? 'text-primary-600' : 'group-hover:text-primary-600'}`}>
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-primary-600" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-300" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 animate-fadeIn">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
        <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl 
                         hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-md hover:shadow-lg
                         transform hover:-translate-y-0.5">
          Contact Support
        </button>
      </div>
    </div>
  );
};