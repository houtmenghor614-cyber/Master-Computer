import React from 'react';
import { FiAward, FiTruck, FiShield, FiUsers, FiClock, FiHeadphones, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const About = () => {
  const stats = [
    { icon: FiUsers, value: '10,000+', label: 'Happy Customers' },
    { icon: FiAward, value: '5+', label: 'Years of Excellence' },
    { icon: FiGlobe, value: '50+', label: 'Cities Served' },
    { icon: FiTrendingUp, value: '100%', label: 'Customer Satisfaction' },
  ];

  const features = [
    { icon: FiTruck, title: 'Fast Delivery', description: 'Quick shipping to your doorstep' },
    { icon: FiShield, title: 'Secure Payment', description: '100% secure transactions' },
    { icon: FiClock, title: '24/7 Support', description: 'Round-the-clock assistance' },
    { icon: FiHeadphones, title: 'Expert Advice', description: 'Technical support from pros' },
  ];

  return (
    <div className="container-custom py-8 animate-slideUp">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          About MasterComputer
        </h1>
        <p className="text-xl text-dark-textMuted max-w-3xl mx-auto">
          Your trusted partner for premium computer accessories and electronics since 2019
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4 text-primary-400">Our Mission</h2>
          <p className="text-dark-textMuted leading-relaxed">
            To provide high-quality computer accessories and electronics at competitive prices, 
            ensuring every customer gets the best value for their money. We strive to bridge the 
            gap between cutting-edge technology and affordable pricing.
          </p>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4 text-primary-400">Our Vision</h2>
          <p className="text-dark-textMuted leading-relaxed">
            To become the most trusted name in computer accessories across the region, 
            known for quality products, exceptional customer service, and innovation in 
            the e-commerce space.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 text-center transform hover:scale-105 transition-transform">
            <stat.icon className="w-12 h-12 text-primary-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-dark-textMuted text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center group hover:border-primary-500 transition-all">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-all">
                <feature.icon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-dark-textMuted text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="card p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary-400">Our Story</h2>
        <div className="space-y-4 text-dark-textMuted leading-relaxed">
          <p>
            MasterComputer was founded in 2019 with a simple goal: to make premium computer 
            accessories accessible to everyone. What started as a small online store has grown 
            into a trusted destination for tech enthusiasts and professionals alike.
          </p>
          <p>
            We carefully curate our product selection, partnering with leading manufacturers 
            to bring you the latest and greatest in computer technology. From mechanical keyboards 
            to gaming mice, from ergonomic chairs to high-performance components - we have it all.
          </p>
          <p>
            Our team is passionate about technology and customer service. We're here to help 
            you find the perfect products for your needs, whether you're a casual user, a 
            professional creator, or a competitive gamer.
          </p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <div className="card p-8 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
          <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
          <p className="text-dark-textMuted mb-6">
            Our team is ready to assist you with any inquiries
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;