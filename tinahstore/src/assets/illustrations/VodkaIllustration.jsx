export default function VodkaIllustration({ color = 'currentColor', detailed = false }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Tall Slim Vodka Bottle */}
      <path d="M82 178 H118 V75 Q118 65 110 60 V30 H90 V60 Q82 65 82 75 Z" />
      {/* Etching/Design */}
      {detailed && <line x1="90" y1="100" x2="110" y2="100" strokeOpacity="0.3" />}
      {detailed && <line x1="90" y1="110" x2="110" y2="110" strokeOpacity="0.3" />}
      {detailed && <path d="M85 140 H115" stroke="#AD8A52" strokeWidth="1.2" />}
      {detailed && <circle cx="100" cy="85" r="2" fill={color} />}
    </svg>
  );
}
