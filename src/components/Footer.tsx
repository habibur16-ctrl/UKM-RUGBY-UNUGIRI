/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Phone, Mail, MapPin, Instagram, Youtube, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onAdminClick: () => void;
}

export default function Footer({ onNavigate, onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030816] text-slate-400 border-t border-yellow-500/10 pt-16 pb-8 select-none" id="kontak">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('beranda')}>
              <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 p-0.5 shadow-lg">
                <img 
                  src="/src/assets/images/rugby_logo_1780386897653.png" 
                  alt="UKM Rugby Unugiri Logo" 
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block font-sans font-bold text-base text-white tracking-wider leading-none">
                  UKM RUGBY
                </span>
                <span className="block font-mono text-[10px] text-yellow-500 tracking-widest mt-1">
                  UNUGIRI
                </span>
              </div>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Bersatu dalam semangat, bertarung dengan hati, menang dengan karakter. Wadah resmi pengembangan minat bakat olahraga Rugby mahasiswa Universitas Nahdlatul Ulama Sunan Giri Bojonegoro.
            </p>

            {/* Social handles */}
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:rugby.unugiri@gmail.com" className="hover:text-yellow-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div>
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">
              Menu Utama
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-semibold">
              <button onClick={() => onNavigate('beranda')} className="text-left hover:text-yellow-500 transition-all py-1">Beranda</button>
              <button onClick={() => onNavigate('tentang')} className="text-left hover:text-yellow-500 transition-all py-1">Tentang</button>
              <button onClick={() => onNavigate('jadwal')} className="text-left hover:text-yellow-500 transition-all py-1">Jadwal Latihan</button>
              <button onClick={() => onNavigate('tim')} className="text-left hover:text-yellow-500 transition-all py-1">Tim & Pengurus</button>
              <button onClick={() => onNavigate('prestasi')} className="text-left hover:text-yellow-500 transition-all py-1">Prestasi</button>
              <button onClick={() => onNavigate('galeri')} className="text-left hover:text-yellow-500 transition-all py-1">Galeri Foto</button>
              <button onClick={() => onNavigate('berita')} className="text-left hover:text-yellow-500 transition-all py-1">Berita</button>
              <button onClick={() => onNavigate('fitur')} className="text-left hover:text-yellow-500 transition-all py-1">Fitur Aplikasi</button>
              <button onClick={onAdminClick} className="text-left text-yellow-500 hover:opacity-80 transition-all py-1 font-mono">Panel Admin</button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">
              Kontak Kami
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Sekretariat UKM Rugby, Gedung PKM Unugiri, Jl. Jend. A. Yani No.10, Bojonegoro, Jawa Timur
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>0822-xxxx-xxxx</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>rugby.unugiri@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Location Google Maps Mock */}
          <div>
            <h4 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">
              Lokasi Latihan
            </h4>
            
            {/* Visual satellite mockup matching layout map image */}
            <div className="relative rounded-xl overflow-hidden Gym_Map_Sat border border-white/5 shadow-inner">
              <a 
                href="https://maps.google.com/?q=UNUGIRI+Bojonegoro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative block"
              >
                {/* Simulated high quality satellite map image */}
                <div className="h-28 bg-[#101E42] flex items-center justify-center text-slate-600 font-sans text-xs relative select-none">
                  {/* Grid of roads styled using Tailwind */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                  <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-slate-900 border-t border-slate-700/30 transform rotate-12" />
                  <div className="absolute top-1/4 bottom-1/4 left-1/2 w-1 bg-slate-900 border-l border-slate-700/30 transform -rotate-12" />
                  
                  {/* Red Pin inside radar */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <span className="w-4 h-4 rounded-full bg-red-650 animate-ping absolute" />
                    <MapPin className="w-6 h-6 text-red-500 relative drop-shadow" />
                  </div>
                  
                  <span className="z-10 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-[10px] tracking-wider text-white">INTERACTIVE MAP</span>
                </div>

                {/* Cover hovering */}
                <div className="p-2.5 bg-[#0D142A] border-t border-slate-800 flex items-center justify-between transition-colors group-hover:bg-[#121A37]">
                  <span className="text-[11px] font-sans text-slate-350 font-bold">Lihat di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-yellow-500" />
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Divider copyright */}
        <div className="border-t border-slate-850/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between text-center gap-4 text-[11px] sm:text-xs">
          <p>© {currentYear} UKM Rugby Unugiri Bojonegoro. All Rights Reserved.</p>
          <p>Designed with <span className="text-yellow-500">💛</span> for Rugby Unugiri</p>
        </div>
      </div>
    </footer>
  );
}
