/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  location: string;
  type: string; // 'Rutin' | 'Fisik' | 'Taktis'
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string; // 'Latihan' | 'Pertandingan' | 'Event' | 'Prestasi'
  url: string;
}

export interface MemberRegistration {
  id: string;
  name: string;
  nim: string;
  email: string;
  phone: string;
  major: string;
  gender: 'Laki-laki' | 'Perempuan';
  reason: string;
  status: 'Pending' | 'Disetujui' | 'Dihubungi';
  createdAt: string;
}

export interface PresenceRecord {
  id: string;
  name: string;
  nim: string;
  date: string;
  time: string;
  sessionType: string;
}

export interface ActiveMemberPoint {
  id: string;
  name: string;
  points: number;
  completedSessions: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
}

export interface GameScore {
  id: string;
  opponent: string;
  tournament: string;
  date: string;
  ourScore: number;
  opponentScore: number;
  status: 'Won' | 'Lost' | 'Draw' | 'Upcoming';
  time?: string;
  venue?: string;
}

export interface SkillRating {
  name: string;
  value: number; // 0 to 100
  color: string;
  description: string;
}
