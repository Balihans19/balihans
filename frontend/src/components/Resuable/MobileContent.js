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
        link: '/corporate-sustainability',
      },
      {
        name: 'Diversity, Equity, and Inclusion',
        link: '/diversity-equity-and-inclusion',
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
        link: '/artificial-intelligence',
      },
      {
        name: 'Cloud & Infrastructure',
        link: '/cloud-and-infrastructure',
      },
   
      { name: 'Internet of Things (IoT)',
        link: '/internet-of-things',
       },
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
      { name: 'Testing Services',
        link: '/testing-services',
       },
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
        link: '/banking-and-financial-services',
      },
      {
        name: 'Communications & Information Services ',
        link: '/communications-and-information-services',
      },
      {
        name: 'Energy, Resources & Utilities ',
        link: '/energy-resources-and-utilities',
      },
      {
        name: 'Healthcare & Life Sciences',
        link: '/healthcare-and-life-sciences',
      },
      {
        name: 'High Tech',
        link: '/high-tech',
      },
      
      { name: 'Hospitality',
        link: '/hospitality',
       },
      { name: 'Insurance',
        link: '/insurance',
       },
      { name: 'Manufacturing',
        link: '/manufacturing',
       },
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
