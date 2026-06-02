/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduleItem, NewsItem, GalleryImage, MemberRegistration, PresenceRecord, ActiveMemberPoint, GameScore, SkillRating } from './types';

// Default schedules matching the design image precisely
export const DEFAULT_SCHEDULES: ScheduleItem[] = [
  {
    id: 'sch1',
    day: 'Selasa',
    time: '15.30 - 17.30',
    location: 'Lapangan Kampus',
    type: 'Latihan Fisik & Teknik Dasar'
  },
  {
    id: 'sch2',
    day: 'Kamis',
    time: '15.30 - 17.30',
    location: 'Lapangan Kampus',
    type: 'Pola Penyerangan & Game Simulation'
  },
  {
    id: 'sch3',
    day: 'Minggu',
    time: '07.00 - 10.00',
    location: 'Stadion Daerah',
    type: 'Set Piece, Scrum, & Scrimmage Match'
  }
];

// Default news items matching the design image precisely
export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news1',
    title: 'Open Recruitment UKM Rugby Unugiri 2026',
    date: '20 Mei 2024',
    excerpt: 'UKM Rugby Unugiri membuka pendaftaran anggota baru untuk angkatan tahun 2026. Bergabunglah dan kembangkan potensimu bersama kami!',
    content: `Unit Kegiatan Mahasiswa (UKM) Rugby Universitas Nahdlatul Ulama Sunan Giri (UNUGIRI) Bojonegoro secara resmi membuka pendaftaran anggota baru (Open Recruitment) untuk tahun ajaran 2026.\n\nKegiatan ini ditujukan bagi seluruh mahasiswa UNUGIRI yang tertarik untuk mengenal, berlatih, dan berprestasi di cabang olahraga Rugby. Tidak diperlukan latar belakang atau pengalaman bermain sebelumnya, karena seluruh anggota baru akan dilatih dari dasar mulai dari teknik penanganan bola (ball handling), tackle yang aman, hingga pemahaman strategi formasi permainan.\n\nFasilitas yang Didapatkan:\n1. Sertifikat Keanggotaan Resmi.\n2. Pembinaan Atlet oleh Pelatih Berlisensi.\n3. Kesempatan Mengikuti Kejuaraan Regional & Nasional.\n4. Sertifikat Kegiatan (menambah poin keaktifan mahasiswa).\n5. Jaringan Alumni yang Luas.\n\nCara mendaftar sangatlah mudah, Anda cukup mengisi formulir pendaftaran secara online melalui website ini atau menghubungi narahubung yang tertera di bagian kontak. Mari bersama-sama kita pupuk sportivitas dan semangat juang demi nama baik almamater!`,
    category: 'Rekrutmen',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news2',
    title: 'Friendly Match Unugiri vs UTM',
    date: '15 Mei 2024',
    excerpt: 'Laga persahabatan seru antara tim Rugby Unugiri melawan Universitas Trunojoyo Madura guna menguji taktik menyerang.',
    content: `Dalam rangka mematangkan strategi permainan dan mengukur kesiapan fisik tim, UKM Rugby UNUGIRI telah melangsungkan pertandingan persahabatan melawan Universitas Trunojoyo Madura (UTM) di Lapangan Stadion Daerah.\n\nPertandingan yang berlangsung sengit ini berakhir dengan kemenangan tipis tim UNUGIRI dengan skor 19-12. Menit awal berjalan cukup menantang karena pertahanan UTM yang sangat solid. Namun, berkat kelincahan lini serang dan taktik 'quick passing' yang diinstruksikan oleh pelatih, tim UNUGIRI berhasil memecah kebuntuan melalui tiga kali try berturut-turut.\n\nLaga persahabatan ini sekaligus menjadi bahan evaluasi penting, terutama di sektor 'rucking' dan 'scrummage' sebelum tim bertolak menuju kejuaraan antar perguruan tinggi bulan depan. Terima kasih kepada kawan-kawan dari UTM atas pertandingan yang sportif!`,
    category: 'Pertandingan',
    image: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news3',
    title: 'Persiapan Kejuaraan Nasional Rugby 2024',
    date: '10 Mei 2024',
    excerpt: 'Skuad UKM Rugby Unugiri meningkatkan porsi latihan fisik dan skema taktis menjelang turnamen Kejurnas Rugby 7s.',
    content: `Menjelang digulirkannya Kejuaraan Nasional Rugby Sevens (7s) 2024 pada akhir tahun ini, skuad UKM Rugby UNUGIRI Bojonegoro mulai meningkatkan intensitas latihan. Dari yang semula dua kali seminggu, kini ditambah menjadi tiga kali seminggu termasuk porsi latihan kebugaran khusus di akhir pekan.\n\nPelatih kepala menekankan pentingnya endurance (daya tahan fisik) dan sprint speed (kecepatan lari). Pasalnya, format Rugby 7s sangat menuntut kecepatan reaksi dan stamina yang prima karena luas lapangan tetap sama namun dimainkan oleh jumlah pemain yang lebih sedikit.\n\n"Fokus kami bulan ini adalah pemantapan daya tahan kardio dan transisi cepat dari bertahan ke menyerang. Kami menargetkan untuk membawa pulang medali emas di Kejurnas kali ini," ujar Kapten Tim. Dukungan doa dan semangat dari seluruh civitas akademika UNUGIRI sangat berarti bagi kami!`,
    category: 'Prestasi',
    image: 'https://images.unsplash.com/photo-1511979093022-419a15cd68f2?w=600&auto=format&fit=crop&q=80'
  }
];

// Default gallery images matching sports themes
export const DEFAULT_GALLERY: GalleryImage[] = [
  {
    id: 'gal1',
    title: 'Sesi latihan fisik tim sore hari',
    category: 'Latihan',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal2',
    title: 'Try bersejarah melawan UTM',
    category: 'Pertandingan',
    url: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal3',
    title: 'Briefing taktis sebelum bertanding',
    category: 'Latihan',
    url: 'https://images.unsplash.com/photo-1511979093022-419a15cd68f2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal4',
    title: 'Foto bersama pasca penutupan kejurnas',
    category: 'Event',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal5',
    title: 'Selebrasi kemenangan di lapangan',
    category: 'Prestasi',
    url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=80'
  }
];

// Skill tracker levels
export const DEFAULT_SKILLS: SkillRating[] = [
  {
    name: 'Sprint',
    value: 85,
    color: '#EAB308', // yellow-500
    description: 'Kecepatan berlari penetrasi melewati pertahanan lawan'
  },
  {
    name: 'Passing',
    value: 78,
    color: '#EAB308',
    description: 'Akurasi dan kelancaran umpan lateral/belakang'
  },
  {
    name: 'Tackling',
    value: 82,
    color: '#EAB308',
    description: 'Kekuatan dan ketepatan menjatuhkan lawan dengan aman'
  },
  {
    name: 'Endurance',
    value: 90,
    color: '#EAB308',
    description: 'Daya tahan stamina selama 2 babak penuh'
  }
];

// Default member active points (Leaderboard)
export const DEFAULT_LEADERBOARD: ActiveMemberPoint[] = [
  { id: 'lead1', name: 'Muhammad Ihsan', points: 450, completedSessions: 18, tier: 'Gold' },
  { id: 'lead2', name: 'Ahmad Fauzi', points: 420, completedSessions: 16, tier: 'Gold' },
  { id: 'lead3', name: 'Reza Aditya', points: 380, completedSessions: 15, tier: 'Silver' },
  { id: 'lead4', name: 'Siska Amalia', points: 350, completedSessions: 14, tier: 'Silver' },
  { id: 'lead5', name: 'Denny Hidayat', points: 290, completedSessions: 11, tier: 'Bronze' }
];

// Default scores for Unugiri matches (Live & Recent Scores)
export const DEFAULT_SCORES: GameScore[] = [
  {
    id: 'score1',
    opponent: 'UTM Madura',
    tournament: 'Laga Persahabatan',
    date: '15 Mei 2024',
    ourScore: 19,
    opponentScore: 12,
    status: 'Won',
    venue: 'Stadion Gelora Bangkalan'
  },
  {
    id: 'score2',
    opponent: 'Universitas Brawijaya',
    tournament: 'Kejurnas Rugby 7s',
    date: '30 Apr 2024',
    ourScore: 15,
    opponentScore: 10,
    status: 'Won',
    venue: 'Lapangan Kuningan Jakarta'
  },
  {
    id: 'score3',
    opponent: 'UNAIR Surabaya',
    tournament: 'Piala Gubernur Jatim',
    date: '12 Mar 2024',
    ourScore: 7,
    opponentScore: 12,
    status: 'Lost',
    venue: 'Lapangan KONI Surabaya'
  },
  {
    id: 'score4',
    opponent: 'ITS Surabaya',
    tournament: 'Kejurnas Rugby 7s',
    date: '18 Feb 2024',
    ourScore: 24,
    opponentScore: 5,
    status: 'Won',
    venue: 'GOR Ragunan Jakarta'
  },
  {
    id: 'score5',
    opponent: 'UNESA Surabaya',
    tournament: 'Liga Rugby Mahasiswa',
    date: '25 Jan 2024',
    ourScore: 12,
    opponentScore: 12,
    status: 'Draw',
    venue: 'Lapangan Kampus Lidah Wetan UNESA'
  },
  {
    id: 'score_live',
    opponent: 'UM Malang',
    tournament: 'Liga Kebangsaan Semifinal',
    date: 'Hari ini',
    time: '20.00 WIB',
    ourScore: 0,
    opponentScore: 0,
    status: 'Upcoming',
    venue: 'Stadion Unugiri Bojonegoro'
  }
];

// Helper functions for localStorage persistence
const STORAGE_PREFIX = 'ukm_rugby_unugiri_';

export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error fetching from localStorage:', error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}
