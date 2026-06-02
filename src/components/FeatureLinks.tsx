/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Activity, QrCode, Trophy, FileText } from 'lucide-react';

interface FeatureLinksProps {
  onFeatureClick: (featureId: string) => void;
}

export default function FeatureLinks({ onFeatureClick }: FeatureLinksProps) {
  const features = [
    {
      id: 'jadwal',
      icon: <Calendar className="w-8 h-8 text-yellow-500" />,
      title: 'Jadwal Latihan',
      desc: 'Lihat jadwal latihan rutin'
    },
    {
      id: 'skill-tracker',
      icon: <Activity className="w-8 h-8 text-yellow-500" />,
      title: 'Skill Tracker',
      desc: 'Pantau perkembanganmu'
    },
    {
      id: 'presensi',
      icon: <QrCode className="w-8 h-8 text-yellow-500" />,
      title: 'Presensi QR',
      desc: 'Check-in latihan lebih mudah'
    },
    {
      id: 'prestasidok',
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: 'Hall of Fame',
      desc: 'Apresiasi untuk yang terbaik'
    },
    {
      id: 'daftarmodal',
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      title: 'Pendaftaran',
      desc: 'Daftar anggota baru'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30 mb-12">
      <div className="bg-[#0D1530]/90 backdrop-blur-md rounded-2xl border border-yellow-500/10 p-4 sm:p-6 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {features.map((feat) => (
            <button
              key={feat.id}
              onClick={() => onFeatureClick(feat.id)}
              className="group flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 p-3 rounded-xl hover:bg-yellow-500/5 border border-transparent hover:border-yellow-500/10 transition-all duration-300 text-left cursor-pointer active:scale-98"
            >
              <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500 group-hover:text-[#0A1128] text-yellow-500 transition-all duration-300">
                {feat.icon}
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-yellow-500 transition-colors duration-150">
                  {feat.title}
                </h4>
                <p className="font-sans text-[11px] sm:text-[12px] text-slate-400 mt-1">
                  {feat.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
