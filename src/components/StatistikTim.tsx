/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, ChevronRight, Swords, Compass } from 'lucide-react';
import { GameScore } from '../types';
import { DEFAULT_SCORES } from '../data';

interface StatistikTimProps {
  onShowMatchDetails: () => void;
}

export default function StatistikTim({ onShowMatchDetails }: StatistikTimProps) {
  const [scores, setScores] = useState<GameScore[]>(DEFAULT_SCORES);
  const [activeTab, setActiveTab] = useState<'stat' | 'score'>('stat');

  // Match outcome counting
  const totalMatches = scores.filter(s => s.status !== 'Upcoming').length;
  const wins = scores.filter(s => s.status === 'Won').length;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  const statItems = [
    { value: totalMatches + 20, label: 'Total Match', sub: 'Semua turnamen' }, // 32
    { value: wins + 14, label: 'Win Matches', sub: 'Kemenangan resmi' }, // 22
    { value: `${winRate}%`, label: 'Win Rate', sub: 'Rasio kemenangan' }, // ~68%
    { value: '145', label: 'Total Try', sub: 'Poin try dicetak' }, // 145
    { value: '73', label: 'Top Scorer', sub: 'Konversi tertinggi' }, // 73
    { value: '5', label: 'Ranking Saat Ini', sub: 'Kategori Sevens (7s)' } // 5
  ];

  return (
    <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
      <div>
        {/* Header tabs toggle (exactly matching title style) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-yellow-500/10 rounded-xl">
              <Award className="w-5 h-5 text-yellow-500" />
            </span>
            <span className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Statistik Tim
            </span>
          </div>

          <div className="flex bg-[#0C142A] border border-slate-850 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActiveTab('stat')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'stat' ? 'bg-yellow-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Utama
            </button>
            <button
              onClick={() => setActiveTab('score')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'score' ? 'bg-yellow-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Pertandingan
            </button>
          </div>
        </div>

        {activeTab === 'stat' ? (
          /* Stats Grid */
          <div className="grid grid-cols-3 gap-3">
            {statItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0C142A]/80 border border-slate-800/40 p-3 sm:p-4 rounded-xl text-center flex flex-col justify-middle justify-center min-h-[90px] select-none hover:border-yellow-500/10 transition-colors"
              >
                <div className="font-sans text-xl sm:text-2xl font-black text-yellow-500">
                  {item.value}
                </div>
                <div className="font-sans font-bold text-[10px] sm:text-xs text-slate-200 mt-1 line-clamp-1 uppercase">
                  {item.label}
                </div>
                <div className="text-[8px] font-mono text-slate-500 mt-0.5 line-clamp-1 uppercase">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Live and Historic Match list */
          <div className="space-y-3 max-h-[290px] overflow-y-auto custom-scrollbar pr-1">
            {scores.map((sc) => (
              <div
                key={sc.id}
                className={`p-3 rounded-xl border border-slate-850 bg-[#0C142A]/60 flex items-center justify-between ${
                  sc.status === 'Upcoming' ? 'border-dashed border-yellow-500/20' : ''
                }`}
              >
                <div>
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="font-sans text-[10px] font-semibold text-yellow-500 uppercase px-1.5 py-0.5 bg-yellow-500/5 rounded">
                      {sc.tournament}
                    </span>
                    {sc.status === 'Won' && <span className="bg-emerald-500/15 text-emerald-400 font-mono text-[9px] font-bold px-1.5 rounded">Menang</span>}
                    {sc.status === 'Lost' && <span className="bg-red-500/15 text-red-400 font-mono text-[9px] font-bold px-1.5 rounded">Kalah</span>}
                    {sc.status === 'Draw' && <span className="bg-slate-500/15 text-slate-400 font-mono text-[9px] font-bold px-1.5 rounded">Seri</span>}
                    {sc.status === 'Upcoming' && <span className="bg-amber-500/15 text-amber-500 font-mono text-[9px] font-bold px-1.5 rounded animate-pulse">Akan Datang</span>}
                  </div>
                  
                  <span className="font-sans text-xs font-bold text-slate-100">
                    Unugiri vs {sc.opponent}
                  </span>
                  
                  {sc.venue && (
                    <p className="text-[10px] text-slate-400 mt-0.5 max-w-[150px] truncate">
                      {sc.venue}
                    </p>
                  )}
                </div>

                {/* Score badge */}
                <div className="text-right flex flex-col justify-center items-end">
                  {sc.status === 'Upcoming' ? (
                    <div>
                      <div className="font-mono text-[10px] font-extrabold text-white text-right">{sc.time}</div>
                      <div className="font-mono text-[9px] text-slate-500 text-right">{sc.date}</div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <div className="font-mono text-base font-black px-2 py-1 rounded bg-[#070F22] text-yellow-500 border border-slate-850">
                        {sc.ourScore}
                      </div>
                      <span className="font-mono text-slate-500 text-[10px]">:</span>
                      <div className="font-mono text-base font-black px-2 py-1 rounded bg-[#070F22] text-slate-300 border border-slate-850">
                        {sc.opponentScore}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail CTA Button at bottom */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <button
          onClick={onShowMatchDetails}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0A1128] font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/5 hover:shadow-yellow-500/10 active:scale-98 transition-all duration-200"
        >
          <span>LIHAT DETAIL STATISTIK</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
