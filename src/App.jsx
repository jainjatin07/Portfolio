import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './utils/CursorAnimation'
import Loader from './components/Loader'
import ChessModal from './components/ChessModal'
import AIAssistantModal from './components/AIAssistantModal'
import AIAssistantButton from './components/AIAssistantButton'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'

// Smooth page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}
const pageTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isChessOpen, setIsChessOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const location = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Global event listener to open Chess Modal from any button
  useEffect(() => {
    const handleOpenChess = () => setIsChessOpen(true)
    window.addEventListener('openChess', handleOpenChess)
    return () => window.removeEventListener('openChess', handleOpenChess)
  }, [])

  // Global event listener to open AI Assistant Modal
  useEffect(() => {
    const handleOpenAIAssistant = () => setIsAIAssistantOpen(true)
    window.addEventListener('openAIAssistant', handleOpenAIAssistant)
    return () => window.removeEventListener('openAIAssistant', handleOpenAIAssistant)
  }, [])

  return (
    <>
      <Loader onLoadComplete={() => setIsLoading(false)} />
      <div className={`font-sora scroll-smooth overflow-x-hidden transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
        <ChessModal isOpen={isChessOpen} onClose={() => setIsChessOpen(false)} />
        <AIAssistantModal isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
        <AIAssistantButton />
      </div>
    </>
  )
}
