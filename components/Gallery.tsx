
import React from 'react';

const productions = [
  { id: 1, title: 'NEO-OLYMPUS', category: 'EPIC FEATURE', img: 'https://picsum.photos/seed/myth1/800/1200' },
  { id: 2, title: 'CYBER-STYX', category: 'INTERACTIVE SERIES', img: 'https://picsum.photos/seed/myth2/800/1200' },
  { id: 3, title: 'VOID VALHALLA', category: 'SHORT FILM', img: 'https://picsum.photos/seed/myth3/800/1200' },
  { id: 4, title: 'DIGITAL RA', category: 'VFX EXPERIENCE', img: 'https://picsum.photos/seed/myth4/800/1200' },
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="gallery">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-5xl md:text-7xl font-cinzel font-black gold-glow mb-4">GALLERY</h2>
          <p className="text-yellow-100/40 uppercase tracking-[0.3em] font-light">Featured Productions</p>
        </div>
        <div className="hidden md:block h-px flex-1 bg-yellow-900/30 mx-10 mb-6"></div>
        <div className="text-right">
          <p className="text-yellow-500 font-cinzel">EST. 2024</p>
          <p className="text-yellow-100/40 text-xs">PIXELS & POETRY</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productions.map((prod) => (
          <div key={prod.id} className="group relative aspect-[2/3] overflow-hidden rounded-xl border border-yellow-900/20 shadow-2xl">
            <img 
              src={prod.img} 
              alt={prod.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span className="text-[10px] tracking-[0.2em] text-yellow-500 font-bold uppercase mb-2 block">{prod.category}</span>
              <h3 className="text-2xl font-cinzel text-white gold-glow">{prod.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
