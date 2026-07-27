
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    period: '2020 - 2022',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with Honors.',
  },
  {
    degree: 'Bachelor of Technology in Computer Engineering',
    institution: 'Indian Institute of Technology (IIT)',
    period: '2016 - 2020',
    description: 'Core focus on software engineering, data structures, and algorithms.',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Education</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="p-4 bg-slate-800 rounded-full text-primary shrink-0">
                <GraduationCap size={32} />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mt-2 sm:mt-0">
                    {edu.period}
                  </span>
                </div>
                <div className="text-lg text-slate-300 font-medium mb-4">{edu.institution}</div>
                <p className="text-slate-400">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
