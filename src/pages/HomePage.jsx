import SEOHead from "../components/SEOHead"
import Home from "../components/Home"
import Skills from "../components/Skills"
import About from "../components/About"
import Projects from "../components/Projects"
import Contact from "../components/Contact"

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Jatin Jain | AI Engineer | LLM Applications & RAG Systems"
        description="Official portfolio of Jatin Jain — AI Engineer specializing in LLM applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI. Experienced in Python, LangChain, PyTorch, TensorFlow, ChromaDB."
        keywords="Jatin Jain, jainjatin07, Jatin Jain portfolio, Jatin Jain AI Engineer, Jatin Jain LLM, Jatin Jain RAG, Jatin Jain GitHub, Jatin Jain LinkedIn, AI Engineer, LLM Applications, RAG Systems, LangChain, Python AI"
        canonicalPath="/"
        ogType="profile"
      />
      <Home />
      <Skills />
      <About />
      <Projects />
      <Contact />
    </>
  )
}
