import { DailyChallenge, ReviewHighlight } from '../../models/discovery.models';

export const TOP_REVIEWS_FIXTURE: ReviewHighlight[] = [
  {
    id: 1,
    user: 'juani_del_under',
    userId: 1,
    album: 'Radiohead — KID A (2000)',
    albumId: '1',
    highlight:
      'Che, este disco es un golazo total. "Everything in its Right Place" te raja la cabeza al medio. Difícil de entrada, pero si le das su tiempo te regala algo zarpado que no te olvidás más. Una joya del under que pocos bancaron en su momento.',
    cover: 'radial-gradient(circle at 20% 20%, #ffb347, #ff0844 60%, #1a1a1a 90%)',
    rating: 4.9,
    stats: { likes: 327, comments: 4, shares: 12 },
    tags: ['Art Rock Piola', 'Electrónica Zarpada', 'Avant-Garde'],
    tone: 'violet',
    postedAt: '2024-10-18T10:15:00Z'
  },
  {
    id: 2,
    user: 'el_matador_sonic',
    userId: 2,
    album: 'Proyecto Ángel — Santiago (1990)',
    albumId: '2',
    highlight:
      'Una cumbia cósmica de la concha la lora. "Ciru-Cumbia" es un temazazo imposible de olvidar, te mete en trance al toque. Ángeles laburó re piola en los sintes, y el resultado es algo que no existe en ningún lado más que acá. Alta data del under platense.',
    cover: 'radial-gradient(circle at 30% 70%, #4facfe, #00f2fe 55%, #0c1f3f 90%)',
    rating: 4.7,
    stats: { likes: 214, comments: 12, shares: 8 },
    tags: ['Cumbia Futurista', 'Latin Psicodélica', 'Sintes del Bondi'],
    tone: 'cyan',
    postedAt: '2024-10-18T08:45:00Z'
  }
];

export const DAILY_CHALLENGE_FIXTURE: DailyChallenge = {
  title: 'Desafío del Día',
  subtitle: 'Rescatá una joya escondida de los 80s',
  description:
    'Buscá en tu biblioteca y encontrá un disco re olvidado con menos de 5 lucas de reproducciones. Hay temazos que nadie escucha y merecen figurar.',
  streakLabel: 'Racha actual',
  streakValue: 7
};
