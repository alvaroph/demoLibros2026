<script setup>

    import { ref } from 'vue';

    const emit=defineEmits(['evtCanviGenere','evtCanviFav'])
    let genere=ref('')
    let nomesFavorits=ref(false)

    function canviSelect(){
        emit('evtCanviGenere',genere.value)
    }

    function canviFav(){
        emit('evtCanviFav',nomesFavorits.value)
    }

</script>

<template>
    <h3><slot></slot></h3> 
    <div>
        <select @change="canviSelect" v-model="genere" class="form-select" aria-label="Default select example">
            <option value="" selected>Tots els gèneres</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Distopía">Distopía</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
        </select>
    </div>

    <div class="form-check">
        <input @change="canviFav" v-model="nomesFavorits"  class="form-check-input" type="checkbox" value="" id="checkDefault">
        <label class="form-check-label" for="checkDefault">
            Només favorits
        </label>
</div>
</template>



<style scoped>
div{
    background-color: red;
}

</style>