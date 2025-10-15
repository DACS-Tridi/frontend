import { DailyChallenge, ReviewHighlight } from '../../models/discovery.models';

export const TOP_REVIEWS_FIXTURE: ReviewHighlight[] = [
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
];

export const DAILY_CHALLENGE_FIXTURE: DailyChallenge = {
  title: 'Daily Challenge',
  subtitle: 'Review a hidden gem from the 80s',
  description: 'Explora tu biblioteca y encuentra un disco olvidado con menos de 5k reproducciones.',
  streakLabel: 'Current streak',
  streakValue: 7
};
