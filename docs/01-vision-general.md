# Vision General del Proyecto

## Que es DACS Frontend

DACS Frontend (`dacs-fe`) es una aplicacion web construida con **Angular 20** y **TypeScript 5.9**. Su funcionalidad principal es **Tridify**, una plataforma social de reviews de musica donde los usuarios pueden buscar albumes (via Spotify), escribir reviews, explorar generos y ver rankings de reviewers.

## Stack Tecnologico

| Tecnologia | Version | Proposito |
|---|---|---|
| Angular | 20.2.0 | Framework principal |
| TypeScript | 5.9.2 | Lenguaje |
| Keycloak | 26.2.0 (JS) / 20.0.0 (Angular) | Autenticacion y autorizacion |
| RxJS | 7.8.0 | Programacion reactiva |
| Zone.js | 0.15.0 | Deteccion de cambios de Angular |
| Karma + Jasmine | 6.4 / 5.9 | Testing |

## Arquitectura General

```
Usuario (Browser)
    |
    v
[Angular App - dacs-fe]
    |
    |--- Keycloak (localhost:8180) --> Autenticacion OAuth2/OIDC
    |
    |--- BFF Backend (localhost:9001/bff) --> API REST (datos de Tridify)
```

La app sigue un patron **BFF (Backend For Frontend)**: no habla directamente con microservicios, sino con un backend intermedio que agrega y adapta las respuestas.

## Como ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start        # equivale a: ng serve

# Build de produccion
npm run build    # equivale a: ng build

# Ejecutar tests
npm test         # equivale a: ng test
```

## Requisitos previos

1. **Node.js** instalado
2. **Keycloak** corriendo en `http://localhost:8180` con:
   - Realm: `dacs`
   - Client ID: `dacs-fe`
3. **Backend BFF** corriendo en `http://localhost:9001/bff`
