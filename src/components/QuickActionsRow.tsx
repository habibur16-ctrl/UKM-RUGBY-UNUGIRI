/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QrCode, Award, ShieldAlert, Calendar, Swords, Settings } from 'lucide-react';

interface QuickActionsRowProps {
  onActionClick: (actionId: string) => void;
}

export default function QuickActionsRow({ onActionClick }: QuickActionsRowProps) {
  const actions = [
    {
      id: 'presensi',
      icon: <QrCode className="w-6 h-6 text-yellow-500" />,
      title: 'Presensi QR',
      desc: 'Check-in latihan'
    },
    {
      id: 'e-cert',
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: 'E-Certificate',
      desc: 'Dapatkan sertifikat'
    },
    {
      id: 'poin-keaktifan',
      icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />,
      title: 'Poin Keaktifan',
      desc: 'Kumpulkan poinmu'
    },
    {
      id: 'event-mgmt',
      icon: <Calendar className="w-6 h-6 text-yellow-500" />,
      title: 'Event Management',
      desc: 'Info & registrasi event'
    },
    {
      id: 'live-score',
      icon: <Swords className="w-6 h-6 text-yellow-500" />,
      title: 'Live Score',
      desc: 'Hasil pertandingan'
    },
    {
      id: 'admin_dashboard',
      icon: <Settings className="w-6 h-6 text-yellow-500 animate-spin-slow" />,
      title: 'Dashboard Pengurus',
      desc: 'Kelola organisasi'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 select-none" id="fitur">
      {/* Background container */}
      <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 shadow-xl">
        <h3 className="font-sans font-black text-xs sm:text-sm text-yellow-500 tracking-[0.25em] h-max uppercase mb-6 text-center sm:text-left border-b border-slate-800/60 pb-3">
          ⚡ AKES FITUR INTERAKTIF (QUICK COMMANDS)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {actions.map((act) => (
            <button
              key={act.id}
              onClick={() => onActionClick(act.id)}
              className="group flex flex-col items-center justify-center text-center p-4 bg-[#0C142A]/60 hover:bg-yellow-500/5 hover:border-yellow-500/20 border border-slate-800/40 rounded-xl cursor-pointer hover:-translate-y-1 active:scale-97 transition-all duration-300"
            >
              <div className="p-3 bg-yellow-500/10 rounded-full group-hover:bg-yellow-500 group-hover:text-slate-950 text-yellow-500 transition-all duration-300 shadow-sm mb-3">
                {act.icon}
              </div>
              <h4 className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-yellow-550 transition-colors">
                {act.title}
              </h4>
              <p className="font-sans text-[10px] text-slate-400 mt-1 line-clamp-1">
                {act.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
