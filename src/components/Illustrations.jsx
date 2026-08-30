import React from 'react';

// Hero Illustration: Modern Computer Engineering Hub & Coding Workspace
export function HeroIllustration({ className = "", width = "100%", height = "auto" }) {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`tech-illustration ${className}`}
      style={{ width, height, maxWidth: '100%' }}
    >
      <defs>
        <linearGradient id="heroGrad1" x1="0" y1="0" x2="520" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B2A4A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="60" y1="40" x2="460" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111A2E" />
          <stop offset="100%" stopColor="#0A0F1D" />
        </linearGradient>
        <linearGradient id="accentGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="tealGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Background Soft Glow Aura */}
      <circle cx="260" cy="160" r="140" fill="url(#tealGrad2)" opacity="0.07" />
      <circle cx="380" cy="120" r="90" fill="url(#accentGlow)" opacity="0.08" />

      {/* Main Terminal / Monitor Chassis */}
      <rect x="50" y="30" width="420" height="250" rx="16" fill="url(#heroGrad1)" stroke="#1E293B" strokeWidth="2" />
      <rect x="62" y="42" width="396" height="226" rx="10" fill="url(#screenGrad)" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="1" />

      {/* Monitor Header Bar */}
      <rect x="62" y="42" width="396" height="28" rx="8" fill="#141E34" />
      <circle cx="80" cy="56" r="4" fill="#EF4444" />
      <circle cx="94" cy="56" r="4" fill="#F59E0B" />
      <circle cx="108" cy="56" r="4" fill="#10B981" />
      <rect x="180" y="50" width="160" height="12" rx="4" fill="#1E293B" />

      {/* Code Editor Windows & Architecture Diagrams */}
      {/* Left Code Column */}
      <rect x="80" y="86" width="150" height="8" rx="3" fill="#0EA5E9" opacity="0.9" />
      <rect x="95" y="104" width="110" height="6" rx="3" fill="#64748B" />
      <rect x="110" y="118" width="130" height="6" rx="3" fill="#F59E0B" opacity="0.8" />
      <rect x="95" y="132" width="85" height="6" rx="3" fill="#64748B" />
      <rect x="80" y="148" width="160" height="8" rx="3" fill="#10B981" opacity="0.8" />
      <rect x="95" y="166" width="120" height="6" rx="3" fill="#64748B" />
      <rect x="95" y="180" width="140" height="6" rx="3" fill="#0EA5E9" opacity="0.7" />
      <rect x="80" y="198" width="70" height="6" rx="3" fill="#F59E0B" opacity="0.9" />

      {/* Right Circuit / Node Graph */}
      <rect x="270" y="86" width="168" height="135" rx="8" fill="#141E34" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1" />
      
      {/* Circuit Nodes */}
      <circle cx="310" cy="120" r="10" fill="#1B2A4A" stroke="#0EA5E9" strokeWidth="2" />
      <circle cx="395" cy="120" r="10" fill="#1B2A4A" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="355" cy="180" r="12" fill="#1B2A4A" stroke="#10B981" strokeWidth="2" />

      {/* Node connecting lines */}
      <path d="M320 120H385" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M316 128L347 172" stroke="#F59E0B" strokeWidth="2" />
      <path d="M389 128L363 172" stroke="#10B981" strokeWidth="2" />

      {/* Chip inside central node */}
      <rect x="350" y="175" width="10" height="10" rx="2" fill="#F59E0B" />

      {/* Monitor Stand Base */}
      <path d="M225 280L215 315H305L295 280Z" fill="#1B2A4A" stroke="#1E293B" strokeWidth="2" />
      <rect x="180" y="315" width="160" height="10" rx="5" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />

      {/* Floating Modern Badges */}
      <g transform="translate(20, 110)">
        <rect width="105" height="34" rx="8" fill="#1B2A4A" stroke="#0EA5E9" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="5" fill="#0EA5E9" />
        <rect x="28" y="13" width="62" height="8" rx="2" fill="#E2E8F0" />
      </g>

      <g transform="translate(390, 200)">
        <rect width="110" height="34" rx="8" fill="#1B2A4A" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="18" cy="17" r="5" fill="#F59E0B" />
        <rect x="30" y="13" width="65" height="8" rx="2" fill="#E2E8F0" />
      </g>
    </svg>
  );
}

// Empty State Illustration (Search / Favorites / Notes)
export function EmptyStateIllustration({ width = 180, height = 140, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="100" cy="80" r="60" fill="rgba(14, 165, 233, 0.06)" />
      <rect x="55" y="35" width="90" height="90" rx="14" fill="#1B2A4A" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" />
      <path d="M75 60H125" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 75H110" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 90H118" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
      <circle cx="135" cy="115" r="20" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
      <path d="M128 115L133 120L143 110" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
