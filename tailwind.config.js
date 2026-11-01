/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // User's custom warm academic palette:
        saddle: {
          DEFAULT: '#8B4513', // Saddle Brown (Primary accent)
          hover: '#73380F',
          light: '#A0522D',
          subtle: 'rgba(139, 69, 19, 0.12)',
        },
        olive: {
          DEFAULT: '#C2B280', // Olive Khaki (Secondary tone)
          dark: '#A39360',
          subtle: 'rgba(194, 178, 128, 0.25)',
        },
        beige: {
          DEFAULT: '#F5F5DC', // Warm Beige (Main background)
          dark: '#EAE6CB',
          light: '#FAF9EE',
        },
        sand: {
          DEFAULT: '#E0CDA9', // Sand (Soft highlight)
          dark: '#C8B289',
          subtle: 'rgba(224, 205, 169, 0.35)',
        },
        coffee: {
          DEFAULT: '#2C1810', // Deep Coffee (Headings & text)
          light: '#4A3324',
          muted: '#7A6652',
        },
        // Base surfaces
        surface: '#FFFFFF', // Pure White card surface
        surface2: '#FAF8F2', // Soft warm off-white container
        edge: '#E5D8C0', // Subtle warm border
        edge2: '#C2B280', // Olive Khaki border
        edgeDark: '#8B4513', // Saddle Brown border
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(74, 51, 36, 0.08)',
        warm: '0 4px 24px rgba(139, 69, 19, 0.15)',
        glow: '0 0 20px rgba(139, 69, 19, 0.35)',
        'glow-olive': '0 0 16px rgba(194, 178, 128, 0.45)',
        'glow-sand': '0 0 16px rgba(224, 205, 169, 0.5)',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flutter: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(0.8) scaleX(1.05)' },
        },
        auraPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        floatParticle: {
          '0%': { opacity: '0', transform: 'translateY(0) translateX(0)' },
          '40%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-20px) translateX(6px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.6) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(90deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.5', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.2)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        bob: 'bob 3.5s ease-in-out infinite',
        flutter: 'flutter 2.5s ease-in-out infinite',
        auraPulse: 'auraPulse 3s ease-in-out infinite',
        floatParticle: 'floatParticle 2.2s ease-in-out infinite',
        sparkle: 'sparkle 2.5s ease-in-out infinite',
        flicker: 'flicker 1.8s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideInRight: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scaleUp: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
