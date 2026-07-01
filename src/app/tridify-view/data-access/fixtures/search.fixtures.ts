import { SearchResultItem } from '../../models/discovery.models';
import { TOP_REVIEWS_FIXTURE } from './review.fixtures';
import { TOP_REVIEWERS_FIXTURE } from './reviewer.fixtures';
import { UPCOMING_ALBUMS_FIXTURE } from './album.fixtures';

interface TrackFixture {
  id: string;
  artist: string;
  title: string;
  albumTitle: string;
  duration: string;
}

const TRACKS_FIXTURE: TrackFixture[] = [
  { id: 'track-1', artist: 'Los Microclimas', title: 'Nebulosa del Sur', albumTitle: 'Cosmic Waves', duration: '4:12' },
  { id: 'track-2', artist: 'Los Microclimas', title: 'Ola de Calor Cósmica', albumTitle: 'Cosmic Waves', duration: '5:38' },
  { id: 'track-3', artist: 'Los Microclimas', title: 'Viento Electrónico', albumTitle: 'Cosmic Waves', duration: '3:55' },
  { id: 'track-4', artist: 'Anita Pliegues', title: 'Espectro Rosa', albumTitle: 'Spectral Bloom', duration: '3:47' },
  { id: 'track-5', artist: 'Anita Pliegues', title: 'Bloom Tardío', albumTitle: 'Spectral Bloom', duration: '4:20' },
  { id: 'track-6', artist: 'Anita Pliegues', title: 'Dreamwave Porteño', albumTitle: 'Spectral Bloom', duration: '6:01' },
  { id: 'track-7', artist: 'Proyecto Ángel', title: 'Ciru-Cumbia', albumTitle: 'Santiago', duration: '3:33' },
  { id: 'track-8', artist: 'Proyecto Ángel', title: 'Bailanta del Espacio', albumTitle: 'Santiago', duration: '4:44' },
  { id: 'track-9', artist: 'Radiohead', title: 'Everything in Its Right Place', albumTitle: 'KID A', duration: '4:11' },
  { id: 'track-10', artist: 'Radiohead', title: 'How to Disappear Completely', albumTitle: 'KID A', duration: '5:56' }
];

export const TRIDIFY_DISCOVERY_SEARCH_FIXTURE = (term: string): SearchResultItem[] => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const albumResults = UPCOMING_ALBUMS_FIXTURE.filter(album =>
    album.title.toLowerCase().includes(normalized) || album.artist.toLowerCase().includes(normalized)
  ).map<SearchResultItem>(album => ({
    id: String(album.id),
    type: 'album',
    title: album.title,
    description: album.artist,
    metadata: {
      artist: album.artist,
      releaseDate: album.releaseDate,
      tags: album.tags.join(', ')
    }
  }));

  const trackResults = TRACKS_FIXTURE.filter(track =>
    track.title.toLowerCase().includes(normalized) ||
    track.artist.toLowerCase().includes(normalized) ||
    track.albumTitle.toLowerCase().includes(normalized)
  ).map<SearchResultItem>(track => ({
    id: track.id,
    type: 'track',
    title: track.title,
    description: `${track.artist} — ${track.albumTitle}`,
    metadata: {
      artist: track.artist,
      albumTitle: track.albumTitle,
      duration: track.duration
    }
  }));

  const reviewResults = TOP_REVIEWS_FIXTURE.filter(review =>
    review.album.toLowerCase().includes(normalized) || review.user.toLowerCase().includes(normalized)
  ).map<SearchResultItem>(review => ({
    id: review.id,
    type: 'review',
    title: review.album,
    description: review.highlight,
    metadata: {
      reviewer: review.user,
      rating: review.rating
    }
  }));

  const curatorResults = TOP_REVIEWERS_FIXTURE.filter(reviewer =>
    reviewer.name.toLowerCase().includes(normalized) || reviewer.username.toLowerCase().includes(normalized)
  ).map<SearchResultItem>(reviewer => ({
    id: reviewer.id,
    type: 'curator',
    title: reviewer.name,
    description: reviewer.specialty,
    metadata: {
      handle: reviewer.username
    }
  }));

  return [...albumResults, ...trackResults, ...reviewResults, ...curatorResults];
};
