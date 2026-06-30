# Constantes y Mensajes

## APP_CONSTANTS

Archivo: `src/app/core/constants/app-constants.ts`

```typescript
APP_CONSTANTS = {
  APP_NAME: 'DACS Frontend',
  VERSION: '1.0.0',
  SUPPORTED_LANGUAGES: ['es', 'en'],
  DEFAULT_LANGUAGE: 'es',

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
  },

  LOADING_STATES: {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  },

  TIMEOUTS: {
    TOAST_DURATION: 3000,       // 3 segundos para notificaciones
    DEBOUNCE_SEARCH: 300,       // 300ms de debounce en busquedas
    RETRY_ATTEMPTS: 3           // 3 reintentos en caso de error
  }
}
```

## APP_MESSAGES

Mensajes predefinidos de la aplicacion:

### Errores
| Clave | Mensaje |
|---|---|
| `NETWORK_ERROR` | Error de conexion. Verifique su internet. |
| `SERVER_ERROR` | Error del servidor. Intente mas tarde. |
| `UNAUTHORIZED` | No tiene permisos para realizar esta accion. |
| `NOT_FOUND` | Recurso no encontrado. |
| `TIMEOUT` | La operacion tardo demasiado. Intente nuevamente. |
| `UNKNOWN` | Ha ocurrido un error inesperado. |

### Exito
| Clave | Mensaje |
|---|---|
| `DATA_LOADED` | Datos cargados correctamente. |
| `DATA_SAVED` | Datos guardados correctamente. |
| `DATA_DELETED` | Datos eliminados correctamente. |
| `CONNECTION_OK` | Conexion establecida correctamente. |

### Informativos
| Clave | Mensaje |
|---|---|
| `LOADING` | Cargando... |
| `NO_DATA` | No hay datos disponibles. |
| `SEARCHING` | Buscando... |

## HTTP_HEADERS

Headers estandar usados en las requests:
```typescript
{
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  APPLICATION_JSON: 'application/json',
  BEARER: 'Bearer'
}
```

## HTTP_TIMEOUTS

Timeouts para diferentes tipos de request:
```typescript
{
  DEFAULT: 30000,  // 30 segundos
  PING: 5000,      // 5 segundos
  UPLOAD: 60000    // 60 segundos
}
```
