
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2024 - Present',
    description: 'Leading a team of developers in building a high-traffic e-commerce platform using Next.js and Node.js. Improved performance by 40% and implemented CI/CD pipelines.',
  },
  {
    role: 'Software Engineer',
    company: 'Innovate Labs',
    period: '2022 - 2024',
    description: 'Developed and maintained various web applications using React and Python. Integrated third-party APIs and reduced database query times by optimizing PostgreSQL queries.',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'StartUp Hub',
    period: '2021 - 2022',
    description: 'Assisted in the development of user interfaces using React and Tailwind CSS. Collaborated with designers to ensure pixel-perfect implementation.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Experience</h2>
          <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-[.is-active]:bg-primary text-slate-400 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <Briefcase size={18} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xl group-hover:border-slate-600 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{exp.role}</h3>
                  <span className="text-sm font-medium text-primary mt-1 sm:mt-0">{exp.period}</span>
                </div>
                <div className="text-slate-400 font-medium mb-4">{exp.company}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
