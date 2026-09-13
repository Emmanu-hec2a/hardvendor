export default function WhiskeyIllustration({ color = 'currentColor', detailed = false }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Square Whiskey Bottle */}
      <path d="M65 176 H135 V95 L125 75 V32 H75 V75 L65 95 Z" />
      {/* Cap */}
      <path d="M75 32 H125 V26 H75 Z" fill={detailed ? color : 'none'} />
      {/* Label */}
      {detailed && <rect x="72" y="110" width="56" height="42" stroke="#AD8A52" strokeWidth="1.2" />}
      {detailed && <line x1="72" y1="130" x2="128" y2="130" stroke="#AD8A52" strokeWidth="0.8" strokeDasharray="2 3" />}
      {detailed && <circle cx="100" cy="85" r="3" fill="#AD8A52" stroke="none" />}
    </svg>
  );
}
