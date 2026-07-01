# Estructura de Carpetas

## Arbol completo

```
frontend/
├── docs/                          # Documentacion del proyecto (esta carpeta)
├── src/
│   ├── main.ts                    # Punto de entrada de la aplicacion
│   ├── environments/
│   │   ├── environment.ts         # Config de desarrollo (URLs, Keycloak)
│   │   └── environment.production.ts  # Config de produccion
│   ├── assets/
│   │   ├── json/test.json         # Datos de prueba
│   │   └── silent-check-sso.html  # SSO silencioso de Keycloak
│   └── app/
│       ├── app.ts                 # Componente raiz
│       ├── app.html               # Template raiz (solo <router-outlet>)
│       ├── app.css                # Estilos globales
│       ├── app.config.ts          # Configuracion global (providers)
│       ├── app.routes.ts          # Definicion de todas las rutas
│       ├── core/                  # Codigo compartido (servicios, guards, modelos)
│       ├── home/                  # Pagina Home
│       ├── header/                # Componente Header
│       ├── table-grid/            # Vista de tabla de datos (ROLE-A)
│       ├── dashboard-view/        # Vista dashboard (ROLE-B)
│       └── tridify-view/          # Modulo principal de Tridify
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

## Que hace cada carpeta

### `src/app/core/` — Codigo compartido

Todo lo que es transversal y reutilizable por cualquier componente:

```
core/
├── config/
│   ├── keycloak.config.ts         # Configuracion de Keycloak (realm, clientId, etc.)
│   └── interceptor.config.ts      # Configuracion para montar los interceptores HTTP (los de /interceptors)
├── constants/
│   ├── app-constants.ts           # Constantes globales (paginacion, mensajes, timeouts)
│   └── api-endpoints.ts           # Todas las URLs de la API centralizadas
├── guards/
│   └── role.guard.ts              # Verificador de roles para proteger rutas (RoleGuard, RoleAGuard, RoleBGuard)
├── interceptors/
│   ├── auth.interceptor.ts        # Interceptor para agregar token JWT a requests (bearer)
│   └── error.interceptor.ts       # Interceptor con manejo global de errores HTTP
├── models/
│   ├── api-response.ts            # Interfaces para respuestas de API
│   ├── user.ts                    # Interfaces de Modelo de usuario y settings varias.
│   ├── irequest-test.ts           # Modelo de request de prueba
│   └── iresponse.ts               # Modelo generico de respuesta del servidor.
├── services/
│   ├── base-api.service.ts        # Servicio base HTTP (crea las peticiones y envia, GET, POST, etc)
│   ├── keycloak.service.ts        # Wrapper de Keycloak (login, logout, roles, perfil)
│   ├── api-service.ts             # Servicio de API. Funciona como un puente entre nuestra app y el backend.
│   └── storage.service.ts         # Servicio de almacenamiento local. Maneja todo el localstorage.
├── utils/
│   ├── helpers.ts                 # funciones auxiliares de cosas comunes a toda la app (formatear textos o similares)
│   └── validators.ts              # Validadores custom (emails, inputs vacios, similares)
│
└── index.ts                       # exporta todas las funciones y servicios
```

### `src/app/tridify-view/` — App principal de reviews

```
tridify-view/
├── tridify-view.ts                # Pagina principal / Home de Tridify
├── tridify-view.html              # Template
├── tridify-view.css               # Estilos
├── models/
│   ├── discovery.models.ts        # Interfaces (Review, Album, Genre, User, etc.)
│   └── review-create.models.ts    # Interfaces para crear reviews
├── data-access/
│   ├── tridify-discovery.store.ts # Store central de estado
│   ├── tridify-discovery.api.ts   # API del modulo
│   ├── services/
│   │   ├── tridify-album.service.ts    # CRUD de albumes
│   │   ├── tridify-review.service.ts   # CRUD de reviews
│   │   ├── tridify-reviewer.service.ts # Datos de reviewers
│   │   ├── tridify-genre.service.ts    # Datos de generos
│   │   └── tridify-user.service.ts     # Perfil de usuario Tridify
│   └── fixtures/                  # Datos mock (fallback si la API falla)
│       ├── index.ts
│       ├── album.fixtures.ts
│       ├── review.fixtures.ts
│       ├── genre.fixtures.ts
│       ├── reviewer.fixtures.ts
│       ├── user.fixtures.ts
│       ├── search.fixtures.ts
│       ├── my-reviews.fixtures.ts
│       └── top-reviews-all.fixtures.ts
├── create-review/                 # Formulario para crear una review
├── album-detail/                  # Detalle de un album
├── explore-view/                  # Buscar y explorar albumes/canciones
├── my-reviews/                    # Reviews del usuario actual
├── my-profile/                    # Perfil del usuario
└── top-reviews/                   # Ranking global de reviews
```
