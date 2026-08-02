import { motion } from "framer-motion"
import { FaPython, FaJava, FaDatabase, FaGitAlt, FaGithub, FaBrain } from "react-icons/fa"
import { SiC, SiCplusplus, SiPytorch, SiTensorflow, SiScikitlearn, SiDjango, SiFlask, SiFastapi, SiMysql, SiZapier, SiN8N } from "react-icons/si"
import { BiNetworkChart } from "react-icons/bi"

const skillCategories = [
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "LangChain", icon: <FaBrain size={36} /> },
      { name: "PyTorch", icon: <SiPytorch size={36} /> },
      { name: "TensorFlow", icon: <SiTensorflow size={36} /> },
      { name: "Scikit-learn", icon: <SiScikitlearn size={36} /> },
      { name: "Django", icon: <SiDjango size={36} /> },
      { name: "Flask", icon: <SiFlask size={36} /> },
      { name: "FastAPI", icon: <SiFastapi size={36} /> },
    ]
  },
  {
    title: "Programming Languages & Databases",
    skills: [
      { name: "Python", icon: <FaPython size={36} /> },
      { name: "Java", icon: <FaJava size={36} /> },
      { name: "C", icon: <SiC size={36} /> },
      { name: "C++", icon: <SiCplusplus size={36} /> },
      { name: "ChromaDB", icon: <BiNetworkChart size={36} /> },
      { name: "MySQL", icon: <SiMysql size={36} /> },
      { name: "SQL", icon: <FaDatabase size={36} /> },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <FaGitAlt size={36} /> },
      { name: "GitHub", icon: <FaGithub size={36} /> },
      { name: "N8N", icon: <SiN8N size={36} /> },
      { name: "Zapier", icon: <SiZapier size={36} /> },
    ]
  }
]

export default function Skills() {
  return (
    <section className="mt-3 lg:mt-16 pb-10 lg:pb-16 px-5 lg:px-28 mx-auto max-w-[1400px]" id="skills" aria-label="Technical skills">
      <motion.h2
        className="text-2xl lg:text-3xl text-center font-light mb-12"
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        My <span className="font-medium">Skills</span>
      </motion.h2>

      <div className="space-y-12">
        {skillCategories.map((cat, catIdx) => (
          <div key={cat.title}>
            <h3 className="text-sm uppercase tracking-widest text-[#71717A] font-medium mb-6">{cat.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="border border-black/15 rounded-xl p-3 h-28 w-full flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: (catIdx * 4 + i) * 0.03 }}
                  viewport={{ once: true, margin: "-30px" }}
                >
                  {skill.icon}
                  <p className="text-xs sm:text-sm font-normal text-center">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
