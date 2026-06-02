/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { NewsItem } from '../types';

interface BeritaTerbaruProps {
  news: NewsItem[];
  onReadNews: (newsItem: NewsItem) => void;
  onSeeAllNews: () => void;
}

export default function BeritaTerbaru({ news, onReadNews, onSeeAllNews }: BeritaTerbaruProps) {
  return (
    <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-yellow-500/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-yellow-500" />
            </span>
            <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Berita Terbaru
            </h3>
          </div>
          <button 
            onClick={onSeeAllNews}
            className="text-xs font-mono tracking-wider text-yellow-500 hover:underline hover:opacity-80 transition-all"
          >
            Lihat Semua
          </button>
        </div>

        {/* News Items List */}
        <div className="space-y-4">
          {news.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onReadNews(item)}
              className="flex space-x-4 p-3 bg-[#0C142A]/60 hover:bg-[#0D1836] border border-transparent hover:border-yellow-500/10 rounded-xl cursor-pointer hover:-translate-y-0.5 active:scale-99 transition-all duration-300"
            >
              {/* News Image Thumbnail */}
              <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-lg overflow-hidden bg-slate-900 border border-white/5 flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-yellow-500 text-[#0A1128] font-mono text-[9px] font-extrabold rounded">
                  {item.category}
                </span>
              </div>

              {/* News Details */}
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                <div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-white hover:text-yellow-500 transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                
                {/* Date stamp */}
                <div className="flex items-center space-x-1 text-slate-500 mt-2">
                  <Calendar className="w-3.5 h-3.5 text-yellow-500/50" />
                  <span className="font-sans text-[10px] sm:text-xs">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all news indicator at bottom */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <button
          onClick={onSeeAllNews}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl hover:bg-white/5 text-yellow-500 font-sans font-bold text-xs uppercase tracking-widest border border-yellow-500/20 active:scale-98 transition-all duration-200"
        >
          <span>BACA BERITA SELENGKAPNYA</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
