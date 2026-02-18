import React from 'react';
import NewHomeVifa from '../pages/NewHomeVifa';
import NewHomeInvento from '../pages/NewHomeInvento';

const DomainBasedHome: React.FC = () => {
  // Get current hostname
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  // Check if it's VIFA domain
  const isVifaDomain = hostname.includes('vifadigital.ge') || hostname.includes('vifadigital');


  // Return appropriate component based on domain
  if (isVifaDomain) {
    return <NewHomeVifa />;
  }

  // Default to Invento (for inventogeo.com and localhost)
  return <NewHomeInvento />;
};

export default DomainBasedHome;