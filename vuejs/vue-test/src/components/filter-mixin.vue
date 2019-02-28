<template>
    <div>
        <input v-model="teamInput"/>
        <h1>{{ teamInput | addDotAfter }}</h1>
        <h1>{{ 'Global: ' + teamInput | toUppercaseFilter }}</h1>
        <hr>

        <li v-for="(item, index) in teamInitCpt" :key="index">
            {{ item.name }}
        </li>
    </div>
</template>

<script>
import { teamInitMixin } from './util/storeMixin.js';

export default {
    mixins: [ teamInitMixin ],

    filters: {
        addDotAfter: function(text) {
            if(text == '') {
                return text;
            }
            return text + ".";
        }
    },
}
</script>
