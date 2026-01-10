# Propuestas de Features - MouBCN

Análisis de recursos disponibles en la API de TMB y propuestas de nuevas funcionalidades.

---

## 📊 Recursos Disponibles en la API TMB

### ✅ Actualmente Implementado

1. **Líneas de Metro** (`/linies/metro`)
   - Lista completa de líneas
   - Propiedades: nombre, color, origen, destino, orden

2. **Estaciones de Línea** (`/linies/metro/{code}/estacions`)
   - Estaciones de una línea específica
   - Coordenadas geográficas
   - Orden, origen/destino de servicio, estado

---

## 🔍 Recursos Adicionales Disponibles (No Implementados)

### 1. **Correspondencias entre Estaciones** ⭐ ALTA PRIORIDAD
**Endpoint:** `/linies/metro/{code}/estacions/{codi_estacio_linia}/corresp`

**Datos disponibles:**
- Conexiones con otras líneas de metro
- Conexiones con líneas de bus
- Conexiones con transportes verticales (funiculares, teleféricos)
- Coordenadas de las estaciones correspondientes

**Ejemplo de datos:**
```json
{
  "totalFeatures": 9,
  "features": [{
    "properties": {
      "NOM_LINIA": "V15",  // Vertical
      "NOM_FAMILIA": "Verticals",
      "CODI_LINIA": 215,
      "NOM_OPERADOR": "TB"
    }
  }]
}
```

### 2. **Accesos a Estaciones** ⭐ ALTA PRIORIDAD
**Endpoints:**
- `/linies/metro/{code}/estacions/{codi_estacio_linia}/accessos`
- `/estacions/{codi_grup_estacio}/accessos`
- `/linies/metro/{code}/estacions/{codi_estacio_linia}/accessos/fisics`

**Datos disponibles:**
- Nombre del acceso (ej: "Rambla de la Marina / Avda. Granvia")
- **Accesibilidad**: `NOM_TIPUS_ACCESSIBILITAT` ("Accessible", etc.)
- **Número de ascensores**: `NUM_ASCENSORS`
- Coordenadas del acceso
- Tipo de acceso físico (ej: "Escala d'obra")

### 3. **Tramos de Línea** (Trams)
**Endpoint:** `/linies/metro/{code}/trams`

**Datos disponibles:**
- Segmentos entre estaciones consecutivas
- Estación inicio y fin de cada tramo
- Geometría detallada (MultiLineString)
- Orden del tramo
- Longitud aproximada

**Ejemplo:**
```json
{
  "properties": {
    "CODI_TRAM_LINIA": "124.125",
    "NOM_ESTACIO_INI": "Urgell",
    "NOM_ESTACIO_FI": "Universitat",
    "NOM_TRAM_LINIA": "Urgell - Universitat",
    "ORDRE_TRAM": 15
  }
}
```

### 4. **Intercanviadors (Intercambios)**
**Endpoints:**
- `/interc` - Lista de todos los intercambios
- `/interc/{codi_interc}/parades` - Paradas del intercambio
- `/interc/{codi_interc}/corresp` - Correspondencias del intercambio

**Datos disponibles:**
- 106 intercambios en total
- Nombre y descripción
- Coordenadas
- Múltiples líneas que convergen (metro, bus, etc.)

**Ejemplo:**
```json
{
  "properties": {
    "CODI_INTERC": 1,
    "NOM_INTERC": "Espanya",
    "DESC_INTERC": "Pl Espanya"
  }
}
```

### 5. **Estaciones Agrupadas** (Grupos de Estación)
**Endpoint:** `/estacions/{codi_grup_estacio}`

**Datos disponibles:**
- Agrupa estaciones físicamente cercanas pero de diferentes líneas
- Pictograma del grupo
- Coordenadas centrales

### 6. **Líneas de Bus**
**Endpoint:** `/linies/bus`

**Datos disponibles:**
- 113 líneas de bus
- Misma estructura que líneas de metro
- Familias: "Proximitat", "Urbà", etc.

### 7. **Datos Adicionales en Estaciones**
**Campos disponibles pero no utilizados:**
- `NOM_TIPUS_ACCESSIBILITAT` - Estado de accesibilidad
- `DATA_INAUGURACIO` - Fecha de inauguración
- `PICTO` y `PICTO_GRUP` - Pictogramas

---

## 💡 Propuestas de Features Nuevas

### 🎯 Prioridad ALTA

#### 1. **Visualización de Correspondencias/Transferencias**
**Descripción:** Mostrar qué otras líneas están disponibles desde cada estación.

**Implementación:**
- Añadir badge/icono en la tabla de estaciones si tiene correspondencias
- Al hacer click, mostrar modal/popup con:
  - Lista de líneas conectadas (metro, bus, verticals)
  - Enlaces a esas líneas
  - Indicador visual en el mapa

**Valor:** Muy útil para planificar viajes y entender la red

**Recursos API:**
- `/linies/metro/{code}/estacions/{codi_estacio_linia}/corresp`

---

#### 2. **Información de Accesibilidad**
**Descripción:** Mostrar qué estaciones son accesibles y cuántos ascensores tienen.

**Implementación:**
- Badge de accesibilidad en la tabla de estaciones
- Filtro para mostrar solo estaciones accesibles
- Icono en el mapa para estaciones accesibles
- Detalle de accesos en la página de estación

**Valor:** Crítico para usuarios con movilidad reducida

**Recursos API:**
- `/linies/metro/{code}/estacions/{codi_estacio_linia}/accessos`
- Campo `NOM_TIPUS_ACCESSIBILITAT` ya disponible en estaciones

---

#### 3. **Página de Detalle de Estación**
**Descripción:** Página dedicada para cada estación con información completa.

**Ruta:** `/lines/{code}/stations/{station_code}` o `/stations/{grup_code}`

**Contenido:**
- Información básica de la estación
- Líneas que pasan por esa estación
- Correspondencias disponibles
- Accesos físicos (con mapa de accesos)
- Estado de accesibilidad
- Fecha de inauguración
- Mapa centrado en la estación

**Valor:** Información completa y útil para usuarios

**Recursos API:**
- `/estacions/{codi_grup_estacio}`
- `/estacions/{codi_grup_estacio}/accessos`
- Correspondencias de cada línea

---

### 🎯 Prioridad MEDIA

#### 4. **Visualización de Intercambios (Intercanviadors)**
**Descripción:** Mostrar los principales puntos de intercambio en el mapa.

**Implementación:**
- Capa adicional en el mapa general mostrando intercambios
- Marcadores especiales para intercambios
- Al hacer click, mostrar todas las líneas disponibles
- Lista de intercambios en una página separada

**Valor:** Ayuda a entender la estructura de la red

**Recursos API:**
- `/interc`
- `/interc/{codi_interc}/corresp`

---

#### 5. **Filtros y Búsqueda**
**Descripción:** Permitir filtrar y buscar líneas/estaciones.

**Funcionalidades:**
- Búsqueda por nombre de estación
- Filtro por accesibilidad
- Filtro por estado (Operatiu, etc.)
- Ordenar por diferentes criterios

**Valor:** Mejora la usabilidad

---

#### 6. **Historia de las Líneas**
**Descripción:** Mostrar información histórica de las líneas.

**Datos disponibles:**
- `DATA_INAUGURACIO` de cada estación
- Podríamos calcular la antigüedad de las líneas

**Implementación:**
- Badge "Nova" para estaciones recientes
- Timeline de inauguraciones en la página de línea
- Estadísticas (línea más antigua, más nueva, etc.)

**Valor:** Interés histórico y educativo

---

#### 7. **Visualización de Tramos (Trams)**
**Descripción:** Mostrar los segmentos entre estaciones en el mapa.

**Implementación:**
- Líneas más detalladas en el mapa usando geometría de trams
- Información de distancia entre estaciones
- Animación de recorrido (opcional)

**Valor:** Visualización más precisa de las rutas

**Recursos API:**
- `/linies/metro/{code}/trams`

---

### 🎯 Prioridad BAJA / FUTURO

#### 8. **Integración con Líneas de Bus**
**Descripción:** Añadir líneas de bus al mapa y permitir visualizarlas.

**Implementación:**
- Toggle en el mapa para mostrar/ocultar bus
- Filtro por tipo de transporte
- Página de líneas de bus similar a metro

**Valor:** Vista completa del transporte público

**Recursos API:**
- `/linies/bus`
- `/linies/bus/{code}/parades`
- `/linies/bus/{code}/recs`

---

#### 9. **Planificador de Rutas**
**Descripción:** Calcular la mejor ruta entre dos estaciones.

**Implementación:**
- Selector de estación origen y destino
- Algoritmo de cálculo de ruta (usando correspondencias)
- Visualización en el mapa
- Instrucciones paso a paso

**Valor:** Feature muy útil pero requiere lógica compleja

**Recursos API:**
- Correspondencias
- Trams para calcular distancias

---

#### 10. **Modo Oscuro**
**Descripción:** Implementar dark mode completo.

**Implementación:**
- Ya tenemos `next-themes` instalado
- Ajustar colores de líneas para contraste
- Ajustar estilos del mapa (ya hay estilos dark en MapLibre)

**Valor:** Mejora la experiencia de usuario

---

#### 11. **Exportar/Compartir**
**Descripción:** Permitir compartir líneas o estaciones.

**Implementación:**
- Botón "Compartir" que genera URL con parámetros
- Exportar a PDF (ruta de una línea)
- Compartir en redes sociales

**Valor:** Utilidad social

---

#### 12. **Estadísticas y Analytics**
**Descripción:** Mostrar estadísticas interesantes de la red.

**Implementación:**
- Línea más larga (más estaciones)
- Línea más antigua/nueva
- Total de estaciones accesibles
- Total de intercambios
- Gráficos visuales

**Valor:** Información interesante

---

## 🎨 Mejoras de UX/UI Sugeridas

### Mejoras Menores
1. **Tooltips informativos** en iconos y badges
2. **Animaciones suaves** al cargar mapas
3. **Breadcrumbs** mejorados con más niveles
4. **Filtros visuales** en la lista de líneas
5. **Vista de tarjetas** alternativa a la tabla
6. **Comparador de líneas** (side-by-side)

---

## 📈 Roadmap Sugerido

### Fase 1 (Quick Wins)
1. ✅ Información de accesibilidad en tabla
2. ✅ Badge de correspondencias en estaciones
3. ✅ Filtro de búsqueda básico

### Fase 2 (Features Principales)
1. Página de detalle de estación
2. Visualización de correspondencias en mapa
3. Visualización de intercambios

### Fase 3 (Mejoras Avanzadas)
1. Planificador de rutas
2. Integración con bus
3. Estadísticas y analytics

---

## 🔧 Consideraciones Técnicas

### Nuevos Endpoints a Implementar

```typescript
// src/lib/tmb-api.ts

// Correspondencias de una estación
export async function getStationCorrespondences(
  lineCode: number, 
  stationCode: number
): Promise<Correspondence[]>

// Accesos de una estación
export async function getStationAccesses(
  lineCode: number, 
  stationCode: number
): Promise<StationAccess[]>

// Información de grupo de estación
export async function getStationGroup(
  groupCode: number
): Promise<StationGroup>

// Intercambios
export async function getInterchanges(): Promise<Interchange[]>
export async function getInterchangeCorrespondences(
  interchangeCode: number
): Promise<Correspondence[]>

// Tramos de línea
export async function getLineTrams(
  lineCode: number
): Promise<Tram[]>
```

### Nuevos Tipos TypeScript

```typescript
// src/lib/types.ts

export interface Correspondence {
  id: string;
  lineCode: number;
  lineName: string;
  lineFamily: string;
  operator: string;
  coordinates: [number, number];
}

export interface StationAccess {
  id: string;
  name: string;
  accessibility: string;
  elevators: number;
  coordinates: [number, number];
  accessType: string;
}

export interface Interchange {
  id: string;
  code: number;
  name: string;
  description: string;
  coordinates: [number, number];
}

export interface Tram {
  id: string;
  startStation: string;
  endStation: string;
  order: number;
  geometry: MultiLineString;
}
```

---

## 💭 Ideas Adicionales

1. **Modo Comparación**: Comparar dos líneas lado a lado
2. **Favoritos**: Guardar líneas/estaciones favoritas (localStorage)
3. **Notificaciones**: Alertas sobre cambios en líneas (si la API lo permite)
4. **Gamificación**: Badges por explorar líneas
5. **Modo Offline**: Cachear datos para uso sin conexión
6. **PWA Completo**: Instalable como app móvil
7. **Idiomas**: Añadir español además de catalán
8. **Accesos Físicos en Mapa**: Mostrar puntos de acceso en el mapa de estación

---

## 📝 Notas Finales

- La API tiene **muchos más recursos** de los que estamos usando actualmente
- Las **correspondencias** y **accesibilidad** son los recursos más valiosos para añadir
- El **planificador de rutas** sería la feature más compleja pero más útil
- Considerar **performance** al añadir más datos** (el mapa ya tiene muchos marcadores)

---

**Última actualización:** 2026-01-10
**Basado en:** Exploración de la API TMB Transit v1
