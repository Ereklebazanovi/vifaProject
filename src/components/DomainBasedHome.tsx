import React from 'react';
import NewHomeVifa from '../pages/NewHomeVifa';
// import NewHomeInvento from '../pages/NewHomeInvento';

const DomainBasedHome: React.FC = () => {
  // // Get current hostname
  // const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  // // Invento domain logic — disabled, site is now vifadigital.ge only
  // const isInventoDomain = hostname.includes('inventogeo.com') || hostname.includes('inventogeo');
  // if (isInventoDomain) {
  //   return <NewHomeInvento />;
  // }

  return <NewHomeVifa />;
};

export default DomainBasedHome;