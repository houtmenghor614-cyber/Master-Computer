import React, { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const message = `📞 *New Contact Message*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Phone:* ${formData.phone}\n\n` +
            `*Message:*\n${formData.message}`;

        const telegramUrl = `https://t.me/hortmenghor?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
        toast.success('Opening Telegram to send your message');

        setFormData({ name: '', email: '', phone: '', message: '' });
        setLoading(false);
    };

    const contactInfo = [
        { icon: FiMail, title: 'Email', value: 'info@mastercomputer.com', link: 'mailto:info@mastercomputer.com' },
        { icon: FiPhone, title: 'Phone', value: '+1 234 567 8900', link: 'tel:+12345678900' },
        { icon: FiMessageCircle, title: 'Telegram', value: '@hortmenghor', link: 'https://t.me/hortmenghor' },
        { icon: FiMapPin, title: 'Address', value: '123 Computer Street, Tech City', link: null },
        { icon: FiClock, title: 'Business Hours', value: 'Mon-Fri: 9AM - 6PM', link: null },
    ];

    return (
        <div className="container-custom py-8 animate-slideUp">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
                    Contact Us
                </h1>
                <p className="text-dark-textMuted max-w-2xl mx-auto">
                    Have questions about our products? Want to place an order? Contact us through any of these channels.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Information */}
                <div className="lg:col-span-1">
                    <div className="bg-dark-card rounded-2xl shadow-xl p-6 sticky top-20 border border-gray-800">
                        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start space-x-3 group">
                                    <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                                        <info.icon className="text-primary-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{info.title}</p>
                                        {info.link ? (
                                            <a href={info.link} className="text-gray-300 hover:text-primary-400 transition-colors">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-gray-300">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Contact Button */}
                        <div className="mt-6 pt-6 border-t border-gray-800">
                            <a
                                href="https://t.me/hortmenghor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <FiSend size={18} />
                                <span>Chat on Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-800">
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-none"
                                    placeholder="Tell us about what product you're interested in..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSend size={18} />
                                <span>{loading ? 'Sending...' : 'Send Message on Telegram'}</span>
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting, you'll be redirected to Telegram to send your message directly to our sales team.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="mt-12">
                <div className="bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-gray-800">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Visit Our Store</h2>
                        <div className="h-64 bg-dark-bg rounded-lg flex items-center justify-center border border-gray-700">
                            <div className="text-center">
                                <FiMapPin className="w-12 h-12 text-primary-400 mx-auto mb-3" />
                                <p className="text-gray-400">123 Computer Street, Tech City</p>
                                <p className="text-gray-500 text-sm mt-2">📍 Come visit our physical store</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;