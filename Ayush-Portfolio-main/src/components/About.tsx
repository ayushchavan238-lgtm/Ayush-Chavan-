
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">About Me</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1000&auto=format&fit=crop" 
                alt="Ayush Chavan" 
                className="w-full h-full object-cover rounded-2xl border border-slate-800"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6 text-slate-300 text-lg"
          >
            <p>
              Hi! I'm Ayush Chavan, a results-driven Full Stack Developer with a passion for building robust and scalable web applications. With expertise in modern JavaScript frameworks, I specialize in creating seamless user experiences and scalable backend architectures.
            </p>
            <p>
              My journey in software development started with a curiosity about how things work on the internet. Fast forward to today, I've had the privilege of building software for startups, mid-sized companies, and massive open-source projects.
            </p>
            <p>
              When I'm not coding, you can find me exploring new tech, contributing to open-source, or enjoying a good cup of coffee while reading about software architecture.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div>
                <h4 className="font-semibold text-white mb-1">Name:</h4>
                <p>Ayush Chavan</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Email:</h4>
                <p>ayush@example.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Location:</h4>
                <p>Global</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Availability:</h4>
                <p className="text-primary">Open to opportunities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
