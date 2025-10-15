export interface TridifyUserProfile {
  id: string;
  username: string;
  displayName: string;
  roleTagline: string;
  avatarInitials: string;
  avatarGradient: string;
  streakDays: number;
}

export interface ReviewStats {
  likes: number;
  comments: number;
  shares: number;
}

export interface ReviewHighlight {
  id: string;
  user: string;
  album: string;
  highlight: string;
  cover: string;
  rating: number;
  stats: ReviewStats;
  tags: string[];
  tone: 'violet' | 'cyan';
  postedAt: string;
}

export interface ReviewerSpotlight {
  id: string;
  username: string;
  name: string;
  specialty: string;
  highlight: string;
  avatarColor: string;
  streak: number;
}

export interface GenreChip {
  id: string;
  label: string;
  accent: string;
}

export interface DailyChallenge {
  title: string;
  subtitle: string;
  description: string;
  streakLabel: string;
  streakValue: number;
}

export interface UpcomingAlbum {
  id: string;
  artist: string;
  title: string;
  releaseDate: string;
  cover: string;
  tags: string[];
}

export type SearchResultType = 'album' | 'review' | 'curator';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  metadata?: Record<string, string | number>;
}

export interface TridifySearchPayload {
  term: string;
  filters?: Record<string, string | number | boolean>;
}
