/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { X, QrCode, Award, ShieldAlert, Calendar, Swords, UserPlus, ShieldCheck, Printer, ArrowRight, BookOpen, Plus, Heart } from 'lucide-react';
import { NewsItem, ScheduleItem, MemberRegistration, PresenceRecord, ActiveMemberPoint, GameScore } from '../types';

interface InteractiveModalsProps {
  activeModal: string | null;
  onClose: () => void;
  selectedNews: NewsItem | null;
  schedules: ScheduleItem[];
  leaderboard: ActiveMemberPoint[];
  scores: GameScore[];
  onAddRegistration: (reg: Omit<MemberRegistration, 'id' | 'status' | 'createdAt'>) => void;
  onAddPresence: (rec: Omit<PresenceRecord, 'id' | 'date' | 'time'>) => void;
}

export default function InteractiveModals({
  activeModal,
  onClose,
  selectedNews,
  schedules,
  leaderboard,
  scores,
  onAddRegistration,
  onAddPresence
}: InteractiveModalsProps) {

  // Form states
  const [regName, setRegName] = useState('');
  const [regNim, setRegNim] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regMajor, setRegMajor] = useState('');
  const [regGender, setRegGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [regReason, setRegReason] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Presence states
  const [presName, setPresName] = useState('');
  const [presNim, setPresNim] = useState('');
  const [presSession, setPresSession] = useState(schedules[0]?.type || 'Latihan Dasar');
  const [presSuccess, setPresSuccess] = useState(false);

  // Cert state
  const [certName, setCertName] = useState('');
  const [certNim, setCertNim] = useState('');
  const [certEvent, setCertEvent] = useState('Open Recruitment UKM Rugby 2026');
  const [isCertGenerated, setIsCertGenerated] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  // Event RSVP state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpNim, setRsvpNim] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Live Score chat/comment and voting States
  const [comments, setComments] = useState<{name: string, text: string, time: string}[]>([
    { name: 'Ihsan', text: 'Semangat terus Rugby Unugiri, raih emas Kejurnas!', time: '10:14' },
    { name: 'Fauzi', text: 'Yakin menang lawan UM Malang nanti malam!', time: '11:02' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [momVotes, setMomVotes] = useState<{[key: string]: number}>({ 'Muhammad Ihsan': 12, 'Ahmad Fauzi': 8, 'Reza Aditya': 5 });
  const [hasVotedMOM, setHasVotedMOM] = useState(false);

  if (!activeModal) return null;

  // Handlers
  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regNim || !regEmail || !regPhone || !regMajor) return;
    onAddRegistration({
      name: regName,
      nim: regNim,
      email: regEmail,
      phone: regPhone,
      major: regMajor,
      gender: regGender,
      reason: regReason
    });
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setRegName(''); setRegNim(''); setRegEmail(''); setRegPhone(''); setRegMajor(''); setRegReason('');
      onClose();
    }, 4500);
  };

  const handlePresenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presName || !presNim) return;
    onAddPresence({
      name: presName,
      nim: presNim,
      sessionType: presSession
    });
    setPresSuccess(true);
    setTimeout(() => {
      setPresSuccess(false);
      setPresName(''); setPresNim('');
      onClose();
    }, 3500);
  };

  const handleGenerateCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName || !certNim) return;
    setIsCertGenerated(true);
  };

  const handleEventRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpNim) return;
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpName(''); setRsvpNim('');
      onClose();
    }, 3000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setComments([...comments, { name: 'Suporter Unugiri', text: newComment, time: timeStr }]);
    setNewComment('');
  };

  const handleVoteMOM = (player: string) => {
    if (hasVotedMOM) return;
    setMomVotes({ ...momVotes, [player]: momVotes[player] + 1 });
    setHasVotedMOM(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#050C1E] border border-yellow-500/15 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. PRESENSI QR MODAL */}
        {activeModal === 'presensi' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <QrCode className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Presensi QR Latihan</h3>
                <p className="text-xs text-slate-400 mt-1">Check-in kehadiran latihan mandiri untuk kumpulkan poin keaktifan</p>
              </div>
            </div>

            {presSuccess ? (
              <div className="py-12 text-center space-y-4 animate-fade-in select-none">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">✔</div>
                <h4 className="font-sans font-extrabold text-lg text-white">PRESENSI BERHASIL!</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto">
                  Terima kasih sudah check-in kehadiran di sesi latihan hari ini. Poin keaktifan anggota Anda telah ditambahkan (+25 poin)!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* QR Scanner Simulation */}
                <div className="bg-[#090F21] border border-slate-800 p-6 rounded-2xl text-center space-y-4 shadow-inner">
                  <div className="w-40 h-40 border-2 border-yellow-500/50 rounded-2xl mx-auto flex items-center justify-center relative p-3 bg-white">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UKMRugbyUnugiri_Session_2026" 
                      alt="Presence QR"
                      className="w-full h-full object-contain"
                    />
                    {/* Simulated scanning laser line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-yellow-500 top-1/2 shadow-lg shadow-yellow-500 animate-bounce" />
                  </div>
                  <span className="block font-mono text-[11px] text-yellow-500 tracking-wider">TEMPELKAN QR QR-CODE LATIHAN</span>
                </div>

                {/* Manual form */}
                <form onSubmit={handlePresenceSubmit} className="space-y-4">
                  <h4 className="font-sans font-bold text-sm text-slate-200">Presensi Kehadiran Manual</h4>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">NAMA LENGKAP</label>
                    <input
                      type="text"
                      required
                      value={presName}
                      onChange={(e) => setPresName(e.target.value)}
                      placeholder="Masukkan nama"
                      className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">NIM (NOMOR INDUK MAHASISWA)</label>
                    <input
                      type="text"
                      required
                      value={presNim}
                      onChange={(e) => setPresNim(e.target.value)}
                      placeholder="Contoh: 312023xxxx"
                      className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">SESI LATIHAN SEKARANG</label>
                    <select
                      value={presSession}
                      onChange={(e) => setPresSession(e.target.value)}
                      className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none"
                    >
                      {schedules.map(sch => (
                        <option key={sch.id} value={sch.type}>{sch.day} - {sch.type}</option>
                      ))}
                      <option value="Latihan Mandiri Tambahan">Latihan Mandiri Tambahan</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-bold rounded-xl text-sm"
                  >
                    KIRIM DATA PRESENSI
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 2. E-CERTIFICATE MODAL */}
        {activeModal === 'e-cert' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <Award className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">E-Certificate Generator</h3>
                <p className="text-xs text-slate-400 mt-1">Cetak sertifikat keaktifan resmi dari pengurus UKM Rugby Unugiri</p>
              </div>
            </div>

            {isCertGenerated ? (
              <div className="space-y-6 animate-fade-in select-none">
                {/* Print Layout */}
                <div 
                  ref={certRef}
                  className="bg-[#050C1F] border-8 border-yellow-500/30 p-6 sm:p-10 rounded-2xl relative shadow-2xl bg-gradient-to-br from-[#070D22] to-[#040819]"
                >
                  {/* Subtle Background Watermarks */}
                  <div className="absolute inset-4 border border-yellow-500/10 rounded-lg pointer-events-none" />
                  <div className="text-center space-y-4 relative z-10">
                    <span className="block font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-yellow-550">SERTIFIKAT PENGHARGAAN</span>
                    
                    <h4 className="font-serif italic font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                      UKM Rugby Unugiri Bojonegoro
                    </h4>
                    
                    <div className="h-0.5 w-16 bg-yellow-500 mx-auto my-3" />
                    
                    <p className="text-slate-400 text-xs sm:text-sm">Sertifikat ini diberikan dengan bangga kepada:</p>
                    
                    <h4 className="font-sans font-black text-xl sm:text-2xl text-yellow-400 tracking-wider uppercase underline decoration-yellow-500/20 underline-offset-8 py-2">
                      {certName}
                    </h4>
                    
                    <p className="text-slate-500 font-mono text-xs">NIM: {certNim}</p>
                    
                    <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Atas partisipasi aktif, kontribusi, dan sportivitas yang luar biasa dalam mengikuti agenda kegiatan:
                    </p>
                    
                    <p className="font-sans font-extrabold text-sm text-white bg-slate-900/60 py-2 border border-slate-800 rounded-lg max-w-md mx-auto">
                      "{certEvent}"
                    </p>

                    <div className="flex justify-between items-end pt-8 text-left text-slate-400 text-[10px] sm:text-xs">
                      <div>
                        <div>Bojonegoro, Juni 2026</div>
                        <div>Ketua Umum UKM Rugby</div>
                        <div className="h-10" />
                        <div className="font-sans font-bold text-white">REZA GUMILANG</div>
                      </div>
                      <div className="relative w-16 h-16 border border-slate-850 p-1 bg-white rounded">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Verify_Unugiri_Rugby_Cert" 
                          alt="QR Verification"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCertGenerated(false)}
                    className="flex-1 py-3 border border-yellow-500/20 hover:border-yellow-500/50 text-yellow-500 font-sans font-bold rounded-xl text-sm"
                  >
                    Ubah Data Cert
                  </button>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-bold rounded-xl text-sm flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>CETAK / SIMPAN PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGenerateCert} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">NAMA DI SERTIFIKAT</label>
                  <input
                    type="text"
                    required
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">NIM (NOMOR INDUK MAHASISWA)</label>
                  <input
                    type="text"
                    required
                    value={certNim}
                    onChange={(e) => setCertNim(e.target.value)}
                    placeholder="Masukkan NIM Anda"
                    className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">PROGRAM KEGIATAN</label>
                  <select
                    value={certEvent}
                    onChange={(e) => setCertEvent(e.target.value)}
                    className="w-full bg-[#0C1226] border border-slate-800 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none"
                  >
                    <option value="Open Recruitment UKM Rugby 2026">Open Recruitment UKM Rugby 2026</option>
                    <option value="Friendly Match Unugiri vs UTM Madura">Friendly Match Unugiri vs UTM Madura</option>
                    <option value="Sesi Latihan Kejuaraan Nasional Sevens">Sesi Latihan Kejuaraan Nasional Sevens</option>
                    <option value="Coaching Clinic Basic Rugby Skills">Coaching Clinic Basic Rugby Skills</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-bold rounded-xl text-sm"
                >
                  BUAT SERTIFIKAT RESMI
                </button>
              </form>
            )}
          </div>
        )}

        {/* 3. POIN KEAKTIFAN LEADERBOARD MODAL */}
        {activeModal === 'poin-keaktifan' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <ShieldAlert className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Poin Keaktifan Anggota</h3>
                <p className="text-xs text-slate-400 mt-1">Daftar anggota teraktif berdasarkan poin kehadiran latihan & turnamen</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar">
              {leaderboard.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 bg-[#0C142A]/60 border border-slate-850 rounded-xl"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Rank Number Badge */}
                    <span className={`w-8 h-8 rounded-full font-mono text-sm font-black flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500 text-[#0a1128] font-black' :
                      index === 1 ? 'bg-slate-300 text-[#0a1128] font-black' :
                      index === 2 ? 'bg-amber-700 text-[#0a1128] font-black' :
                      'text-slate-400 bg-slate-850 border border-slate-800/80'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-slate-200">{item.name}</h4>
                      <p className="text-[10px] text-slate-450 font-sans">
                        Sesi Selesai: {item.completedSessions} kali latihan
                      </p>
                    </div>
                  </div>

                  {/* Points Badge */}
                  <div className="text-right">
                    <span className="block font-mono text-base font-black text-yellow-500 leading-none">{item.points}</span>
                    <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                      item.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      item.tier === 'Silver' ? 'bg-slate-300/10 text-slate-300 border border-slate-300/20' :
                      'bg-amber-600/10 text-amber-500 border border-amber-600/20'
                    }`}>
                      {item.tier} Tier
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-yellow-550/5 border border-yellow-500/10 rounded-2xl flex items-center space-x-3 text-slate-400">
              <span className="text-yellow-500 font-mono font-bold text-sm">💡</span>
              <p className="text-[11px] leading-relaxed">
                Check-in presensi QR pada saat latihan menyumbang <strong>+25 poin</strong>. Sedangkan bermain sebagai perwakilan lomba regional menyumbang <strong>+100 poin keaktifan</strong>.
              </p>
            </div>
          </div>
        )}

        {/* 4. EVENT MANAGEMENT MODAL */}
        {activeModal === 'event-mgmt' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Event Management</h3>
                <p className="text-xs text-slate-400 mt-1">Registrasi dan ikuti agenda kejuaraan serta rekrutmen terbaru</p>
              </div>
            </div>

            {rsvpSuccess ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">✔</div>
                <h4 className="font-sans font-extrabold text-lg text-white">RSVP BERHASIL</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto">
                  Anda telah terdaftar untuk agenda event ini. Tim kami akan segera menghubungi atau memberikan tiket detail ke akun Anda!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Event Card (Kejurnas) */}
                <div className="p-4 bg-[#0C142A]/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-yellow-500 bg-yellow-500/5 border border-yellow-500/10 px-2 py-0.5 rounded">REGULAR EVENT</span>
                    <h4 className="font-sans font-bold text-sm text-white mt-1">Coaching Clinic: Rugby Basic Skills</h4>
                    <p className="text-slate-400 text-xs mt-1">📅 15 Juni 2026 | 📍 Lapangan Kampus Unugiri</p>
                  </div>
                  
                  {/* Miniature Inside RSVP Action */}
                  <form onSubmit={handleEventRsvp} className="w-full sm:w-auto flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="Nama & NIM" 
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="bg-[#050C1E] border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 outline-none"
                    />
                    <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-sans font-bold text-xs rounded-lg uppercase tracking-wide">
                      Ikuti Event
                    </button>
                  </form>
                </div>

                {/* Event Card 2 (Coaching clinic) */}
                <div className="p-4 bg-[#0C142A]/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center opacity-70">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">COMPLETED</span>
                    <h4 className="font-sans font-bold text-sm text-white mt-1">Try Out Akbar Jatim Rugby</h4>
                    <p className="text-slate-400 text-xs mt-1">📅 22 Mei 2026 | 📍 KONI Surabaya</p>
                  </div>
                  <span className="text-slate-500 font-sans font-bold text-xs">Event Selesai</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. LIVE SCORE & SOCIAL CHAT MODAL */}
        {activeModal === 'live-score' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <Swords className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Live Match Score Card</h3>
                <p className="text-xs text-slate-400 mt-1">Hasil sela & live chat suporter pada penyiaran tanding terkini</p>
              </div>
            </div>

            {/* Active Live Match Display */}
            <div className="bg-[#0C142A]/80 border border-yellow-500/20 p-5 rounded-2xl relative shadow-md select-none bg-gradient-to-t from-[#0C142A]/90 to-[#101E42]">
              <div className="absolute top-3 left-3 flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-650 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="font-mono text-[9px] font-black text-red-500 uppercase tracking-widest pl-1">LIVE CHAT & MATCH</span>
              </div>

              <div className="text-center space-y-4 pt-4">
                <h4 className="font-sans font-bold text-xs text-slate-300">LIGA MAHASISWA JATIM - SEMIFINAL</h4>
                
                <div className="flex items-center justify-center space-x-6 sm:space-x-12">
                  <div className="text-center font-sans">
                    <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto text-xl font-black mb-1">U</div>
                    <span className="font-sans font-bold text-sm text-white">UNUGIRI</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-3xl font-black text-yellow-500">19</span>
                    <span className="font-sans text-slate-500 font-bold">:</span>
                    <span className="font-mono text-3xl font-black text-slate-300">12</span>
                  </div>

                  <div className="text-center font-sans">
                    <div className="w-12 h-12 bg-slate-800 text-slate-300 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-1">UM</div>
                    <span className="font-sans font-bold text-sm text-slate-300">UM Malang</span>
                  </div>
                </div>

                <p className="text-slate-450 text-[10px] sm:text-xs">Babak Kedua - Menit ke-18 | Stadion Gelora Bojonegoro</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chat room */}
              <div className="space-y-3 bg-[#090F21] border border-slate-800 p-4 rounded-xl flex flex-col justify-between max-h-[220px]">
                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-grow">
                  {comments.map((cm, idx) => (
                    <div key={idx} className="text-xs space-y-0.5 border-b border-slate-850/60 pb-1">
                      <div className="flex justify-between items-center text-slate-400">
                        <span className="font-bold text-yellow-500">{cm.name}</span>
                        <span className="text-[9px] font-mono text-slate-500">{cm.time}</span>
                      </div>
                      <p className="text-slate-200">{cm.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2 pt-2 border-t border-slate-850">
                  <input
                    type="text"
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis pesan..."
                    className="flex-grow bg-[#050C1E] border border-slate-850 px-3 py-1.5 rounded-lg text-xs text-white outline-none"
                  />
                  <button type="submit" className="px-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-lg text-xs font-bold">
                    Kirim
                  </button>
                </form>
              </div>

              {/* Vote for Player of the Match */}
              <div className="p-4 bg-[#090F21] border border-slate-850 rounded-xl space-y-3">
                <h4 className="font-sans font-bold text-xs text-slate-200 uppercase tracking-widest border-b border-slate-850 pb-2 flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  <span>VOTE MAN OF THE MATCH</span>
                </h4>
                
                <div className="space-y-2">
                  {Object.keys(momVotes).map(player => (
                    <button
                      key={player}
                      onClick={() => handleVoteMOM(player)}
                      disabled={hasVotedMOM}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 hover:border-yellow-500/10 hover:bg-white/5 bg-[#0C1226]/50 text-left transition-all disabled:opacity-85 text-xs text-slate-200"
                    >
                      <span className="font-sans font-medium">{player}</span>
                      <span className="font-mono font-bold text-yellow-500 bg-yellow-500/5 border border-yellow-500/10 px-2 py-0.5 rounded">
                        {momVotes[player]} Vote
                      </span>
                    </button>
                  ))}
                </div>
                {hasVotedMOM && (
                  <p className="text-[10px] text-emerald-400 text-center font-semibold italic">Terima kasih atas voting Anda! ✓</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. DAFTAR ANGGOTA BARU FORM MODAL */}
        {activeModal === 'daftarmodal' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <UserPlus className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Pendaftaran Anggota Baru</h3>
                <p className="text-xs text-slate-400 mt-1">Bergabung ke jajaran keluarga besar UKM Rugby Unugiri Bojonegoro</p>
              </div>
            </div>

            {regSuccess ? (
              <div className="py-12 text-center space-y-4 animate-fade-in select-none">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">✔</div>
                <h4 className="font-sans font-extrabold text-lg text-white">PENDAFTARAN CORES BERHASIL!</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                  Selamat! Anda telah terdaftar sebagai calon anggota UKM Rugby Unugiri. Detil data Anda berhasil dienkripsi dan disimpan di sistem lokal kami. Pengurus akan segera menghubungi Anda melalui WhatsApp!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="space-y-4 max-h-[420px] overflow-y-auto custom-scrollbar pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">NAMA LENGKAP</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">NIM (NOMOR INDUK MAHASISWA)</label>
                    <input
                      type="text"
                      required
                      value={regNim}
                      onChange={(e) => setRegNim(e.target.value)}
                      placeholder="Contoh: 312023xxxx"
                      className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">ALAMAT EMAIL</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="contoh@gmail.com"
                      className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">NOMOR WHATSAPP</label>
                    <input
                      type="text"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0822xxxxxxxx"
                      className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">PROGRAM STUDI / JURUSAN</label>
                    <input
                      type="text"
                      required
                      value={regMajor}
                      onChange={(e) => setRegMajor(e.target.value)}
                      placeholder="Contoh: Teknik Informatika"
                      className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">JENIS KELAMIN</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRegGender('Laki-laki')}
                        className={`flex-1 py-2.5 rounded-xl font-sans text-xs font-bold border transition-all ${
                          regGender === 'Laki-laki'
                            ? 'bg-yellow-500 text-[#0A1128] border-yellow-500'
                            : 'bg-[#0C1226] border-slate-850 text-slate-400'
                        }`}
                      >
                        Laki-laki
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegGender('Perempuan')}
                        className={`flex-1 py-2.5 rounded-xl font-sans text-xs font-bold border transition-all ${
                          regGender === 'Perempuan'
                            ? 'bg-yellow-500 text-[#0A1128] border-yellow-500'
                            : 'bg-[#0C1226] border-slate-850 text-slate-400'
                        }`}
                      >
                        Perempuan
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">ALASAN INGIN GABUNG RUGBY</label>
                  <textarea
                    rows={3}
                    value={regReason}
                    onChange={(e) => setRegReason(e.target.value)}
                    placeholder="Ceritakan motivasi atau ketertarikan Anda terhadap olahraga Rugby"
                    className="w-full bg-[#0C1226] border border-slate-850 px-4 py-2.5 rounded-xl text-slate-200 text-sm focus:border-yellow-500/50 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-black tracking-wider uppercase rounded-xl text-sm mt-3"
                >
                  DAFTAR SEBAGAI ANGGOTA SEKARANG
                </button>
              </form>
            )}
          </div>
        )}

        {/* 7. NEWS READER LONG-FORM MODAL */}
        {activeModal === 'news_reader' && selectedNews && (
          <div className="space-y-6">
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-white/5 shadow-md">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-yellow-500 text-[#0A1128] font-mono text-xs font-bold rounded-lg uppercase tracking-wide">
                {selectedNews.category}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono">
                <span>{selectedNews.date}</span>
                <span>•</span>
                <span>Dimuat oleh: Humas Rugby Unugiri</span>
              </div>
              <h3 className="font-sans font-black text-lg sm:text-2xl text-white tracking-tight leading-snug">
                {selectedNews.title}
              </h3>
            </div>

            <div className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 max-h-[290px] overflow-y-auto custom-scrollbar pr-3">
              {selectedNews.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-850">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 font-sans font-bold text-xs uppercase cursor-pointer"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        )}

        {/* 8. JADWAL LENGKAP DETAILED MODAL */}
        {activeModal === 'jadwal_lengkap' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="p-3 bg-yellow-500/10 rounded-2xl">
                <Calendar className="w-6 h-6 text-yellow-500" />
              </span>
              <div>
                <h3 className="font-sans font-black text-lg sm:text-xl text-white uppercase leading-none">Kalender Latihan Lengkap</h3>
                <p className="text-xs text-slate-400 mt-1">Daftar detil menu latihan, lokasi koordinasi lapangan, dan perlengkapan wajib</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar pr-2">
              {schedules.map((sch) => (
                <div key={sch.id} className="p-4 bg-[#0C142A]/60 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center bg-yellow-500/5 border border-yellow-500/10 px-3 py-1.5 rounded-xl">
                    <span className="font-sans font-black text-base text-yellow-500">{sch.day}</span>
                    <span className="font-mono text-xs text-slate-300">{sch.time} WIB</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-slate-500 font-mono">LOKASI LATIHAN</span>
                      <span className="font-sans font-bold text-slate-200">{sch.location}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 font-mono">MENU LATIHAN</span>
                      <span className="font-sans font-medium text-slate-300">{sch.type}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-850 text-slate-450 text-[10px] space-y-1">
                    <div className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">🎒 PERLENGKAPAN WAJIB :</div>
                    <p className="leading-relaxed">Jersey latihan (Gelap/Terang), Sepatu rugby/bola, Pelindung gigi (Gum shield), & Air botol minum pribadi.</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <a 
                href="https://wa.me/62822xxxxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center bg-[#070D22] border border-slate-800 hover:border-yellow-500/20 text-slate-300 font-sans font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                Hubungi Koordinator Latihan (WA)
              </a>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-sans font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <Printer className="w-4 h-4" />
                <span>Simpan Jadwal Utama</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
