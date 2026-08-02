import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BiLogoGmail } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'
import { IoLogoLinkedin, IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io5'
import { IoMdMail } from "react-icons/io"
import { FaPhone, FaWhatsapp } from "react-icons/fa6"

const socials = [
  { Icon: BiLogoGmail, link: "mailto:jainjatin386@gmail.com", label: "Email" },
  { Icon: IoLogoLinkedin, link: "https://www.linkedin.com/in/jainjatin07/", label: "LinkedIn" },
  { Icon: IoLogoInstagram, link: "https://www.instagram.com/jain_jatin_07", label: "Instagram" },
  { Icon: IoLogoWhatsapp, link: "https://wa.me/917466804158", label: "WhatsApp" },
  { Icon: BsGithub, link: "https://github.com/jainjatin07", label: "GitHub" },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const anim = (props, delay = 0) => ({
    initial: { opacity: 0, ...props },
    animate: isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
  })

  const [result, setResult] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const website = formData.get("website") || "";
    const message = formData.get("message") || "";

    const formattedMessage = `Hello Jatin!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}${website ? `%0A*Website:* ${encodeURIComponent(website)}` : ''}%0A*Message:* ${encodeURIComponent(message)}`;

    const whatsappUrl = `https://wa.me/917466804158?text=${formattedMessage}`;
    
    setResult("Forwarding to WhatsApp...");
    window.open(whatsappUrl, "_blank");

    event.target.reset();
    setTimeout(() => setResult(''), 4000);
  };

  return (
    <motion.section ref={ref} {...anim({})} className='lg:my-16 lg:px-28 my-8 px-5' id='contact' aria-label="Contact form">
      <motion.h2 {...anim({ y: -50 })} className='text-2xl lg:text-3xl text-center font-light'>Contact <span className='font-medium'>Me</span></motion.h2>
      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div {...anim({ x: -50 }, 0.1)} className='lg:w-[40%]'>
          <form onSubmit={onSubmit} className='w-full space-y-3 lg:space-y-5'>
            <input name="name" className='border px-5 py-3 border-black/80 rounded placeholder:text-[#71717A] text-sm w-full font-light transition-all duration-300 focus:border-black focus:shadow-sm' type="text" placeholder='Your name' required />
            <input name="email" className='border px-5 py-3 border-black/80 rounded placeholder:text-[#71717A] text-sm w-full font-light transition-all duration-300 focus:border-black focus:shadow-sm' type="email" placeholder='Email' required />
            <input name="website" className='border px-5 py-3 border-black/80 rounded placeholder:text-[#71717A] text-sm w-full font-light transition-all duration-300 focus:border-black focus:shadow-sm' type="text" placeholder='Your website (If exists)' />
            <textarea name="message" className='resize-none border px-5 py-3 h-32 border-black/80 placeholder:text-[#71717A] rounded text-sm w-full font-light transition-all duration-300 focus:border-black focus:shadow-sm' placeholder='How can I help?*' required />
            
            {result && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 font-medium"
              >
                {result}
              </motion.p>
            )}

            <div className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'>
              <motion.button 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                type='submit' 
                className='bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-5 py-3 rounded flex items-center gap-x-3 font-normal transition-shadow duration-300'
              >
                <IoLogoWhatsapp className="w-5 h-5 text-emerald-400" /> Get In Touch
              </motion.button>
              <div className='flex items-center gap-x-2 lg:gap-x-5'>
                {socials.map(({ Icon, link, label }, i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={label}
                    className="p-2 lg:p-3 rounded border border-black/80 transition-all duration-300"
                    whileHover={{ scale: 1.08, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
        <motion.div {...anim({ x: 50 }, 0.2)} className='lg:w-1/2'>
          <div className='font-medium text-2xl lg:text-4xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
            <h2>Let's <span className='text-white' style={{ WebkitTextStroke: '1px black' }}>talk</span> for</h2>
            <h2>Something special</h2>
          </div>
          <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6 font-light leading-relaxed'>I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.</p>
          <div className='font-normal text-sm lg:text-lg flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a whileHover={{ x: 5 }} className='flex items-center gap-2 group transition-all duration-300' href="mailto:jainjatin386@gmail.com">
              <span className='border transition-all duration-300 border-transparent group-hover:border-black rounded-full p-1'><IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" /></span>jainjatin386@gmail.com
            </motion.a>
            <motion.a whileHover={{ x: 5 }} className='flex items-center gap-2 group transition-all duration-300' href="tel:7466804158">
              <span className='border transition-all duration-300 border-transparent group-hover:border-black rounded-full p-[5px]'><FaPhone className="w-3 h-3 lg:w-4 lg:h-4" /></span>+91 7466804158
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
