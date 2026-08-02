import SEOHead from "../components/SEOHead"
import About from "../components/About"
import ProfileGallery from "../components/ProfileGallery"

export default function AboutPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="About Jatin Jain | AI Engineer | LLM Applications & RAG Systems"
        description="Learn about Jatin Jain — AI Engineer specializing in LLM applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI. Experienced in Python, LangChain, PyTorch, TensorFlow, ChromaDB."
        keywords="About Jatin Jain, Jatin Jain biography, Jatin Jain AI Engineer, Jatin Jain background, LLM Applications, RAG Systems, Python AI Intern, B.Tech CSE"
        canonicalPath="/about"
      />
      <About />
    </div>
  )
}
