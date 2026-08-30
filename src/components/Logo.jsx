import React from 'react';

export default function Logo({ size = 38, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ce-custom-logo ${className}`}
      aria-label="Computer Engineering IUG Logo"
    >
      <defs>
        <linearGradient id="chipGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B2A4A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="amberGrad" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="tealGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Chip Frame */}
      <rect x="6" y="6" width="36" height="36" rx="9" fill="url(#chipGrad)" stroke="url(#tealGrad)" strokeWidth="1.5" />

      {/* Chip Pins / Contact Traces */}
      {/* Top Pins */}
      <line x1="16" y1="2" x2="16" y2="6" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="2" x2="24" y2="6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="2" x2="32" y2="6" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />

      {/* Bottom Pins */}
      <line x1="16" y1="42" x2="16" y2="46" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="42" x2="24" y2="46" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="42" x2="32" y2="46" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />

      {/* Left Pins */}
      <line x1="2" y1="16" x2="6" y2="16" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="24" x2="6" y2="24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="32" x2="6" y2="32" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />

      {/* Right Pins */}
      <line x1="42" y1="16" x2="46" y2="16" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="24" x2="46" y2="24" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="32" x2="46" y2="32" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />

      {/* Inner Circuit Microprocessor Core */}
      <rect x="15" y="15" width="18" height="18" rx="4" fill="#0A0F1D" stroke="url(#amberGrad)" strokeWidth="1.5" />

      {/* Central Node & Interconnected Circuit Tracks */}
      <circle cx="24" cy="24" r="3.5" fill="url(#amberGrad)" filter="url(#amberGlow)" />
      
      {/* Corner Geometric Nodes */}
      <circle cx="11" cy="11" r="1.5" fill="#0EA5E9" />
      <circle cx="37" cy="11" r="1.5" fill="#F59E0B" />
      <circle cx="11" cy="37" r="1.5" fill="#F59E0B" />
      <circle cx="37" cy="37" r="1.5" fill="#0EA5E9" />

      {/* Internal Track Paths */}
      <path d="M19 19L22 22" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 19L26 22" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 29L22 26" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 29L26 26" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
