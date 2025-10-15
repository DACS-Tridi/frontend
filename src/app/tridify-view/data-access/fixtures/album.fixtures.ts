import { UpcomingAlbum } from '../../models/discovery.models';

export const UPCOMING_ALBUMS_FIXTURE: UpcomingAlbum[] = [
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
];
