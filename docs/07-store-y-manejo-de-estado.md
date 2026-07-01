# Store y Manejo de Estado

## TridifyDiscoveryStore

Archivo: `src/app/tridify-view/data-access/tridify-discovery.store.ts`

Es el **centro de datos** de Tridify. Usa el patron Store con `BehaviorSubject` de RxJS (no usa NgRx ni otra libreria externa).

Va pidiendo datos y guardandolos acá.

## Como funciona

```
Componente                    Store                         Servicio HTTP
    |                           |                                |
    |-- subscribe(topReviews$)--|                                |
    |                           |                                |
    |-- initialize() ---------->|                                |
    |                           |-- loadTopReviews() ----------->|
    |                           |                                |-- GET /tridify/reviews/today
    |                           |                                |<- [reviews]
    |                           |<- reviewsSubject.next(reviews) |
    |<- topReviews$ emite ------|                                |
    |                           |                                |
    |   (SI LA API FALLA)       |                                |
    |                           |<- catchError ------------------|
    |                           |-- usa FIXTURES (datos mock) -->|
    |<- topReviews$ emite ------|                                |
```

## Datos que maneja

| Observable | Tipo | Descripcion |
|---|---|---|
| `userProfile$` | `TridifyUserProfile \| null` | Perfil del usuario en Tridify |
| `topReviews$` | `ReviewHighlight[]` | Top reviews del dia |
| `topReviewers$` | `ReviewerSpotlight[]` | Reviewers destacados |
| `genres$` | `GenreChip[]` | Generos musicales disponibles |
| `dailyChallenge$` | `DailyChallenge \| null` | Desafio del dia |
| `upcomingAlbums$` | `UpcomingAlbum[]` | Proximos lanzamientos |
| `searchResults$` | `SearchResultItem[]` | Resultados de busqueda |
| `myReviews$` | `ReviewHighlight[]` | Reviews del usuario actual |

## Metodos publicos

| Metodo | Que hace |
|---|---|
| `initialize()` | Carga todos los datos iniciales (perfil, reviews, generos, etc.) |
| `search(term)` | Busca albumes/canciones y actualiza `searchResults$` |
| `clearSearch()` | Limpia los resultados de busqueda |

## Estrategia de fallback con Fixtures

Cada metodo de carga tiene un `catchError` que usa datos mock si la API falla:

```typescript
this.reviewService.getTopReviewsForToday()
  .pipe(
    take(1),
    catchError(error => {
      console.warn('Using fixture reviews after API error', error);
      return of(TOP_REVIEWS_FIXTURE);  // <-- datos hardcodeados
    })
  )
  .subscribe(reviews => this.topReviewsSubject.next(reviews));
```

Esto garantiza que la app siempre muestra contenido, incluso sin backend.

## Fixtures disponibles

Ubicadas en `src/app/tridify-view/data-access/fixtures/`:

| Fixture | Que contiene |
|---|---|
| `USER_PROFILE_FIXTURE` | Perfil de usuario de ejemplo |
| `TOP_REVIEWS_FIXTURE` | Reviews destacadas de ejemplo |
| `TOP_REVIEWERS_FIXTURE` | Reviewers de ejemplo |
| `GENRES_FIXTURE` | Lista de generos con colores |
| `DAILY_CHALLENGE_FIXTURE` | Desafio diario de ejemplo |
| `UPCOMING_ALBUMS_FIXTURE` | Albumes proximos de ejemplo |
| `MY_REVIEWS_FIXTURE` | Reviews del usuario de ejemplo |
| `TRIDIFY_DISCOVERY_SEARCH_FIXTURE(term)` | Resultados de busqueda simulados |
