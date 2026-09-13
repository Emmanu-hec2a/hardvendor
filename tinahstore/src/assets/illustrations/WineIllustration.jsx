export default function WineIllustration({ color = 'currentColor', detailed = false }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Classic Wine Bottle Shape */}
      <path d="M78 178 H122 V100 C122 80 110 75 108 45 V28 H92 V45 C90 75 78 80 78 100 Z" />
      {/* Foil/Cork */}
      <path d="M92 28 H108 V38 H92 Z" fill={detailed ? color : 'none'} />
      {/* Label */}
      {detailed && <rect x="85" y="115" width="30" height="40" stroke="#AD8A52" strokeWidth="1" />}
      {detailed && <path d="M90 130 Q100 135 110 130" stroke="#AD8A52" strokeWidth="0.8" />}
    </svg>
  );
}
