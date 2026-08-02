import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TbRobot, 
  TbMicrophone, 
  TbMicrophoneOff, 
  TbSend, 
  TbVolume, 
  TbVolumeOff, 
  TbCopy, 
  TbCheck, 
  TbTrash, 
  TbX, 
  TbSparkles,
  TbExternalLink
} from "react-icons/tb"

// Sample prompt chips
const QUICK_PROMPTS = [
  "📄 Summarize Jatin's resume & background",
  "🛠️ What are Jatin's core AI/LLM skills?",
  "🚀 Tell me about Jatin's RAG projects",
  "📬 How can I contact Jatin?",
]

// Knowledge base for instant client-side RAG fallback
const RESUME_KNOWLEDGE = [
  {
    keywords: ["who", "jatin", "about", "bio", "background", "summary", "profile", "resume"],
    content: "Jatin Jain is an AI Engineer specializing in LLM applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI solutions. Skilled in Python, Machine Learning, NLP, LangChain, PyTorch, and Vector Databases (FAISS, ChromaDB). Currently completing a B.Tech degree with strong hands-on experience in building AI workflows."
  },
  {
    keywords: ["skill", "tech", "stack", "python", "langchain", "pytorch", "model", "tools", "faiss", "groq", "whisper"],
    content: "Jatin's technical skill set includes:\n• AI & GenAI: RAG Architecture, LangChain, LangGraph, LLMs (Groq, OpenAI, Llama 3.3), Hugging Face Embeddings, Faster Whisper Speech Recognition.\n• Vector Databases: FAISS, ChromaDB.\n• Frameworks & Languages: Python, PyTorch, TensorFlow, FastAPI, React, Node.js, TailwindCSS.\n• Tools: Git, Docker, Linux, VS Code, Google Colab."
  },
  {
    keywords: ["project", "rag", "langgraph", "portfolio", "chess", "speech", "whisper", "bot", "assistant"],
    content: "Selected Projects by Jatin Jain:\n1. Personal AI Assistant with LangGraph & RAG: Built a conversational agent with document loading (PyMuPDFLoader), FAISS vector store persistence, dynamic query classification (Personal vs General), and Whisper voice-to-text integration.\n2. Interactive 3D Chess AI: Playable Chess AI embedded into portfolio using React-Three-Fiber and custom tactical evaluation algorithms.\n3. LLM Document Intelligence Pipeline: Efficient PDF document chunking and vector retrieval with HuggingFace MiniLM embeddings."
  },
  {
    keywords: ["contact", "email", "linkedin", "github", "hire", "reach", "location", "social"],
    content: "You can get in touch with Jatin Jain via:\n• Email: jainjatin386@gmail.com\n• LinkedIn: https://www.linkedin.com/in/jainjatin07/\n• GitHub: https://github.com/jainjatin07\n• Instagram: @jain_jatin_07"
  },
  {
    keywords: ["education", "college", "degree", "university", "btech", "study"],
    content: "Jatin Jain is pursuing his B.Tech with a focused specialization in Computer Science & Artificial Intelligence, demonstrating strong academic and practical project execution in Generative AI."
  }
]

// Inline formatting helper (Bold text & clickable URLs / Markdown links)
function FormatInline({ text }) {
  if (!text) return null

  const processBold = (str, keyPrefix) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-black">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  // Matches [Label](URL) OR plain URLs
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g
  const elements = []
  let lastIdx = 0
  let match
  let count = 0

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      elements.push(processBold(text.slice(lastIdx, match.index), `txt-${count}`))
    }

    if (match[1] && match[2]) {
      const label = match[1]
      const url = match[2]
      elements.push(
        <a
          key={`md-link-${count}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 my-0.5 rounded-lg bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-medium transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer group"
        >
          <span>{label}</span>
          <TbExternalLink size={13} className="text-white group-hover:text-black transition-colors shrink-0" />
        </a>
      )
    } else if (match[3]) {
      const url = match[3]
      elements.push(
        <a
          key={`raw-link-${count}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 my-0.5 rounded-lg bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs font-medium transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer group"
        >
          <span className="truncate max-w-[220px] sm:max-w-[300px]">View Document</span>
          <TbExternalLink size={13} className="text-white group-hover:text-black transition-colors shrink-0" />
        </a>
      )
    }

    lastIdx = match.index + match[0].length
    count++
  }

  if (lastIdx < text.length) {
    elements.push(processBold(text.slice(lastIdx), `txt-end`))
  }

  return <>{elements}</>
}

// Full Markdown renderer component for assistant messages
function FormattedMessage({ content }) {
  if (!content) return null

  const lines = content.split("\n")
  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed font-normal text-black">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={idx} className="h-1" />

        // Heading 1 (# Title)
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="text-base sm:text-lg font-bold text-black mt-3 mb-1.5 pb-1 border-b-2 border-black flex items-center gap-2">
              <FormatInline text={trimmed.slice(2)} />
            </h1>
          )
        }

        // Heading 2 (## Section Title)
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-sm sm:text-base font-bold text-black mt-3 mb-1 pb-0.5 border-b-2 border-black/80 flex items-center gap-2">
              <FormatInline text={trimmed.slice(3)} />
            </h2>
          )
        }

        // Heading 3 (### Sub-Category)
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-800 mt-2.5 mb-1 flex items-center gap-1.5">
              <FormatInline text={trimmed.slice(4)} />
            </h3>
          )
        }

        // Bullet list item (- Item or * Item)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 ml-1 my-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0 opacity-80" />
              <div className="flex-1">
                <FormatInline text={trimmed.slice(2)} />
              </div>
            </div>
          )
        }

        // Numbered list item (1. Item)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 ml-0.5 my-1.5">
              <span className="w-5 h-5 rounded-md bg-black text-white text-[11px] font-semibold flex items-center justify-center border border-black shrink-0 mt-0.5 font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {numMatch[1]}
              </span>
              <div className="flex-1 pt-0.5">
                <FormatInline text={numMatch[2]} />
              </div>
            </div>
          )
        }

        // Default paragraph
        return (
          <p key={idx} className="my-1 text-black">
            <FormatInline text={trimmed} />
          </p>
        )
      })}
    </div>
  )
}

export default function AIAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [activeSpeechId, setActiveSpeechId] = useState(null)

  const chatContainerRef = useRef(null)
  const recognitionRef = useRef(null)

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isThinking])

  // Initialize Speech Recognition if browser supports it
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
        handleSendMessage(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  // Toggle Voice Recording
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. You can type your query instead!")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        console.error(err)
      }
    }
  }

  // Text-To-Speech Output
  const speakMessage = (id, text) => {
    if (!("speechSynthesis" in window)) return

    if (activeSpeechId === id) {
      window.speechSynthesis.cancel()
      setActiveSpeechId(null)
      return
    }

    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*_#•\[\]()]/g, "")
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.0

    utterance.onend = () => setActiveSpeechId(null)
    utterance.onerror = () => setActiveSpeechId(null)

    setActiveSpeechId(id)
    window.speechSynthesis.speak(utterance)
  }

  // Copy message to clipboard
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Local RAG Classifier & Knowledge Retrieval Engine Fallback
  const processQueryLocal = (queryText) => {
    const qLower = queryText.toLowerCase()
    
    // Classify: Personal vs General
    const personalKeywords = ["jatin", "resume", "skill", "project", "contact", "email", "experience", "education", "who", "background", "hire", "rag", "portfolio"]
    const isPersonal = personalKeywords.some(kw => qLower.includes(kw))
    
    if (isPersonal) {
      const matchedItem = RESUME_KNOWLEDGE.find(item => 
        item.keywords.some(kw => qLower.includes(kw))
      )
      if (matchedItem) {
        return {
          queryType: "PERSONAL",
          content: matchedItem.content
        }
      }
      return {
        queryType: "PERSONAL",
        content: "I searched Jatin's resume and documents. Jatin Jain is an AI Engineer specializing in LLMs, RAG systems (LangChain, LangGraph, FAISS), Python, and PyTorch. For specific inquiries, feel free to contact him at jainjatin386@gmail.com!"
      }
    } else {
      return {
        queryType: "GENERAL",
        content: `I am answering based on general AI knowledge: "${queryText}". If you want specific details about Jatin Jain's portfolio, background, or RAG projects, try asking about his resume, skills, or contact info!`
      }
    }
  }

  // Background wake-up ping for Render cold start
  useEffect(() => {
    if (isOpen) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://portfolio-ftol.onrender.com"
      fetch(backendUrl).catch(() => null)
    }
  }, [isOpen])

  // Handle Send Message
  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue
    if (!query.trim() || isThinking) return

    const userMsgId = `user-${Date.now()}`
    const userMessage = {
      id: userMsgId,
      sender: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsThinking(true)

    try {
      // Attempt backend API call with cold-start retries
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://portfolio-ftol.onrender.com"
      let res = null
      
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 20000)
          res = await fetch(`${backendUrl}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: query }),
            signal: controller.signal
          })
          clearTimeout(timeoutId)
          if (res && res.ok) break
        } catch {
          if (attempt < 2) await new Promise(r => setTimeout(r, 1500))
        }
      }

      let assistantResponse = null
      if (res && res.ok) {
        const data = await res.json()
        assistantResponse = {
          queryType: data.query_type || "PERSONAL",
          content: data.reply || data.response
        }
      } else {
        // Fallback to local intelligent RAG engine
        await new Promise(r => setTimeout(r, 600))
        assistantResponse = processQueryLocal(query)
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        queryType: assistantResponse.queryType,
        content: assistantResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }

      setMessages(prev => [...prev, botMessage])
    } catch {
      const fallback = processQueryLocal(query)
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        queryType: fallback.queryType,
        content: fallback.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }])
    } finally {
      setIsThinking(false)
    }
  }

  // Clear chat log
  const clearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setActiveSpeechId(null)
    setMessages([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md overflow-hidden font-sora"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl h-[85vh] max-h-[750px] bg-white text-black rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header (Minimal & Sketchy) */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TbRobot size={18} />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-black leading-none">
                  Jatin AI
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black text-white uppercase tracking-wider">
                  AI Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all"
                  title="Clear Chat"
                >
                  <TbTrash size={18} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all"
                title="Close"
              >
                <TbX size={20} />
              </button>
            </div>
          </div>

          {/* Chat Body Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-[#fafafa] scrollbar-hide"
          >
            {/* Empty State / Welcome Screen */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full min-h-[350px] flex flex-col items-center justify-center text-center p-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-5">
                  <TbSparkles size={28} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight max-w-md">
                  What would you like to ask about <span className="font-medium underline decoration-2 underline-offset-4">Jatin?</span>
                </h2>

                {/* Quick Prompts Chips */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {QUICK_PROMPTS.map((promptText, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(promptText)}
                      disabled={isThinking}
                      className="p-3 text-left rounded-xl bg-white text-black border-2 border-black text-xs font-medium shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{promptText}</span>
                      <TbSparkles size={14} className="text-zinc-400 group-hover:text-black transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Chat Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === "user"

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 border-2 border-black ${
                      isUser
                        ? "bg-black text-white rounded-tr-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black rounded-tl-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    {/* Message Content */}
                    <div className="text-xs sm:text-sm leading-relaxed font-normal">
                      {isUser ? (
                        <div className="whitespace-pre-wrap text-white">{msg.content}</div>
                      ) : (
                        <FormattedMessage content={msg.content} />
                      )}
                    </div>

                    {/* Footer Actions for Assistant */}
                    {!isUser && (
                      <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-black/10 text-black">
                        <button
                          onClick={() => speakMessage(msg.id, msg.content)}
                          className={`p-1 rounded hover:bg-black hover:text-white transition-colors ${
                            activeSpeechId === msg.id ? "bg-black text-white animate-pulse" : ""
                          }`}
                          title="Read out loud"
                        >
                          {activeSpeechId === msg.id ? <TbVolume size={16} /> : <TbVolumeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="p-1 rounded hover:bg-black hover:text-white transition-colors"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <TbCheck size={16} /> : <TbCopy size={16} />}
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <span className="text-[10px] text-zinc-500 mt-1 px-1 font-mono">{msg.timestamp}</span>
                  )}
                </motion.div>
              )
            })}

            {/* Sketchy Loading Indicator */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border-2 border-black max-w-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <TbRobot className="animate-spin text-black" size={20} />
                <span className="text-xs font-semibold text-black tracking-wide">Analyzing & thinking...</span>
              </motion.div>
            )}
          </div>

          {/* Floating Prompt Bar (Bottom Sketchy Style) */}
          <div className="p-4 sm:p-5 bg-white border-t-2 border-black shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="relative max-w-2xl mx-auto flex items-center gap-2 bg-white border-2 border-black rounded-2xl p-2 pl-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Text Input */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Ask Jatin's AI anything..."}
                disabled={isThinking}
                className="flex-1 bg-transparent text-xs sm:text-sm text-black placeholder-zinc-400 focus:outline-none"
              />

              {/* Voice Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border-2 border-black transition-all shrink-0 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
                title={isListening ? "Listening... Click to stop" : "Voice Input"}
              >
                {isListening ? <TbMicrophoneOff size={18} /> : <TbMicrophone size={18} />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className="p-2.5 bg-black text-white rounded-xl border-2 border-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <TbSend size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
