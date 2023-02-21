<template>
  <div>
    <i-checkbox v-model="testValue" label="Выбрать опцию" color="red" />
    <i-button
      size="md"
      label="djgiejgiej"
      iconLeft="mdi-chevron-down"
      iconRight="mdi-chevron-down"
      iconLeftColor="green"
      color="red"
    ></i-button>
  </div>
</template>

<script>
import ICheckbox from "./components/ICheckbox/ICheckbox.vue";
import IButton from "./components/IButton/IButton.vue";
import { ref } from "vue";

export default {
  name: "App.vue",
  components: {
    ICheckbox,
    IButton
  },
  setup(props, { emit }) {
    let testValue = ref(true);

    return {
      testValue
    };
  }
};
</script>

<style scoped></style>
