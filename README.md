# MouBCN - Metro de Barcelona

Aplicació web moderna per consultar les línies i estacions del metro de Barcelona. Desenvolupada amb Next.js 16, React 19, TypeScript i MapLibre GL.

## 🚀 Característiques

- 📍 **Mapa interactiu** de tota la xarxa de metro de Barcelona
- 🗺️ **Visualització de línies** amb colors característics
- 📊 **Informació detallada** de cada línia i les seves estacions
- 🎨 **Disseny modern** amb shadcn/ui i Tailwind CSS v4
- ⚡ **Ràpid i optimitzat** amb Server Components i caching
- 📱 **Responsive** i accessible

## 🛠️ Tecnologies

- **Framework**: Next.js 16.1.1 (App Router)
- **UI**: React 19.2.3
- **Tipat**: TypeScript 5
- **Estils**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Mapes**: MapLibre GL JS 5.15.0
- **API**: TMB Transit API

## 📋 Requisits

- Node.js 18+ o Bun
- Claus API de TMB (obtenir a [developer.tmb.cat](https://developer.tmb.cat/))

## 🚦 Instal·lació

1. **Clona el repositori**:
   ```bash
   git clone <repository-url>
   cd mou-bcn
   ```

2. **Instal·la les dependències**:
   ```bash
   npm install
   # o
   bun install
   ```

3. **Configura les variables d'entorn**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` i afegeix les teves claus API de TMB:
   ```env
   TMB_APP_ID=tu_app_id
   TMB_APP_KEY=tu_app_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Inicia el servidor de desenvolupament**:
   ```bash
   npm run dev
   # o
   bun dev
   ```

5. **Obre** [http://localhost:3000](http://localhost:3000) al navegador.

## 📁 Estructura del Projecte

```
mou-bcn/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Pàgina d'inici
│   │   ├── lines/              # Rutes de línies
│   │   │   ├── page.tsx        # Llista de línies
│   │   │   ├── [code]/         # Detall de línia
│   │   │   ├── loading.tsx     # Loading states
│   │   │   ├── error.tsx       # Error boundaries
│   │   │   └── not-found.tsx  # 404 personalitzat
│   │   ├── sitemap.ts          # Sitemap XML
│   │   └── robots.ts           # Robots.txt
│   ├── components/             # Components React
│   │   ├── navbar.tsx          # Barra de navegació
│   │   ├── line-map.tsx        # Mapa d'una línia
│   │   ├── metro-network-map.tsx # Mapa de tota la xarxa
│   │   └── ui/                 # Components shadcn/ui
│   └── lib/                    # Utilitats i API
│       ├── tmb-api.ts          # Client API TMB
│       ├── types.ts            # Tipus TypeScript
│       └── utils.ts            # Funcions auxiliars
├── public/                      # Arxius estàtics
└── next.config.ts              # Configuració Next.js
```

## 🚢 Desplegament

### Vercel (Recomanat)

1. **Desplega a Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configura les variables d'entorn** a la consola de Vercel:
   - `TMB_APP_ID`
   - `TMB_APP_KEY`
   - `NEXT_PUBLIC_BASE_URL` (la teva URL de producció)

3. **Desplega**:
   ```bash
   vercel --prod
   ```

### Altres plataformes

El projecte pot desplegar-se a qualsevol plataforma que suporti Next.js:
- **Netlify**: Configura com a aplicació Next.js
- **Railway**: Connecta el repositori i configura les variables d'entorn
- **Docker**: Utilitza la imatge oficial de Next.js

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desenvolupament
- `npm run build` - Construeix l'aplicació per a producció
- `npm run start` - Inicia el servidor de producció
- `npm run lint` - Executa ESLint

## 📊 API

L'aplicació utilitza la [API de TMB Transit](https://developer.tmb.cat/api-docs/v1/transit) per obtenir les dades de les línies i estacions del metro.

### Endpoints utilitzats:
- `GET /linies/metro` - Llista de totes les línies
- `GET /linies/metro/{code}/estacions` - Estacions d'una línia

Les dades es cachen durant 1 hora per millorar el rendiment.

## 🔒 Seguretat

- ✅ Variables d'entorn protegides (server-side)
- ✅ CSP headers configurats
- ✅ Validació de tipus amb TypeScript strict
- ✅ Sanitització automàtica amb React

## 📈 SEO

- ✅ Metadata dinàmica per a cada pàgina
- ✅ Open Graph i Twitter Cards
- ✅ Sitemap.xml generat automàticament
- ✅ Robots.txt configurat
- ✅ Estructura semàntica HTML

## 🐛 Solució de Problemes

### Error: "TMB API error"
- Verifica que les teves claus API siguin correctes
- Assegura't que les variables d'entorn estiguin ben configurades

### El mapa no es carrega
- Verifica que MapLibre GL s'hagi instal·lat correctament
- Comprova la consola del navegador per errors

### Problemes de build
- Assegura't d'utilitzar Node.js 18+ o Bun
- Neteja la carpeta `.next` i torna a construir: `rm -rf .next && npm run build`

## 📝 Llicència

Aquest projecte és de codi obert i està disponible sota la llicència MIT.

## 🙏 Agraïments

- **TMB** (Transports Metropolitans de Barcelona) per proporcionar l'API
- **MapLibre** per la llibreria de mapes open-source
- **shadcn/ui** pels components UI

## 📧 Contacte

Per a preguntes o suggeriments, obre un issue al repositori.
