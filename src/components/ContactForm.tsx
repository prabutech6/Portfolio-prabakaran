import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'>(
    'idle');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
      // Reset error after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };
  return (
    <motion.form
      initial={{
        opacity: 0,
        x: 20
      }}
      whileInView={{
        opacity: 1,
        x: 0
      }}
      viewport={{
        once: true
      }}
      transition={{
        duration: 0.6
      }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-surface p-8 rounded-2xl border border-white/5">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="John Doe" />
          
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="john@example.com" />
          
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-400">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Project Inquiry" />
        
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          placeholder="Tell me about your project..." />
        
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primaryHover text-background font-semibold py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed">
        
        {status === 'loading' ?
        <>
            <Loader2 className="animate-spin" size={20} />
            <span>Sending...</span>
          </> :
        status === 'success' ?
        <>
            <CheckCircle size={20} />
            <span>Message Sent!</span>
          </> :
        status === 'error' ?
        <>
            <AlertCircle size={20} />
            <span>Error Sending</span>
          </> :

        <>
            <Send size={20} />
            <span>Send Message</span>
          </>
        }
      </button>

      {status === 'error' &&
      <p className="text-red-400 text-sm text-center mt-2">{errorMessage}</p>
      }
    </motion.form>);

}