<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import IOverlay from "../IOverlay/IOverlay.vue";
import IButton from "../IButton/IButton.vue";

const props = defineProps({
  id: String,
  modelValue: { type: Boolean, required: true },
  persistent: { type: Boolean, default: false },
  size: {
    type: String,
    default: "dialog",
    validator: (value) => ["dialog", "sm", "md", "lg"].includes(value)
  },
  title: String,
  dialogText: String,
  showAcceptButton: { type: Boolean, default: false },
  showCancelButton: { type: Boolean, default: false },
  acceptButtonTitle: { type: String, default: "Подтвердить" },
  cancelButtonTitle: { type: String, default: "Отменить" },
  disabledCancelButton: { type: Boolean, default: false },
  disabledAcceptButton: { type: Boolean, default: false },
  shadowEffect: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue", "accept", "cancel"]);

const defaultBlock = ref(null);
const isShadowEffectVisible = ref(false);

const modalTarget = ref("body");

const close = () => emit("update:modelValue", false);

const closeOutside = () => {
  if (!props.persistent) close();
};

const accept = () => {
  emit("accept");
  close();
};

const cancel = () => {
  close();
  emit("cancel");
};

const escHandler = (e) => {
  if (e.key === "Escape") close();
};

const checkScrollEnd = () => {
  if (!defaultBlock.value) return;
  const { scrollTop, scrollHeight, clientHeight } = defaultBlock.value;
  isShadowEffectVisible.value = scrollHeight - (scrollTop + clientHeight) > 6;
};

onMounted(() => {
  if (props.shadowEffect && defaultBlock.value) {
    const { scrollHeight, clientHeight } = defaultBlock.value;
    isShadowEffectVisible.value = scrollHeight > clientHeight;
  }
  document.addEventListener("keyup", escHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("keyup", escHandler);
});
</script>

<template>
  <div v-if="modelValue" class="i-modal__wrapper">
    <div class="i-modal" :class="`i-modal--${size}`">
      <header class="i-modal__header">
        <slot name="title">
          <h3 v-if="title" class="i-modal__title">{{ title }}</h3>
        </slot>
        <button class="i-modal__close" @click="close">✕</button>
      </header>

      <section
        v-if="$slots.default || dialogText"
        ref="defaultBlock"
        @scroll="checkScrollEnd"
        class="i-modal__content"
        :class="{ 'shadow-effect': shadowEffect && isShadowEffectVisible }"
      >
        <slot>{{ dialogText }}</slot>
      </section>

      <footer class="i-modal__footer">
        <slot name="footer">
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
        </slot>
      </footer>
    </div>
    <i-overlay @click="closeOutside" />
  </div>
</template>

<style scoped lang="scss">
.i-modal__wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.i-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: fadeIn 0.25s ease-out;
  z-index: 1001;

  &--dialog {
    width: 480px;
    max-width: 90vw;
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

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  &__close {
    border: none;
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    position: relative;
  }

  &__content.shadow-effect::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), transparent);
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 12px 20px;
    border-top: 1px solid #eee;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
