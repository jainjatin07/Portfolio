import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Assuming you use react-helmet-async or similar, but since SEOHead is custom, let's inject a standard script tag if possible, or just raw script.

export default function ProfileGallery() {
  const images = [
    { src: "/assets/hero-sketch.png", alt: "Jatin Jain - AI Engineer with Laptop", caption: "Jatin Jain - Hero Illustration" },
    { src: "/assets/about-sketch.png", alt: "Jatin Jain - AI Engineer Portrait", caption: "Jatin Jain - About Illustration" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Jatin Jain Profile Gallery",
    "description": "Portfolio pictures of Jatin Jain, AI Engineer.",
    "author": {
      "@type": "Person",
      "name": "Jatin Jain"
    },
    "image": images.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://jatinjain.dev${img.src}`,
      "description": img.alt,
      "name": img.caption,
      "author": {
        "@type": "Person",
        "name": "Jatin Jain"
      }
    }))
  };

  return (
    <section className="px-5 lg:px-28 py-10" aria-label="Jatin Jain Profile Gallery">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="mb-8">
        <h2 className="lg:text-3xl text-2xl font-light text-center">
          Profile <span className="font-medium">Gallery</span>
        </h2>
        <p className="text-center text-[#71717A] mt-3">My professional journey & snapshots</p>
      </div>
      
      <div className="flex justify-center max-w-md mx-auto">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-lg shadow-sm border border-black/5 bg-zinc-50 group relative"
          >
            <figure className="m-0 h-full w-full block aspect-square">
              <img 
                src={img.src} 
                alt={img.alt} 
                title={img.alt}
                loading="lazy"
                width="400"
                height="400"
                className="w-full h-full object-cover"
              />
              <figcaption className="sr-only">
                {img.caption} - Jatin Jain
              </figcaption>
            </figure>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
