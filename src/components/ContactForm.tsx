import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const services = [
    'ვებ განვითარება',
    'მობილური აპლიკაციები',
    'ციფრული მარკეტინგი',
    'ვიდეო პროდუქცია',
    'ფოტო პროდუქცია',
    'სოციალური მედია',
    'SEO ოპტიმიზაცია',
    'სხვა'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'იგზავნება...' });

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        setStatus({
          type: 'error',
          message: 'გთხოვთ შეავსოთ ყველა აუცილებელი ველი'
        });
        return;
      }

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing');
      }

      // Send email
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          to_email: 'team.inventogeo@gmail.com',
        },
        publicKey
      );

      setStatus({
        type: 'success',
        message: 'წერილი წარმატებით გაიგზავნა! ჩვენ დაგიკავშირდებით 24 საათის განმავლობაში.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // Track successful form submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form Success',
        });
      }

    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus({
        type: 'error',
        message: 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა ან დაგვიკავშირდით პირდაპირ.'
      });
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-900/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            დაუკავშირდით ჩვენ
          </h3>
          <p className="text-slate-400">
            უფასო სტრატეგიული კონსულტაცია
          </p>
        </div>

        {/* Status Message */}
        {status.type !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg flex items-center gap-3 ${
              status.type === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : status.type === 'error'
                ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
            }`}
          >
            {status.type === 'success' && <FaCheck />}
            {status.type === 'error' && <FaExclamationTriangle />}
            {status.type === 'loading' && (
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            )}
            <span className="text-sm">{status.message}</span>
          </motion.div>
        )}

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              სახელი *
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-slate-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="თქვენი სახელი"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ელ. ფოსტა *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ტელეფონი
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3.5 text-slate-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="+995 XXX XXX XXX"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              სერვისი
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="">აირჩიეთ სერვისი</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            წერილი *
          </label>
          <div className="relative">
            <FaComment className="absolute left-3 top-3.5 text-slate-500" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              placeholder="ამოგვიწერეთ თქვენი პროექტის შესახებ..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {status.type === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              იგზავნება...
            </>
          ) : (
            <>
              <FaPaperPlane />
              წერილის გაგზავნა
            </>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          გაგზავნით თანხმდებით ჩვენს{' '}
          <a href="/privacy" className="text-blue-400 hover:underline">
            კონფიდენციალობის პოლიტიკაზე
          </a>
        </p>
      </motion.form>
    </div>
  );
};

export default ContactForm;