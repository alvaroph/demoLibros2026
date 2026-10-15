# demoLibros

Aplicació web de demostració per consultar llibres, desenvolupada amb Vue 3 i Vite. Actualment mostra un catàleg obtingut d’una API externa i incorpora una pàgina de prova per als favorits.

> La gestió de favorits encara no està implementada: el botó de les targetes no desa llibres i la pàgina de favorits només conté contingut de demostració.

## Tecnologies

- **Vue 3** amb Composition API i components `.vue` amb `<script setup>`.
- **JavaScript** amb mòduls ES.
- **Vue Router** per navegar entre pàgines sense recarregar l’aplicació.
- **Pinia**, registrat a l’aplicació, però encara sense ús per gestionar llibres.
- **Vite**, amb els connectors de Vue i Vue DevTools.
- **Bootstrap 5.3.8**, carregat per CDN des d’`index.html`.
- **Fetch API** per consultar el servei de llibres.

Les dependències i els rangs de versions es defineixen a `package.json`; `package-lock.json` registra les versions resoltes.

## Funcionalitats actuals

### Navegació

`App.vue` mostra el logotip de Vue i dos enllaços de navegació. La pàgina seleccionada es renderitza amb `RouterView`.

| Ruta | Nom | Vista | Contingut actual |
| --- | --- | --- | --- |
| `/` | `home` | `paginaInicial.vue` | Catàleg de llibres de l’API externa. |
| `/favorits` | `favorits` | `paginaFavorits.vue` | Pàgina de prova amb un missatge i quatre instàncies de `componentProva`. |

### Catàleg de llibres

En executar-se el hook `onBeforeMount` de `paginaInicial.vue`, es crida `getLlibres()` i se’n desa el resultat en una referència reactiva (`dadesLlibres`). La plantilla recorre aquesta llista amb `v-for` i genera una targeta `cmpFitxaLlibre` per llibre.

Cada targeta rep el llibre mitjançant la prop `infoLlibre` i mostra:

- Imatge (`imagen`).
- Títol (`titulo`).
- Autor (`autor`).
- Enllaç «Adfegir favorit», actualment amb `href="#"` i sense lògica associada.

La distribució fa servir les classes de Bootstrap `row` i `col-md-3`; les targetes tenen una amplada fixa de `18rem`. Tot i que el títol de la pàgina inicial és «Llibres favorits», el contingut és el catàleg retornat per l’API, no una selecció de favorits.

## Servei de dades

Les peticions estan centralitzades a `src/services/communicationManager.js`.

```text
GET http://aperezh.daw.inspedralbes.cat/libros.php
```

La funció `getLlibres()` fa una petició amb `fetch`, interpreta la resposta com a JSON, l’escriu a la consola i retorna la propietat `libros`.

El codi consumidor espera una estructura com aquesta (exemple il·lustratiu, no una resposta verificada del servei):

```json
{
  "libros": [
    {
      "imagen": "https://exemple.cat/portada.jpg",
      "titulo": "Títol del llibre",
      "autor": "Nom de l’autor"
    }
  ]
}
```

No hi ha cap backend ni base de dades inclosos al repositori. L’URL del servei està escrita directament al fitxer de comunicacions; actualment no es configura amb variables d’entorn.

## Estructura del repositori

```text
demoLibros/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── base.css                 # Actualment buit
│   │   ├── main.css                 # Actualment buit; importat a main.js
│   │   └── logo.svg                 # Logotip de Vue
│   ├── components/
│   │   ├── cmpFitxaLlibre.vue        # Targeta amb les dades d’un llibre
│   │   └── componentProva.vue       # Component de demostració
│   ├── router/
│   │   └── index.js                 # Rutes / i /favorits
│   ├── services/
│   │   └── communicationManager.js  # Consulta a l’API externa
│   ├── stores/
│   │   └── counter.js               # Store d’exemple de Pinia, no utilitzat
│   ├── views/
│   │   ├── paginaInicial.vue        # Càrrega i visualització del catàleg
│   │   └── paginaFavorits.vue       # Vista de prova dels favorits
│   ├── App.vue                     # Capçalera, navegació i RouterView
│   └── main.js                     # Inicialització de Vue, Pinia i router
├── index.html                      # Entrada HTML i càrrega de Bootstrap
├── jsconfig.json                   # Àlies @/* per a l’editor
├── vite.config.js                  # Connectors i àlies @ cap a src/
├── package.json                    # Dependències i scripts
└── package-lock.json               # Versions resoltes de les dependències
```

El store `counter.js` conserva l’exemple de comptador amb `count`, `doubleCount` i `increment()`. Cap de les vistes actuals el consumeix.

## Instal·lació i execució

### Requisits

- Node.js compatible amb el rang de `package.json`: `^22.18.0 || >=24.12.0`.
- npm.
- Accés a Internet per consultar l’API externa i carregar Bootstrap des del CDN.

### Desenvolupament local

Des de l’arrel del repositori:

```sh
npm install
npm run dev
```

Obre l’adreça que indiqui Vite al terminal, habitualment `http://localhost:5173`.

### Compilació per a producció

```sh
npm run build
```

Els fitxers generats es desen a `dist/`, directori exclòs del control de versions.

Per previsualitzar localment aquesta compilació:

```sh
npm run preview
```

### Scripts disponibles

| Ordre | Funció |
| --- | --- |
| `npm run dev` | Inicia el servidor de desenvolupament de Vite. |
| `npm run build` | Genera la compilació de producció. |
| `npm run preview` | Serveix localment la compilació generada. |

No hi ha scripts de proves automatitzades ni de lint configurats.

## Limitacions i aspectes pendents

- **Favorits:** falta implementar l’addició, l’eliminació, l’estat compartit i la persistència dels llibres seleccionats.
- **Pàgina de favorits:** encara mostra «Hello World!» i components de prova, no llibres desats.
- **Gestió de peticions:** no es comprova `response.ok`, no es capturen errors i no hi ha indicadors de càrrega ni missatges per a llistes buides.
- **Dependència externa:** el catàleg depèn de la disponibilitat del servei i dels permisos CORS que aquest proporcioni.
- **HTTPS:** l’API està configurada amb HTTP; si l’aplicació es publica amb HTTPS, el navegador pot bloquejar la petició per contingut mixt.
- **Desplegament:** el router utilitza `createWebHistory`; el servidor de producció ha de retornar `index.html` per a rutes com `/favorits` quan s’hi accedeix directament.
- **Poliment:** falta afegir una `key` al `v-for` de llibres, validar les props de la targeta i substituir els textos alternatius genèrics de les portades. L’HTML encara conserva el títol «Vite App» i l’atribut `lang` buit.
- **Proves:** no hi ha una bateria de proves automatitzades al repositori.

## Validació realitzada

Durant la redacció d’aquest README s’ha executat `npm run build` correctament amb Node.js `v22.21.0` i npm `11.16.0`. Aquesta comprovació valida la compilació, però no confirma la disponibilitat de l’API ni el comportament de l’aplicació al navegador.
