import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ReviewCard {
  user: string;
  album: string;
  highlight: string;
  cover: string;
  rating: number;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags: string[];
  tone: 'violet' | 'cyan';
}

interface ReviewerCard {
  username: string;
  name: string;
  specialty: string;
  highlight: string;
  avatarColor: string;
  streak: number;
}

interface GenreTag {
  label: string;
  accent: string;
}

@Component({
  selector: 'app-tridify-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tridify-view.html',
  styleUrls: ['./tridify-view.css']
})
export class TridifyViewComponent {
  protected mobileMenuOpen = false;

  protected readonly navigationPrimary = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🧭', label: 'Explore', active: false },
    { icon: '👤', label: 'My Profile', active: false }
  ];

  protected readonly navigationLibrary = [
    { icon: '📝', label: 'My Reviews' },
    { icon: '⭐', label: 'Favorite Reviews' },
    { icon: '🗂️', label: 'Review Drafts' }
  ];

  protected readonly navigationCommunity = [
    { icon: '🔥', label: 'Popular Reviews' },
    { icon: '🎧', label: 'Top Reviews' },
    { icon: '🎯', label: 'Daily Challenge' }
  ];

  protected readonly topReviews: ReviewCard[] = [
    {
      user: 'juani',
      album: 'Radiohead - KID A (2000)',
      highlight:
        'El disco que redefinió cómo podía sonar el rock. “Everything In Its Right Place” es hipnótica, “How to Disappear Completely” te atrapa al instante, y “Idioteque” sigue siendo un himno del mundo. Difícil, sí, pero si le das su tiempo, te vuela la cabeza.',
      cover: 'radial-gradient(circle at 20% 20%, #ffb347, #ff0844 60%, #1a1a1a 90%)',
      rating: 4.9,
      stats: { likes: 327, comments: 4, shares: 12 },
      tags: ['Art Rock', 'Electronic', 'Avant-Garde'],
      tone: 'violet'
    },
    {
      user: 'santiago',
      album: 'Proyecto Ángel - Santiago (1990)',
      highlight:
        'Un viaje cósmico de cumbia con alma tech. El tema “Ciru-Cumbia” es un mantra imposible de ignorar. Entre el sonido de los sintetizadores y los cantos de Ángeles, el Disco directamente te transporta a otro planeta.',
      cover: 'radial-gradient(circle at 30% 70%, #4facfe, #00f2fe 55%, #0c1f3f 90%)',
      rating: 4.7,
      stats: { likes: 214, comments: 12, shares: 8 },
      tags: ['Cumbia Futurista', 'Latin Fusion'],
      tone: 'cyan'
    }
  ];

  protected readonly topReviewers: ReviewerCard[] = [
    {
      username: '@elptadelfrente',
      name: 'El Pata del Frente',
      specialty: 'Neo-Psychedelia',
      highlight: '“Matías” es el disco definitivo para entender el under platense. No hay desperdicio.',
      avatarColor: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      streak: 48
    },
    {
      username: '@bangelo',
      name: 'B. Angelo',
      specialty: 'Minimal Wave',
      highlight: 'Fiorito Records rescató esta joya perdida de 1983. Sintetizadores que cortan el aire.',
      avatarColor: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
      streak: 36
    },
    {
      username: '@facuyalanf100',
      name: 'Facu Yalan F100',
      specialty: 'Italo Disco',
      highlight: '“Turbo Amor” se escucha mejor a 120 km/h. Disco brillante para autopistas nocturnas.',
      avatarColor: 'linear-gradient(135deg, #f6d365, #fda085)',
      streak: 28
    }
  ];

  protected readonly genres: GenreTag[] = [
    { label: 'Progressive Rock', accent: '#7367f0' },
    { label: 'Chillwave', accent: '#17ead9' },
    { label: 'Minimal', accent: '#f76b8a' },
    { label: 'Dubstep', accent: '#ff9f43' },
    { label: 'Nightcore', accent: '#5f27cd' },
    { label: 'Shoegaze', accent: '#48dbfb' },
    { label: 'Jazztronica', accent: '#ff6b6b' },
    { label: 'Ambient', accent: '#1dd1a1' }
  ];

  protected readonly dailyChallenge = {
    title: 'Daily Challenge',
    subtitle: 'Review a hidden gem from the 80s',
    description: 'Explora tu biblioteca y encuentra un disco olvidado con menos de 5k reproducciones.',
    streakLabel: 'Current streak',
    streakValue: 7
  };

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  protected getRatingStars(rating: number): Array<'full' | 'half' | 'empty'> {
    const stars: Array<'full' | 'half' | 'empty'> = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalf && stars.length < 5) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }
}
