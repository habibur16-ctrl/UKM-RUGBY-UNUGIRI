/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Activity, ShieldAlert, Zap, Compass, RotateCcw } from 'lucide-react';
import { SkillRating } from '../types';
import { DEFAULT_SKILLS } from '../data';

export default function SkillTracker() {
  const [skills, setSkills] = useState<SkillRating[]>(DEFAULT_SKILLS);
  const [isSimulating, setIsSimulating] = useState(false);
  const [analyzedRole, setAnalyzedRole] = useState<string | null>(null);

  // Set individual skill in drafts
  const handleSkillChange = (index: number, val: number) => {
    const updated = [...skills];
    updated[index].value = val;
    setSkills(updated);
    setAnalyzedRole(null); // Clear previous role calculation
  };

  const handleRecommendRole = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const sprint = skills.find(s => s.name === 'Sprint')?.value || 50;
      const passing = skills.find(s => s.name === 'Passing')?.value || 50;
      const tackling = skills.find(s => s.name === 'Tackling')?.value || 50;
      const endurance = skills.find(s => s.name === 'Endurance')?.value || 50;

      let role = 'Utility Back (Serba Bisa)';
      let description = 'Keseimbangan kemampuan fisik dan kognitif membuatmu fleksibel di berbagai posisi di lapangan.';

      // Determine rugby position rule engine
      if (sprint > 85 && passing > 75 && endurance > 80) {
        role = 'Wing / Fullback (Penyerang Sayap)';
        description = 'Kecepatan sprint yang tinggi dan daya tahan mumpuni sangat dibutuhkan untuk mengoyak sayap pertahanan lawan dan mencetak Try.';
      } else if (tackling > 85 && endurance > 85) {
        role = 'Prop / Lock (Garda Depan / Forward)';
        description = 'Kekuatan fisik prima dan keandalan tackling menjadikannya penahan gempuran terdepan dalam Scrum dan Ruck.';
      } else if (passing > 85 && sprint > 75) {
        role = 'Scrum half / Fly half (Otak Tim)';
        description = 'Akurasi passing tinggi dipadukan kelincahan kaki adalah kunci untuk mengatur ritme laju penyerangan seluruh tim.';
      } else if (tackling > 80 && sprint > 80) {
        role = 'Flanker (Pemburu Bola)';
        description = 'Berlari cepat mendobrak barisan lawan, meredam bola lambung, serta melakukan turnover instan.';
      }

      setAnalyzedRole(`${role} - ${description}`);
      setIsSimulating(false);
    }, 800);
  };

  const handleResetSkills = () => {
    setSkills([
      { name: 'Sprint', value: 85, color: '#EAB308', description: 'Kecepatan lari penetrasi' },
      { name: 'Passing', value: 78, color: '#EAB308', description: 'Akurasi umpan lateral' },
      { name: 'Tackling', value: 82, color: '#EAB308', description: 'Ketepatan menjatuhkan lawan' },
      { name: 'Endurance', value: 90, color: '#EAB308', description: 'Daya tahan stamina tanding' }
    ]);
    setAnalyzedRole(null);
  };

  return (
    <div className="bg-[#050C1E] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-xl">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-yellow-500/10 rounded-xl">
              <Activity className="w-5 h-5 text-yellow-500" />
            </span>
            <span className="font-sans font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Skill Tracker
            </span>
          </div>

          <button
            onClick={handleResetSkills}
            className="p-1 px-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs font-mono flex items-center space-x-1 border border-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Skill Bars with interactive sliders */}
        <div className="space-y-5">
          {skills.map((st, idx) => (
            <div key={st.name} className="space-y-1.5">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="font-sans">{st.name}</span>
                </div>
                <span className="font-mono text-yellow-500 font-bold">{st.value}%</span>
              </div>
              
              {/* Slider for micro-interactions */}
              <div className="relative group/slider">
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={st.value}
                  onChange={(e) => handleSkillChange(idx, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 hover:bg-slate-750 accent-yellow-500 rounded-lg appearance-none cursor-pointer"
                />
                
                {/* Visual Glow Line under track */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-l-lg pointer-events-none"
                  style={{ width: `${(st.value - 30) / 70 * 100}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">
                {st.description}
              </p>
            </div>
          ))}
        </div>

        {/* Analysis outcome */}
        {analyzedRole && (
          <div className="mt-5 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 select-none animate-fade-in">
            <div className="flex items-center space-x-2 text-yellow-400 mb-1">
              <Compass className="w-4 h-4" />
              <span className="font-sans font-bold text-xs uppercase tracking-widest">Rekomendasi Posisi :</span>
            </div>
            <p className="font-sans font-bold text-sm text-slate-100">
              {analyzedRole.split(' - ')[0]}
            </p>
            <p className="font-sans text-[11px] text-slate-400 mt-1 leading-relaxed">
              {analyzedRole.split(' - ')[1]}
            </p>
          </div>
        )}
      </div>

      {/* Analyzer action at bottom */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <button
          onClick={handleRecommendRole}
          disabled={isSimulating}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 disabled:from-slate-700 disabled:to-slate-800 text-[#0A1128] disabled:text-slate-500 font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/5 active:scale-98 transition-all duration-200"
        >
          <span>{isSimulating ? 'MENGKALKULASI PARU-PARU...' : 'ANALISIS PERAN KELAYAKAN'}</span>
          <Zap className="w-4 h-4 ml-1 fill-current" />
        </button>
      </div>
    </div>
  );
}
