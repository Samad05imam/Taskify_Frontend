import React from 'react';
import { CheckSquare, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 sm:gap-6 sm:flex-row flex-wrap items-center justify-between border-t border-slate-700">

        {/* Logo and copyright */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <CheckSquare className="text-blue-400" />
          <span className="text-slate-300 font-semibold font-serif">Taskify</span>
          <span className="hidden sm:inline-block">|</span>
          <span>© {new Date().getFullYear()} — All rights reserved.</span>
        </div>

        {/* Social links */}
        <div className="flex gap-4 justify-center">
          <a href="mailto:samadimam13@example.com" className="hover:text-white" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href="https://github.com/Samad05imam" target="_blank" className="hover:text-white" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/Samad05imam" target="_blank" className="hover:text-white" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Developer link */}
        <div className="text-center sm:text-right text-blue-400 font-bold">
          <span className="text-slate-300 font-semibold">Developer: </span>
          <a className="hover:text-white" href="https://cool-pixie-41fc23.netlify.app/" target="_blank">
            Samad Imam
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
