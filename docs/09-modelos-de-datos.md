# Modelos de Datos

## Modelos de API (core)

Archivo: `src/app/core/models/api-response.ts`

### IApiResponse<T>

Respuesta estandar de la API:
```typescript
{
  success: boolean;       // Si la operacion fue exitosa
  data: T;                // Los datos (generico)
  message?: string;       // Mensaje opcional
  timestamp: string;      // Timestamp ISO
  requestId?: string;     // ID unico del request
}
```

### IApiError

Error de la API:
```typescript
{
  error: boolean;            // Siempre true
  errorCode: string;         // Codigo: 'UNAUTHORIZED', 'NOT_FOUND', etc.
  errorDescription: string;  // Mensaje legible
  details?: any;             // Error original del servidor
  timestamp: string;
  requestId?: string;
}
```

### IPagination / IPaginatedResponse<T>

Paginacion:
```typescript
{
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### ISearchFilters

Filtros de busqueda:
```typescript
{
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}
```

---

## Modelos de Tridify

Archivo: `src/app/tridify-view/models/discovery.models.ts`

### TridifyUserProfile

Perfil de usuario en Tridify:
```typescript
{
  id: string;
  username: string;
  displayName: string;
  roleTagline: string;      // Ej: "Reviewer Experto"
  avatarInitials: string;    // Ej: "SC"
  avatarGradient: string;    // Gradiente CSS para el avatar
  avatarId?: AvatarId;       // ID del avatar tematico
  streakDays: number;        // Dias consecutivos activo
}
```

### ReviewHighlight

Una review destacada:
```typescript
{
  id: number;
  user: string;              // Nombre del usuario
  userId: number;
  album: string;             // Nombre del album
  albumId: string;           // Spotify ID del album
  highlight: string;         // Frase destacada
  reviewBody?: string;       // Review completa
  cover: string;             // URL de la portada o gradiente CSS
  rating: number;            // 0 a 5
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags: string[];            // Ej: ['rock', 'indie']
  tone: 'violet' | 'cyan';  // Tema visual
  postedAt: string;          // Fecha ISO
}
```

### ReviewerSpotlight

Reviewer destacado:
```typescript
{
  id: number;
  username: string;
  name: string;
  specialty: string;         // Ej: "Rock Alternativo"
  highlight: string;         // Frase destacada del reviewer
  avatarColor: string;       // Color del avatar
  avatarId?: AvatarId;
  streak: number;            // Dias de racha
}
```

### GenreChip

Chip de genero musical:
```typescript
{
  id: string;
  label: string;             // Ej: "Rock"
  accent: string;            // Color CSS del chip
}
```

### DailyChallenge

Desafio del dia:
```typescript
{
  title: string;
  subtitle: string;
  description: string;
  streakLabel: string;
  streakValue: number;
}
```

### AlbumDetail

Detalle de album (de Spotify):
```typescript
{
  id: string;                // Spotify ID
  name: string;
  releaseDate: string;
  totalTracks: number;
  artists: string[];
  imageUrl: string;
}
```

### AlbumReviewsResponse

Reviews de un album:
```typescript
{
  albumId: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewHighlight[];
}
```

### SearchResultItem

Resultado de busqueda:
```typescript
{
  id: string | number;
  type: 'album' | 'track' | 'review' | 'curator';
  title: string;
  description: string;
  metadata?: Record<string, string | number>;  // spotifyId, etc.
}
```

### AvatarId

Tipo para IDs de avatar:
```typescript
type AvatarId =
  | 'cyber-skull' | 'robot-head' | 'hacker-cat' | 'vinyl-punk'
  | 'glitch-face' | 'synth-wave' | 'terminal-ghost' | 'dj-alien';
```

---

## Modelos de creacion de review

Archivo: `src/app/tridify-view/models/review-create.models.ts`

### ReviewCreatePayload

Payload para crear una review:
```typescript
{
  albumId: string;       // Spotify ID (22 chars alfanumericos)
  highlight: string;     // Frase destacada (max 320 chars)
  rating: number;        // 0 a 5
  tags: string[];        // Tags
  tone: string;          // 'violet' o 'cyan'
  reviewBody: string;    // Cuerpo de la review (max 2000 chars)
}
```
