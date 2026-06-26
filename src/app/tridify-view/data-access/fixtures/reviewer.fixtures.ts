import { ReviewerSpotlight } from '../../models/discovery.models';

export const TOP_REVIEWERS_FIXTURE: ReviewerSpotlight[] = [
  {
    id: 1,
    username: '@elptadelfrente',
    name: 'El Pata del Frente',
    specialty: 'Neo-Psicodelia',
    highlight:
      '"Matías" es el disco definitivo para entender el under platense. No hay desperdicio, cada tema es un viaje zarpado. Lo bancamos desde el primer ensayo.',
    avatarColor: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    avatarId: 'vinyl-punk',
    streak: 48
  },
  {
    id: 2,
    username: '@bangelo',
    name: 'B. Angelo',
    specialty: 'Minimal Wave',
    highlight:
      'Fiorito Records rescató esta joya perdida de 1983. Sintetizadores que te cortan el aire, che. Puro escabio para los oídos, bien piola.',
    avatarColor: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    avatarId: 'terminal-ghost',
    streak: 36
  },
  {
    id: 3,
    username: '@facuyalanf100',
    name: 'Facu Yalan F100',
    specialty: 'Italo Disco',
    highlight:
      '"Turbo Amor" se escucha mejor a 120 km/h en la autopista de noche. Disco brillante y zarpado, un temazazo que te vuela la peluca.',
    avatarColor: 'linear-gradient(135deg, #f6d365, #fda085)',
    avatarId: 'dj-alien',
    streak: 28
  }
];
