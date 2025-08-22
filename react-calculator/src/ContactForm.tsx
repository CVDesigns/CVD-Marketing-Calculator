import React, { useState } from 'react';
import { Service } from '../types';
import { SendIcon } from './Icons';
import Loader from './Loader';

interface LineItem extends Service {
  quantity: number;
  subtotal: number;
}

interface ContactFormProps {
  lineItems: LineItem[];
  total: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ lineItems, total }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile picture of the site owner.
  const profilePicUrl = "https://storage.googleapis.com/quotecalccvd/cvdprofile.png";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.firstName || !formData.email) {
      setError("Please fill in at least your first name and email.");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you would send the data to a server here.
      console.log('Submitted Data:', { ...formData, lineItems, total });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 text-center animate-fade-in p-6 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex flex-col items-center">
          <img src={profilePicUrl} alt="A portrait of the site owner" className="w-24 h-24 rounded-full mb-4 object-cover" />
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">Thank you, {formData.firstName}!</h4>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Your quote request has been sent. I'll get back to you at <span className="font-semibold">{formData.email}</span> within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Let's Connect</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              aria-required="true"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
            />
          </div>
        </div>
        
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader className="h-5 w-5 mr-2" />
                Submitting...
              </>
            ) : (
              <>
                Send My Quote <SendIcon className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;