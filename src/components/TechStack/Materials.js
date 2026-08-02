import * as THREE from "three";
import { TECH_ITEMS } from "./Constants";

// High-fidelity SVG logos matching the reference image exactly
const SVG_LOGOS = {
  React: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="8.5" fill="#61DAFB"/>
    <g stroke="#61DAFB" stroke-width="4.5" fill="none">
      <ellipse cx="50" cy="50" rx="42" ry="16"/>
      <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/>
    </g>
  </svg>`,

  "NEXT.js": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#000000"/>
    <text x="50" y="56" font-family="Arial Black, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">NEXT</text>
    <text x="73" y="70" font-family="Arial, sans-serif" font-weight="400" font-size="14" fill="#AAAAAA" text-anchor="middle">.js</text>
  </svg>`,

  "Node.js": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 8L88 29V71L50 92L12 71V29L50 8Z" fill="#339933"/>
    <path d="M50 8L88 29V71L50 92L12 71V29L50 8Z" fill="url(#nodeGrad)" opacity="0.3"/>
    <defs><linearGradient id="nodeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></linearGradient></defs>
    <text x="50" y="54" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF" text-anchor="middle">node</text>
    <text x="50" y="68" font-family="Arial, sans-serif" font-weight="normal" font-size="12" fill="#90EE90" text-anchor="middle">.js</text>
  </svg>`,

  TypeScript: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="14" fill="#3178C6"/>
    <rect x="15" y="52" width="40" height="8" rx="4" fill="#FFFFFF"/>
    <rect x="31" y="32" width="8" height="48" rx="4" fill="#FFFFFF"/>
    <text x="72" y="76" font-family="Arial, sans-serif" font-weight="bold" font-size="32" fill="#FFFFFF" text-anchor="middle">S</text>
    <rect x="55" y="32" width="34" height="8" rx="4" fill="#FFFFFF" opacity="0.9"/>
  </svg>`,

  JavaScript: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="14" fill="#F7DF1E"/>
    <text x="28" y="78" font-family="Arial Black, sans-serif" font-weight="900" font-size="52" fill="#000000" text-anchor="middle">J</text>
    <text x="72" y="78" font-family="Arial Black, sans-serif" font-weight="900" font-size="52" fill="#000000" text-anchor="middle">S</text>
  </svg>`,

  Python: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pyTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#387EB8"/>
        <stop offset="1" stop-color="#366994"/>
      </linearGradient>
      <linearGradient id="pyBot" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FFE052"/>
        <stop offset="1" stop-color="#FFC331"/>
      </linearGradient>
    </defs>
    <path d="M50 10c-12 0-22 2-22 12v8h22v3H20c-10 0-14 6-14 18s4 17 14 17h6v-10c0-8 7-14 14-14h20c8 0 14-4 14-14V22c0-8-8-12-24-12zM39 20c2.5 0 4 1.5 4 4s-1.5 4-4 4-4-1.5-4-4 1.5-4 4-4z" fill="url(#pyTop)"/>
    <path d="M50 90c12 0 22-2 22-12v-8H50v-3h30c10 0 14-6 14-18s-4-17-14-17h-6v10c0 8-7 14-14 14H40c-8 0-14 4-14 14v14c0 8 8 12 24 12zM61 80c-2.5 0-4-1.5-4-4s1.5-4 4-4 4 1.5 4 4-1.5 4-4 4z" fill="url(#pyBot)"/>
  </svg>`,

  FastAPI: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="#009688"/>
    <path d="M54 14L24 56h26l-6 30 36-44H54L54 14z" fill="#FFFFFF"/>
  </svg>`,

  Flask: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 12h16v18l22 38c4 7-1 14-7 14H27c-6 0-11-7-7-14l22-38V12z" fill="none" stroke="#1A1A1A" stroke-width="7" stroke-linejoin="round"/>
    <path d="M42 12h16v8l8 14H34l8-14V12z" fill="#1A1A1A" opacity="0.12"/>
    <circle cx="38" cy="62" r="4" fill="#4FC3F7" opacity="0.7"/>
    <circle cx="56" cy="72" r="3" fill="#4FC3F7" opacity="0.5"/>
    <text x="50" y="94" font-family="Arial, sans-serif" font-size="12" fill="#1A1A1A" text-anchor="middle" font-style="italic">Flask</text>
  </svg>`,

  django: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="8" fill="#092E20"/>
    <text x="50" y="62" font-family="Georgia, serif" font-weight="bold" font-size="30" fill="#44B78B" text-anchor="middle">django</text>
  </svg>`,

  MongoDB: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 8c-1 0-26 28-26 54 0 15 11.6 26 26 26s26-11 26-26c0-26-25-54-26-54zm3 76v-62c1.5 1.5 17 20 17 38 0 11-7 20-17 24z" fill="#13AA52"/>
    <path d="M47 84v-62c-1.5 1.5-17 20-17 38 0 11 7 20 17 24z" fill="#B8C4C2" opacity="0.4"/>
  </svg>`,

  GitHub: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M50 8C26.9 8 8 26.9 8 50c0 18.5 12 34.2 28.7 39.8 2.1.4 2.8-.9 2.8-2v-7c-11.7 2.5-14.2-5.6-14.2-5.6-1.9-4.8-4.7-6.1-4.7-6.1-3.8-2.6.3-2.5.3-2.5 4.2.3 6.4 4.3 6.4 4.3 3.7 6.4 9.8 4.5 12.2 3.5.4-2.7 1.5-4.5 2.7-5.6-9.3-1.1-19.1-4.7-19.1-20.8 0-4.6 1.6-8.3 4.3-11.3-.4-1.1-1.9-5.4.4-11.2 0 0 3.6-1.2 11.7 4.4 3.4-.9 7-.1 10.4 0 3.4-.9 7-1.4 10.4 0 8.1-5.6 11.7-4.4 11.7-4.4 2.3 5.8.8 10.1.4 11.2 2.7 3 4.3 6.7 4.3 11.3 0 16.2-9.8 19.7-19.2 20.8 1.5 1.3 2.9 3.9 2.9 7.8V90c0 1.1.7 2.4 2.9 2C80 84.2 92 68.5 92 50 92 26.9 73.1 8 50 8z" fill="#1B1F23"/>
  </svg>`,

  MySQL: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="44" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#00758F" text-anchor="middle">MySQL</text>
    <path d="M18 72c12-20 22-30 32-30s16 10 20 16c5 6 12 7 18 2l-4 14c-6 5-16 5-21-1-5-5-10-14-19-14s-16 8-20 14L18 72z" fill="#F29111"/>
    <path d="M18 72l6 5 14-16c5-7 12-12 20-12s12 5 14 9c4 6 10 10 18 6l2-5c-6 4-13 2-18-4-3-4-8-10-16-10s-16 6-22 14l-18 13z" fill="#E88100" opacity="0.6"/>
  </svg>`,

  HTML5: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8l8 78 30 9 30-9 8-78H12z" fill="#E44D26"/>
    <path d="M50 16v70l24-6.7 6.5-63.3H50z" fill="#F16529"/>
    <path d="M50 46h16l-1.6 18L50 69.5V80.5l24.5-6.8 1.7-19.5L77.8 36H50V46z" fill="#EBEBEB"/>
    <path d="M50 46H34.5l1.8 18L50 69.5V80.5l-24.5-6.8L23 36H50V46z" fill="#FFFFFF"/>
    <text x="50" y="44" font-family="Arial Black, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle">HTML</text>
    <text x="50" y="66" font-family="Arial Black, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">5</text>
  </svg>`,

  CSS3: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8l8 78 30 9 30-9 8-78H12z" fill="#1572B6"/>
    <path d="M50 16v70l24-6.7 6.5-63.3H50z" fill="#33A9DC"/>
    <path d="M50 46h16l-1.5 17L50 68.5V79.5l24-6.7 1.7-19L77.5 36H50V46z" fill="#EBEBEB"/>
    <path d="M50 46H34.2l1.8 17L50 68.5V79.5l-24-6.7L24 36H50V46z" fill="#FFFFFF"/>
    <text x="50" y="44" font-family="Arial Black, sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle">CSS</text>
    <text x="50" y="66" font-family="Arial Black, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">3</text>
  </svg>`,

  Firebase: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 78L33 8l18 34 16-30 15 66H18z" fill="#FFCA28"/>
    <path d="M18 78l33-60 16 30L18 78z" fill="#FFA000"/>
    <path d="M82 78L65 8l1 28-14 26 30 16z" fill="#F57C00"/>
    <path d="M18 78h64L65 8l-16 60z" fill="#FFC400" opacity="0.3"/>
  </svg>`,

  Vercel: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,12 92,88 8,88" fill="#000000"/>
  </svg>`,

  express: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="55" font-family="Arial, sans-serif" font-weight="300" font-size="26" fill="#000000" text-anchor="middle" letter-spacing="-1">express</text>
    <line x1="15" y1="62" x2="85" y2="62" stroke="#000000" stroke-width="1.5" opacity="0.3"/>
  </svg>`,

  Docker: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="48" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="37" y="48" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="52" y="48" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="67" y="48" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="37" y="35" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="52" y="35" width="12" height="10" rx="2" fill="#2496ED"/>
    <rect x="52" y="22" width="12" height="10" rx="2" fill="#2496ED"/>
    <path d="M10 63c5 5 16 8 28 8h24c14 0 24-3 28-8" stroke="#2496ED" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M78 55c2-2 8-2 8 4" stroke="#2496ED" stroke-width="3" fill="none"/>
    <circle cx="72" cy="42" r="3.5" fill="#2496ED"/>
    <line x1="72" y1="45" x2="72" y2="56" stroke="#2496ED" stroke-width="2"/>
  </svg>`,

  AWS: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="52" font-family="Arial, sans-serif" font-weight="bold" font-size="32" fill="#232F3E" text-anchor="middle">aws</text>
    <path d="M22 65Q50 80 78 65" stroke="#FF9900" stroke-width="7" fill="none" stroke-linecap="round"/>
    <polygon points="22,65 18,58 26,62" fill="#FF9900"/>
    <polygon points="78,65 82,58 74,62" fill="#FF9900"/>
  </svg>`,

  Figma: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="10" width="22" height="22" rx="11" fill="#F24E1E"/>
    <rect x="50" y="10" width="22" height="22" rx="11" fill="#FF7262"/>
    <rect x="28" y="32" width="22" height="22" rx="11" fill="#A259FF"/>
    <rect x="50" y="32" width="22" height="22" rx="11" fill="#1ABCFE"/>
    <rect x="28" y="54" width="22" height="22" rx="11" fill="#0ACF83"/>
  </svg>`,

  "shadcn/ui": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="22" y1="78" x2="78" y2="22" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
    <line x1="58" y1="78" x2="78" y2="58" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  </svg>`,

  Vite: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M85 12L50 88 15 12" fill="none" stroke="#BD34FE" stroke-width="15" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M53 18L35 52h18L45 82" fill="none" stroke="#FDD835" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`,

  PostgreSQL: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="30" rx="30" ry="20" fill="#336791"/>
    <rect x="20" y="30" width="60" height="40" fill="#336791"/>
    <ellipse cx="50" cy="70" rx="30" ry="20" fill="#274F7B"/>
    <ellipse cx="50" cy="30" rx="30" ry="20" fill="none" stroke="#4A8AC4" stroke-width="2"/>
    <ellipse cx="50" cy="45" rx="30" ry="20" fill="none" stroke="#4A8AC4" stroke-width="2"/>
    <text x="50" y="56" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#FFFFFF" text-anchor="middle">PG</text>
    <path d="M65 14c8 0 12 8 10 18" stroke="#AAAAAA" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  OpenAI: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 C30 10 15 25 15 45 C15 55 20 65 28 71 L28 85 L40 78 C43 79 46 80 50 80 C70 80 85 65 85 45 C85 25 70 10 50 10Z" fill="#000000"/>
    <path d="M35 42 L45 52 L55 38 L65 52 L75 42" stroke="#FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="#000000" stroke-width="4"/>
    <path fill-rule="evenodd" d="M50 12a30 30 0 0 1 28.6 21.1A18 18 0 0 1 81 66a18 18 0 0 1-16 9.7L50 88l-15-12.3A18 18 0 0 1 19 66a18 18 0 0 1 2.4-32.9A30 30 0 0 1 50 12z" fill="#000000"/>
    <path d="M35 50 Q50 35 65 50 Q50 65 35 50Z" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="50" cy="50" r="8" fill="#000000"/>
    <g opacity="0.85">
      <polygon points="50,14 58,38 84,38 63,54 71,78 50,62 29,78 37,54 16,38 42,38" fill="none" stroke="#000000" stroke-width="5" stroke-linejoin="round"/>
    </g>
  </svg>`,

  LangChain: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="16" fill="#1C3C3C"/>
    <path d="M28 65C22 65 16 59 16 50C16 41 22 35 28 35H40V44H28C24 44 22 46 22 50C22 54 24 56 28 56H40V65H28ZM72 65H60V56H72C76 56 78 54 78 50C78 46 76 44 72 44H60V35H72C78 35 84 41 84 50C84 59 78 65 72 65ZM34 56V44H66V56H34Z" fill="#00E699"/>
  </svg>`,

  "Mistral AI": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="20" width="22" height="22" rx="3" fill="#FF7000"/>
    <rect x="39" y="20" width="22" height="22" rx="3" fill="#FF7000"/>
    <rect x="63" y="20" width="22" height="22" rx="3" fill="#FF7000"/>
    <rect x="15" y="45" width="22" height="22" rx="3" fill="#FF7000"/>
    <rect x="39" y="45" width="22" height="22" rx="3" fill="#FF3D00" opacity="0.8"/>
    <rect x="63" y="45" width="22" height="22" rx="3" fill="#FF7000"/>
    <rect x="27" y="70" width="22" height="12" rx="3" fill="#FF7000"/>
    <rect x="51" y="70" width="22" height="12" rx="3" fill="#FF7000"/>
  </svg>`,

  Chroma: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="42" r="22" fill="#E91E63" opacity="0.85"/>
    <circle cx="65" cy="42" r="22" fill="#00BCD4" opacity="0.85"/>
    <circle cx="50" cy="66" r="22" fill="#FFC107" opacity="0.85"/>
    <path d="M50 26 Q65 42 50 58 Q35 42 50 26Z" fill="#FFFFFF" opacity="0.35"/>
  </svg>`,

  Linux: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="42" rx="24" ry="33" fill="#000000"/>
    <ellipse cx="50" cy="42" rx="16" ry="22" fill="#FFFFFF"/>
    <circle cx="44" cy="37" r="3.5" fill="#000000"/>
    <circle cx="56" cy="37" r="3.5" fill="#000000"/>
    <path d="M43 48 Q50 54 57 48" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="42" cy="30" rx="5" ry="7" fill="#1A1A1A" opacity="0.6" transform="rotate(-20 42 30)"/>
    <ellipse cx="58" cy="30" rx="5" ry="7" fill="#1A1A1A" opacity="0.6" transform="rotate(20 58 30)"/>
    <path d="M32 56 L26 72 Q22 80 30 82 L36 78 M68 56 L74 72 Q78 80 70 82 L64 78" stroke="#000000" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M36 78 L44 84 M64 78 L56 84" stroke="#000000" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`,
};

// Simplified clean OpenAI logo (the complex one above, overwrite with simpler version)
SVG_LOGOS["OpenAI"] = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g fill="#000000">
    <path d="M85.6 40.7a22.6 22.6 0 0 0-1.9-18.5 22.8 22.8 0 0 0-24.5-11A22.6 22.6 0 0 0 42.1 5a22.8 22.8 0 0 0-21.8 15.8A22.6 22.6 0 0 0 5 36.3a22.8 22.8 0 0 0 2.8 26.2 22.6 22.6 0 0 0 1.9 18.5 22.8 22.8 0 0 0 24.5 11A22.6 22.6 0 0 0 57.9 98a22.8 22.8 0 0 0 21.7-15.8A22.6 22.6 0 0 0 95 66.7a22.8 22.8 0 0 0-9.4-26zM57.9 91.6a16.9 16.9 0 0 1-10.9-4l.5-.3 18.1-10.5a3 3 0 0 0 1.5-2.6V47.6l7.7 4.4a.3.3 0 0 1 .1.2v21.2a17 17 0 0 1-17 18.2zm-36.5-15.6a16.9 16.9 0 0 1-2-11.4l.5.3 18.1 10.5a3 3 0 0 0 3 0l22.1-12.8V71a.3.3 0 0 1-.1.2L44.7 81.8a17 17 0 0 1-23.3-5.8zm-4.8-39.3A17 17 0 0 1 25.5 30l.1.5v21a3 3 0 0 0 1.5 2.6L49.2 66.4l-7.7 4.4a.3.3 0 0 1-.3 0L23 60.3a17 17 0 0 1-6.4-23.6zm63.3 14.6L57.8 38.5l7.7-4.4a.3.3 0 0 1 .3 0L83 44.6a17 17 0 0 1-2.6 30.7v-21.6a3 3 0 0 0-1.5-2.4zm7.6-11.4-.5-.3L69 29.1a3 3 0 0 0-3 0L43.9 41.9V34a.3.3 0 0 1 .1-.2L62.3 23.2a17 17 0 0 1 25.2 17.7zm-48.1 15.8-7.7-4.4a.3.3 0 0 1-.1-.2V30.3a17 17 0 0 1 27.9-13l-.5.3-18.1 10.5a3 3 0 0 0-1.5 2.6V55.7zm4.2-9 9.8-5.7 9.8 5.7v11.3l-9.8 5.7-9.8-5.7z"/>
  </g>
</svg>`;

/**
 * Creates texture matching reference image:
 * Crisp white ceramic background with official logo emblem in center + text label below.
 */
export function createReferenceLogoTexture(item) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const drawCeramicTexture = (imgElement = null) => {
    // Pure porcelain white base fill
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 512, 512);

    if (imgElement) {
      // Draw emblem in center — sized to match reference image proportions
      const logoSize = 210;
      const logoX = (512 - logoSize) / 2;
      const logoY = 100;
      ctx.drawImage(imgElement, logoX, logoY, logoSize, logoSize);

      // Clean typography label below logo matching reference image
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 40px system-ui, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      // Ensure text fits within the sphere texture
      const maxWidth = 460;
      const text = item.name;
      ctx.fillText(text, 256, 395, maxWidth);
    } else {
      // Typographic fallback
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 52px system-ui, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.name, 256, 256);
    }

    texture.needsUpdate = true;
  };

  drawCeramicTexture();

  const svgString = SVG_LOGOS[item.name];
  if (svgString) {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      drawCeramicTexture(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return texture;
}

/**
 * Creates glossy white ceramic physical materials matching the reference image:
 * - High clearcoat & envMapIntensity for glossy reflections.
 * - Low roughness for smooth porcelain sheen.
 */
export function createCeramicMaterials() {
  return TECH_ITEMS.map((item) => {
    const texture = createReferenceLogoTexture(item);
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      color: new THREE.Color("#FFFFFF"),
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      ior: 1.5,
      reflectivity: 1.0,
      envMapIntensity: 3.0,
      sheen: 0.1,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color("#E0E8F8"),
    });
  });
}
