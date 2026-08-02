import SEOHead from "../components/SEOHead"
import Projects from "../components/Projects"

export default function ProjectsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Projects by Jatin Jain | Multi-PDF RAG Pipeline, AI Chatbot & Virtual Assistant"
        description="Explore projects by Jatin Jain — Aether Multi-PDF RAG Pipeline, Junoon Mood-Driven AI Chatbot, NemiVerse AI Virtual Assistant, Junovision Facial Recognition Attendance System."
        keywords="Jatin Jain projects, Aether RAG Pipeline, Junoon AI Chatbot, NemiVerse Virtual Assistant, Junovision Attendance System, LangChain Projects, Python AI Projects"
        canonicalPath="/projects"
      />
      <Projects />
    </div>
  )
}
