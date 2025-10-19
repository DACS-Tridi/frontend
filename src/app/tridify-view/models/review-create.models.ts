export interface ReviewCreateRequest {
  albumId: number;
  highlight: string;
  rating: number;
  tags: string[];
  tone: string;
  reviewBody: string;
}

export type ReviewCreatePayload = Omit<ReviewCreateRequest, 'reviewBody'>;
