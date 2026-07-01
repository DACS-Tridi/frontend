# Flujo de Arranque

## Secuencia de inicio

Cuando el usuario abre la app en el browser, ocurre lo siguiente:

```
1. main.ts
   └─> bootstrapApplication(App, appConfig)

2. app.config.ts (se ejecutan los providers)
   ├─> provideHttpClient()          → Habilita HttpClient con interceptores
   ├─> provideRouter(routes)        → Carga las rutas
   ├─> KeycloakBearerInterceptor    → Interceptor que agrega JWT (bearer) a cada request
   └─> APP_INITIALIZER              → Ejecuta initializeKeycloak() ANTES de que la app cargue
       └─> keycloak.init(keycloakInitOptions)
           ├─> Exito: usuario logueado, app continua
           └─> Error: se loguea en consola, app continua igual (catch silencioso)

3. app.ts (componente raiz)
   └─> <router-outlet> muestra el componente segun la URL

4. app.routes.ts
   └─> URL "/" redirige a "/tridify"
       └─> Se carga TridifyViewComponent (lazy loading)
           └─> TridifyDiscoveryStore.initialize()
               ├─> Carga perfil de usuario
               ├─> Carga top reviews del dia
               ├─> Carga reviewers destacados
               ├─> Carga generos
               ├─> Carga desafio diario
               └─> Carga proximos albumes
```

## Configuracion de Keycloak

Archivo: `src/app/core/config/keycloak.config.ts`

```typescript
{
  config: {
    url: 'http://localhost:8180',    // URL del servidor Keycloak
    realm: 'dacs',                   // Nombre del realm
    clientId: 'dacs-fe'              // ID del cliente
  },
  initOptions: {
    onLoad: 'login-required',        // Obliga a loguearse al abrir la app
    pkceMethod: 'S256',              // Metodo PKCE para seguridad
    checkLoginIframe: false,         // Desactivado para evitar problemas de CSP
    enableLogging: true              // Logs de Keycloak en consola
  },
  enableBearerInterceptor: true,     // Agrega token automaticamente a requests
  bearerExcludedUrls: ['/assets']    // No agrega token a requests de assets
}
```

## Configuracion del entorno

Archivo: `src/environments/environment.ts`

```typescript
{
  production: false,
  keycloak: {
    url: 'http://localhost:8180',
    realm: 'dacs',
    clientId: 'dacs-fe'
  },
  backendForFrontendUrl: 'http://localhost:9001/bff'
}
```

Todas las llamadas HTTP van a `http://localhost:9001/bff` + endpoint.
