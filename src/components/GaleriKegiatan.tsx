/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { GalleryImage } from '../types';

interface GaleriKegiatanProps {
  gallery: GalleryImage[];
  onImageClick: (img: GalleryImage) => void;
}

export default function GaleriKegiatan({ gallery, onImageClick }: GaleriKegiatanProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Latihan', 'Pertandingan', 'Event', 'Prestasi'];

  const filteredImages = activeCategory === 'Semua' 
    ? gallery 
    : gallery.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
      <div>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-yellow-500/10 rounded-xl">
              <Camera className="w-5 h-5 text-yellow-500" />
            </span>
            <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Galeri Kegiatan
            </h3>
          </div>
          
          {/* Categories Tab selector */}
          <div className="flex flex-wrap gap-1.5 bg-[#0C142A]/80 border border-slate-800/80 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-[#0A1128] shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid layout */}
        {filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
            <Camera className="w-12 h-12 stroke-1 opacity-20 mb-3" />
            <span className="font-sans text-sm">Tidak ada foto dalam kategori ini</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Main Featured Photo (takes 2 columns, height stretched) */}
            {filteredImages[0] && (
              <div 
                onClick={() => onImageClick(filteredImages[0])}
                className="group relative sm:col-span-2 h-48 sm:h-64 rounded-xl overflow-hidden border border-white/5 cursor-pointer shadow-md"
              >
                <img
                  src={filteredImages[0].url}
                  alt={filteredImages[0].title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500 object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="px-2 py-0.5 bg-yellow-500 text-slate-900 font-mono text-[9px] font-black rounded w-max mb-1">
                    {filteredImages[0].category.toUpperCase()}
                  </span>
                  <h5 className="font-sans font-bold text-sm text-white line-clamp-1">
                    {filteredImages[0].title}
                  </h5>
                  <div className="absolute top-3 right-3 p-1.5 bg-[#0A1128]/80 text-yellow-500 rounded-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Vertical Stack of smaller images */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:max-h-64 sm:overflow-y-auto custom-scrollbar">
              {filteredImages.slice(1, 4).map((img) => (
                <div
                  key={img.id}
                  onClick={() => onImageClick(img)}
                  className="group relative h-22 sm:h-29 rounded-xl overflow-hidden border border-white/5 cursor-pointer shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                    <span className="font-sans font-bold text-[11px] text-white line-clamp-1 leading-none mb-0.5">
                      {img.title}
                    </span>
                    <span className="font-mono text-[8px] text-yellow-500">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid count summary or actions at bottom */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-sans">Menampilkan {filteredImages.length} Foto</span>
        <button
          onClick={() => onImageClick({ id: 'all_lightbox', title: 'Galeri Penuh', category: 'Semua', url: filteredImages[0]?.url || '' })}
          className="text-yellow-500 hover:underline font-mono"
        >
          Slide Show
        </button>
      </div>
    </div>
  );
}
