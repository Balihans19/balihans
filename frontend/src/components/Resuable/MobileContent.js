import React from 'react';

/**
 * Mobile navigation content configuration
 * Defines the complete navigation structure for mobile view including main sections and their subsections
 * Each main section can have multiple subsections with optional links
 */

export const mobileContent = [
  // About Us Section 
  {
    name: 'ABOUT US',
    link: '/about-us',
    mobileContent: [
      {
        name: 'Corporate Overview',
        link: '/corporate-overview',
      },
      {
        name: 'Leadership',
        link: '/leadership',
      },
      {
        name: 'Our Brand',
        link: '/',
      },
      {
        name: 'Corporate Sustainability',
        link: '/sustainability',
      },
      {
        name: 'Diversity, Equity, and Inclusion',
        link: '/diversity',
      },
      {
        name: 'Recognition ',
        link: '/',
      },
      {
        name: 'Customer Speak',
        link: '/customer-speak',
      },
    ]
  },

  // What We Do Section 
  {
    name: 'WHAT WE DO',
    link: '/capabilities',
    mobileContent: [
      // Services 
      { name: 'Our Services' },
      {
        name: 'Strategy & Consulting',
        link: '/strategy-and-consulting',
      },
      {
        name: 'Artificial Intelligence',
        link: '/ai',
      },
      {
        name: 'Cloud & Infrastructure',
        link: '/cloud-and-infrastructure',
      },
   
      { name: 'Network Solutions' },
      {
        name: 'Cybersecurity',
        link: '/cybersecurity',
      },
      {
        name: 'Data & Analytics',
        link: '/data-and-analytics',
      },
      
      { name: 'Web3 Solutions',
        link: '/web3-solutions',
       },
      { name: 'Sustainability Services' },
      // Spacer
      { name: '' },
   
      { name: 'In Focus' },
      { name: 'Balihans Research' },
      { name: 'Balihans Innovation' },
    ]
  },

  // Industries Section
  {
    name: 'INDUSTRIES',
    link: '/industries',
    mobileContent: [
      {
        name: 'Banking & Financial Services',
        link: '/bsfi',
      },
      {
        name: 'Communications & Information Services ',
        link: '/communications',
      },
      {
        name: 'Energy, Resources & Utilities ',
        link: '/energy',
      },
      {
        name: 'Healthcare & Life Sciences',
        link: '/health-care',
      },
      {
        name: 'High Tech',
        link: '/high-tech',
      },
      // Industries pending implementation
      { name: 'Hospitality' },
      { name: 'Insurance' },
      { name: 'Manufacturing' },
      { name: 'Media & Entertainment' },
      { name: 'Professional Services' },
      { name: 'Retail & Consumer Goods' },
      { name: 'Travel & Logistics' },
      { name: 'Transportation' },
    ]
  },

  // Insights Section
  {
    name: 'INSIGHTS',
    link: '/insights',
    mobileContent: [
      { name: 'Case Studies' },
      { name: 'Views' },
      { name: 'Insights' },
      { name: 'News' },
      { name: 'Events' }
    ]
  },

  // Careers Section 
  {
    name: 'CAREERS',
    link: '/careers',
    mobileContent: [
      { name: 'Why Balihans' },
      { name: 'Diversity & Inclusion' },
      { name: 'Join Us' },
    ]
  },

  // Contact Section 
  {
    name: 'CONTACT US',
    link: '/contact-us',
    content: (
      <div>
      </div>
    ),
  },
];
