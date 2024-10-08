import type { ComponentPropsWithoutRef } from 'react';

const Logo = (props: ComponentPropsWithoutRef<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" {...props}>
    <rect x="10" y="10" width="180" height="80" rx="20" ry="20" fill="#7C3AED" />
    <path d="M40,30 L60,70 L80,30" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
    <rect x="90" y="30" width="70" height="40" rx="20" ry="20" fill="none" stroke="white" strokeWidth="8" />
    <path d="M115,40 L135,50 L115,60 Z" fill="white" />
  </svg>
);

export default Logo;
