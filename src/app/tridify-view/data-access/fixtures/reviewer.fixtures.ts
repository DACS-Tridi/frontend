import { ReviewerSpotlight } from '../../models/discovery.models';

export const TOP_REVIEWERS_FIXTURE: ReviewerSpotlight[] = [
  {
    id: 1,
    username: '@elptadelfrente',
    name: 'El Pata del Frente',
    specialty: 'Neo-Psychedelia',
    highlight: '“Matías” es el disco definitivo para entender el under platense. No hay desperdicio.',
    avatarColor: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    streak: 48
  },
  {
    id: 2,
    username: '@bangelo',
    name: 'B. Angelo',
    specialty: 'Minimal Wave',
    highlight: 'Fiorito Records rescató esta joya perdida de 1983. Sintetizadores que cortan el aire.',
    avatarColor: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
    streak: 36
  },
  {
    id: 3,
    username: '@facuyalanf100',
    name: 'Facu Yalan F100',
    specialty: 'Italo Disco',
    highlight: '“Turbo Amor” se escucha mejor a 120 km/h. Disco brillante para autopistas nocturnas.',
    avatarColor: 'linear-gradient(135deg, #f6d365, #fda085)',
    streak: 28
  }
];
