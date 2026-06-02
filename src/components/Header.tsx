/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Shield, Phone, Mail, Instagram, Youtube } from 'lucide-react';

interface HeaderProps {
  onJoinClick: () => void;
  onAdminClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onJoinClick, onAdminClick, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Tentang', id: 'tentang' },
    { label: 'Jadwal', id: 'jadwal' },
    { label: 'Tim', id: 'tim' },
    { label: 'Prestasi', id: 'prestasi' },
    { label: 'Galeri', id: 'galeri' },
    { label: 'Berita', id: 'berita' },
    { label: 'Fitur', id: 'fitur' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A1128]/95 backdrop-blur-md border-b border-yellow-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('beranda')}>
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 p-0.5 shadow-lg shadow-yellow-500/10">
              <img 
                src="/src/assets/images/rugby_logo_1780386897653.png" 
                alt="UKM Rugby Unugiri Logo" 
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to stylized SVG shield if png fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Shield className="absolute w-6 h-6 text-[#0A1128] pointer-events-none" style={{ opacity: 0.1 }} />
            </div>
            <div>
              <span className="block font-sans font-bold text-lg tracking-wider text-white leading-tight">
                UKM RUGBY
              </span>
              <span className="block font-mono text-[11px] font-semibold text-yellow-500 tracking-widest leading-none">
                UNUGIRI
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 rounded-lg font-sans text-sm font-medium text-slate-300 hover:text-yellow-500 hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onAdminClick}
              className="px-3 py-2 rounded-lg font-sans text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            >
              Panel Pengurus
            </button>
            <button
              onClick={onJoinClick}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-sans font-bold text-sm shadow-md shadow-yellow-500/20 active:scale-95 transition-all duration-200"
            >
              Gabung Sekarang
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onAdminClick}
              className="p-2 text-slate-400 hover:text-white text-xs font-semibold"
            >
              Admin
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-yellow-500 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all duration-150"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1128] border-b border-yellow-500/10 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-semibold text-slate-300 hover:text-yellow-500 hover:bg-yellow-500/5 transition-all duration-150"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3 px-4">
            <button
              onClick={() => {
                onJoinClick();
                setIsOpen(false);
              }}
              className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-bold text-base shadow-md shadow-yellow-500/10"
            >
              Gabung Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
