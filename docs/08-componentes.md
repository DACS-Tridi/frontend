# Componentes

Todos los componentes son **standalone** (no usan NgModules). Cada uno tiene su `.ts`, `.html` y `.css`.

## Componentes generales

### App (`app.ts`)

El componente raiz. Solo contiene un `<router-outlet>` que renderiza el componente de la ruta actual. No tiene logica propia.

### UnauthorizedViewComponent (`unauthorized-view/unauthorized-view.ts`)

Pagina que se muestra cuando el usuario no esta logueado o no tiene el rol requerido para acceder a una ruta. Expone `login()` y `logout()`, que delegan en `KeycloakService`.

---

## Rutas y guards

Todas las rutas (excepto `/unauthorized`) estan protegidas por `RoleAGuard`, que requiere el rol `ROLE-A`. Si el usuario no esta logueado, dispara el login externo de Keycloak; si esta logueado pero no tiene el rol, redirige a `/unauthorized`.

| Ruta | Componente |
| --- | --- |
| `/` | redirige a `/tridify` |
| `/unauthorized` | `UnauthorizedViewComponent` |
| `/tridify` | `TridifyViewComponent` |
| `/tridify/reviews/new` | `CreateReviewComponent` |
| `/tridify/albums/:id` | `AlbumDetailComponent` |
| `/tridify/explore` | `ExploreViewComponent` |
| `/tridify/my-reviews` | `MyReviewsComponent` |
| `/tridify/my-profile` | `MyProfileComponent` |
| `/tridify/top-reviews` | `TopReviewsComponent` |
| `**` | redirige a `/tridify` |

`core/guards/role.guard.ts` tambien define `RoleGuard` (acepta `ROLE-A` o `ROLE-B`), pero ninguna ruta lo usa actualmente.

---

## Componentes de Tridify

### TridifyViewComponent (`tridify-view/tridify-view.ts`)

**Pagina principal de Tridify.** Es la pantalla que se ve al entrar a la app.

Funcionalidades:

- **Barra de busqueda**: busca albumes en Spotify via el backend. Usa debounce de 300ms.
- **Navegacion lateral**: menu con tres secciones:
  - Principal: Inicio, Explorá (`/tridify/explore`), Mi Perfil (`/tridify/my-profile`)
  - Mi Biblioteca: Mis Reviews (`/tridify/my-reviews`), Reviews Favoritas y Borradores (sin ruta aun)
  - Comunidad: Lo Más Piola (sin ruta), Top Reviews (`/tridify/top-reviews`), Desafío del Día (sin ruta)
- **Top reviews del dia**: tarjetas con reviews destacadas, rating con barras VU-meter.
- **Reviewers destacados**: spotlights de reviewers con ecualizador visual EQ.
- **Generos**: chips de generos musicales con colores.
- **Desafio del dia**: tarjeta con el challenge diario.
- **Menu mobile**: hamburguesa para pantallas chicas.

Depende de: `TridifyDiscoveryStore`

### CreateReviewComponent (`tridify-view/create-review/create-review.ts`)

**Formulario para crear una review.**

Campos del formulario:
| Campo | Validacion | Descripcion |
| --- | --- | --- |
| `albumId` | Requerido, pattern: 22 caracteres alfanumericos (Spotify ID) | ID del album en Spotify |
| `highlight` | Requerido, max 320 chars | Frase destacada de la review |
| `rating` | Requerido, min 0, max 5 | Puntuacion |
| `tags` | Max 200 chars | Tags separados por coma |
| `tone` | Requerido | Tono visual: 'violet' o 'cyan' |
| `reviewBody` | Max 2000 chars | Cuerpo completo de la review |

Tiene buscador de albumes integrado (debounce de 300ms, minimo 2 caracteres): el usuario escribe el nombre del album, busca en Spotify, selecciona uno y se llena el `albumId`.

### AlbumDetailComponent (`tridify-view/album-detail/album-detail.ts`)

**Detalle de un album.** Muestra la info del album (nombre, artistas, imagen, fecha) y las reviews que tiene.

Lee el parametro `:id` de la URL y hace dos llamadas en paralelo:
1. `getAlbumDetail(id)` — datos del album
2. `getAlbumReviews(id)` — reviews del album

### ExploreViewComponent (`tridify-view/explore-view/explore-view.ts`)

**Buscador avanzado.** Permite buscar albumes y canciones con filtros:
- Filtro por tipo: Todos, Discos, Canciones
- Busqueda con debounce de 350ms, minimo 2 caracteres
- Seleccion de resultado para navegar al detalle

### MyReviewsComponent (`tridify-view/my-reviews/my-reviews.ts`)

**Reviews del usuario actual.** Muestra las reviews que escribio el usuario logueado.

Funcionalidades:

- Ordenar por: Mas recientes, Mejor rating, Mas likes
- Estadisticas: total reviews, total likes, total comments
- Rating promedio

### MyProfileComponent (`tridify-view/my-profile/my-profile.ts`)

**Perfil del usuario.** Muestra info del perfil junto con estadisticas (reviews, likes, comments, rating promedio) y las reviews del usuario. Si la API falla, cae en `MY_REVIEWS_FIXTURE`.

### TopReviewsComponent (`tridify-view/top-reviews/top-reviews.ts`)

**Ranking global de reviews.** Muestra todas las reviews ordenadas por popularidad.

Funcionalidades:

- Filtrar por tags (extraidos automaticamente de las reviews, orden alfabetico)
- Ordenar por: Mas likeadas (default), Mejor rating, Mas recientes
- Conteo total de reviews y likes

---

## Patrones comunes en los componentes

### Inyeccion de dependencias

La mayoria usa `inject()` (patron moderno de Angular) en vez de constructor injection. `UnauthorizedViewComponent` y los guards en `core/guards/role.guard.ts` son la excepcion: siguen usando constructor injection.

### Suscripciones
- `take(1)` para requests one-shot
- `takeUntil(destroy$)` para suscripciones que viven con el componente
- `takeUntilDestroyed()` de `@angular/core/rxjs-interop` (alternativa moderna, usada en `TridifyViewComponent`)

### Manejo de menu mobile

Todos los componentes con sidebar implementan `toggleMobileMenu()` y `closeMobileMenu()`.

### Fallback a fixtures

Si una llamada a la API falla (perfil de usuario, reviews), varios componentes caen en datos de `data-access/fixtures/` (`USER_PROFILE_FIXTURE`, `MY_REVIEWS_FIXTURE`) en vez de romper la vista.

### Avatares

Usan un sistema de avatares tematicos con IDs: `cyber-skull`, `robot-head`, `hacker-cat`, `vinyl-punk`, `glitch-face`, `synth-wave`, `terminal-ghost`, `dj-alien`. El default es `synth-wave`.

### Rating visual

En vez de estrellas, usan un "VU-meter" (barras de audio) calculado con `getVuBars(rating)`, repetido igual en `TridifyViewComponent`, `MyReviewsComponent`, `MyProfileComponent`, `TopReviewsComponent` y `AlbumDetailComponent`.
