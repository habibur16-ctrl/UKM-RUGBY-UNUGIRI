/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserPlus, ArrowUpRight } from 'lucide-react';

interface JoinUsBannerProps {
  onJoinClick: () => void;
}

export default function JoinUsBanner({ onJoinClick }: JoinUsBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl h-full flex flex-col justify-between p-6 sm:p-8 text-slate-950 shadow-xl group border border-yellow-400/30">
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <img
          src="/src/assets/images/rugby_join_us_1780386916591.png"
          alt="Rugby Silhouette"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Yellow-toned overlay to blend */}
        <div className="absolute inset-0 bg-yellow-500/10 mix-blend-color" />
      </div>

      {/* Header Info */}
      <div className="relative z-10">
        <div className="flex items-center space-x-2 text-slate-900 bg-white/25 px-3 py-1 rounded-full w-max mb-6">
          <UserPlus className="w-4 h-4 text-[#0A1128]" />
          <span className="font-sans font-bold text-xs uppercase tracking-wider">Rekrutmen Aktif</span>
        </div>
        
        <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-950 leading-tight">
          Gabung Bersama Kami!
        </h3>
        
        <p className="font-sans text-sm font-semibold text-slate-900/80 mt-4 leading-relaxed max-w-sm">
          Jadilah bagian dari keluarga besar UKM Rugby Unugiri Bojonegoro dan raih pengalaman berharga, persaudaraan erat, serta kembangkan bakat olahragamu hingga tingkat nasional!
        </p>
      </div>

      {/* Button CTA */}
      <div className="relative z-10 mt-8">
        <button
          onClick={onJoinClick}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-yellow-500 font-sans font-extrabold text-sm tracking-widest uppercase rounded-xl shadow-lg active:scale-97 transition-all duration-200"
        >
          <span>DAFTAR SEKARANG</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
