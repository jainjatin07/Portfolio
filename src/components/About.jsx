import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => ({
  initial: {
    opacity: 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    y: direction === "up" ? 25 : direction === "down" ? -25 : 0,
  },
  whileInView: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  viewport: { once: true, margin: "-60px" },
});

export default function About() {
  return (
    <section
      className="px-5 lg:px-28 py-10 lg:py-16 flex flex-col gap-12"
      id="about"
      aria-label="About me"
    >
      <div className="flex justify-between gap-8 flex-col lg:flex-row items-center">
        <motion.div className="lg:w-1/2 flex items-center justify-center" {...fadeIn("left")}>
          <img 
            className="w-full max-w-md lg:max-w-lg h-auto object-contain transition-transform duration-500 hover:scale-[1.02] drop-shadow-sm" 
            src="/assets/about-sketch.png" 
            alt="About Jatin Jain - AI Engineer illustration" 
            loading="lazy" 
          />
        </motion.div>
        <motion.div className="lg:w-1/2" {...fadeIn("right", 0.15)}>
          <h2 className="lg:text-3xl text-2xl mt-4 lg:mt-0 font-light">
            About <span className="font-medium">Me</span>
          </h2>
          <motion.p {...fadeIn("up", 0.2)} className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-6 font-light leading-relaxed">
            AI Engineer with hands-on experience in building LLM-powered applications, Retrieval-Augmented Generation (RAG) systems, and conversational AI solutions.
          </motion.p>
          <motion.p {...fadeIn("up", 0.3)} className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light leading-relaxed">
            I developed and deployed a multi-document RAG pipeline using LangChain, ChromaDB, and LLM APIs, alongside AI chatbot and computer vision projects.
          </motion.p>
          <motion.p {...fadeIn("up", 0.4)} className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-4 font-light leading-relaxed">
            Skilled in Python, Machine Learning, NLP, and Generative AI, with a strong interest in developing scalable AI applications that solve real-world problems.
          </motion.p>
        </motion.div>
      </div>

      {/* Work Experience */}
      <motion.div {...fadeIn("up", 0.2)} className="mt-8">
        <h3 className="text-xl lg:text-2xl font-light mb-6">
          Work <span className="font-medium">Experience</span>
        </h3>
        <div className="border border-black/10 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="text-lg font-medium text-black">Python & AI Intern</h4>
              <p className="text-sm text-black/60 font-light">Provisioning Tech</p>
            </div>
            <span className="text-xs px-3 py-1 bg-black/5 rounded-full text-black/70 font-mono w-fit">Internship</span>
          </div>
          <ul className="space-y-2 mt-4 text-sm text-[#71717A] font-light list-disc pl-5 leading-relaxed">
            <li>Enhanced intent-recognition reliability in an NLP chatbot module through text preprocessing and model retraining.</li>
            <li>Developed and validated REST APIs using Django, supporting backend integration and application workflows.</li>
            <li>Improved machine learning model performance through preprocessing, hyperparameter tuning, and evaluation benchmarking.</li>
            <li>Authored technical documentation and test cases, improving software quality and deployment readiness.</li>
            <li>Built Python-based automation applications, including a virtual assistant and productivity tools.</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-black/5">
            {["Python", "Django", "Scikit-learn", "NLP", "Machine Learning", "Deep Learning", "Git", "SQL"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs bg-black/[0.04] text-black/70 rounded-md font-light">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Education */}
        <motion.div {...fadeIn("up", 0.3)}>
          <h3 className="text-xl lg:text-2xl font-light mb-6">
            <span className="font-medium">Education</span>
          </h3>
          <div className="space-y-4">
            <div className="border border-black/10 rounded-xl p-5 hover:border-black/20 transition-all">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="font-medium text-base">B.Tech, Computer Science Engineering</h4>
                  <p className="text-xs text-black/60 font-light mt-0.5">AI, ML, DL Specialization</p>
                  <p className="text-sm text-[#71717A] mt-1 font-light">Teerthanker Mahaveer University</p>
                </div>
                <span className="text-xs font-mono text-black/50 bg-black/5 px-2.5 py-1 rounded">2022 - 2026</span>
              </div>
            </div>

            <div className="border border-black/10 rounded-xl p-5 hover:border-black/20 transition-all">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="font-medium text-base">Intermediate (Senior Secondary) — 86.6%</h4>
                  <p className="text-sm text-[#71717A] mt-1 font-light">Kids Corner Happy Senior Secondary School</p>
                </div>
                <span className="text-xs font-mono text-black/50 bg-black/5 px-2.5 py-1 rounded">2020 - 2021</span>
              </div>
            </div>

            <div className="border border-black/10 rounded-xl p-5 hover:border-black/20 transition-all">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h4 className="font-medium text-base">High School (Higher Secondary) — 91%</h4>
                  <p className="text-sm text-[#71717A] mt-1 font-light">Kids Corner Happy Senior Secondary School</p>
                </div>
                <span className="text-xs font-mono text-black/50 bg-black/5 px-2.5 py-1 rounded">2018 - 2019</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications & Awards */}
        <motion.div {...fadeIn("up", 0.4)}>
          <h3 className="text-xl lg:text-2xl font-light mb-6">
            Certifications & <span className="font-medium">Awards</span>
          </h3>
          <div className="space-y-4">
            <div className="border border-black/10 rounded-xl p-5">
              <h4 className="font-medium text-base mb-3">Certifications</h4>
              <ul className="space-y-2.5 text-sm text-[#71717A] font-light">
                <li className="flex flex-col gap-1">
                  <span>• IBM Skills Network – Artificial Intelligence for Intermediate (2025)</span>
                  <a
                    href="https://ibmmooc.skillsnetwork.site/certificates/5b725354-6382-4e45-87b5-4cc1f3c5f489"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black/80 font-normal hover:underline ml-3"
                  >
                    View Certificate →
                  </a>
                </li>
                <li>• Python 3.4.3, Java, Git Training (Spoken Tutorial Project, IIT Bombay)</li>
                <li>• Cisco Packet Tracer (Cisco Networking Academy-2024)</li>
                <li>• Deloitte (Job Simulation)</li>
              </ul>
            </div>

            <div className="border border-black/10 rounded-xl p-5">
              <h4 className="font-medium text-base mb-3">Awards & Achievements</h4>
              <ul className="space-y-2 text-sm text-[#71717A] font-light">
                <li>• Secured a mock offer letter of ₹5 LPA after clearing the interview round in Samarthya Bodh 3.0, a placement simulation competition.</li>
                <li>• Participated in IEEE 2024 Technical Conference and completed the Youth Empowerment & Skills (YES+) workshop.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
