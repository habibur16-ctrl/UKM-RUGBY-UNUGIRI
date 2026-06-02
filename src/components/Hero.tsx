/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Award, Calendar, Users, Instagram, Youtube, HelpCircle } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  onStatsClick: () => void;
}

export default function Hero({ onJoinClick, onStatsClick }: HeroProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between bg-zinc-950 overflow-hidden">
      {/* Background Image with Dark & Golden Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/rugby_hero_banner_1780386877261.png"
          alt="Rugby Action Background"
          className="w-full h-full object-cover opacity-35 object-center scale-102 transition-transform duration-10000"
          referrerPolicy="no-referrer"
        />
        {/* Soft radial and linear gradients for perfect typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/50 to-transparent" />
      </div>

      {/* Floating Sidebar Social Icons (absolute right, matching design image) */}
      <div className="absolute right-4 top-1/3 z-20 flex flex-col items-center space-y-6 bg-slate-900/40 backdrop-blur-md px-3 py-6 rounded-full border border-white/5 shadow-xl">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-yellow-500 transition-all duration-200 transform hover:scale-110"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-yellow-500 transition-all duration-200 transform hover:scale-110"
        >
          <Youtube className="w-5 h-5" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-yellow-500 transition-all duration-200 transform hover:scale-110"
        >
          {/* Custom Tiktok icon representation using simple style */}
          <span className="font-mono text-sm font-bold tracking-tighter hover:text-yellow-500">Tk</span>
        </a>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 flex-grow flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Typographic Header */}
          <div className="space-y-1 select-none">
            <span className="block font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold italic text-slate-100 tracking-wide">
              UKM
            </span>
            <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-wider text-yellow-500 leading-none">
              RUGBY
            </h1>
            <span className="block font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold italic text-slate-100 tracking-[0.2em] leading-tight">
              UNUGIRI
            </span>
          </div>

          {/* Subtitle Banner */}
          <div className="mt-6 flex">
            <span className="inline-block bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500 pl-4 py-1.5 font-sans font-bold text-xs sm:text-sm tracking-widest text-[#EAB308] uppercase">
              Stronger Together, Fight Until The End!
            </span>
          </div>

          {/* Descriptive Intro paragraph */}
          <p className="mt-6 font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            Wadah pengembangan bakat, sportivitas, dan semangat juang mahasiswa 
            Universitas Nahdlatul Ulama Sunan Giri Bojonegoro melalui olahraga Rugby. 
            Ayo asah fisik, latih mental baja, dan menangkan prestasi bersama!
          </p>

          {/* CTA Button Group */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <button
              onClick={onJoinClick}
              className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-yellow-500/10 active:scale-98 transition-all duration-200"
            >
              <span>GABUNG SEKARANG</span>
              <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150">↗</span>
            </button>
            <button
              onClick={onStatsClick}
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans font-semibold text-sm sm:text-base tracking-wider uppercase border border-slate-700 hover:border-yellow-500/50 active:scale-98 transition-all duration-200"
            >
              <span>LIHAT PRESTASI</span>
              <span className="text-yellow-500">🏆</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats overlapping Row (exactly matching design style and placement) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
        <div className="w-full bg-[#0A1128]/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/5 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 division-x divide-slate-800">
            {/* Stat Item 1 */}
            <div className="flex items-center space-x-4 px-2">
              <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-white leading-tight">75+</div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#94A3B8] uppercase">Anggota Aktif</div>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center space-x-4 px-2">
              <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-white leading-tight">20+</div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#94A3B8] uppercase">Prestasi</div>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="flex items-center space-x-4 px-2">
              <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-white leading-tight">10+</div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#94A3B8] uppercase">Event Tahunan</div>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="flex items-center space-x-4 px-2">
              <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <div className="font-sans text-2xl sm:text-3xl font-extrabold text-white leading-tight">150+</div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#94A3B8] uppercase">Alumni</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
