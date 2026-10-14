<script setup>
import { ref } from 'vue'
import cmpProva from '../components/componentProva.vue'

const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
  <cmpProva/>
  <cmpProva/>
  <cmpProva/>
  <cmpProva/>

</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>