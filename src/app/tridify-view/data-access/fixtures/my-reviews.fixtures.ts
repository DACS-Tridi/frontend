import { ReviewHighlight } from '../../models/discovery.models';

export const MY_REVIEWS_FIXTURE: ReviewHighlight[] = [
  {
    id: 101,
    user: 'vos_piola',
    userId: 99,
    album: 'Radiohead — KID A (2000)',
    albumId: '6GjwtEZcfenmOf6l18N7T7',
    highlight:
      'Este disco es lo más raro que escuché en mi vida y por eso me voló la cabeza. La forma en que mezclan electrónica con ese rock psicodélico es un golazo total. Te pide tiempo, pero cuando le encontrás la vuelta no hay retorno.',
    reviewBody:
      'Kid A te parte el bocho. Cada tema es un universo distinto y en conjunto forman algo que no tiene nombre. La producción de Nigel Godrich junto con Thom Yorke metió distorsión y texturas que para el 2000 eran de otro planeta.',
    cover: 'radial-gradient(circle at 20% 20%, #ffb347, #ff0844 60%, #1a1a1a 90%)',
    rating: 4.9,
    stats: { likes: 47, comments: 3, shares: 5 },
    tags: ['Art Rock Piola', 'Electrónica Zarpada', 'Avant-Garde'],
    tone: 'violet',
    postedAt: '2026-05-20T18:30:00Z'
  },
  {
    id: 102,
    user: 'vos_piola',
    userId: 99,
    album: 'Sumo — Llegando Los Monos (1986)',
    albumId: 'sumo-llegando-los-monos',
    highlight:
      'La banda de la calle. Luca con esa voz de garage que mezcla el punk con el rock argento de la forma más honesta que existió. "Heroína" te raja la cabeza, punto.',
    cover: 'radial-gradient(circle at 50% 30%, #a855f7, #6d28d9 55%, #1a0a2e 90%)',
    rating: 4.8,
    stats: { likes: 92, comments: 7, shares: 14 },
    tags: ['Punk Rock Argento', 'Under Porteño', 'Clásico'],
    tone: 'violet',
    postedAt: '2026-05-10T12:00:00Z'
  },
  {
    id: 103,
    user: 'vos_piola',
    userId: 99,
    album: 'Soda Stereo — Doble Vida (1988)',
    albumId: 'soda-doble-vida',
    highlight:
      'Cerati en estado puro. "En la ciudad de la furia" es uno de esos temas que te marca para siempre. La producción de Carlos Alomar le dio una vuelta internacional que el rock argentino necesitaba.',
    cover: 'radial-gradient(circle at 70% 30%, #06b6d4, #0891b2 55%, #083344 90%)',
    rating: 4.7,
    stats: { likes: 63, comments: 5, shares: 9 },
    tags: ['Rock Nacional', 'New Wave', 'Clásico Argento'],
    tone: 'cyan',
    postedAt: '2026-04-28T09:15:00Z'
  },
  {
    id: 104,
    user: 'vos_piola',
    userId: 99,
    album: 'Virus — Superficies de Placer (1987)',
    albumId: 'virus-superficies-placer',
    highlight:
      'El disco más pop y más extraño de Virus a la vez. Federico Moura tenía una elegancia para escribir y cantar que no tenía nadie en Argentina. Un lujo del synth pop local.',
    cover: 'radial-gradient(circle at 30% 60%, #f97316, #ea580c 55%, #431407 90%)',
    rating: 4.5,
    stats: { likes: 28, comments: 2, shares: 3 },
    tags: ['Synth Pop Argento', 'Elegante', 'Under 80s'],
    tone: 'cyan',
    postedAt: '2026-04-15T20:45:00Z'
  },
  {
    id: 105,
    user: 'vos_piola',
    userId: 99,
    album: 'Los Redondos — Lobo Suelto Cordero Atado (1993)',
    albumId: 'redondos-lobo-suelto',
    highlight:
      'El Indio en la cima. Cada tema de este disco es una historia completa con la poesía más honesta del rock nacional. "Jijiji" es un himno que nunca va a morir.',
    cover: 'radial-gradient(circle at 40% 40%, #22c55e, #15803d 55%, #052e16 90%)',
    rating: 5.0,
    stats: { likes: 134, comments: 11, shares: 22 },
    tags: ['Rock Nacional', 'Himno', 'Redonditos'],
    tone: 'violet',
    postedAt: '2026-03-30T16:00:00Z'
  }
];
