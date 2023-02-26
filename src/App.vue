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
      variant="outlined"
      rounded
    ></i-button>
    <br />
    <i-tip
      id="2013"
      tip="Use it"
      open-delay="150"
      close-delay="300"
      position="bottom"
      style="margin-left: 40px"
    >
      <template #tip> Keep trying </template>
      <i-button
        size="md"
        label="Show me a tip"
        iconLeftColor="green"
        color="red"
        variant="outlined"
        rounded
      ></i-button>
    </i-tip>
  </div>
</template>

<script>
import ICheckbox from "./components/ICheckbox/ICheckbox.vue";
import IButton from "./components/IButton/IButton.vue";
import ITip from "./components/ITip/ITip.vue";
import { ref } from "vue";

export default {
  name: "App.vue",
  components: {
    ICheckbox,
    IButton,
    ITip
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
