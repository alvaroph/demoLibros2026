# demoLibros

Aplicació de demostració amb **Vue 3 + Vite** que mostra un catàleg de llibres, permet marcar-los com a favorits i filtrar-los. Serveix com a repàs dels conceptes treballats a classe; cada apartat explica el concepte i com es tradueix al codi.

## Conceptes treballats

1. [Estructura d'un component (`<script setup>`, `<template>`, `<style>`)](#1-estructura-dun-component)
2. [Reactivitat amb `ref`](#2-reactivitat-amb-ref)
3. [Hooks del cicle de vida (`onBeforeMount`)](#3-hooks-del-cicle-de-vida)
4. [Servei de comunicació amb l'API (`fetch` + `async/await`)](#4-servei-de-comunicació-amb-lapi)
5. [Gestió d'errors i estat de càrrega (`try/catch/finally`)](#5-gestió-derrors-i-estat-de-càrrega)
6. [Directives de plantilla (`v-for`, `v-if`, `v-else`, `v-model`, `:`, `@`)](#6-directives-de-plantilla)
7. [Comunicació pare → fill (props)](#7-comunicació-pare--fill-props)
8. [Comunicació fill → pare (emits)](#8-comunicació-fill--pare-emits)
9. [Slots](#9-slots)
10. [Propietats computades (`computed`)](#10-propietats-computades)
11. [Pinia: estat compartit](#11-pinia-estat-compartit)
12. [Vue Router](#12-vue-router)
13. [Inicialització de l'aplicació (`main.js`)](#13-inicialització-de-laplicació)
14. [La carpeta `public` i els recursos estàtics](#14-la-carpeta-public-i-els-recursos-estàtics)

---

## 1. Estructura d'un component

Un fitxer `.vue` (*Single File Component*) agrupa en un sol lloc la lògica, el HTML i els estils.

- `<script setup>`: la lògica amb Composition API. Tot el que es declara aquí (variables, funcions, imports) és accessible directament des de la plantilla.
- `<template>`: el HTML amb les directives de Vue.
- `<style>` / `<style scoped>`: els estils; amb `scoped` només afecten aquest component.

**Al codi:** tots els fitxers de `src/components/` i `src/views/`. Els components importats (p. ex. `import fitxaLlibre from '@/components/cmpFitxaLlibre.vue'` a `paginaInicial.vue`) s'usen a la plantilla com a etiqueta (`<fitxaLlibre />`) sense registrar-los. L'àlies `@` apunta a `src/`.

## 2. Reactivitat amb `ref`

`ref(valor)` crea una dada reactiva: quan canvia, Vue torna a pintar la part de la plantilla que la fa servir. Des del `<script>` s'hi accedeix amb `.value`; des del `<template>` no cal.

**Al codi (`paginaInicial.vue`):**

```js
const dadesLlibres = ref([])          // llista de llibres de l'API
const loading = ref(false)            // mostra o amaga l'indicador de càrrega
const genereSeleccionat = ref('')     // filtre de gènere ('' = tots)
const nomesFavorits = ref(false)      // filtre de favorits

dadesLlibres.value = await getLlibres() // s'escriu amb .value
```

## 3. Hooks del cicle de vida

Funcions que Vue executa en un moment concret de la vida del component (abans de muntar-lo, quan s'ha muntat, quan es destrueix…).

**Al codi:** `paginaInicial.vue` utilitza `onBeforeMount` per demanar les dades just abans de muntar el component:

```js
onBeforeMount(async () => {
  dadesLlibres.value = await getLlibres()
})
```

## 4. Servei de comunicació amb l'API

Les crides HTTP no es posen dins dels components, sinó en un mòdul a part (`communicationManager`). Així els components no saben res de la URL ni de `fetch`; només demanen dades.

**Al codi (`src/services/communicationManager.js`):**

```js
export async function getLlibres() {
    const resposta = await fetch(URL)
    const dades = await resposta.json()
    return dades.libros
}
```

- `async/await` permet escriure codi asíncron de manera lineal.
- `fetch` fa la petició; `resposta.json()` converteix el cos en un objecte.
- La funció s'exporta i s'importa a la vista: `import { getLlibres } from '@/services/communicationManager'`.

## 5. Gestió d'errors i estat de càrrega

`try/catch/finally` evita que un error de xarxa trenqui l'aplicació, i `finally` s'executa sempre, vagi bé o no. Combinat amb un `ref` booleà serveix per mostrar un indicador de càrrega.

**Al codi (`paginaInicial.vue`):**

```js
try {
  loading.value = true
  dadesLlibres.value = await getLlibres()
} catch (error) {
  console.log("error")
} finally {
  loading.value = false   // ja no estem carregant, hagi anat bé o no
}
```

```html
<div v-if="loading"><img src="/loading.gif" alt=""></div>
<div v-else class="row"> ... </div>
```

## 6. Directives de plantilla

| Directiva | Què fa | On es veu al codi |
| --- | --- | --- |
| `v-for` | Repeteix un element per cada element d'una llista | `v-for="actual in llibresFiltrats"` a `paginaInicial.vue`; `v-for="(actual,index) in store.favorits"` a `paginaFavorits.vue` |
| `v-if` / `v-else` | Mostra o amaga elements segons una condició | Indicador de càrrega a `paginaInicial.vue`; botons «Afegir» / «Eliminar favorit» a `cmpFitxaLlibre.vue` |
| `v-model` | Enllaç bidireccional entre un camp de formulari i un `ref` | `<select v-model="genere">` i `<input type="checkbox" v-model="nomesFavorits">` a `cmpFiltre.vue` |
| `:atribut` (`v-bind`) | Assigna una expressió JS a un atribut o prop | `:src="infoLlibre.imagen"`, `:infoLlibre="actual"`, `:favorit="..."` |
| `@esdeveniment` (`v-on`) | Escolta un esdeveniment del DOM o d'un component fill | `@click="emit(...)"`, `@change="canviSelect"`, `@afegirFav="afegirFavorit"` |
| `{{ }}` | Interpolació de text | `{{ infoLlibre.titulo }}` |

## 7. Comunicació pare → fill (props)

El pare passa dades al fill com si fossin atributs; el fill les declara amb `defineProps`. Les props són de **només lectura** per al fill.

**Al codi:**

```html
<!-- paginaInicial.vue (pare) -->
<fitxaLlibre :infoLlibre="actual" :favorit="store.esFavorit(actual.id)" />
```

```js
// cmpFitxaLlibre.vue (fill)
const props = defineProps(['infoLlibre', 'favorit'])
```

- `infoLlibre`: l'objecte del llibre a pintar.
- `favorit`: booleà que decideix quin botó es mostra (`v-if="!favorit"` / `v-if="favorit"`).

## 8. Comunicació fill → pare (emits)

El fill no modifica les dades del pare; **emet un esdeveniment** (opcionalment amb una dada) i el pare decideix què fer-ne. L'esdeveniment es declara amb `defineEmits` i es llança amb `emit('nom', dada)`.

**Al codi:**

```js
// cmpFitxaLlibre.vue (fill)
const emit = defineEmits(['afegirFav', 'eliminarFav'])
```
```html
<button @click="emit('afegirFav', infoLlibre.id)">Afegir favorit</button>
```
```html
<!-- paginaInicial.vue (pare) escolta l'esdeveniment -->
<fitxaLlibre @afegirFav="afegirFavorit" @eliminarFav="eliminarFavorit" ... />
```
```js
function afegirFavorit(id) { ... }   // rep l'id enviat pel fill
```

El mateix patró s'usa a `cmpFiltre.vue`, que emet `evtCanviGenere` (amb el gènere triat) i `evtCanviFav` (amb el valor del checkbox). El pare els rep amb `canviGenere(nouGenere)` i `canviFav(nouValor)` i actualitza els seus `ref` de filtre.

**Resum del flux:** pare →(props)→ fill; fill →(emit)→ pare; el pare canvia les dades i Vue repinta el fill amb les noves props.

## 9. Slots

Un *slot* permet que el **pare decideixi el contingut** que es pinta dins d'un lloc reservat del fill. És la tercera via de comunicació pare → fill, pensada per a contingut (text, HTML, altres components) i no tant per a dades.

**Al codi:**

```html
<!-- cmpFiltre.vue (fill): reserva el lloc -->
<h3><slot></slot></h3>
```
```html
<!-- paginaInicial.vue (pare): omple el lloc -->
<cmpFiltre @evtCanviFav="canviFav" @evtCanviGenere="canviGenere">
  Filtre de llibres
</cmpFiltre>
```

El text «Filtre de llibres» s'insereix on hi ha el `<slot>`. Així el mateix component de filtre es pot reutilitzar amb títols diferents.

## 10. Propietats computades

`computed` crea un valor **derivat** d'altres dades reactives. Es recalcula automàticament només quan canvia alguna de les dades de què depèn, i el resultat es manté en memòria cau. No és una funció que s'invoqui: s'usa com una variable (a l'script amb `.value`).

**Al codi (`paginaInicial.vue`):** `llibresFiltrats` depèn de `dadesLlibres`, `genereSeleccionat`, `nomesFavorits` i `store.favorits`; quan qualsevol canvia, la llista es recalcula i la plantilla es repinta.

```js
const llibresFiltrats = computed(() => {
  let resultat = []
  for (let llibre of dadesLlibres.value) {
    let mostrar = true
    if (genereSeleccionat.value !== '' && llibre.genero !== genereSeleccionat.value) mostrar = false
    if (nomesFavorits.value === true && store.esFavorit(llibre.id) === false) mostrar = false
    if (mostrar) resultat.push(llibre)
  }
  return resultat
})
```
```html
<div v-for="actual in llibresFiltrats"> ... </div>
```

Mai es modifica `dadesLlibres`: el filtre només crea una vista derivada, de manera que en treure el filtre tornen a aparèixer tots els llibres.

## 11. Pinia: estat compartit

Passar dades per props/emits només funciona entre pare i fill. Quan dues pàgines no emparentades necessiten el mateix estat (aquí, la llista de favorits), es guarda en un **store de Pinia**, una font de veritat global i reactiva.

**Definició (`src/stores/llibres.js`)**, amb sintaxi *setup store*:

```js
export const useLlibresStore = defineStore('llibres', () => {
  const favorits = ref([])                        // state

  function afegirFavorit(fav) { ... }             // actions
  function esFavorit(id) { ... }
  function eliminarFavorit(id) { ... }

  return { favorits, afegirFavorit, esFavorit, eliminarFavorit }
})
```

- Els `ref` fan de **state**, les funcions d'**actions**, i `computed` serviria de *getters*.
- Només és accessible el que es retorna.
- `afegirFavorit` comprova amb `esFavorit` que el llibre no estigui repetit abans d'afegir-lo.

**Ús als components (3 passos, comentats al codi):**

```js
import { useLlibresStore } from '@/stores/llibres'   // 1. importar
const store = useLlibresStore()                       // 2. crear/recuperar el store
store.afegirFavorit(llibre)                           // 3. usar dades i mètodes
```

- `paginaInicial.vue` afegeix i treu favorits, i consulta `store.esFavorit(...)` per pintar el botó correcte i per filtrar.
- `paginaFavorits.vue` pinta directament `store.favorits` i elimina amb `store.eliminarFavorit(id)`.
- Com que les dues pàgines comparteixen el mateix store, un canvi en una es veu a l'altra, i l'estat es manté en navegar entre rutes.

**Combinació amb props/emits:** `cmpFitxaLlibre` continua sent un component «tonto» (no coneix Pinia): rep `favorit` per prop i emet `afegirFav` / `eliminarFav`; són les pàgines pare qui parlen amb el store.

## 12. Vue Router

Permet tenir diverses «pàgines» en una SPA sense recarregar el navegador. Cada ruta associa un camí amb un component (vista).

**Al codi:**

```js
// src/router/index.js
routes: [
  { path: '/',         name: 'home',     component: paginaInicial },
  { path: '/favorits', name: 'favorits', component: paginaFavorits },
]
```
```html
<!-- App.vue -->
<RouterLink class="btn btn-warning" to="/">Inici</RouterLink>
<RouterLink class="btn btn-danger" to="/favorits">Llibres favorits</RouterLink>
<RouterView />   <!-- aquí es pinta la vista de la ruta activa -->
```

- `RouterLink`: enllaç que navega sense recarregar.
- `RouterView`: lloc on es renderitza el component de la ruta actual.
- Convenció: les **vistes** (`src/views/`) són els components assignats a rutes; els **components** (`src/components/`) són les peces reutilitzables.

## 13. Inicialització de l'aplicació

`main.js` crea l'aplicació i hi connecta els *plugins* abans de muntar-la al DOM.

```js
const app = createApp(App)
app.use(createPinia())   // activa Pinia (els stores funcionen)
app.use(router)          // activa el router
app.mount('#app')        // munta l'app a <div id="app"> d'index.html
```

## 14. La carpeta `public` i els recursos estàtics

Vite distingeix dues maneres de fer servir fitxers (imatges, GIF, icones…):

| | `public/` | `src/assets/` |
| --- | --- | --- |
| Tractament | Es copia tal qual a l'arrel del servidor, sense processar | Vite els processa i els empaqueta (en canvia el nom amb un *hash*) |
| Com s'hi accedeix | Ruta absoluta des de l'arrel: **`/`** | Ruta relativa o amb l'àlies `@` |
| Exemple del projecte | `public/loading.gif` → `src="/loading.gif"` | `src/assets/logo.svg` → `src="@/assets/logo.svg"` |

**Idea clau:** per a Vue/Vite, **`/` és la carpeta `public`**. Tot el que hi ha dins `public/` es serveix com si estigués a l'arrel del web, i per això no s'escriu `public` a la ruta.

**Al codi:**

```html
<!-- paginaInicial.vue: el GIF de càrrega surt de public/loading.gif -->
<div v-if="loading">
  <img src="/loading.gif" alt="">
</div>
```

```html
<!-- App.vue: aquest logotip, en canvi, surt de src/assets (passa per Vite) -->
<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
```

- Si la ruta fos `src="/public/loading.gif"` **no** funcionaria: la carpeta `public` desapareix de la URL.
- A la compilació (`npm run build`), el contingut de `public/` es copia a l'arrel de `dist/`.
- `public/` s'usa per a fitxers que han de mantenir el nom exacte o que es referencien per ruta fixa (`favicon.ico`, `loading.gif`); `src/assets/` per a recursos que importen els components.

---

## Estructura del projecte

```text
public/
└── loading.gif                     # Servit des de l'arrel: <img src="/loading.gif">
src/
├── main.js                         # Crea l'app i registra Pinia i el router
├── App.vue                         # Capçalera, navegació i <RouterView>
├── router/index.js                 # Rutes
├── services/communicationManager.js  # Crides a l'API (fetch)
├── stores/llibres.js               # Store de Pinia: favorits
├── views/
│   ├── paginaInicial.vue           # Catàleg, filtres, computed, càrrega
│   └── paginaFavorits.vue          # Llista de favorits des del store
└── components/
    ├── cmpFitxaLlibre.vue          # Targeta: props + emits
    └── cmpFiltre.vue               # Filtre: v-model + emits + slot
```

## Execució

```sh
npm install
npm run dev       # servidor de desenvolupament (Vite)
npm run build     # compilació de producció a dist/
npm run preview   # previsualitza la compilació
```

Requereix Node.js `^22.18.0 || >=24.12.0`. Les dades venen de `http://aperezh.daw.inspedralbes.cat/libros.php`, de manera que cal connexió a Internet.
