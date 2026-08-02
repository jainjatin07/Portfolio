import { motion } from "framer-motion"
import { TbRobot } from "react-icons/tb"

export default function AIAssistantButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event("openAIAssistant"))
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        onClick={handleClick}
        className="relative group flex items-center gap-2.5 px-4 py-3 bg-black text-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all font-sora cursor-pointer"
        whileHover={{ scale: 1.05, x: -2, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <TbRobot size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide">Ask AI Jatin</span>
      </motion.button>
    </motion.div>
  )
}
