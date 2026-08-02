export const TECH_ITEMS = [
  { name: "React" },
  { name: "NEXT.js" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "FastAPI" },
  { name: "Flask" },
  { name: "django" },
  { name: "MongoDB" },
  { name: "GitHub" },
  { name: "MySQL" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "Firebase" },
  { name: "Vercel" },
  { name: "express" },
  { name: "Docker" },
  { name: "AWS" },
  { name: "Figma" },
  { name: "shadcn/ui" },
  { name: "Vite" },
  { name: "PostgreSQL" },
  { name: "OpenAI" },
  { name: "LangChain" },
  { name: "Mistral AI" },
  { name: "Chroma" },
  { name: "Linux" },
];

export const SPHERE_COUNT = 32;

export const SCALES = [0.85, 1.0, 0.9, 1.05, 0.95];

export const CAMERA_CONFIG = {
  position: [0, 0, 19],
  fov: 34,
  near: 1,
  far: 100,
};

export const PHYSICS_CONFIG = {
  linearDamping: 0.85,
  angularDamping: 0.6,
  friction: 0.1,
  restitution: 0.65,
  attractionForce: {
    x: -45,
    y: -130,
    z: -45,
  },
};

export const BOUNDARY_CONFIG = {
  width: 14,
  height: 9,
  depth: 7,
  thickness: 1,
};
