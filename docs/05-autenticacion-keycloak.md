# Autenticacion con Keycloak

## Como funciona

La app usa **Keycloak** como servidor de identidad (OAuth2 / OpenID Connect). El flujo es:

```
1. Usuario abre la app
2. APP_INITIALIZER ejecuta keycloak.init({ onLoad: 'login-required' })
3. Si no esta logueado → Keycloak redirige al formulario de login
4. Usuario se loguea en Keycloak
5. Keycloak redirige de vuelta a la app con un token JWT
6. KeycloakBearerInterceptor agrega el token a cada request HTTP automaticamente
```

## Servicio KeycloakService

Archivo: `src/app/core/services/keycloak.service.ts`

Es un wrapper sobre `keycloak-angular` que expone metodos simples:

| Metodo | Retorno | Que hace |
|---|---|---|
| `isLoggedIn()` | `boolean` | Verifica si el usuario esta logueado |
| `getToken()` | `Promise<string>` | Obtiene el token JWT actual |
| `getUserProfile()` | `KeycloakProfile \| null` | Perfil del usuario (nombre, email, etc.) |
| `getUserRoles()` | `string[]` | Lista de roles del usuario |
| `hasRole(role)` | `boolean` | Verifica si tiene un rol especifico |
| `hasAnyRole(roles)` | `boolean` | Verifica si tiene al menos uno de los roles |
| `hasAllRoles(roles)` | `boolean` | Verifica si tiene todos los roles |
| `login()` | `Promise<void>` | Inicia el flujo de login |
| `logout()` | `Promise<void>` | Cierra la sesion |
| `getFullName()` | `string` | Nombre completo del usuario |
| `getEmail()` | `string` | Email del usuario |
| `getUsername()` | `string` | Username del usuario |
| `getAccountUrl()` | `string` | URL para administrar la cuenta en Keycloak |
| `refreshUserProfile()` | `Promise<void>` | Refresca el perfil desde Keycloak |

El servicio tambien expone un observable `userProfile$` que emite cada vez que el perfil cambia.

## Roles del sistema

La app maneja dos roles principales:

- **ROLE-A**: Acceso a la vista de tabla (`/table-grid`)
- **ROLE-B**: Acceso al dashboard (`/dashboard`)

Estos roles se configuran en el servidor Keycloak y se asignan a los usuarios.

## Configuracion del realm

- **URL de Keycloak**: `http://localhost:8180`
- **Realm**: `dacs`
- **Client ID**: `dacs-fe`
- **Metodo PKCE**: S256 (recomendado para apps SPA)
- **Login iframe**: Desactivado (evita problemas de Content Security Policy)
