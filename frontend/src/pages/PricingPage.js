import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, Users, Building2, Radar } from 'lucide-react';
import Navbar from '../components/Navbar';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'Perfect for trying out LeadRadar',
    features: [
      '10 leads per day',
      'Basic search filters',
      'Copy phone numbers',
      'WhatsApp integration'
    ],
    cta: 'Get Started',
    highlighted: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '9',
    period: 'per month',
    description: 'For serious lead generators',
    features: [
      'Unlimited leads',
      'Export to CSV, PDF, Excel',
      'Advanced filters',
      'Email support',
      'Search history',
      'Priority API access'
    ],
    cta: 'Start Pro Trial',
    highlighted: true
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '29',
    period: 'per month',
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Team access (5 users)',
      'Bulk export',
      'API access',
      'White-label reports',
      'Dedicated support',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FF8B5B] flex items-center justify-center shadow-lg shadow-primary/30">
              <Radar className="w-9 h-9 text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Choose the plan that fits your needs. All plans include access to our premium lead finder.
          </motion.p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              data-testid={`pricing-${plan.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative glass-card p-8 ${
                plan.highlighted 
                  ? 'border-primary/50 shadow-lg shadow-primary/20' 
                  : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-[#FF8B5B] text-white text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Plan icon */}
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${
                plan.highlighted ? 'bg-primary/20' : 'bg-white/5'
              }`}>
                {plan.id === 'free' && <Zap className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-white/60'}`} />}
                {plan.id === 'pro' && <Users className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-white/60'}`} />}
                {plan.id === 'agency' && <Building2 className={`w-6 h-6 ${plan.highlighted ? 'text-primary' : 'text-white/60'}`} />}
              </div>
              
              {/* Plan name & price */}
              <h3 className="font-heading font-bold text-2xl text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-heading font-bold text-white">${plan.price}</span>
                <span className="text-white/40">/{plan.period}</span>
              </div>
              <p className="text-white/50 text-sm mb-6">{plan.description}</p>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted ? 'bg-primary/20' : 'bg-white/5'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary' : 'text-white/60'}`} />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <Link
                to={plan.id === 'free' ? '/login' : '#'}
                className={`block w-full py-3 rounded-xl text-center font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-primary to-[#FF8B5B] text-white hover:shadow-lg hover:shadow-primary/30'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ or additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            All prices in USD. Cancel anytime. No hidden fees.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default PricingPage;
