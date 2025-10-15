import {
  DailyChallenge,
  GenreChip,
  ReviewHighlight,
  ReviewerSpotlight,
  SearchResultItem,
  TridifyUserProfile,
  UpcomingAlbum
} from '../models/discovery.models';

export const TRIDIFY_DISCOVERY_FIXTURES: {
  userProfile: TridifyUserProfile;
  topReviews: ReviewHighlight[];
  topReviewers: ReviewerSpotlight[];
  genres: GenreChip[];
  dailyChallenge: DailyChallenge;
  upcomingAlbums: UpcomingAlbum[];
} = {
  userProfile: {
    id: 'user-juani',
    username: 'juani',
    displayName: 'juani',
    roleTagline: 'Underground curator',
    avatarInitials: 'J',
    avatarGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    streakDays: 12
  },
  topReviews: [
    {
      id: 'review-kid-a',
      user: 'juani',
      album: 'Radiohead - KID A (2000)',
      highlight:
        'El disco que redefinió cómo podía sonar el rock. “Everything In Its Right Place” es hipnótica, “How to Disappear Completely” te atrapa al instante, y “Idioteque” sigue siendo un himno del mundo. Difícil, sí, pero si le das su tiempo, te vuela la cabeza.',
      cover: 'radial-gradient(circle at 20% 20%, #ffb347, #ff0844 60%, #1a1a1a 90%)',
      rating: 4.9,
      stats: { likes: 327, comments: 4, shares: 12 },
      tags: ['Art Rock', 'Electronic', 'Avant-Garde'],
      tone: 'violet',
      postedAt: '2024-10-18T10:15:00Z'
    },
    {
      id: 'review-proyecto-angel',
      user: 'santiago',
      album: 'Proyecto Ángel - Santiago (1990)',
      highlight:
        'Un viaje cósmico de cumbia con alma tech. El tema “Ciru-Cumbia” es un mantra imposible de ignorar. Entre el sonido de los sintetizadores y los cantos de Ángeles, el Disco directamente te transporta a otro planeta.',
      cover: 'radial-gradient(circle at 30% 70%, #4facfe, #00f2fe 55%, #0c1f3f 90%)',
      rating: 4.7,
      stats: { likes: 214, comments: 12, shares: 8 },
      tags: ['Cumbia Futurista', 'Latin Fusion'],
      tone: 'cyan',
      postedAt: '2024-10-18T08:45:00Z'
    }
  ],
  topReviewers: [
    {
      id: 'reviewer-elptadelfrente',
      username: '@elptadelfrente',
      name: 'El Pata del Frente',
      specialty: 'Neo-Psychedelia',
      highlight: '“Matías” es el disco definitivo para entender el under platense. No hay desperdicio.',
      avatarColor: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      streak: 48
    },
    {
      id: 'reviewer-bangelo',
      username: '@bangelo',
      name: 'B. Angelo',
      specialty: 'Minimal Wave',
      highlight: 'Fiorito Records rescató esta joya perdida de 1983. Sintetizadores que cortan el aire.',
      avatarColor: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
      streak: 36
    },
    {
      id: 'reviewer-facuyalanf100',
      username: '@facuyalanf100',
      name: 'Facu Yalan F100',
      specialty: 'Italo Disco',
      highlight: '“Turbo Amor” se escucha mejor a 120 km/h. Disco brillante para autopistas nocturnas.',
      avatarColor: 'linear-gradient(135deg, #f6d365, #fda085)',
      streak: 28
    }
  ],
  genres: [
    { id: 'genre-progressive-rock', label: 'Progressive Rock', accent: '#7367f0' },
    { id: 'genre-chillwave', label: 'Chillwave', accent: '#17ead9' },
    { id: 'genre-minimal', label: 'Minimal', accent: '#f76b8a' },
    { id: 'genre-dubstep', label: 'Dubstep', accent: '#ff9f43' },
    { id: 'genre-nightcore', label: 'Nightcore', accent: '#5f27cd' },
    { id: 'genre-shoegaze', label: 'Shoegaze', accent: '#48dbfb' },
    { id: 'genre-jazztronica', label: 'Jazztronica', accent: '#ff6b6b' },
    { id: 'genre-ambient', label: 'Ambient', accent: '#1dd1a1' }
  ],
  dailyChallenge: {
    title: 'Daily Challenge',
    subtitle: 'Review a hidden gem from the 80s',
    description: 'Explora tu biblioteca y encuentra un disco olvidado con menos de 5k reproducciones.',
    streakLabel: 'Current streak',
    streakValue: 7
  },
  upcomingAlbums: [
    {
      id: 'upcoming-cosmic-waves',
      artist: 'Los Microclimas',
      title: 'Cosmic Waves',
      releaseDate: '2024-11-08',
      cover: 'radial-gradient(circle at 30% 20%, #34d399, #047857 55%, #0f172a 90%)',
      tags: ['Neo-Perreo', 'Downtempo']
    },
    {
      id: 'upcoming-spectral',
      artist: 'Anita Pliegues',
      title: 'Spectral Bloom',
      releaseDate: '2024-11-15',
      cover: 'radial-gradient(circle at 75% 30%, #818cf8, #312e81 60%, #111827 95%)',
      tags: ['Art Pop', 'Dreamwave']
    }
  ]
};

export const TRIDIFY_DISCOVERY_SEARCH_FIXTURE = (term: string): SearchResultItem[] => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const reviewResults = TRIDIFY_DISCOVERY_FIXTURES.topReviews
    .filter(review =>
      review.album.toLowerCase().includes(normalized) || review.user.toLowerCase().includes(normalized)
    )
    .map<SearchResultItem>(review => ({
      id: review.id,
      type: 'review',
      title: review.album,
      description: review.highlight,
      metadata: {
        reviewer: review.user,
        rating: review.rating
      }
    }));

  const curatorResults = TRIDIFY_DISCOVERY_FIXTURES.topReviewers
    .filter(reviewer =>
      reviewer.name.toLowerCase().includes(normalized) || reviewer.username.toLowerCase().includes(normalized)
    )
    .map<SearchResultItem>(reviewer => ({
      id: reviewer.id,
      type: 'curator',
      title: reviewer.name,
      description: reviewer.specialty,
      metadata: {
        handle: reviewer.username
      }
    }));

  const albumResults = TRIDIFY_DISCOVERY_FIXTURES.upcomingAlbums
    .filter(album =>
      album.title.toLowerCase().includes(normalized) || album.artist.toLowerCase().includes(normalized)
    )
    .map<SearchResultItem>(album => ({
      id: album.id,
      type: 'album',
      title: `${album.artist} - ${album.title}`,
      description: `Sale ${new Date(album.releaseDate).toLocaleDateString()}`,
      metadata: {
        releaseDate: album.releaseDate
      }
    }));

  return [...reviewResults, ...curatorResults, ...albumResults];
};
