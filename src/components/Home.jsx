import { motion } from "framer-motion"
import { IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5"
import { BiLogoGmail } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { FaChess } from "react-icons/fa6"
import { TbRobot } from "react-icons/tb"
import { TypeAnimation } from "react-type-animation"
import ThreeBackground from "./ThreeBackground"

const socials = [
  { Icon: BiLogoGmail, link: "mailto:jainjatin386@gmail.com", label: "Email" },
  { Icon: IoLogoLinkedin, link: "https://www.linkedin.com/in/jainjatin07/", label: "LinkedIn" },
  { Icon: IoLogoInstagram, link: "https://www.instagram.com/jain_jatin_07", label: "Instagram" },
  { Icon: BsGithub, link: "https://github.com/jainjatin07", label: "GitHub" },
]

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export default function Home() {
  return (
    <section className="mt-20 relative" id="home" aria-label="Hero section">
      <div className="hidden lg:block"><ThreeBackground /></div>
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse relative z-10">
        <motion.div
          className="lg:w-[45%]"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUp} className="text-2xl lg:text-4xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5 text-nowrap font-light">
            <h1>Hello, <TypeAnimation sequence={['', 500, 'I am Jatin Jain', 2000]} speed={10} deletionSpeed={50} style={{ fontWeight: 400 }} repeat={Infinity} /></h1>
            <h2><span className="font-medium">AI</span> <span className="text-white font-medium" style={{ WebkitTextStroke: "1px black" }}>Engineer</span></h2>
            <h2>Specializing in <span className="font-medium">LLMs & RAG.</span></h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#71717A] text-sm lg:text-base mt-5 font-light leading-relaxed">
            AI Engineer with hands-on experience in building LLM-powered applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI solutions. Skilled in Python, Machine Learning, NLP, and Generative AI.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8 lg:mt-12">

            <motion.button
              onClick={() => window.dispatchEvent(new Event("openChess"))}
              className="relative inline-flex items-center px-5 py-3 font-medium group text-sm cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg" />
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black transition-colors duration-300 group-hover:bg-black rounded-lg" />
              <span className="relative text-black group-hover:text-white flex items-center gap-x-2 transition-colors duration-300">
                <FaChess size={18} /> Play with me
              </span>
            </motion.button>

            <div className="flex items-center gap-x-3">
              {socials.map(({ Icon, link, label }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={label}
                  className="p-2.5 rounded border-2 border-black transition-colors duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:w-[55%] w-full flex items-center justify-center p-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <img 
            className="w-full max-w-2xl lg:max-w-3xl h-auto max-h-[680px] object-contain scale-110 lg:scale-125 transition-transform duration-500 hover:scale-130 drop-shadow-md" 
            src="/assets/hero-sketch.png" 
            alt="Jatin Jain - AI Engineer illustration" 
            loading="eager" 
          />
        </motion.div>
      </div>
    </section>
  )
}
