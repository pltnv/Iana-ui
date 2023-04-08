<template>
  <div class="i-input">
    <input />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "IInput",
  props: {
    id: String,
    name: String,
    modelValue: String,
    type: String,
    variant: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "underline", "flat"].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: "sm",
      validator: (value) => {
        return ["xs", "sm", "md"].indexOf(value) !== -1;
      }
    }
  },

  setup(props, { emit }) {
    let localValue = ref("");
    return {
      localValue
    };
  }
};
</script>

<style lang="scss"></style>
