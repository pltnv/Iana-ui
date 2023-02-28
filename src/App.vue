<template>
  <div>
    <i-checkbox v-model="testValue" label="Choose" color="red" />
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
      min-width="10px"
      max-width="100px"
    >
      <template #tip> Keep trying keep keep keep keep keep</template>
      <i-button
        size="md"
        label="Show me a tip"
        iconLeftColor="green"
        color="red"
        variant="outlined"
        rounded
      ></i-button>
    </i-tip>

    <i-notifications
      message="Item is deleted from the cart"
      type="error"
      duration="20000"
      @close="close"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import ICheckbox from "./components/ICheckbox/ICheckbox.vue";
import IButton from "./components/IButton/IButton.vue";
import ITip from "./components/ITip/ITip.vue";
import INotifications from "./components/INotifications/INotifications.vue";

export default {
  name: "App.vue",
  components: {
    ICheckbox,
    IButton,
    ITip,
    INotifications
  },
  setup(props, { emit }) {
    let testValue = ref(true);

    const close = () => {
      alert("emit: close");
    };

    return {
      testValue,

      close
    };
  }
};
</script>

<style scoped></style>
