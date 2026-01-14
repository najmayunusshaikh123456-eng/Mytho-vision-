
import React, { useEffect, useState } from 'react';
import ThreeScene from './components/ThreeScene';
import MythicGenerator from './components/MythicGenerator';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold for fading out the 3D element and changing theme
      setIsDark(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-bg min-h-screen ${isDark ? 'bg-[#050505] text-[#fef3c7]' : 'bg-white text-black'}`}>
      <ThreeScene isDark={isDark} />

      {/* Hero Section */}
      <section id="hero" className="px-6 relative flex items-center justify-center min-h-screen">
        {/* Credits in top-left corner */}
        <div className="absolute top-10 left-10 z-50">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Art Direction</p>
          <p className="text-xs font-cinzel tracking-widest">GOPAL DHAYADE</p>
        </div>

        <div className="text-center z-10 select-none pointer-events-none">
          <h1 className="text-7xl md:text-[9rem] font-cinzel font-black tracking-tighter leading-none mb-4 drop-shadow-sm">
            MYTHO VISION
          </h1>
          <p className="text-sm md:text-xl uppercase tracking-[1em] opacity-40 font-light">
            Ancient Stories. Future Tech.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-20 animate-bounce'}`}>
          <div className="w-px h-12 bg-current mx-auto"></div>
        </div>
      </section>

      {/* Content Area */}
      <div className="relative z-10">
        <section id="gallery" className="py-20 h-auto">
          <Gallery />
        </section>

        <section id="contact" className="py-20 h-auto">
          <div className="w-full space-y-20">
            <MythicGenerator />
            
            {/* Contact Details Footer */}
            <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-yellow-900/20 pt-12 pb-32">
              <div className="space-y-8">
                <h2 className="text-4xl font-cinzel text-yellow-500 uppercase tracking-widest">Contact Us</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-500/50 mb-1">Director</p>
                    <p className="text-3xl font-cinzel">GOPAL DHAYADE</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-500/50 mb-1">Direct Line</p>
                    <a href="tel:+918010900597" className="text-2xl font-cinzel hover:text-yellow-500 transition-colors">
                      +91 80109 00597
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-500/50 mb-1">Studio Email</p>
                    <p className="text-lg tracking-widest opacity-80">gopal.dhayade@mythovision.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right">
                <p className="text-[10px] text-yellow-100/20 tracking-[0.4em] uppercase mb-4">
                  © 2024 MYTHO VISION PRODUCTIONS
                </p>
                <div className="flex gap-4">
                  {['TW', 'IG', 'IN'].map(social => (
                    <span key={social} className="w-10 h-10 border border-yellow-900/50 flex items-center justify-center text-[10px] text-yellow-100/50 hover:bg-yellow-500 hover:text-black cursor-pointer transition-all">
                      {social}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className={`fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] z-40 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default App;
