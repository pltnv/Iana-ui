<template>
  <div>
    <i-checkbox v-model="testValue" label="Выбрать опцию" color="red" />
  </div>
</template>

<script>
import ICheckbox from './components/ICheckbox/ICheckbox.vue'
import { ref } from 'vue'

export default {
  name: "App.vue",
  components: {
    ICheckbox
  },
  setup(props, { emit }) {
    let testValue = ref(true);

    return {
      testValue,
    };
  },
}

</script>

<style scoped></style>
