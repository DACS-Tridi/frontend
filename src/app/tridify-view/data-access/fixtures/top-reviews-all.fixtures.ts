import { ReviewHighlight } from '../../models/discovery.models';

export const TOP_REVIEWS_ALL_FIXTURE: ReviewHighlight[] = [
  {
    id: 1,
    user: 'juani_del_under',
    userId: 1,
    album: 'Radiohead — KID A (2000)',
    albumId: '6GjwtEZcfenmOf6l18N7T7',
    highlight:
      'Che, este disco es un golazo total. "Everything in its Right Place" te raja la cabeza al medio. Difícil de entrada, pero si le das su tiempo te regala algo zarpado que no te olvidás más.',
    cover: 'radial-gradient(circle at 20% 20%, #ffb347, #ff0844 60%, #1a1a1a 90%)',
    rating: 4.9,
    stats: { likes: 327, comments: 44, shares: 12 },
    tags: ['Art Rock Piola', 'Electrónica Zarpada', 'Avant-Garde'],
    tone: 'violet',
    postedAt: '2026-05-28T10:15:00Z'
  },
  {
    id: 2,
    user: 'el_matador_sonic',
    userId: 2,
    album: 'Los Redondos — Lobo Suelto Cordero Atado (1993)',
    albumId: 'redondos-lobo-suelto',
    highlight:
      'El Indio en la cima. Cada tema de este disco es una historia completa con la poesía más honesta del rock nacional. "Jijiji" es un himno que nunca va a morir.',
    cover: 'radial-gradient(circle at 40% 40%, #22c55e, #15803d 55%, #052e16 90%)',
    rating: 5.0,
    stats: { likes: 512, comments: 88, shares: 34 },
    tags: ['Rock Nacional', 'Himno', 'Redonditos'],
    tone: 'violet',
    postedAt: '2026-05-26T08:45:00Z'
  },
  {
    id: 3,
    user: 'beatriz_punk',
    userId: 3,
    album: 'Sumo — Llegando Los Monos (1986)',
    albumId: 'sumo-llegando-los-monos',
    highlight:
      'La banda de la calle. Luca con esa voz de garage que mezcla el punk con el rock argento de la forma más honesta que existió. "Heroína" te raja la cabeza, punto.',
    cover: 'radial-gradient(circle at 50% 30%, #a855f7, #6d28d9 55%, #1a0a2e 90%)',
    rating: 4.8,
    stats: { likes: 289, comments: 31, shares: 19 },
    tags: ['Punk Rock Argento', 'Under Porteño', 'Clásico'],
    tone: 'violet',
    postedAt: '2026-05-24T14:00:00Z'
  },
  {
    id: 4,
    user: 'cumbia_cósmica',
    userId: 4,
    album: 'Proyecto Ángel — Santiago (1990)',
    albumId: '2',
    highlight:
      'Una cumbia cósmica de la concha la lora. "Ciru-Cumbia" es un temazazo imposible de olvidar, te mete en trance al toque. Alta data del under platense.',
    cover: 'radial-gradient(circle at 30% 70%, #4facfe, #00f2fe 55%, #0c1f3f 90%)',
    rating: 4.7,
    stats: { likes: 214, comments: 22, shares: 8 },
    tags: ['Cumbia Futurista', 'Latin Psicodélica', 'Sintes del Bondi'],
    tone: 'cyan',
    postedAt: '2026-05-22T18:30:00Z'
  },
  {
    id: 5,
    user: 'synth_porteño',
    userId: 5,
    album: 'Virus — Superficies de Placer (1987)',
    albumId: 'virus-superficies-placer',
    highlight:
      'El disco más pop y más extraño de Virus a la vez. Federico Moura tenía una elegancia para escribir y cantar que no tenía nadie en Argentina. Un lujo del synth pop local.',
    cover: 'radial-gradient(circle at 30% 60%, #f97316, #ea580c 55%, #431407 90%)',
    rating: 4.5,
    stats: { likes: 178, comments: 15, shares: 7 },
    tags: ['Synth Pop Argento', 'Elegante', 'Under 80s'],
    tone: 'cyan',
    postedAt: '2026-05-20T09:00:00Z'
  },
  {
    id: 6,
    user: 'soda_fan_94',
    userId: 6,
    album: 'Soda Stereo — Doble Vida (1988)',
    albumId: 'soda-doble-vida',
    highlight:
      'Cerati en estado puro. "En la ciudad de la furia" es uno de esos temas que te marca para siempre. La producción de Carlos Alomar le dio una vuelta internacional que el rock argentino necesitaba.',
    cover: 'radial-gradient(circle at 70% 30%, #06b6d4, #0891b2 55%, #083344 90%)',
    rating: 4.7,
    stats: { likes: 401, comments: 53, shares: 28 },
    tags: ['Rock Nacional', 'New Wave', 'Clásico Argento'],
    tone: 'cyan',
    postedAt: '2026-05-18T16:45:00Z'
  },
  {
    id: 7,
    user: 'jazztronica_ba',
    userId: 7,
    album: 'Chick Corea — Return to Forever (1972)',
    albumId: 'chick-corea-rtf',
    highlight:
      'Jazz electrizao en su máxima expresión. Corea construyó algo que va más allá del género. Cada improvisación es un viaje que no sabés dónde termina. Un clásico que todo buen oído debería escuchar.',
    cover: 'radial-gradient(circle at 60% 40%, #ff6b6b, #c0392b 55%, #1a0a0a 90%)',
    rating: 4.6,
    stats: { likes: 143, comments: 18, shares: 6 },
    tags: ['Jazz Electrizao', 'Fusión', 'Clásico Internacional'],
    tone: 'violet',
    postedAt: '2026-05-16T11:20:00Z'
  },
  {
    id: 8,
    user: 'ambient_raro_club',
    userId: 8,
    album: 'Brian Eno — Ambient 1: Music for Airports (1978)',
    albumId: 'eno-airports',
    highlight:
      'Eno inventó un género con este disco. Es como aire, como silencio con textura. Lo ponés de fondo y de repente el cuarto entero se transforma. Ambiente raro en el mejor sentido posible.',
    cover: 'radial-gradient(circle at 50% 50%, #1dd1a1, #10ac84 55%, #0a3d29 90%)',
    rating: 4.4,
    stats: { likes: 97, comments: 9, shares: 4 },
    tags: ['Ambiente Raro', 'Experimental', 'Electrónica Zarpada'],
    tone: 'cyan',
    postedAt: '2026-05-14T07:30:00Z'
  },
  {
    id: 9,
    user: 'prog_rocanrolero',
    userId: 9,
    album: 'Pink Floyd — The Wall (1979)',
    albumId: 'pink-floyd-the-wall',
    highlight:
      'Una obra de arte conceptual que no tiene parangón. "Comfortably Numb" sola justifica toda la existencia del rock. Waters y Gilmour en el pico de su arte, creando algo que va a durar para siempre.',
    cover: 'radial-gradient(circle at 25% 75%, #7367f0, #4a3ab5 55%, #0d0a2e 90%)',
    rating: 5.0,
    stats: { likes: 634, comments: 102, shares: 67 },
    tags: ['Prog Rocanrolero', 'Conceptual', 'Clásico Internacional'],
    tone: 'violet',
    postedAt: '2026-05-12T20:00:00Z'
  },
  {
    id: 10,
    user: 'chill_piola_max',
    userId: 10,
    album: 'Tame Impala — Currents (2015)',
    albumId: 'tame-impala-currents',
    highlight:
      'Kevin Parker hizo un disco de pop psicodélico que suena igual de fresco hoy que cuando salió. "Let It Happen" es un trance de 8 minutos que no querés que termine nunca. Chill piola al máximo.',
    cover: 'radial-gradient(circle at 35% 65%, #17ead9, #0fb3a1 55%, #062b27 90%)',
    rating: 4.8,
    stats: { likes: 388, comments: 47, shares: 25 },
    tags: ['Chill Piola', 'Psicodélico', 'Pop Alternativo'],
    tone: 'cyan',
    postedAt: '2026-05-10T13:15:00Z'
  },
  {
    id: 11,
    user: 'noche_brava_dj',
    userId: 11,
    album: 'Daft Punk — Discovery (2001)',
    albumId: 'daft-punk-discovery',
    highlight:
      'El álbum que definió una generación. "Harder Better Faster Stronger" y "One More Time" son himnos absolutos. Daft Punk tomó el house y lo convirtió en algo que nadie esperaba: pop de otro mundo.',
    cover: 'radial-gradient(circle at 45% 45%, #5f27cd, #341f97 55%, #100a2e 90%)',
    rating: 4.9,
    stats: { likes: 467, comments: 71, shares: 43 },
    tags: ['Noche Brava', 'House', 'Electrónica Zarpada'],
    tone: 'violet',
    postedAt: '2026-05-08T22:00:00Z'
  },
  {
    id: 12,
    user: 'mirada_al_piso',
    userId: 12,
    album: 'My Bloody Valentine — Loveless (1991)',
    albumId: 'mbv-loveless',
    highlight:
      '"Loveless" es el disco que más paredes de sonido puedo escuchar en mi vida. Kevin Shields creó algo tan denso y etéreo al mismo tiempo que no tiene nombre. Mirada al piso para siempre.',
    cover: 'radial-gradient(circle at 55% 35%, #48dbfb, #0abde3 55%, #0a1f2e 90%)',
    rating: 4.6,
    stats: { likes: 201, comments: 28, shares: 13 },
    tags: ['Mirada al Piso', 'Shoegaze', 'Noise Rock'],
    tone: 'cyan',
    postedAt: '2026-05-06T17:30:00Z'
  },
  {
    id: 13,
    user: 'dub_conurbano',
    userId: 13,
    album: 'Cultura Profética — La Dulce Vida (2004)',
    albumId: 'cultura-profetica-dulce-vida',
    highlight:
      'Reggae y dub del conurbano en estado puro. Este disco es un himno para todos los que bancaron el sonido caribeño desde acá. Producción impecable y letras que no pasan de moda.',
    cover: 'radial-gradient(circle at 65% 55%, #ff9f43, #e58e26 55%, #2e1a00 90%)',
    rating: 4.3,
    stats: { likes: 156, comments: 20, shares: 9 },
    tags: ['Dub del Conurbano', 'Reggae', 'Latin'],
    tone: 'cyan',
    postedAt: '2026-05-04T10:00:00Z'
  },
  {
    id: 14,
    user: 'minimal_zarpado',
    userId: 14,
    album: 'Steve Reich — Music for 18 Musicians (1978)',
    albumId: 'reich-18-musicians',
    highlight:
      'El minimalismo más zarpado que existe. Reich construye sobre patrones simples algo de una complejidad brutal. Cada escucha revela capas nuevas. Es hipnótico de una forma que pocas músicas logran.',
    cover: 'radial-gradient(circle at 40% 60%, #f76b8a, #d63057 55%, #2e0010 90%)',
    rating: 4.5,
    stats: { likes: 88, comments: 11, shares: 3 },
    tags: ['Minimalismo Zarpado', 'Contemporáneo', 'Experimental'],
    tone: 'violet',
    postedAt: '2026-05-02T08:00:00Z'
  },
  {
    id: 15,
    user: 'punk_argento_77',
    userId: 15,
    album: 'Los Violadores — El Ritmo No Perdona (1983)',
    albumId: 'los-violadores-ritmo',
    highlight:
      'El punk argentino más crudo y honesto. Stuka y los pibes crearon algo tan furioso y tan local que no tiene comparación. Este disco es un documento histórico del under porteño que no puede faltar en ninguna biblioteca.',
    cover: 'radial-gradient(circle at 20% 80%, #ff4757, #c0392b 55%, #1a0505 90%)',
    rating: 4.4,
    stats: { likes: 173, comments: 24, shares: 11 },
    tags: ['Punk Rock Argento', 'Under Porteño', 'Histórico'],
    tone: 'violet',
    postedAt: '2026-04-30T15:00:00Z'
  }
];
