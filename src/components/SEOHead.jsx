import { Helmet } from "react-helmet-async";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const BASE_URL = "https://jatinjain.dev";
const PROFILE_IMAGE = `${BASE_URL}/assets/hero-sketch.png`;
const SITE_NAME = "Jatin Jain - AI Engineer | LLM Applications & RAG Systems";
const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const PERSON_NAME = "Jatin Jain";
const PERSON_EMAIL = "jainjatin386@gmail.com";
const PERSON_PHONE = "+91-7466804158";
const TWITTER_HANDLE = "@jainjatin07";
const LAST_MODIFIED = "2026-07-31";

const ALL_IMAGES = [
  {
    url: `${BASE_URL}/assets/hero-sketch.png`,
    name: "Jatin Jain Official Profile Photo",
    caption:
      "Official profile photo of Jatin Jain, AI Engineer specializing in LLM Applications & RAG Systems",
    representativeOfPage: true,
  }
];

const SAME_AS = [
  "https://github.com/jainjatin07",
  "https://www.linkedin.com/in/jainjatin07/",
  "https://www.instagram.com/jain_jatin_07",
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const buildImageObject = (
  { url, name, caption, representativeOfPage = false },
  index,
) => ({
  "@type": "ImageObject",
  "@id": `${BASE_URL}/#image-${index}`,
  url: url,
  contentUrl: url,
  name: name,
  caption: caption,
  description: caption,
  author: { "@id": PERSON_ID, name: PERSON_NAME },
  creator: {
    "@type": "Person",
    name: PERSON_NAME,
    url: BASE_URL,
  },
  copyrightHolder: { "@id": PERSON_ID, name: PERSON_NAME },
  copyrightYear: "2026",
  copyrightNotice: `© 2026 ${PERSON_NAME}. All rights reserved.`,
  creditText: PERSON_NAME,
  license: `${BASE_URL}/license`,
  acquireLicensePage: `${BASE_URL}/contact`,
  inLanguage: "en",
  ...(representativeOfPage ? { representativeOfPage: true } : {}),
});

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

const buildPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON_NAME,
  alternateName: [
    "jainjatin07",
    "Jatin Jain",
    "Jatin Jain AI Engineer",
    "Jatin Jain LLM Developer",
    "Jatin Jain RAG Engineer",
  ],
  givenName: "Jatin",
  familyName: "Jain",
  honorificPrefix: "Mr.",
  gender: "Male",
  nationality: { "@type": "Country", name: "India" },
  description:
    "Jatin Jain is an AI Engineer specializing in LLM-powered applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI solutions. B.Tech CSE (AI/ML/DL Specialization) from Teerthanker Mahaveer University.",
  url: BASE_URL,
  email: PERSON_EMAIL,
  telephone: PERSON_PHONE,
  image: ALL_IMAGES.map(buildImageObject),
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/` },
  sameAs: SAME_AS,
  jobTitle: [
    "AI Engineer",
    "LLM Developer",
    "RAG Systems Engineer",
    "Python AI Intern",
  ],
  worksFor: { "@type": "Organization", name: "Provisioning Tech" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Teerthanker Mahaveer University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Firozabad",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PERSON_PHONE,
      contactType: "professional",
      email: PERSON_EMAIL,
      availableLanguage: ["English", "Hindi"],
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Generative AI",
    "LLM Applications",
    "Retrieval-Augmented Generation (RAG)",
    "LangChain",
    "ChromaDB",
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Python",
    "Django",
    "Flask",
    "FastAPI",
    "MySQL",
    "N8N",
    "Zapier",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Hindi", alternateName: "hi" },
  ],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "AI Engineer",
      description:
        "Building LLM-powered applications, multi-document RAG pipelines using LangChain and ChromaDB, and conversational AI tools.",
      skills:
        "Python, LangChain, ChromaDB, PyTorch, TensorFlow, Scikit-learn, Django, FastAPI, NLP",
      occupationLocation: { "@type": "Country", name: "India" },
    },
  ],
  award: ["Mock offer letter ₹5 LPA - Samarthya Bodh 3.0", "IEEE 2024 Technical Conference"],
});

const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  alternateName: [
    "Jatin Jain Portfolio",
    "jainjatin07",
    "Jatin Jain Official Website",
  ],
  url: BASE_URL,
  description:
    "Official portfolio of Jatin Jain — AI Engineer specializing in LLM Applications & RAG Systems.",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
  creator: { "@id": PERSON_ID },
  inLanguage: "en",
  copyrightYear: "2026",
  copyrightHolder: { "@id": PERSON_ID },
  dateCreated: "2024-01-01T00:00:00Z",
  dateModified: `${LAST_MODIFIED}T00:00:00Z`,
  image: buildImageObject(ALL_IMAGES[0], 0),
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/assets/favicon.svg`,
    width: "512",
    height: "512",
  },
});

const buildWebPageSchema = ({
  title,
  description,
  canonicalUrl,
  image,
  pageType,
  canonicalPath,
}) => ({
  "@context": "https://schema.org",
  "@type": pageType,
  "@id": `${canonicalUrl}#webpage`,
  name: title,
  description: description,
  url: canonicalUrl,
  inLanguage: "en",
  dateModified: `${LAST_MODIFIED}T00:00:00Z`,
  datePublished: "2024-01-01T00:00:00Z",
  isPartOf: {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: BASE_URL,
  },
  about: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  creator: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
  copyrightHolder: { "@id": PERSON_ID },
  copyrightYear: "2026",
  image: buildImageObject(ALL_IMAGES[0], 0),
  primaryImageOfPage: buildImageObject(ALL_IMAGES[0], 0),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Jatin Jain - Home",
        item: BASE_URL,
      },
      ...(canonicalPath !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: title.split("|")[0].trim(),
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  },
  potentialAction: { "@type": "ReadAction", target: [canonicalUrl] },
});

const buildImageGallerySchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${BASE_URL}/#gallery`,
  name: "Jatin Jain - Portfolio",
  description:
    "Official portfolio images of Jatin Jain, AI Engineer",
  url: BASE_URL,
  author: { "@id": PERSON_ID },
  creator: { "@id": PERSON_ID },
  copyrightHolder: { "@id": PERSON_ID },
  copyrightYear: "2026",
  inLanguage: "en",
  image: ALL_IMAGES.map(buildImageObject),
  associatedMedia: ALL_IMAGES.map(buildImageObject),
});

const buildProfilePageSchema = ({ title, description, canonicalUrl }) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonicalUrl}#profilepage`,
  name: title,
  description: description,
  url: canonicalUrl,
  dateCreated: "2024-01-01T00:00:00Z",
  dateModified: `${LAST_MODIFIED}T00:00:00Z`,
  inLanguage: "en",
  about: { "@id": PERSON_ID },
  mainEntity: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
  image: buildImageObject(ALL_IMAGES[0], 0),
  isPartOf: { "@id": WEBSITE_ID },
});

const buildSocialLinksSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Jatin Jain - Social & Professional Profiles",
  description:
    "Official social media and professional profiles of Jatin Jain",
  author: { "@id": PERSON_ID },
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebPage",
        name: "Jatin Jain GitHub",
        url: "https://github.com/jainjatin07",
        description: "Jatin Jain GitHub profile",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebPage",
        name: "Jatin Jain LinkedIn",
        url: "https://www.linkedin.com/in/jainjatin07/",
        description: "Jatin Jain LinkedIn profile",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "WebPage",
        name: "Jatin Jain Instagram",
        url: "https://www.instagram.com/jain_jatin_07",
        description: "Jatin Jain Instagram profile",
      },
    },
  ],
});

const buildArticleSchema = ({ title, description, canonicalUrl, article }) => {
  if (!article) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    headline: title,
    description: description,
    url: canonicalUrl,
    datePublished: `${article.publishedTime}T00:00:00Z`,
    dateModified: `${article.modifiedTime || LAST_MODIFIED}T00:00:00Z`,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    publisher: {
      "@id": WEBSITE_ID,
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/favicon.svg` },
    },
    image: buildImageObject(ALL_IMAGES[0], 0),
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    keywords: article.tags?.join(", ") || "",
    articleSection: article.section || "Technology",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SEOHead({
  title = `${PERSON_NAME} | AI Engineer | LLM Applications & RAG Systems`,
  description = `${PERSON_NAME} - AI Engineer specializing in LLM applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI solutions. Experienced with LangChain, ChromaDB, Python, PyTorch, TensorFlow, Django, Flask, FastAPI. Contact: ${PERSON_EMAIL}`,
  keywords = "Jatin Jain, jainjatin07, Jatin Jain portfolio, Jatin Jain AI Engineer, Jatin Jain LLM, Jatin Jain RAG, Jatin Jain GitHub, Jatin Jain LinkedIn, Jatin Jain Instagram, Jatin Jain resume, Jatin Jain contact, AI Engineer India, LLM Developer, RAG Systems Engineer, LangChain Developer, Generative AI Engineer, Python AI Intern",
  canonicalPath = "/",
  ogType = "website",
  image = PROFILE_IMAGE,
  article = null,
  pageType = "WebPage",
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const isHomePage = canonicalPath === "/";
  const isArticle = !!article;

  return (
    <Helmet>
      {/* ── TITLE ──────────────────────────────────────────────────────────── */}
      <title>{title}</title>

      {/* ── CORE META ──────────────────────────────────────────────────────── */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="subject"
        content={`${PERSON_NAME} - AI Engineer Portfolio`}
      />
      <meta
        name="topic"
        content="AI Engineering, Artificial Intelligence, LLM Applications, RAG Systems, Generative AI"
      />
      <meta
        name="classification"
        content="Portfolio, Technology, Software Development"
      />
      <meta name="category" content="Technology" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="1 days" />
      <meta name="language" content="English" />
      <meta name="content-language" content="en-IN" />

      {/* ── AUTHOR ─────────────────────────────────────────────────────────── */}
      <meta name="author" content={PERSON_NAME} />
      <meta name="creator" content={PERSON_NAME} />
      <meta name="publisher" content={PERSON_NAME} />
      <meta name="owner" content={PERSON_NAME} />
      <meta name="designer" content={PERSON_NAME} />
      <meta
        name="copyright"
        content={`© 2026 ${PERSON_NAME}. All rights reserved.`}
      />
      <meta name="reply-to" content={PERSON_EMAIL} />

      {/* ── ROBOTS ─────────────────────────────────────────────────────────── */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot-news" content="index, follow" />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="slurp" content="index, follow" />
      <meta name="yandex" content="index, follow" />
      <meta name="baiduspider" content="index, follow" />

      {/* ── GEO ────────────────────────────────────────────────────────────── */}
      <meta name="geo.region" content="IN-PB" />
      <meta name="geo.placename" content="Jalandhar, Punjab, India" />
      <meta name="geo.position" content="31.3260;75.5762" />
      <meta name="ICBM" content="31.3260, 75.5762" />

      {/* ── CANONICAL & ALTERNATES ─────────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hrefLang="en" />
      <link rel="alternate" href={canonicalUrl} hrefLang="en-in" />
      <link rel="alternate" href={canonicalUrl} hrefLang="en-us" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

      {/* ── OPEN GRAPH ─────────────────────────────────────────────────────── */}
      <meta property="og:type" content={isArticle ? "article" : ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      {/* Primary image */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta
        property="og:image:alt"
        content={`${PERSON_NAME} - Software Tester and Full Stack Developer`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* All additional profile images */}

      {ALL_IMAGES.slice(1).map((img) => (
        <meta key={img.url} property="og:image" content={img.url} />
      ))}

      {/* Profile OG */}

      <meta property="profile:first_name" content="Jatin" />
      <meta property="profile:last_name" content="Jain" />
      <meta property="profile:username" content="jainjatin07" />
      <meta property="profile:gender" content="male" />

      {/* ── ARTICLE META ───────────────────────────────────────────────────── */}

      <meta
        property="article:author"
        content="https://www.linkedin.com/in/jainjatin07/"
      />
      <meta property="article:publisher" content={BASE_URL} />
      {isArticle && (
        <>
          <meta
            property="article:published_time"
            content={article.publishedTime}
          />
          <meta
            property="article:modified_time"
            content={article.modifiedTime || LAST_MODIFIED}
          />
          <meta
            property="article:section"
            content={article.section || "Technology"}
          />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* ── TWITTER CARD ───────────────────────────────────────────────────── */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content={`${PERSON_NAME} - ${title.split("|")[0].trim()}`}
      />
      <meta name="twitter:domain" content="jatinjain.dev" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:label1" content="Role" />
      <meta
        name="twitter:data1"
        content="AI Engineer | LLM & RAG Systems"
      />
      <meta name="twitter:label2" content="Location" />
      <meta name="twitter:data2" content="Firozabad, India" />

      {/* ── JSON-LD: Person (Knowledge Panel anchor) ───────────────────────── */}

      <script type="application/ld+json">
        {JSON.stringify(buildPersonSchema())}
      </script>

      {/* ── JSON-LD: WebSite (Sitelinks Search Box) ────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(buildWebSiteSchema())}
      </script>

      {/* ── JSON-LD: WebPage / page-specific type ──────────────────────────── */}

      <script type="application/ld+json">
        {JSON.stringify(
          buildWebPageSchema({
            title,
            description,
            canonicalUrl,
            image,
            pageType,
            canonicalPath,
          }),
        )}
      </script>

      {/* ── JSON-LD: ImageGallery (Google Images signal) ───────────────────── */}

      <script type="application/ld+json">
        {JSON.stringify(buildImageGallerySchema())}
      </script>

      {/* ── JSON-LD: Social profiles ItemList ──────────────────────────────── */}

      <script type="application/ld+json">
        {JSON.stringify(buildSocialLinksSchema())}
      </script>

      {/* ── JSON-LD: ProfilePage (home only — strongest Knowledge Panel signal) */}

      {isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify(
            buildProfilePageSchema({ title, description, canonicalUrl }),
          )}
        </script>
      )}

      {/* ── JSON-LD: BlogPosting (article pages only) ──────────────────────── */}

      {isArticle && (
        <script type="application/ld+json">
          {JSON.stringify(
            buildArticleSchema({ title, description, canonicalUrl, article }),
          )}
        </script>
      )}
    </Helmet>
  );
}
