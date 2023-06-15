<script setup>
import { computed, ref } from "vue";
import IOverlay from "../IOverlay/IOverlay.vue";

const props = defineProps({
  id: String,
  modelValue: Boolean,
  persistent: Boolean,
  size: {
    type: String,
    default: "lg",
    validator: (value) => {
      return ["dialog", "sm", "md", "lg"].indexOf(value) !== -1;
    }
  },
  title: String,
  showAcceptButton: Boolean,
  showCancelButton: Boolean,
  acceptButtonTitle: String,
  cancelButtonTitle: String,
  disabledCancelButton: Boolean,
  disabledAcceptButton: Boolean
});

const emit = defineEmits(["update:modelValue"]);

let modalVisible = ref(props.value);

const close = () => {
  emit("update:modelValue", false);
};
const closeOutside = () => {
  if (!props.persistent) {
    close();
  }
};
</script>

<template>
  <div v-if="modelValue">
    <div class="i-modal" :class="`i-modal--${size}`">
      <template v-if="$slots.title">
        <slot />
      </template>
      <div v-else class="i-modal__title" v-text="title" />

      <i class="i-modal__close mdi mdi-close" @click="close" />
    </div>
    <i-overlay @click="closeOutside" />
  </div>
</template>

<style lang="scss">
.i-modal {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 14px rgba(70, 80, 88, 0.1);
  background-color: white;
  border-radius: 18px;
  padding: 10px 20px;

  &--dialog {
    width: 500px;
    min-height: 120px;
  }

  &--sm {
    width: 500px;
    height: 380px;
  }

  &--md {
    width: 600px;
    height: 460px;
  }

  &--lg {
    width: 800px;
    height: 600px;
  }

  &__title {
    font-size: 20px;
    word-break: break-word;
    padding-right: 15px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px;
  }
}
</style>
