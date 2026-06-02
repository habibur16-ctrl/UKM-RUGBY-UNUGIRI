/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Settings, Plus, Trash2, Check, UserCheck, MessageSquare, Newspaper, Calendar, Swords } from 'lucide-react';
import { NewsItem, ScheduleItem, MemberRegistration, GameScore } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem[];
  schedules: ScheduleItem[];
  registrations: MemberRegistration[];
  scores: GameScore[];
  onAddNews: (item: Omit<NewsItem, 'id' | 'date'>) => void;
  onDeleteNews: (id: string) => void;
  onUpdateSchedule: (sch: ScheduleItem) => void;
  onAddScore: (item: Omit<GameScore, 'id'>) => void;
  onDeleteScore: (id: string) => void;
  onUpdateRegStatus: (id: string, status: 'Pending' | 'Disetujui' | 'Dihubungi') => void;
  onDeleteReg: (id: string) => void;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  news,
  schedules,
  registrations,
  scores,
  onAddNews,
  onDeleteNews,
  onUpdateSchedule,
  onAddScore,
  onDeleteScore,
  onUpdateRegStatus,
  onDeleteReg
}: AdminDashboardProps) {
  
  const [activeTab, setActiveTab] = useState<'reg' | 'news' | 'sch' | 'scores'>('reg');

  // New News form state
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Kegiatan');
  const [newNewsImage, setNewNewsImage] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80');

  // New Score form state
  const [newScoreOpponent, setNewScoreOpponent] = useState('');
  const [newScoreTournament, setNewScoreTournament] = useState('');
  const [newScoreDate, setNewScoreDate] = useState('');
  const [newScoreOur, setNewScoreOur] = useState(0);
  const [newScoreOpponentVal, setNewScoreOpponentVal] = useState(0);
  const [newScoreStatus, setNewScoreStatus] = useState<'Won' | 'Lost' | 'Draw' | 'Upcoming'>('Won');
  const [newScoreTime, setNewScoreTime] = useState('');
  const [newScoreVenue, setNewScoreVenue] = useState('');

  if (!isOpen) return null;

  // Handles
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsExcerpt || !newNewsContent) return;
    onAddNews({
      title: newNewsTitle,
      excerpt: newNewsExcerpt,
      content: newNewsContent,
      category: newNewsCategory,
      image: newNewsImage
    });
    setNewNewsTitle('');
    setNewNewsExcerpt('');
    setNewNewsContent('');
    alert('Berita baru berhasil diterbitkan ke sistem!');
  };

  const handleCreateScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScoreOpponent || !newScoreTournament || !newScoreDate) return;
    onAddScore({
      opponent: newScoreOpponent,
      tournament: newScoreTournament,
      date: newScoreDate,
      ourScore: newScoreOur,
      opponentScore: newScoreOpponentVal,
      status: newScoreStatus,
      time: newScoreTime || undefined,
      venue: newScoreVenue || undefined
    });
    setNewScoreOpponent('');
    setNewScoreTournament('');
    setNewScoreDate('');
    setNewScoreOur(0);
    setNewScoreOpponentVal(0);
    setNewScoreStatus('Won');
    setNewScoreTime('');
    setNewScoreVenue('');
    alert('Hasil pertandingan berhasil diperbarui!');
  };

  const handleScheduleChange = (idx: number, field: string, val: string) => {
    const original = schedules[idx];
    onUpdateSchedule({
      ...original,
      [field]: val
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#050C1E] border border-yellow-500/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 bg-yellow-500/10 rounded-2xl">
              <Settings className="w-6 h-6 text-yellow-500 animate-spin-slow" />
            </span>
            <div>
              <h3 className="font-sans font-black text-xl text-white tracking-wide uppercase leading-none">Dashboard Pengurus</h3>
              <p className="text-xs text-slate-400 mt-1">Sistem tata kelola berita, jadwal, pendaftaran mahasiswa baru, & koordinasi internal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="flex space-x-2 border-b border-slate-800 mt-4 overflow-x-auto text-sm font-semibold select-none">
          <button
            onClick={() => setActiveTab('reg')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'reg' ? 'border-yellow-500 text-yellow-500 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Pendaftar ({registrations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'news' ? 'border-yellow-500 text-yellow-500 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Kelola Berita ({news.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sch')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'sch' ? 'border-yellow-500 text-yellow-500 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Kelola Jadwal</span>
          </button>
          <button
            onClick={() => setActiveTab('scores')}
            className={`px-4 py-3 border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'scores' ? 'border-yellow-500 text-yellow-500 font-bold' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Kelola Pertandingan</span>
          </button>
        </div>

        {/* TAB 1: REGISTRATIONS LIST */}
        {activeTab === 'reg' && (
          <div className="py-6 space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar">
            {registrations.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <UserCheck className="w-12 h-12 stroke-1 opacity-25 mx-auto mb-3" />
                <p className="text-sm">Belum ada mahasiswa baru yang mendaftar online.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-4 bg-[#0C142A]/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-start"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center space-x-2">
                        <span className="font-sans font-extrabold text-sm text-white">{cand.name}</span>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          cand.status === 'Disetujui' ? 'bg-emerald-500/10 text-emerald-400' :
                          cand.status === 'Dihubungi' ? 'bg-indigo-500/10 text-indigo-400' :
                          'bg-amber-600/10 text-amber-500 border border-amber-600/10'
                        }`}>
                          {cand.status === 'Pending' ? 'Calon Anggota' : cand.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-sans text-slate-300">
                        <div>NIM: <span className="font-mono text-slate-200">{cand.nim}</span></div>
                        <div>Jurusan: <span className="font-semibold text-slate-200">{cand.major}</span></div>
                        <div>WhatsApp: <span className="text-slate-200">{cand.phone}</span></div>
                        <div>Gender: <span className="text-slate-200">{cand.gender}</span></div>
                      </div>

                      {cand.reason && (
                        <p className="bg-[#050C1E] p-2.5 border border-slate-850 rounded-lg text-xs italic text-slate-450 mt-2 max-w-xl">
                          " {cand.reason} "
                        </p>
                      )}
                    </div>

                    {/* Actions panel */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      {cand.status === 'Pending' && (
                        <button
                          onClick={() => onUpdateRegStatus(cand.id, 'Dihubungi')}
                          className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-[#091530] border border-slate-800 hover:border-indigo-500/30 text-indigo-400 hover:text-white transition-all text-xs font-bold flex items-center justify-center space-x-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Hubungi</span>
                        </button>
                      )}
                      {cand.status !== 'Disetujui' && (
                        <button
                          onClick={() => onUpdateRegStatus(cand.id, 'Disetujui')}
                          className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 transition-all text-xs font-bold flex items-center justify-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteReg(cand.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-slate-950 text-red-400 transition-all text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEWS MANAGER */}
        {activeTab === 'news' && (
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[420px] overflow-y-auto custom-scrollbar">
            {/* Left side: News List with Delete */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-xs text-yellow-500 uppercase tracking-widest pl-1">Daftar Berita Aktif</h4>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#0C142A]/60 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden select-none">
                      <div className="w-12 h-10 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="text-xs font-sans font-bold text-slate-100 truncate">{item.title}</h5>
                        <span className="text-[10px] font-mono text-slate-550">{item.date} • {item.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteNews(item.id)}
                      className="p-2 border border-slate-800 hover:border-red-500/30 text-red-400 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5 border-none" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: News builder Form */}
            <form onSubmit={handleCreateNews} className="space-y-3 p-4 bg-[#090F21] border border-slate-800 rounded-2xl">
              <h4 className="font-sans font-bold text-xs text-yellow-500 uppercase tracking-widest border-b border-slate-800 pb-2">MULAI TULIS BERITA</h4>
              
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">JUDUL BERITA</label>
                <input
                  type="text"
                  required
                  placeholder="Judul artikel"
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  className="w-full bg-[#050C1E] border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">RINGKASAN SINGKAT (EXCERPT)</label>
                <input
                  type="text"
                  required
                  placeholder="Ringkasan pemicu ketertarikan pembaca"
                  value={newNewsExcerpt}
                  onChange={(e) => setNewNewsExcerpt(e.target.value)}
                  className="w-full bg-[#050C1E] border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-0.5">ISI LENGKAP KONTEN</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Gunakan draf teks panjang di sini..."
                  value={newNewsContent}
                  onChange={(e) => setNewNewsContent(e.target.value)}
                  className="w-full bg-[#050C1E] border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">KATEGORI</label>
                  <select
                    value={newNewsCategory}
                    onChange={(e) => setNewNewsCategory(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 outline-none"
                  >
                    <option value="Rekrutmen">Rekrutmen</option>
                    <option value="Pertandingan">Pertandingan</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">LINK MODEL FOTO (UNSPLASH)</label>
                  <input
                    type="text"
                    value={newNewsImage}
                    onChange={(e) => setNewNewsImage(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-[#0a1128] font-sans font-bold text-xs uppercase rounded-xl shadow mt-2"
              >
                TERBITKAN BERITA BARU
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SCHEDULE EDITOR */}
        {activeTab === 'sch' && (
          <div className="py-6 space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar">
            <h4 className="font-sans font-bold text-xs text-yellow-500 uppercase tracking-widest pl-1">Edit Alur Slot Jadwal Latihan</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schedules.map((sch, index) => (
                <div
                  key={sch.id}
                  className="p-4 bg-[#0C142A]/60 border border-slate-800 rounded-2xl space-y-3"
                >
                  <div className="px-2.5 py-1 bg-yellow-500/5 text-yellow-500 rounded font-mono text-xs font-bold w-max">
                    Jadwal Slot #{index + 1}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">HARI LATIHAN</label>
                    <input
                      type="text"
                      value={sch.day}
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      className="w-full bg-[#050C1E] border border-slate-850 px-3 py-2 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">JAM SLOT WAKTU</label>
                    <input
                      type="text"
                      value={sch.time}
                      onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                      className="w-full bg-[#050C1E] border border-slate-850 px-3 py-2 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">TEMPAT LOKASI</label>
                    <input
                      type="text"
                      value={sch.location}
                      onChange={(e) => handleScheduleChange(index, 'location', e.target.value)}
                      className="w-full bg-[#050C1E] border border-slate-850 px-3 py-2 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">MENU / ACARA LATIHAN</label>
                    <input
                      type="text"
                      value={sch.type}
                      onChange={(e) => handleScheduleChange(index, 'type', e.target.value)}
                      className="w-full bg-[#050C1E] border border-slate-850 px-3 py-2 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-slate-500 italic text-center text-slate-400 mt-2">💡 Sesi jadwal yang Anda ubah di panel ini akan langsung ter-render di halaman depan beranda secara instan!</p>
          </div>
        )}

        {/* TAB 4: GAME SCORE CONTROLLER */}
        {activeTab === 'scores' && (
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[420px] overflow-y-auto custom-scrollbar">
            {/* Left Score Card List */}
            <div className="space-y-3 select-none">
              <h4 className="font-sans font-bold text-xs text-yellow-500 uppercase tracking-widest pl-1">Histori Laga Saat Ini</h4>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {scores.map((sc) => (
                  <div
                    key={sc.id}
                    className="p-3 bg-[#0C142A]/60 border border-slate-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <h5 className="text-xs font-sans font-bold text-slate-100">Unugiri vs {sc.opponent}</h5>
                      <span className="text-[9px] font-mono text-slate-500">{sc.tournament} • {sc.date}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-black text-yellow-500 px-2 py-0.5 bg-yellow-500/5 rounded border border-slate-800">
                        {sc.status === 'Upcoming' ? 'Upcoming' : `${sc.ourScore} - ${sc.opponentScore}`}
                      </span>
                      <button
                        onClick={() => onDeleteScore(sc.id)}
                        className="p-1 text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Score creator form */}
            <form onSubmit={handleCreateScore} className="space-y-3 p-4 bg-[#090F21] border border-slate-800 rounded-2xl">
              <h4 className="font-sans font-bold text-xs text-yellow-500 uppercase tracking-widest border-b border-slate-800 pb-2">INPUT HASIL PERTANDINGAN</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">LAWAN TANDING</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: UB Malang"
                    value={newScoreOpponent}
                    onChange={(e) => setNewScoreOpponent(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">NAMA TURNAMEN</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kejurnas Sevens"
                    value={newScoreTournament}
                    onChange={(e) => setNewScoreTournament(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">UNUGIRI SCORE</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newScoreOur}
                    onChange={(e) => setNewScoreOur(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
                <div className="text-center self-center text-slate-500 text-xs font-bold pt-2">:</div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">OPPONENT SCORE</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newScoreOpponentVal}
                    onChange={(e) => setNewScoreOpponentVal(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">STATUS LUARAN</label>
                  <select
                    value={newScoreStatus}
                    onChange={(e) => setNewScoreStatus(e.target.value as any)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200"
                  >
                    <option value="Won">Menang (Won)</option>
                    <option value="Lost">Kalah (Lost)</option>
                    <option value="Draw">Seri (Draw)</option>
                    <option value="Upcoming">Akan Datang (Live/Upc)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">TANGGAL LAPORAN</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 15 Mei 2026"
                    value={newScoreDate}
                    onChange={(e) => setNewScoreDate(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">JAM KICK-OFF (IF LIVE)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 19.30 WIB"
                    value={newScoreTime}
                    onChange={(e) => setNewScoreTime(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-0.5">STADION / TEMPAT</label>
                  <input
                    type="text"
                    placeholder="Contoh: Stadion Delta"
                    value={newScoreVenue}
                    onChange={(e) => setNewScoreVenue(e.target.value)}
                    className="w-full bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-[#0a1128] font-sans font-bold text-xs uppercase rounded-xl mt-1 shadow"
              >
                INPUT DISPATCH PERTANDINGAN
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
