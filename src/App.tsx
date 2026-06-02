/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_SCHEDULES, 
  DEFAULT_NEWS, 
  DEFAULT_GALLERY, 
  DEFAULT_LEADERBOARD, 
  DEFAULT_SCORES, 
  getFromStorage, 
  saveToStorage 
} from './data';
import { 
  ScheduleItem, 
  NewsItem, 
  GalleryImage, 
  MemberRegistration, 
  PresenceRecord, 
  ActiveMemberPoint, 
  GameScore 
} from './types';

// Importing sub-components
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureLinks from './components/FeatureLinks';
import JadwalLatihan from './components/JadwalLatihan';
import BeritaTerbaru from './components/BeritaTerbaru';
import GaleriKegiatan from './components/GaleriKegiatan';
import JoinUsBanner from './components/JoinUsBanner';
import SkillTracker from './components/SkillTracker';
import StatistikTim from './components/StatistikTim';
import QuickActionsRow from './components/QuickActionsRow';
import InteractiveModals from './components/InteractiveModals';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { Shield, BookOpen, Calendar, Users, Target, Volume2, UsersRound, Award } from 'lucide-react';

export default function App() {
  // --- Persistent Local States ---
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [registrations, setRegistrations] = useState<MemberRegistration[]>([]);
  const [scores, setScores] = useState<GameScore[]>([]);
  const [presences, setPresences] = useState<PresenceRecord[]>([]);
  const [leaderboard, setLeaderboard] = useState<ActiveMemberPoint[]>([]);

  // --- Modal & Panel States ---
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryImage | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // --- Initialize data on load ---
  useEffect(() => {
    setSchedules(getFromStorage<ScheduleItem[]>('schedules', DEFAULT_SCHEDULES));
    setNews(getFromStorage<NewsItem[]>('news', DEFAULT_NEWS));
    setRegistrations(getFromStorage<MemberRegistration[]>('registrations', []));
    setScores(getFromStorage<GameScore[]>('scores', DEFAULT_SCORES));
    setPresences(getFromStorage<PresenceRecord[]>('presences', []));
    setLeaderboard(getFromStorage<ActiveMemberPoint[]>('leaderboard', DEFAULT_LEADERBOARD));
  }, []);

  // --- Dynamic State Setters & Synced LocalStorage ---
  const handleAddRegistration = (newReg: Omit<MemberRegistration, 'id' | 'status' | 'createdAt'>) => {
    const reg: MemberRegistration = {
      ...newReg,
      id: 'reg_' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('id-ID')
    };
    const updated = [...registrations, reg];
    setRegistrations(updated);
    saveToStorage('registrations', updated);
  };

  const handleUpdateRegStatus = (id: string, status: 'Pending' | 'Disetujui' | 'Dihubungi') => {
    const updated = registrations.map(r => r.id === id ? { ...r, status } : r);
    setRegistrations(updated);
    saveToStorage('registrations', updated);
  };

  const handleDeleteReg = (id: string) => {
    const updated = registrations.filter(r => r.id !== id);
    setRegistrations(updated);
    saveToStorage('registrations', updated);
  };

  const handleAddPresence = (newPres: Omit<PresenceRecord, 'id' | 'date' | 'time'>) => {
    const pres: PresenceRecord = {
      ...newPres,
      id: 'pres_' + Date.now(),
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    const updatedPresences = [...presences, pres];
    setPresences(updatedPresences);
    saveToStorage('presences', updatedPresences);

    // Dynamic presence points trigger: add points (+25) to leaderboards!
    const existingLeaderIdx = leaderboard.findIndex(l => l.name.toLowerCase() === pres.name.toLowerCase());
    if (existingLeaderIdx !== -1) {
      const updatedLeader = [...leaderboard];
      updatedLeader[existingLeaderIdx].points += 25;
      updatedLeader[existingLeaderIdx].completedSessions += 1;
      setLeaderboard(updatedLeader);
      saveToStorage('leaderboard', updatedLeader);
    } else {
      const newLeader: ActiveMemberPoint = {
        id: 'lead_' + Date.now(),
        name: pres.name,
        points: 25,
        completedSessions: 1,
        tier: 'Bronze'
      };
      const updatedLeader = [...leaderboard, newLeader];
      setLeaderboard(updatedLeader);
      saveToStorage('leaderboard', updatedLeader);
    }
  };

  const handleAddNews = (newNews: Omit<NewsItem, 'id' | 'date'>) => {
    const item: NewsItem = {
      ...newNews,
      id: 'news_' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    };
    const updated = [item, ...news];
    setNews(updated);
    saveToStorage('news', updated);
  };

  const handleDeleteNews = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    saveToStorage('news', updated);
  };

  const handleUpdateSchedule = (updatedSch: ScheduleItem) => {
    const updated = schedules.map(s => s.id === updatedSch.id ? updatedSch : s);
    setSchedules(updated);
    saveToStorage('schedules', updated);
  };

  const handleAddScore = (newScore: Omit<GameScore, 'id'>) => {
    const scoreVal: GameScore = {
      ...newScore,
      id: 'score_' + Date.now()
    };
    const updated = [scoreVal, ...scores];
    setScores(updated);
    saveToStorage('scores', updated);
  };

  const handleDeleteScore = (id: string) => {
    const updated = scores.filter(s => s.id !== id);
    setScores(updated);
    saveToStorage('scores', updated);
  };

  // --- Smooth Scrolling Navigation Handler ---
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Feature Clicking router ---
  const handleFeatureTrigger = (featureId: string) => {
    if (featureId === 'jadwal') {
      handleScrollToSection('jadwal');
    } else if (featureId === 'skill-tracker') {
      handleScrollToSection('skill-tracker');
    } else if (featureId === 'presensi' || featureId === 'poin-keaktifan') {
      setActiveModal(featureId);
    } else if (featureId === 'prestasidok') {
      handleScrollToSection('prestasi');
    } else if (featureId === 'daftarmodal') {
      setActiveModal('daftarmodal');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans relative selection:bg-yellow-500 selection:text-slate-950 overflow-x-hidden antialiased">
      
      {/* 1. Header component */}
      <Header 
        onJoinClick={() => setActiveModal('daftarmodal')}
        onAdminClick={() => setIsAdminOpen(true)}
        onNavigate={handleScrollToSection}
      />

      {/* 2. Main Hero Area */}
      <Hero 
        onJoinClick={() => setActiveModal('daftarmodal')}
        onStatsClick={() => handleScrollToSection('prestasi')}
      />

      {/* 3. Horizontal shortcut banner overlapping the hero */}
      <FeatureLinks onFeatureClick={handleFeatureTrigger} />

      {/* 4. MAIN BODY CONTAINER (Bento Grid) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8 relative z-10">
        
        {/* ROW 1 BENTO GRID: Schedule, News, Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="jadwal">
          {/* Calendar module */}
          <div className="lg:col-span-1">
            <JadwalLatihan 
              schedules={schedules} 
              onOpenScheduleDetail={() => setActiveModal('jadwal_lengkap')}
            />
          </div>

          {/* News portal column */}
          <div className="lg:col-span-1" id="berita">
            <BeritaTerbaru 
              news={news}
              onReadNews={(item) => {
                setSelectedNews(item);
                setActiveModal('news_reader');
              }}
              onSeeAllNews={() => {
                setSelectedNews(news[0] || null);
                setActiveModal('news_reader');
              }}
            />
          </div>

          {/* Sports image portfolio gallery category bento */}
          <div className="lg:col-span-1" id="galeri">
            <GaleriKegiatan 
              gallery={DEFAULT_GALLERY}
              onImageClick={(img) => {
                setSelectedNews({
                  id: img.id,
                  title: img.title,
                  date: 'Juni 2026',
                  excerpt: `Dokumentasi resmi kategori ${img.category}.`,
                  content: `Aktivitas visual memamerkan jajaran tim Rugby Unugiri Bojonegoro dalam agenda ${img.category} (${img.title}). Foto ini diambil secara profesional di arena tanding.`,
                  category: img.category,
                  image: img.url
                });
                setActiveModal('news_reader');
              }}
            />
          </div>
        </section>

        {/* ROW 2 BENTO GRID: Join us card, Skill interactive progress tracker, Score & stats ledger */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="prestasi">
          {/* Join Us golden card banner */}
          <div className="lg:col-span-1">
            <JoinUsBanner onJoinClick={() => setActiveModal('daftarmodal')} />
          </div>

          {/* Skills progress meters with recommendation analyzer */}
          <div className="lg:col-span-1" id="skill-tracker">
            <SkillTracker />
          </div>

          {/* Historical lists and matches scores */}
          <div className="lg:col-span-1">
            <StatistikTim onShowMatchDetails={() => setActiveModal('live-score')} />
          </div>
        </section>

        {/* 5. TENTANG KAMI / INTRO ABOUT SECTION */}
        <section className="bg-[#050C1E] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center" id="tentang">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-yellow-500">
              <Shield className="w-5 h-5" />
              <span className="font-mono text-xs font-black tracking-widest uppercase">PROFIL SECURE</span>
            </div>
            
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none">
              MENGENAL LEBIH DEKAT <br/> <span className="text-yellow-500">UKM RUGBY UNUGIRI</span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Berdiri atas dasar semangat kekeluargaan dan gairah tinggi terhadap olahraga kontak fisik taktis, 
              <strong> UKM Rugby Universitas Nahdlatul Ulama Sunan Giri Bojonegoro </strong> dibentuk untuk mencetak 
              pribadi-pribadi tangguh, berdisiplin tinggi, serta berjiwa kepemimpinan kuat.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#0C142A] border border-slate-800 rounded-xl space-y-2">
                <Target className="w-6 h-6 text-yellow-500" />
                <h4 className="font-sans font-bold text-sm text-white">Visi Utama</h4>
                <p className="text-[11px] text-slate-400">Menjadi pusat pembinaan olahraga Rugby terbaik di lingkup universitas swasta nasional.</p>
              </div>
              <div className="p-4 bg-[#0C142A] border border-slate-800 rounded-xl space-y-2">
                <Volume2 className="w-6 h-6 text-yellow-500" />
                <h4 className="font-sans font-bold text-sm text-white">Prinsip Nilai</h4>
                <p className="text-[11px] text-slate-400">Brotherhood (Persaudaraan), Integrity (Integritas), & Respect (Saling Menghargai).</p>
              </div>
            </div>
          </div>

          {/* Photo banner representation */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 saturate-110 h-72 sm:h-96">
            <img 
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80" 
              alt="Rugby Brotherhood" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft gradient banner inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 select-none">
              <span className="font-mono text-[10px] text-yellow-500 tracking-widest uppercase">TEMPUR & MENANG</span>
              <h4 className="font-sans font-extrabold text-lg text-white mt-1">Satu Tekad, Satu Jiwa Untuk Unugiri Bojonegoro!</h4>
            </div>
          </div>
        </section>

        {/* 6. TIM & JAJARAN PENGURUS SECTION */}
        <section className="space-y-8 select-none" id="tim">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-yellow-500">
              <UsersRound className="w-5 h-5 animate-pulse" />
              <span className="font-mono text-xs font-black tracking-widest uppercase">STRUKTUR UTAMA</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">JAJARAN INTI & ATLET</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-normal">Kenali pilar penggerak di balik pencapaian prestasi UKM Rugby Unugiri.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-[#050C1E] border border-white/5 p-4 rounded-2xl hover:border-yellow-500/10 transition-colors text-center space-y-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto bg-slate-900 border-2 border-yellow-500/20 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                  alt="Reza Gumilang" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white">Reza Gumilang</h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-yellow-500 tracking-wider uppercase mt-1">Ketua Umum UKM</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#050C1E] border border-white/5 p-4 rounded-2xl hover:border-yellow-500/10 transition-colors text-center space-y-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto bg-slate-900 border-2 border-yellow-500/20 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" 
                  alt="Muhammad Ihsan" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white">Muhammad Ihsan</h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-yellow-500 tracking-wider uppercase mt-1">Wakil Ketua & Kapten</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#050C1E] border border-white/5 p-4 rounded-2xl hover:border-yellow-500/10 transition-colors text-center space-y-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto bg-slate-900 border-2 border-yellow-500/20 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80" 
                  alt="Siska Amalia" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white">Siska Amalia</h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-yellow-500 tracking-wider uppercase mt-1">Sekretaris & Bendahara</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#050C1E] border border-white/5 p-4 rounded-2xl hover:border-yellow-500/10 transition-colors text-center space-y-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto bg-slate-900 border-2 border-yellow-500/20 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" 
                  alt="Ahmad Fauzi" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm sm:text-base text-white">Ahmad Fauzi</h4>
                <p className="font-mono text-[9px] sm:text-[10px] text-yellow-500 tracking-wider uppercase mt-1">Kord. Latihan & Pelatih</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. QUICK ACTIONS MENU TRIGGER SECTION */}
        <QuickActionsRow onActionClick={handleFeatureTrigger} />

      </main>

      {/* 8. Footer Area */}
      <Footer 
        onNavigate={handleScrollToSection}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* 9. OVERLAY MODALS */}
      <InteractiveModals 
        activeModal={activeModal}
        onClose={() => {
          setActiveModal(null);
          setSelectedNews(null);
        }}
        selectedNews={selectedNews}
        schedules={schedules}
        leaderboard={leaderboard}
        scores={scores}
        onAddRegistration={handleAddRegistration}
        onAddPresence={handleAddPresence}
      />

      {/* 10. SECRET HIGH-FIDELITY ADMIN CONTROLLER TO MANAGE DATA IN REVENUE */}
      <AdminDashboard 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        news={news}
        schedules={schedules}
        registrations={registrations}
        scores={scores}
        onAddNews={handleAddNews}
        onDeleteNews={handleDeleteNews}
        onUpdateSchedule={handleUpdateSchedule}
        onAddScore={handleAddScore}
        onDeleteScore={handleDeleteScore}
        onUpdateRegStatus={handleUpdateRegStatus}
        onDeleteReg={handleDeleteReg}
      />

    </div>
  );
}
