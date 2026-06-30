# Rutas y Navegacion

## Tabla de rutas

Definidas en `src/app/app.routes.ts`. Todas usan **lazy loading** (se cargan solo cuando se navega a ellas).

| Ruta | Componente | Proteccion | Descripcion |
|---|---|---|---|
| `/` | — | Ninguna | Redirige a `/tridify` |
| `/unauthorized` | `UnauthorizedViewComponent` | Ninguna | Pagina mostrada cuando el usuario no tiene el rol requerido |
| `/tridify` | `TridifyViewComponent` | `RoleAGuard` | Home de Tridify (reviews del dia, reviewers, generos) |
| `/tridify/reviews/new` | `CreateReviewComponent` | `RoleAGuard` | Formulario para crear una review |
| `/tridify/albums/:id` | `AlbumDetailComponent` | `RoleAGuard` | Detalle de un album (info + reviews) |
| `/tridify/explore` | `ExploreViewComponent` | `RoleAGuard` | Busqueda avanzada de albumes y canciones |
| `/tridify/my-reviews` | `MyReviewsComponent` | `RoleAGuard` | Reviews escritas por el usuario actual |
| `/tridify/my-profile` | `MyProfileComponent` | `RoleAGuard` | Perfil del usuario con estadisticas |
| `/tridify/top-reviews` | `TopReviewsComponent` | `RoleAGuard` | Ranking global de reviews |
| `**` (cualquier otra) | — | Ninguna | Redirige a `/tridify` |

## Guards de autorizacion

Archivo: `src/app/core/guards/role.guard.ts`

Hay dos guards, ambos funcionan igual:

1. **`RoleGuard`** — Requiere ROLE-A **o** ROLE-B
2. **`RoleAGuard`** — Requiere ROLE-A

Logica del guard:
```
¿Esta logueado?
├─ NO  → Redirige a /login
└─ SI  → ¿Tiene el rol requerido?
         ├─ SI → Permite acceso
         └─ NO → Redirige a /unauthorized
```

## Navegacion dentro de Tridify

El componente `TridifyViewComponent` tiene una barra lateral con tres secciones de navegacion:

**Principal:**
- Inicio → `/tridify`
- Explora → `/tridify/explore`
- Mi Perfil → `/tridify/my-profile`

**Mi Biblioteca:**
- Mis Reviews → `/tridify/my-reviews`
- Reviews Favoritas → (no implementado)
- Borradores → (no implementado)

**Comunidad:**
- Lo Mas Piola → (no implementado)
- Top Reviews → `/tridify/top-reviews`
- Desafio del Dia → (no implementado)
