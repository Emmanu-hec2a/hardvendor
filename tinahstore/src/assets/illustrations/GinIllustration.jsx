export default function GinIllustration({ color = 'currentColor', detailed = false }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Rounder Gin Bottle */}
      <path d="M75 176 Q125 186 125 176 V90 C125 70 115 65 108 45 V30 H92 V45 C85 65 75 70 75 90 Z" />
      {/* Liquid texture */}
      {detailed && <path d="M78 140 Q100 145 122 140" strokeOpacity="0.4" />}
      {detailed && <circle cx="100" cy="110" r="15" stroke="#AD8A52" strokeWidth="1" strokeDasharray="3 3" />}
      {detailed && <text x="94" y="114" fill="#AD8A52" fontSize="10" stroke="none" fontWeight="bold">G</text>}
    </svg>
  );
}
