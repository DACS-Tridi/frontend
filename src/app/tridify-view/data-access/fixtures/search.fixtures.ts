import { SearchResultItem } from '../../models/discovery.models';
import { TOP_REVIEWS_FIXTURE } from './review.fixtures';
import { TOP_REVIEWERS_FIXTURE } from './reviewer.fixtures';
import { UPCOMING_ALBUMS_FIXTURE } from './album.fixtures';

export const TRIDIFY_DISCOVERY_SEARCH_FIXTURE = (term: string): SearchResultItem[] => {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

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

  const albumResults = UPCOMING_ALBUMS_FIXTURE.filter(album =>
    album.title.toLowerCase().includes(normalized) || album.artist.toLowerCase().includes(normalized)
  ).map<SearchResultItem>(album => ({
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
