import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 bg-[#020617] text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-white font-bold text-lg">Muzammil Idrees</h3>
          <p className="text-slate-500 text-sm">IT Engineer & Cyber Security Specialist</p>
        </div>
        <div className="text-sm text-slate-400">
          <p>Built with ❤️ • {new Date().getFullYear()}</p>
        </div>
        <div className="text-sm text-slate-400">
          <a href="mailto:muzfs1@gmail.com" className="hover:text-cyan-400">muzfs1@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
