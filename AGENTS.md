# AGENTS.md - Guía para Agentes de IA

Este documento proporciona información esencial sobre el proyecto MouBCN para que los agentes de IA puedan trabajar efectivamente con el código.

## 📋 Descripción del Proyecto

**MouBCN** es una aplicación web moderna para consultar las líneas y estaciones del metro de Barcelona. La aplicación utiliza la API oficial de TMB (Transports Metropolitans de Barcelona) para obtener datos en tiempo real y los visualiza en mapas interactivos.

### Propósito
- Visualizar todas las líneas del metro de Barcelona
- Mostrar información detallada de cada línea (estaciones, rutas, estado)
- Proporcionar mapas interactivos con MapLibre GL
- Ofrecer una experiencia de usuario moderna y accesible

---

## 🛠️ Stack Tecnológico

### Framework y Librerías Core
- **Next.js 16.1.1** - Framework React con App Router
- **React 19.2.3** - Librería UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS v4** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI basados en Radix UI
- **MapLibre GL JS 5.15.0** - Librería de mapas open-source

### Dependencias Principales
- `@radix-ui/react-slot` - Primitivos accesibles
- `lucide-react` - Iconos SVG
- `next-themes` - Soporte dark/light mode
- `class-variance-authority` - Variantes de componentes
- `tailwind-merge` - Merge de clases Tailwind

### Gestor de Paquetes
- **Bun** (detectado por `bun.lock`), pero también compatible con npm/yarn

---

## 📁 Estructura del Proyecto

```
mou-bcn/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Layout raíz con metadata
│   │   ├── page.tsx                 # Página de inicio (landing)
│   │   ├── globals.css              # Estilos globales + Tailwind
│   │   ├── favicon.ico              # Favicon
│   │   ├── robots.ts                # Generación dinámica de robots.txt
│   │   ├── sitemap.ts               # Generación dinámica de sitemap.xml
│   │   └── lines/                   # Rutas de líneas
│   │       ├── layout.tsx           # Layout con Navbar y Footer
│   │       ├── page.tsx             # Lista de todas las líneas
│   │       ├── loading.tsx          # Loading state con skeletons
│   │       ├── error.tsx            # Error boundary
│   │       └── [code]/              # Ruta dinámica por código de línea
│   │           ├── page.tsx        # Detalle de línea con mapa
│   │           ├── loading.tsx     # Loading state
│   │           ├── error.tsx       # Error boundary
│   │           └── not-found.tsx   # 404 personalizado
│   │
│   ├── components/                   # Componentes React
│   │   ├── navbar.tsx               # Barra de navegación sticky
│   │   ├── line-map.tsx             # Mapa de una línea específica (Client Component)
│   │   ├── line-map-wrapper.tsx    # Wrapper con lazy loading
│   │   ├── metro-network-map.tsx   # Mapa de toda la red (Client Component)
│   │   ├── metro-network-map-wrapper.tsx # Wrapper con lazy loading
│   │   └── ui/                       # Componentes shadcn/ui
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── table.tsx
│   │       ├── skeleton.tsx
│   │       └── map.tsx              # Componente Map completo (MapLibre GL)
│   │
│   └── lib/                         # Utilidades y lógica de negocio
│       ├── env.ts                  # Validación de variables de entorno
│       ├── tmb-api.ts              # Cliente API TMB con manejo de errores
│       ├── types.ts                # Tipos TypeScript para API y componentes
│       └── utils.ts                # Utilidades (cn function para Tailwind)
│
├── public/                          # Archivos estáticos
│   └── metro-logo.png              # Logo del metro
│
├── .env.example                     # Plantilla de variables de entorno
├── .env.local                       # Variables de entorno (no versionado)
├── next.config.ts                   # Configuración Next.js (CSP headers, etc.)
├── tsconfig.json                    # Configuración TypeScript
├── tailwind.config.js               # Configuración Tailwind (si existe)
├── postcss.config.mjs               # Configuración PostCSS
├── components.json                   # Configuración shadcn/ui
└── package.json                     # Dependencias y scripts
```

---

## 🔑 Variables de Entorno

### Requeridas
```env
TMB_APP_ID=tu_app_id_aqui          # ID de aplicación TMB
TMB_APP_KEY=tu_app_key_aqui         # Clave API TMB
```

### Opcionales (pero recomendadas)
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # URL base para SEO (producción: tu dominio)
```

**Importante:**
- Las variables se validan automáticamente al importar `src/lib/tmb-api.ts`
- Si faltan, la aplicación lanzará un error claro
- Ver `src/lib/env.ts` para la lógica de validación

**Obtener credenciales:** https://developer.tmb.cat/

---

## 🌐 API Externa: TMB Transit API

### Base URL
```
https://api.tmb.cat/v1/transit
```

### Endpoints Utilizados

1. **GET /linies/metro**
   - Obtiene todas las líneas de metro
   - Retorna: `TMBResponse<MetroLineProperties>`
   - Cache: 1 hora (`revalidate: 3600`)

2. **GET /linies/metro/{code}/estacions**
   - Obtiene estaciones de una línea específica
   - Parámetro: `code` (número de línea, ej: 1, 2, 3)
   - Retorna: `TMBResponse<MetroStationProperties>`
   - Cache: 1 hora

### Formato de Respuesta
La API retorna datos en formato **GeoJSON**:
```typescript
{
  type: "FeatureCollection",
  totalFeatures: number,
  features: Array<{
    type: "Feature",
    id: string,
    geometry: {
      type: "Point" | "LineString",
      coordinates: [number, number] | [number, number][]
    },
    properties: T // MetroLineProperties o MetroStationProperties
  }>
}
```

### Manejo de Errores
- Clase `TMBAPIError` para errores específicos de la API
- Manejo de errores de red, timeouts, y respuestas vacías
- Mensajes de error en catalán para el usuario

---

## 📊 Tipos de Datos

### Tipos Principales

**MetroLine** (simplificado para componentes):
```typescript
{
  id: string;           // ID único de la línea
  code: number;         // Código numérico (1, 2, 3, etc.)
  name: string;         // Nombre corto (ej: "L1")
  description: string;  // Descripción completa
  origin: string;       // Estación origen
  destination: string;  // Estación destino
  color: string;        // Color hex (ej: "#FF0000")
  order: number;       // Orden de visualización
}
```

**MetroStation** (simplificado para componentes):
```typescript
{
  id: string;
  code: number;
  name: string;
  order: number;
  origin: string;
  destination: string;
  status: string;      // Ej: "En servei", "Operatiu"
  coordinates: [number, number]; // [longitude, latitude]
}
```

**MetroLineWithStations**:
```typescript
MetroLine & {
  stations: MetroStation[];
}
```

Ver `src/lib/types.ts` para tipos completos.

---

## 🗺️ Sistema de Mapas

### Componentes de Mapa

1. **Map** (`src/components/ui/map.tsx`)
   - Componente base de MapLibre GL
   - Soporte para dark/light mode
   - Estilos por defecto: Carto Positron (light) / Dark Matter (dark)

2. **LineMap** (`src/components/line-map.tsx`)
   - Muestra una línea específica con sus estaciones
   - Marcadores numerados con el color de la línea
   - Ruta dibujada conectando estaciones
   - Popups informativos al hacer click

3. **MetroNetworkMap** (`src/components/metro-network-map.tsx`)
   - Muestra todas las líneas de la red
   - Cada línea con su color característico
   - Marcadores de todas las estaciones
   - Popups con enlace a la línea

### Lazy Loading
Los mapas se cargan con `next/dynamic` para mejorar el rendimiento:
- `line-map-wrapper.tsx` - Wrapper con lazy loading
- `metro-network-map-wrapper.tsx` - Wrapper con lazy loading
- `ssr: false` - Los mapas solo se renderizan en el cliente

### Configuración CSP
El `next.config.ts` incluye headers CSP que permiten:
- Web workers desde blobs (`worker-src 'self' blob:`)
- Conexiones HTTPS a cualquier dominio (`connect-src 'self' https:`)
- Imágenes desde cualquier origen HTTPS (`img-src 'self' data: https: blob:`)

---

## 🎨 Estilos y Diseño

### Tailwind CSS v4
- Configuración en `src/app/globals.css`
- Variables CSS personalizadas (OKLCH) para temas
- Soporte para dark mode (aunque no está activado actualmente)

### Componentes UI
- **shadcn/ui** con estilo "new-york"
- Componentes accesibles basados en Radix UI
- Variantes usando `class-variance-authority`

### Convenciones de Estilo
- Colores de líneas: Se obtienen de la API (`COLOR_LINIA`)
- Espaciado: Usar `space-y-*` para separación vertical
- Responsive: Mobile-first, breakpoints con `sm:`, `md:`, `lg:`
- Focus states: Siempre visibles para accesibilidad

---

## 🔄 Flujo de Datos

### Páginas Server Components

1. **`/lines`** (Lista de líneas)
   ```typescript
   // Fetch paralelo
   const [lines, linesWithStations] = await Promise.all([
     getMetroLines(),              // Solo líneas (rápido)
     getAllLinesWithStations(),    // Líneas + estaciones (lento, N+1 queries)
   ]);
   ```

2. **`/lines/[code]`** (Detalle de línea)
   ```typescript
   // Fetch paralelo
   const [line, stations] = await Promise.all([
     getMetroLine(lineCode),
     getMetroStations(lineCode),
   ]);
   ```

### Caching
- Todas las llamadas API tienen `revalidate: 3600` (1 hora)
- Next.js cachea automáticamente las respuestas
- Las páginas estáticas se regeneran cada hora

---

## 🚨 Manejo de Errores

### Error Boundaries
- `src/app/lines/error.tsx` - Errores en lista de líneas
- `src/app/lines/[code]/error.tsx` - Errores en detalle de línea
- Detectan `TMBAPIError` y muestran mensajes apropiados

### Tipos de Errores
1. **TMBAPIError** - Errores de la API TMB
   - Credenciales faltantes
   - Errores HTTP (404, 500, etc.)
   - Errores de red/timeout
   - Respuestas vacías

2. **Errores de validación** - Variables de entorno faltantes
   - Se lanzan al importar `tmb-api.ts`

### Loading States
- `loading.tsx` en cada ruta
- Usa componentes `Skeleton` de shadcn/ui
- Muestra estructura similar al contenido final

### 404 Personalizado
- `not-found.tsx` en `/lines/[code]`
- Se muestra cuando una línea no existe

---

## 🔍 SEO y Metadata

### Metadata Estática
- Configurada en `src/app/layout.tsx`
- Incluye Open Graph y Twitter Cards
- Idioma: Catalán (`lang="ca"`)

### Metadata Dinámica
- `generateMetadata` en `/lines/[code]/page.tsx`
- Genera metadata específica para cada línea
- Incluye número de estaciones, origen, destino

### Sitemap y Robots
- `src/app/sitemap.ts` - Genera sitemap.xml con todas las líneas
- `src/app/robots.ts` - Genera robots.txt
- Ambos usan `NEXT_PUBLIC_BASE_URL` para URLs absolutas

---

## ♿ Accesibilidad

### Implementado
- ARIA labels en botones y enlaces
- `role="alert"` y `aria-live` en mensajes de error
- `scope="col"` en headers de tabla
- `aria-hidden="true"` en iconos decorativos
- Navegación semántica (`<nav>`, `<header>`, `<section>`)
- Focus states visibles
- Contraste de colores adecuado

### Convenciones
- Siempre usar `aria-label` en botones sin texto descriptivo
- Iconos decorativos deben tener `aria-hidden="true"`
- Mensajes de error deben tener `role="alert"`
- Tablas deben usar `scope="col"` en headers

---

## 🧪 Testing y Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

### Desarrollo Local
1. Copiar `.env.example` a `.env.local`
2. Añadir credenciales TMB
3. Ejecutar `npm run dev`
4. Abrir http://localhost:3000

### Build de Producción
- El build genera páginas estáticas para `/` y `/lines`
- Las rutas dinámicas `/lines/[code]` son server-rendered
- Verificar que `NEXT_PUBLIC_BASE_URL` esté configurado

---

## 🚀 Despliegue

### Plataformas Recomendadas
- **Vercel** (recomendado) - Integración nativa con Next.js
- **Netlify** - Soporte para Next.js
- **Railway** - Deploy desde Git

### Variables de Entorno en Producción
**Obligatorias:**
- `TMB_APP_ID`
- `TMB_APP_KEY`
- `NEXT_PUBLIC_BASE_URL` (URL completa, ej: `https://mou-bcn.vercel.app`)

### Verificaciones Pre-Deploy
- [ ] Build exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] `NEXT_PUBLIC_BASE_URL` apunta a la URL de producción
- [ ] CSP headers no bloquean recursos necesarios
- [ ] Mapas cargan correctamente

---

## 📝 Convenciones de Código

### TypeScript
- **Modo estricto** activado
- Siempre tipar props de componentes
- Usar interfaces para tipos de datos
- Evitar `any`, usar `unknown` si es necesario

### Componentes
- **Server Components por defecto** (no `"use client"` a menos que sea necesario)
- Client Components solo para:
  - Interactividad (onClick, useState, etc.)
  - Mapas (MapLibre GL requiere cliente)
  - Hooks de React

### Nombres de Archivos
- Componentes: `PascalCase.tsx` (ej: `LineMap.tsx`)
- Utilidades: `camelCase.ts` (ej: `tmb-api.ts`)
- Páginas: `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`

### Imports
- Usar path aliases: `@/components`, `@/lib`, `@/app`
- Agrupar imports: externos → internos → relativos
- Orden: React → Next.js → librerías → componentes locales

### Estilos
- Preferir Tailwind sobre CSS personalizado
- Usar `cn()` para merge de clases
- Variables CSS para valores reutilizables

---

## 🐛 Debugging

### Errores Comunes

1. **Error: "Missing required environment variables"**
   - Solución: Verificar `.env.local` tiene `TMB_APP_ID` y `TMB_APP_KEY`

2. **Mapa no carga / CSP violations**
   - Verificar `next.config.ts` tiene `worker-src 'self' blob:`
   - Verificar `connect-src` permite `https:`

3. **Error 404 en `/lines/[code]`**
   - Verificar que el código de línea existe
   - Verificar que `getMetroLine()` retorna un valor

4. **Tiles del mapa no cargan**
   - Verificar conexión a internet
   - Verificar que Carto no esté bloqueado
   - Revisar consola del navegador para errores CORS

### Logs
- Errores de API se loguean en consola (solo desarrollo)
- Error boundaries muestran detalles en desarrollo
- Production: errores se muestran sin detalles técnicos

---

## 🔄 Flujo de Trabajo Recomendado

### Al Añadir una Nueva Funcionalidad

1. **Planificar**
   - ¿Requiere datos de la API? → Añadir función en `tmb-api.ts`
   - ¿Requiere interactividad? → Client Component
   - ¿Requiere estilos? → Usar Tailwind o componentes existentes

2. **Implementar**
   - Crear tipos en `types.ts` si es necesario
   - Implementar lógica en `lib/` si es compleja
   - Crear componentes en `components/`
   - Añadir rutas en `app/` si es necesario

3. **Probar**
   - Verificar que compila (`npm run build`)
   - Probar en desarrollo (`npm run dev`)
   - Verificar accesibilidad básica
   - Verificar responsive design

4. **Optimizar**
   - Añadir loading states si es necesario
   - Añadir error handling
   - Optimizar imágenes si hay nuevas
   - Verificar SEO si es una nueva página

---

## 📚 Recursos Útiles

### Documentación
- **Next.js**: https://nextjs.org/docs
- **MapLibre GL**: https://maplibre.org/maplibre-gl-js-docs/
- **shadcn/ui**: https://ui.shadcn.com/
- **TMB API**: https://developer.tmb.cat/api-docs/v1/transit

### Archivos Clave para Entender el Proyecto
1. `src/lib/tmb-api.ts` - Lógica de API y manejo de errores
2. `src/lib/types.ts` - Estructura de datos
3. `src/components/ui/map.tsx` - Componente base de mapas
4. `src/app/lines/page.tsx` - Ejemplo de Server Component con datos
5. `next.config.ts` - Configuración de seguridad y optimizaciones

---

## ⚠️ Advertencias Importantes

1. **No exponer credenciales API**
   - Nunca usar `NEXT_PUBLIC_` para `TMB_APP_ID` o `TMB_APP_KEY`
   - Estas variables son server-side only

2. **CSP Headers**
   - Cualquier cambio en `next.config.ts` requiere reinicio del servidor
   - Los wildcards `*` pueden no funcionar en algunos navegadores

3. **MapLibre GL**
   - Requiere Client Components (`"use client"`)
   - Los mapas deben cargarse con lazy loading para performance
   - Los workers requieren `worker-src blob:` en CSP

4. **Caching**
   - Los datos se cachean 1 hora
   - Si necesitas datos más frescos, reducir `revalidate`
   - Las páginas estáticas se regeneran automáticamente

5. **Idioma**
   - Todo el contenido está en **catalán**
   - Mantener consistencia en mensajes de error y UI

---

## 🎯 Tareas Comunes

### Añadir una Nueva Página
1. Crear `src/app/nueva-ruta/page.tsx`
2. Añadir metadata si es necesario
3. Crear `loading.tsx` y `error.tsx` opcionales
4. Añadir al sitemap si es público

### Añadir un Nuevo Componente UI
1. Usar `npx shadcn@latest add [component]` si existe
2. O crear manualmente en `src/components/ui/`
3. Seguir el patrón de componentes existentes

### Modificar Estilos Globales
1. Editar `src/app/globals.css`
2. Usar `@apply` para Tailwind cuando sea posible
3. Variables CSS para valores reutilizables

### Añadir una Nueva Función de API
1. Añadir función en `src/lib/tmb-api.ts`
2. Usar `fetchTMB<T>()` helper
3. Manejar errores con `TMBAPIError`
4. Añadir tipos en `src/lib/types.ts` si es necesario

---

## 📞 Soporte

Para problemas o preguntas:
- Revisar este documento primero
- Consultar la documentación de Next.js
- Verificar los logs del servidor y del navegador
- Revisar `src/lib/env.ts` para errores de configuración

---

**Última actualización:** 2026-01-10
**Versión del proyecto:** 0.1.0
