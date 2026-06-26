export type AvatarId =
  | 'cyber-skull'
  | 'robot-head'
  | 'hacker-cat'
  | 'vinyl-punk'
  | 'glitch-face'
  | 'synth-wave'
  | 'terminal-ghost'
  | 'dj-alien';

export const AVATAR_OPTIONS: { id: AvatarId; label: string }[] = [
  { id: 'cyber-skull', label: 'Cyber Skull' },
  { id: 'robot-head', label: 'Robot Head' },
  { id: 'hacker-cat', label: 'Hacker Cat' },
  { id: 'vinyl-punk', label: 'Vinyl Punk' },
  { id: 'glitch-face', label: 'Glitch Face' },
  { id: 'synth-wave', label: 'Synth Wave' },
  { id: 'terminal-ghost', label: 'Terminal Ghost' },
  { id: 'dj-alien', label: 'DJ Alien' },
];

export const DEFAULT_AVATAR: AvatarId = 'synth-wave';

export function getAvatarPath(avatarId: AvatarId | undefined | null): string {
  return `assets/avatars/avatar-${avatarId || DEFAULT_AVATAR}.svg`;
}

export interface TridifyUserProfile {
  id: string;
  username: string;
  displayName: string;
  roleTagline: string;
  avatarInitials: string;
  avatarGradient: string;
  avatarId?: AvatarId;
  streakDays: number;
}

export interface ReviewStats {
  likes: number;
  comments: number;
  shares: number;
}

export interface ReviewHighlight {
  id: number;
  user: string;
  userId: number;
  album: string;
  albumId: string;
  highlight: string;
  reviewBody?: string;
  cover: string;
  rating: number;
  stats: ReviewStats;
  tags: string[];
  tone: 'violet' | 'cyan';
  postedAt: string;
}

export interface ReviewerSpotlight {
  id: number;
  username: string;
  name: string;
  specialty: string;
  highlight: string;
  avatarColor: string;
  avatarId?: AvatarId;
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
  id: number;
  artist: string;
  title: string;
  releaseDate: string;
  cover: string;
  tags: string[];
}

export type SearchResultType = 'album' | 'track' | 'review' | 'curator';

export interface SearchResultItem {
  id: string | number;
  type: SearchResultType;
  title: string;
  description: string;
  metadata?: Record<string, string | number>;
}

export interface TridifySearchPayload {
  term: string;
  filters?: Record<string, string | number | boolean>;
}

export interface AlbumDetail {
  id: string;
  name: string;
  releaseDate: string;
  totalTracks: number;
  artists: string[];
  imageUrl: string;
}

export interface AlbumReviewsResponse {
  albumId: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewHighlight[];
}
