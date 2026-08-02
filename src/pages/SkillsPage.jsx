import SEOHead from "../components/SEOHead"
import Skills from "../components/Skills"

export default function SkillsPage() {
  return (
    <div className="mt-24">
      <SEOHead
        title="Skills of Jatin Jain | LangChain, PyTorch, TensorFlow, Python, ChromaDB"
        description="Technical skills of Jatin Jain — Python, LangChain, PyTorch, TensorFlow, Scikit-learn, ChromaDB, MySQL, Django, Flask, FastAPI, C, C++, Java, Git, GitHub, N8N, Zapier."
        keywords="Jatin Jain skills, Jatin Jain tech stack, LangChain, PyTorch, TensorFlow, Python, ChromaDB, Scikit-learn, Django, FastAPI, AI Skills, ML Skills"
        canonicalPath="/skills"
      />
      <Skills />
    </div>
  )
}
