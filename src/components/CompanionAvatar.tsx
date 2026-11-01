import React from 'react';
import { CompanionId } from '../types';

interface AvatarProps {
  id: CompanionId;
  glow: string;
  size?: number;
  floating?: boolean;
}

export const CompanionAvatar: React.FC<AvatarProps> = ({
  id,
  glow,
  size = 160,
  floating = true,
}) => {
  return (
    <div
      className={floating ? 'animate-bob' : ''}
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 18px ${glow}88)`,
      }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {id === 'sylphie' && <Sylphie glow={glow} />}
        {id === 'aiko' && <Aiko glow={glow} />}
        {id === 'kaelen' && <Kaelen glow={glow} />}
        {id === 'ignis' && <Ignis glow={glow} />}
        {id === 'nova' && <Nova glow={glow} />}
      </svg>
    </div>
  );
};

function AuraRing({ glow }: { glow: string }) {
  return (
    <>
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke={glow}
        strokeWidth="1.2"
        opacity="0.4"
        className="animate-auraPulse"
      />
      <circle cx="100" cy="100" r="64" fill="none" stroke={glow} strokeWidth="0.8" opacity="0.25" />
    </>
  );
}

// Sylphie: wind elf girl, emerald wings + leaf particles
function Sylphie({ glow }: { glow: string }) {
  return (
    <g>
      <AuraRing glow={glow} />
      <g className="animate-flutter" style={{ transformOrigin: '100px 90px' }}>
        <path
          d="M100 92 C70 70 45 72 38 92 C50 88 64 92 76 104 C70 96 60 92 52 98 C66 100 80 108 88 116 C84 108 78 102 82 100 Z"
          fill={glow}
          opacity="0.7"
        />
        <path
          d="M100 92 C130 70 155 72 162 92 C150 88 136 92 124 104 C130 96 140 92 148 98 C134 100 120 108 112 116 C116 108 122 102 118 100 Z"
          fill={glow}
          opacity="0.7"
        />
      </g>
      <g opacity="0.85">
        <ellipse cx="48" cy="58" rx="4" ry="2" fill={glow} transform="rotate(30 48 58)" className="animate-floatParticle" />
        <ellipse cx="152" cy="64" rx="4" ry="2" fill={glow} transform="rotate(-20 152 64)" className="animate-floatParticle" style={{ animationDelay: '0.6s' }} />
        <ellipse cx="60" cy="150" rx="4" ry="2" fill={glow} transform="rotate(60 60 150)" className="animate-floatParticle" style={{ animationDelay: '1.1s' }} />
        <ellipse cx="140" cy="148" rx="4" ry="2" fill={glow} transform="rotate(-50 140 148)" className="animate-floatParticle" style={{ animationDelay: '1.6s' }} />
      </g>
      <ellipse cx="100" cy="120" rx="22" ry="34" fill="#2a3340" />
      <path d="M84 116 Q100 100 116 116 L114 140 Q100 150 86 140 Z" fill="#e8d7c0" />
      <path d="M78 86 Q100 64 122 86 Q120 74 100 70 Q80 74 78 86 Z" fill={glow} />
      <path d="M82 86 Q84 100 80 110 L78 96 Z" fill={glow} opacity="0.8" />
      <path d="M118 86 Q116 100 120 110 L122 96 Z" fill={glow} opacity="0.8" />
      <path d="M78 92 L70 84 L80 90 Z" fill="#e8d7c0" />
      <path d="M122 92 L130 84 L120 90 Z" fill="#e8d7c0" />
      <circle cx="91" cy="96" r="2.6" fill="#1a2030" />
      <circle cx="109" cy="96" r="2.6" fill="#1a2030" />
      <path d="M95 104 Q100 108 105 104" fill="none" stroke="#b5736a" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

// Aiko: cyber-anime girl, neon twin-tails
function Aiko({ glow }: { glow: string }) {
  return (
    <g>
      <AuraRing glow={glow} />
      <path d="M74 92 Q56 104 52 130 Q56 128 62 118 Q66 110 70 100 Z" fill={glow} opacity="0.85" />
      <path d="M126 92 Q144 104 148 130 Q144 128 138 118 Q134 110 130 100 Z" fill={glow} opacity="0.85" />
      <path d="M76 84 Q100 58 124 84 Q122 70 100 64 Q78 70 76 84 Z" fill={glow} />
      <path d="M82 84 Q86 100 82 112 L80 96 Z" fill={glow} opacity="0.8" />
      <path d="M118 84 Q114 100 118 112 L120 96 Z" fill={glow} opacity="0.8" />
      <ellipse cx="100" cy="122" rx="22" ry="32" fill="#2a2236" />
      <path d="M84 116 Q100 102 116 116 L114 138 Q100 148 86 138 Z" fill="#f5e6d8" />
      <ellipse cx="91" cy="97" rx="3.4" ry="4.4" fill={glow} />
      <ellipse cx="109" cy="97" rx="3.4" ry="4.4" fill={glow} />
      <circle cx="91" cy="96" r="1.4" fill="#fff" />
      <circle cx="109" cy="96" r="1.4" fill="#fff" />
      <path d="M94 106 Q100 110 106 106" fill="none" stroke="#c4708a" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="86" cy="104" r="3" fill={glow} opacity="0.25" />
      <circle cx="114" cy="104" r="3" fill={glow} opacity="0.25" />
      <path d="M80 88 L120 88" stroke={glow} strokeWidth="1" opacity="0.6" className="animate-auraPulse" />
    </g>
  );
}

// Kaelen: shadow warrior, blue lightning
function Kaelen({ glow }: { glow: string }) {
  return (
    <g>
      <AuraRing glow={glow} />
      <g opacity="0.9" className="animate-auraPulse">
        <path d="M44 80 L52 70 L48 84 L58 74 L54 90" fill="none" stroke={glow} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M156 80 L148 70 L152 84 L142 74 L146 90" fill="none" stroke={glow} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M74 86 L70 64 L82 78 L86 58 L94 78 L100 56 L106 78 L114 58 L118 78 L130 64 L126 86 Q100 62 74 86 Z" fill="#1a1f2e" stroke={glow} strokeWidth="1.2" />
      <path d="M84 116 Q100 100 116 116 L120 150 Q100 160 80 150 Z" fill="#15192a" stroke={glow} strokeWidth="1" />
      <path d="M100 116 L100 156" stroke={glow} strokeWidth="1" opacity="0.6" />
      <path d="M84 110 Q100 98 116 110 L114 128 Q100 134 86 128 Z" fill="#e8dccd" />
      <path d="M86 112 L96 116 L86 118 Z" fill={glow} />
      <path d="M114 112 L104 116 L114 118 Z" fill={glow} />
      <path d="M94 126 Q100 128 106 126" fill="none" stroke="#7a8290" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

// Ignis: astral dragon, crimson flame
function Ignis({ glow }: { glow: string }) {
  return (
    <g>
      <AuraRing glow={glow} />
      <g className="animate-flutter" style={{ transformOrigin: '100px 95px' }}>
        <path d="M100 96 C70 78 48 82 36 100 C52 96 66 100 78 110 C66 102 56 104 50 112 C64 112 78 118 86 124 Z" fill="#3a1a1a" stroke={glow} strokeWidth="1.2" />
        <path d="M100 96 C130 78 152 82 164 100 C148 96 134 100 122 110 C134 102 144 104 150 112 C136 112 122 118 114 124 Z" fill="#3a1a1a" stroke={glow} strokeWidth="1.2" />
      </g>
      <g opacity="0.9">
        <path d="M52 70 Q54 62 50 58 Q58 62 56 72 Z" fill={glow} className="animate-flicker" />
        <path d="M148 70 Q146 62 150 58 Q142 62 144 72 Z" fill={glow} className="animate-flicker" style={{ animationDelay: '0.4s' }} />
      </g>
      <path d="M100 150 C78 150 70 130 78 112 C84 98 92 92 100 90 C108 92 116 98 122 112 C130 130 122 150 100 150 Z" fill="#2a1212" stroke={glow} strokeWidth="1.4" />
      <path d="M88 90 L84 78 L92 86 Z" fill={glow} />
      <path d="M112 90 L116 78 L108 86 Z" fill={glow} />
      <ellipse cx="91" cy="110" rx="3.2" ry="2" fill={glow} />
      <ellipse cx="109" cy="110" rx="3.2" ry="2" fill={glow} />
    </g>
  );
}

// Nova: radiant golden fairy
function Nova({ glow }: { glow: string }) {
  return (
    <g>
      <AuraRing glow={glow} />
      <g className="animate-flutter" style={{ transformOrigin: '100px 92px' }}>
        <path d="M100 94 C72 74 50 80 44 100 C58 94 70 98 80 106 C68 98 58 100 54 108 C68 106 80 112 88 118 Z" fill={glow} opacity="0.55" />
        <path d="M100 94 C128 74 150 80 156 100 C142 94 130 98 120 106 C132 98 142 100 146 108 C132 106 120 112 112 118 Z" fill={glow} opacity="0.55" />
      </g>
      <g opacity="0.95">
        {[[50, 60], [150, 66], [100, 40], [44, 110], [156, 110]].map(([x, y], i) => (
          <g key={i} className="animate-sparkle" style={{ animationDelay: `${i * 0.25}s`, transformOrigin: `${x}px ${y}px` }}>
            <path d={`M${x} ${y - 3} L${x + 1} ${y - 1} L${x + 3} ${y} L${x + 1} ${y + 1} L${x} ${y + 3} L${x - 1} ${y + 1} L${x - 3} ${y} L${x - 1} ${y - 1} Z`} fill={glow} />
          </g>
        ))}
      </g>
      <ellipse cx="100" cy="124" rx="20" ry="30" fill="#3a2e18" />
      <path d="M86 118 Q100 104 114 118 L112 138 Q100 146 88 138 Z" fill="#f7e6c8" />
      <path d="M80 88 Q100 66 120 88 Q118 74 100 68 Q82 74 80 88 Z" fill={glow} />
      <circle cx="92" cy="98" r="2.4" fill="#1a2030" />
      <circle cx="108" cy="98" r="2.4" fill="#1a2030" />
      <path d="M95 106 Q100 109 105 106" fill="none" stroke="#c4826a" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}
