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
    <div class="col-12 d-flex align-items-center gap-3">
        <span class="fw-semibold text-nowrap"><slot></slot></span>

        <select @change="canviSelect" v-model="genere" class="form-select w-auto" aria-label="Default select example">
            <option value="" selected>Tots els gèneres</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Distopía">Distopía</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
        </select>

        <div class="form-check form-switch mb-0 text-nowrap">
            <input @change="canviFav" v-model="nomesFavorits" class="form-check-input" type="checkbox" role="switch" id="checkDefault">
            <label class="form-check-label" for="checkDefault">
                Només favorits
            </label>
        </div>
    </div>
</template>