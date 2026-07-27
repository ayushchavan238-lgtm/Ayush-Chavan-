
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-scroll';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AC.</span>
            <p className="mt-2 text-slate-400 max-w-xs">
              Building digital products, brands, and experiences.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/ayushchavan238-lgtm" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors bg-slate-900 p-3 rounded-full hover:bg-primary/20">
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-900 p-3 rounded-full hover:bg-primary/20">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors bg-slate-900 p-3 rounded-full hover:bg-primary/20">
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="flex justify-center space-x-8 border-b border-slate-800 pb-8 mb-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item.toLowerCase()}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Ayush Chavan. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Crafted with <Heart size={14} className="text-red-500 mx-1 animate-pulse" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
}
