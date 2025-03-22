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
        link: '/',
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
   
      { name: 'In Focus',
        link: '/infocus',
       },
      { name: 'Balihans Innovation',
        link: '/what-we-do',
       },
    ]
  },

  // Industries Section
  {
    name: 'INDUSTRIES',
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
      { name: 'Media & Entertainment',
        link: '/media-and-entertainment',
       },
      { name: 'Professional Services',
        link: '/professional-services',
       },
      { name: 'Retail & Consumer Goods',
        link: '/retail-and-consumer-goods',
       },
      { name: 'Travel & Logistics',
        link: '/travel-and-logistics',
       },
     
    ]
  },

  // Insights Section
  {
    name: 'INSIGHTS',
    mobileContent: [
      { name: 'Case Studies',
        link: '/case-studies',
       },
       { name: 'Balihans Innovation',
        link: '/what-we-do',
       },
      { name: 'Insights',
        link: '/infocus',
       },
      {
        name: 'Customer Speak',
        link: '/customer-speak',
      },
      {
        name: 'Blogs',
        link: '/blogs',
      },
    ]
  },

  // Careers Section 
  {
    name: 'CAREERS',
    mobileContent: [
      { name: 'Why Balihans',
        link: '/about-us',
       },
      { name: 'Diversity & Inclusion',
        link: '/diversity-equity-and-inclusion',
       },
      { name: 'Join Us',
        link: '/join-us',
       },
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
