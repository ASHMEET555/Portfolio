'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [glitchText, setGlitchText] = useState('CONTACT');

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const triggerGlitch = () => {
    const original = 'CONTACT';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setGlitchText(prev => 
        prev.split('').map((char, index) => {
          if (index < iterations) {
            return original[index];
          }
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }).join('')
      );
      
      if (iterations >= original.length) {
        clearInterval(interval);
        setGlitchText(original);
      }
      iterations += 1 / 3;
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socialNodes = [
    { title: "EMAIL", icon: "📧", href: "mailto:sandhuashmeet40@gmail.com", value: "sandhuashmeet40@gmail.com" },
    { title: "PHONE", icon: "📱", href: "tel:+917357124419", value: "+91 7357124419" },
    { title: "LINKEDIN", icon: "💼", href: "https://www.linkedin.com/in/ashmeet-sandhu-79a209324/" },
    { title: "GITHUB", icon: "💻", href: "https://github.com/ASHMEET555" },
    { title: "CODEFORCES", icon: "🏁", href: "https://codeforces.com/profile/sandhuashmeet40" },
    { title: "CODECHEF", icon: "🍜", href: "https://www.codechef.com/users/ashmeet555" },
    { title: "LEETCODE", icon: "🧩", href: "https://leetcode.com/ashmeet555" },
    { title: "X", icon: "🐦", href: "https://x.com/AshmeetSandhu_" }
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 matrix-bg opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl text-cyberpunk-text text-glow-red mb-6 cursor-pointer"
            onClick={triggerGlitch}
            whileHover={{ scale: 1.05 }}
          >
            &lt;{glitchText}/&gt;
          </motion.h2>
          <p className="text-xl text-cyberpunk-text-dim max-w-3xl mx-auto">
            Initiate connection protocol. Ready to collaborate on the next breakthrough.
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyberpunk-red to-transparent mx-auto mt-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl text-cyberpunk-red tracking-wider mb-8">
                CONNECTION_PROTOCOLS
              </h3>
              <p className="text-cyberpunk-text-dim leading-relaxed mb-12">
                Whether you're looking to push the boundaries of AI, create immersive digital experiences, 
                or solve complex technological challenges, I'm ready to collaborate. Let's build the future together.
              </p>
            </div>

            {/* Contact nodes */}
            <div className="grid grid-cols-2 gap-3">
              {socialNodes.map((node, index) => (
                <motion.a
                  key={node.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.06 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={node.href}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = node.href;
                  }}
                  className="h-14 flex items-center justify-center gap-2 border border-cyberpunk-red/40 bg-cyberpunk-gray/15 text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-all duration-200 tracking-wider text-sm cursor-pointer"
                >
                  <span>{node.icon}</span>
                  <span>{node.title}</span>
                  {node.value && <span className="hidden md:inline text-xs opacity-85">{node.value}</span>}
                </motion.a>
              ))}
            </div>

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 border border-cyberpunk-red/30 bg-cyberpunk-red/5"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                />
                <span className="text-cyberpunk-red tracking-wider">STATUS: AVAILABLE</span>
              </div>
              <p className="text-sm text-cyberpunk-text-dim">
                Currently accepting new projects and collaborations. 
                Response time: &lt; 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl text-cyberpunk-red tracking-wider mb-8">
                TRANSMISSION_FORM
              </h3>

              {/* Name field */}
              <div className="relative">
                <label className="block text-sm text-cyberpunk-text-dim tracking-wider mb-2">
                  IDENTIFIER
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-cyberpunk-gray/20 border border-cyberpunk-red/30 text-cyberpunk-text placeholder-cyberpunk-text-dim focus:border-cyberpunk-red focus:outline-none transition-colors duration-300"
                  placeholder="Enter your designation..."
                />
                <div className="absolute inset-0 hologram opacity-0 focus-within:opacity-20 pointer-events-none transition-opacity duration-300"></div>
              </div>

              {/* Email field */}
              <div className="relative">
                <label className="block text-sm text-cyberpunk-text-dim tracking-wider mb-2">
                  COMMUNICATION_ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-cyberpunk-gray/20 border border-cyberpunk-red/30 text-cyberpunk-text placeholder-cyberpunk-text-dim focus:border-cyberpunk-red focus:outline-none transition-colors duration-300"
                  placeholder="your.neural.link@domain.com"
                />
                <div className="absolute inset-0 hologram opacity-0 focus-within:opacity-20 pointer-events-none transition-opacity duration-300"></div>
              </div>

              {/* Subject field */}
              <div className="relative">
                <label className="block text-sm text-cyberpunk-text-dim tracking-wider mb-2">
                  TRANSMISSION_SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-cyberpunk-gray/20 border border-cyberpunk-red/30 text-cyberpunk-text placeholder-cyberpunk-text-dim focus:border-cyberpunk-red focus:outline-none transition-colors duration-300"
                  placeholder="Project collaboration, consultation, etc."
                />
                <div className="absolute inset-0 hologram opacity-0 focus-within:opacity-20 pointer-events-none transition-opacity duration-300"></div>
              </div>

              {/* Message field */}
              <div className="relative">
                <label className="block text-sm text-cyberpunk-text-dim tracking-wider mb-2">
                  DATA_PACKET
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full p-4 bg-cyberpunk-gray/20 border border-cyberpunk-red/30 text-cyberpunk-text placeholder-cyberpunk-text-dim focus:border-cyberpunk-red focus:outline-none resize-none transition-colors duration-300"
                  placeholder="Describe your project, ideas, or how we can collaborate..."
                />
                <div className="absolute inset-0 hologram opacity-0 focus-within:opacity-20 pointer-events-none transition-opacity duration-300"></div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 tracking-wider border-2 transition-all duration-300 relative overflow-hidden ${
                  isSubmitting
                    ? 'border-cyberpunk-red/50 text-cyberpunk-text-dim cursor-not-allowed'
                    : 'border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text'
                }`}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIATE_TRANSMISSION'}
                </span>
                {isSubmitting && (
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-red/30 to-transparent"
                  />
                )}
              </motion.button>
            </form>

            {/* Form decoration */}
            <div className="absolute -inset-4 border border-cyberpunk-red/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyberpunk-red"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyberpunk-red"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyberpunk-red"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyberpunk-red"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;