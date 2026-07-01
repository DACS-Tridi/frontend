# Servicios y Comunicacion con la API

## Arquitectura de servicios

```
BaseApiService (clase base)
    |
    ├── TridifyAlbumService     → Albumes
    ├── TridifyReviewService    → Reviews
    ├── TridifyReviewerService  → Reviewers
    ├── TridifyGenreService     → Generos musicales
    └── TridifyUserService      → Perfil de usuario Tridify
```

Todos los servicios de Tridify heredan de `BaseApiService`, que provee metodos HTTP estandar con manejo de errores, timeouts y reintentos.

## BaseApiService

Archivo: `src/app/core/services/base-api.service.ts`

Clase base que encapsula `HttpClient` de Angular. Todas las requests van a `environment.backendForFrontendUrl` (`http://localhost:9001/bff`).

### Metodos disponibles

| Metodo | Descripcion |
|---|---|
| `get<T>(endpoint, params?, timeout?)` | Request GET con retry x2 |
| `post<T>(endpoint, data, timeout?)` | Request POST |
| `put<T>(endpoint, data, timeout?)` | Request PUT |
| `delete<T>(endpoint, timeout?)` | Request DELETE |
| `patch<T>(endpoint, data, timeout?)` | Request PATCH |
| `checkConnection()` | Ping al backend para verificar conectividad |

### Manejo de errores

Todos los errores se transforman a un objeto `IApiError`:

```typescript
{
  error: true,
  errorCode: 'UNAUTHORIZED',              // Codigo del error
  errorDescription: 'No tiene permisos...', // Mensaje legible
  details: { ... },                        // Error original
  timestamp: '2024-...',                   // Cuando ocurrio
  requestId: 'req_123456_abc'              // ID unico para rastreo
}
```

Codigos de error manejados: `CLIENT_ERROR`, `NETWORK_ERROR`, `BAD_REQUEST`, `UNAUTHORIZED`, `NOT_FOUND`, `TIMEOUT`, `SERVER_ERROR`.

### Timeouts

| Tipo | Valor |
|---|---|
| Default | 30 segundos |
| Ping | 5 segundos |
| Upload | 60 segundos |

## Endpoints de la API

Archivo: `src/app/core/constants/api-endpoints.ts`

### BFF (Backend general)

| Constante | Endpoint | Uso |
|---|---|---|
| `BFF.PING` | `ping` | Health check rapido |
| `BFF.HEALTH` | `health` | Estado del backend |
| `BFF.USER` | `user` | Datos del usuario |
| `BFF.DASHBOARD` | `dashboard` | Datos del dashboard |

### Tridify

| Constante | Endpoint | Metodo | Descripcion |
|---|---|---|---|
| `TRIDIFY.USER_PROFILE` | `tridify/user-profile` | GET | Perfil del usuario en Tridify |
| `TRIDIFY.SEARCH` | `tridify/search` | POST | Buscar albumes/canciones |
| `TRIDIFY.UPCOMING_ALBUMS` | `tridify/upcoming-albums` | GET | Proximos lanzamientos |
| `TRIDIFY.ALL_REVIEWS` | `tridify/reviews` | GET | Todas las reviews |
| `TRIDIFY.TODAY_REVIEWS` | `tridify/reviews/today` | GET | Reviews del dia |
| `TRIDIFY.MY_REVIEWS` | `tridify/reviews/me` | GET | Reviews del usuario actual |
| `TRIDIFY.CREATE_REVIEW` | `tridify/reviews` | POST | Crear una review |
| `TRIDIFY.ALBUM_DETAIL` | `tridify/albums/:id` | GET | Detalle de un album |
| `TRIDIFY.ALBUM_REVIEWS` | `tridify/reviews/album/:id` | GET | Reviews de un album |
| `TRIDIFY.GENRES` | `tridify/genres` | GET | Lista de generos |
| `TRIDIFY.REVIEWER_SPOTLIGHT` | `tridify/reviewers/spotlight` | GET | Reviewers destacados |
| `TRIDIFY.DAILY_CHALLENGE` | `tridify/challenges/daily` | GET | Desafio del dia |

## Servicios de Tridify

### TridifyAlbumService

Archivo: `src/app/tridify-view/data-access/services/tridify-album.service.ts`

| Metodo | Endpoint | Descripcion |
|---|---|---|
| `getUpcomingAlbums()` | GET `tridify/upcoming-albums` | Proximos lanzamientos |
| `searchAlbums(payload)` | POST `tridify/search` | Buscar albumes (termino de busqueda) |
| `getAlbumDetail(spotifyId)` | GET `tridify/albums/:id` | Detalle de un album por Spotify ID |
| `getAlbumReviews(albumId)` | GET `tridify/reviews/album/:id` | Reviews de un album |

### TridifyReviewService

Archivo: `src/app/tridify-view/data-access/services/tridify-review.service.ts`

| Metodo | Endpoint | Descripcion |
|---|---|---|
| `getAllReviews()` | GET `tridify/reviews` | Todas las reviews |
| `getTopReviewsForToday()` | GET `tridify/reviews/today` | Top reviews del dia |
| `getDailyChallenge()` | GET `tridify/challenges/daily` | Desafio diario |
| `getMyReviews()` | GET `tridify/reviews/me` | Mis reviews |
| `createReview(payload)` | POST `tridify/reviews` | Crear una review nueva |

### TridifyUserService, TridifyGenreService, TridifyReviewerService

Siguen el mismo patron: heredan de `BaseApiService` y exponen metodos para sus endpoints respectivos.
