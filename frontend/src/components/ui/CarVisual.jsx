export default function CarVisual({ gradient, accentColor, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${className}`}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${accentColor}40 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 80" className="w-3/4 h-auto opacity-90" fill="none">
          <ellipse cx="100" cy="65" rx="80" ry="8" fill="rgba(0,0,0,0.4)" />
          <path
            d="M30 50 Q35 35 55 32 L80 28 Q100 25 120 28 L145 32 Q165 35 170 50 L175 55 Q175 58 170 58 L30 58 Q25 58 25 55 Z"
            fill={`${accentColor}cc`}
          />
          <path
            d="M55 32 L75 28 Q95 26 105 28 L125 32"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            fill="none"
          />
          <rect x="70" y="32" width="25" height="18" rx="3" fill="rgba(255,255,255,0.15)" />
          <rect x="105" y="32" width="25" height="18" rx="3" fill="rgba(255,255,255,0.15)" />
          <circle cx="55" cy="58" r="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="55" cy="58" r="6" fill="#333" />
          <circle cx="145" cy="58" r="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle cx="145" cy="58" r="6" fill="#333" />
          <circle cx="170" cy="45" r="4" fill={`${accentColor}`} opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="absolute top-4 left-4 w-20 h-20 rounded-full blur-3xl opacity-40" style={{ background: accentColor }} />
    </div>
  );
}
