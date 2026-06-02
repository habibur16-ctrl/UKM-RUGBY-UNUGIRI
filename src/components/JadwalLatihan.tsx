/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Printer, CheckCircle, Info } from 'lucide-react';
import { ScheduleItem } from '../types';

interface JadwalLatihanProps {
  schedules: ScheduleItem[];
  onOpenScheduleDetail: () => void;
}

export default function JadwalLatihan({ schedules, onOpenScheduleDetail }: JadwalLatihanProps) {
  const [copiedDay, setCopiedDay] = useState<string | null>(null);

  const handleShareDay = (sch: ScheduleItem) => {
    const text = `📌 *JADWAL LATIHAN RUGBY UNUGIRI*\n📅 Hari: ${sch.day}\n⏰ Waktu: ${sch.time}\n📍 Lokasi: ${sch.location}\n⚡ Menu: ${sch.type}\n\n_Stronger Together, Fight Until The End!_`;
    navigator.clipboard.writeText(text);
    setCopiedDay(sch.id);
    setTimeout(() => setCopiedDay(null), 2500);
  };

  return (
    <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-yellow-500/10 rounded-xl">
              <Calendar className="w-5 h-5 text-yellow-500" />
            </span>
            <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Jadwal Latihan
            </h3>
          </div>
          <button 
            onClick={onOpenScheduleDetail}
            className="text-xs font-mono tracking-wider text-yellow-500 hover:underline hover:opacity-80 transition-all"
          >
            Lihat Semua
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {schedules.map((sch) => (
            <div 
              key={sch.id}
              className="group relative bg-[#0C142A]/80 hover:bg-[#0D1836] border border-yellow-500/5 hover:border-yellow-500/20 p-4 rounded-xl transition-all duration-300"
            >
              {/* Day & Share shortcut */}
              <div className="flex justify-between items-start mb-2">
                <span className="font-sans font-bold text-base text-yellow-500 group-hover:text-yellow-400">
                  {sch.day}
                </span>
                <button
                  onClick={() => handleShareDay(sch)}
                  className="px-2 py-1 rounded text-[10px] font-mono border border-slate-700/50 hover:border-yellow-500/30 text-slate-400 hover:text-white transition-all bg-[#080E1C]"
                >
                  {copiedDay === sch.id ? 'Tersalin ✔' : 'Salin Info'}
                </button>
              </div>

              {/* Time & Venue details */}
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-yellow-500/70" />
                  <span className="font-sans">{sch.time} WIB</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-500/70" />
                  <span className="font-sans">{sch.location}</span>
                </div>
              </div>

              {/* Training Menu tag */}
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Info className="w-3.5 h-3.5 text-yellow-500/60" />
                  <span className="text-[11px] font-sans font-medium line-clamp-1 italic text-slate-400">
                    {sch.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Button at bottom */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <button
          onClick={onOpenScheduleDetail}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0A1128] font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/5 hover:shadow-yellow-500/10 active:scale-98 transition-all duration-200"
        >
          <span>LIHAT JADWAL LENGKAP</span>
          <span>📅</span>
        </button>
      </div>
    </div>
  );
}
