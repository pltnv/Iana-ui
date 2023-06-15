<script setup>
import { computed, ref } from "vue";
import IOverlay from "../IOverlay/IOverlay.vue";
import IButton from "../IButton/IButton.vue";

const props = defineProps({
  id: String,
  modelValue: Boolean,
  persistent: Boolean,
  size: {
    type: String,
    default: "dialog",
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

const emit = defineEmits(["update:modelValue", "accept", "cancel"]);

let modalVisible = ref(props.value);

const close = () => {
  emit("update:modelValue", false);
};
const closeOutside = () => {
  if (!props.persistent) {
    close();
  }
};

const accept = () => {
  emit("accept");
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <div v-if="modelValue">
    <div class="i-modal" :class="`i-modal--${size}`">
      <div>
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <div v-else class="i-modal__title" v-text="title" />
        <i class="i-modal__close mdi mdi-close" @click="close" />
      </div>
      <div class="i-modal__default">
        <slot name="default" />
      </div>
      <template>
        <div class="i-modal__footer">
          <template v-if="$slots.footer">
            <slot name="footer" />
          </template>
          <template v-else>
            <i-button
              v-if="showAcceptButton"
              size="md"
              :disabled="disabledAcceptButton"
              :label="acceptButtonTitle"
              @click="accept"
            />
            <i-button
              v-if="showCancelButton"
              size="md"
              :disabled="disabledCancelButton"
              :label="cancelButtonTitle"
              @click="cancel"
            />
          </template>
        </div>
      </template>
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

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    padding: 20px 10px;
    margin-top: auto;
  }
}
</style>
