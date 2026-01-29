
import React from 'react';
import { PricingPlan, Testimonial, Milestone } from './types';

export const CALCULATOR_CATEGORIES = [
  { id: 'SIP', title: 'SIP Calculator', desc: 'Systematic Investment Plan growth projections.', icon: '📈' },
  { id: 'FD', title: 'FD Calculator', desc: 'Fixed Deposit maturity and interest calculator.', icon: '🏦' },
  { id: 'MUTUAL_FUND', title: 'Mutual Fund Returns', desc: 'Lumpsum mutual fund growth analysis.', icon: '💰' },
  { id: 'RETIREMENT', title: 'Retirement Planner', desc: 'Plan for your golden years with inflation.', icon: '🏝️' },
  { id: 'INFLATION', title: 'Inflation Calculator', desc: 'See how inflation affects your purchasing power.', icon: '🎈' },
  { id: 'COMPOUND_INTEREST', title: 'Compound Interest', desc: 'The 8th wonder of the world at your fingertips.', icon: '⏳' },
  { id: 'NET_WORTH', title: 'Net Worth Tracker', desc: 'Understand your total financial position.', icon: '💎' },
  { id: 'EMERGENCY_FUND', title: 'Emergency Fund', desc: 'Calculate the buffer you need for rainy days.', icon: '🛡️' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Financial Analyst',
    content: 'WealthAI turned my retirement planning from a headache into a clear, actionable roadmap. The AI explanations are spot on.',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    name: 'Michael Chen',
    role: 'Tech Entrepreneur',
    content: 'The most user-friendly compound interest tool I have ever used. Being able to see the visual growth is incredibly motivating.',
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    name: 'Elena Rodriguez',
    role: 'New Investor',
    content: 'As a beginner, the AI advisor feature helped me understand why compound interest matters so much. High-quality stuff!',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$0',
    features: [
      'Access to all calculators',
      '5 Free AI Strategy Credits',
      'Standard data visualization',
      'Community support'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '$12',
    stripeLink: 'https://buy.stripe.com/test_dRm4gzcE3g1UeQ08gS6sw03',
    features: [
      'Everything in Starter',
      '50 AI Strategy Credits / Mo',
      'Portfolio tracking & exports',
      'Advanced risk analysis',
      'Priority email support'
    ],
    cta: 'Go Pro',
    highlighted: true
  },
  {
    name: 'Elite Plan',
    price: '$20',
    stripeLink: 'https://buy.stripe.com/test_28E8wP6fF7vodLW68K6sw04',
    features: [
      'Everything in Pro',
      'Unlimited Strategy Credits',
      'Institutional Grade AI model',
      'Personal wealth dashboard',
      'Advanced tax optimization'
    ],
    cta: 'Get Elite'
  }
];

export const MILESTONES: Milestone[] = [
  { label: 'Calculations Made', value: '1.2M+' },
  { label: 'Happy Users', value: '450K+' },
  { label: 'Assets Tracked', value: '$8.5B' },
  { label: 'Countries', value: '45+' }
];
